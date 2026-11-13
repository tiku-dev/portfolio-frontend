import { useState, useEffect, useCallback } from 'react';
import {
  login,
  logout,
  getCurrentUser,
  getStoredUser,
  getProjects,
  deleteProject,
  getTags,
  createTag,
  getContactInquiries,
} from '../api/client';
import { PrimaryButton, SecondaryButton } from './Button';
import {
  LockIcon,
  ArrowLeftIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  ExternalLinkIcon,
  RefreshIcon,
  MailIcon,
} from './icons';
import logoSvg from '../assets/dev-tiku.svg';
import { ProjectEditModal } from './ProjectEditModal';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';

export function AdminDashboardPage({
  onBack,
  onNavigate,
  onNavigateToTelemetry,
  onNavigateToAdmin,
}) {
  // Authentication state
  const [user, setUser] = useState(getStoredUser());
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Dashboard tabs: 'projects', 'inquiries', 'tags'
  const [activeTab, setActiveTab] = useState('projects');

  // Data states
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Project Editor Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // New Tag inline form
  const [newTagName, setNewTagName] = useState('');
  const [newTagCategory, setNewTagCategory] = useState('backend');
  const [tagError, setTagError] = useState(null);

  // Feedback Toast
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Verify auth on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    getCurrentUser()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setCheckingAuth(false));
  }, []);

  // Fetch projects
  const fetchAllProjects = useCallback(async () => {
    setProjectsLoading(true);
    try {
      const data = await getProjects();
      const list = Array.isArray(data) ? data : data?.results || [];
      setProjects(list);
    } catch {
      setProjects([]);
    } finally {
      setProjectsLoading(false);
    }
  }, []);

  // Fetch inquiries
  const fetchAllInquiries = useCallback(async () => {
    setInquiriesLoading(true);
    try {
      const data = await getContactInquiries();
      const list = Array.isArray(data) ? data : data?.results || [];
      setInquiries(list);
    } catch {
      setInquiries([]);
    } finally {
      setInquiriesLoading(false);
    }
  }, []);

  // Fetch tags
  const fetchAllTags = useCallback(async () => {
    try {
      const data = await getTags();
      const list = Array.isArray(data) ? data : data?.results || [];
      setTags(list);
    } catch {
      setTags([]);
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (activeTab === 'projects') fetchAllProjects();
      if (activeTab === 'inquiries') fetchAllInquiries();
      if (activeTab === 'tags') fetchAllTags();
    }
  }, [user, activeTab, fetchAllProjects, fetchAllInquiries, fetchAllTags]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await login(email, password);
      setUser(res.user);
      showToast(`Welcome back, ${res.user.email || res.user.username}!`);
    } catch (err) {
      setLoginError(err.message || 'Authentication failed. Please verify your admin credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    showToast('Signed out of admin session.');
  };

  const handleCreateProject = () => {
    setSelectedProject(null);
    setEditModalOpen(true);
  };

  const handleEditProject = (proj) => {
    setSelectedProject(proj);
    setEditModalOpen(true);
  };

  const handleDeleteProject = async (proj) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${proj.title}"?`)) return;
    try {
      await deleteProject(proj.slug || proj.id);
      showToast(`Deleted "${proj.title}" successfully.`);
      fetchAllProjects();
    } catch (err) {
      alert(`Error deleting project: ${err.message}`);
    }
  };

  const handleCreateTag = async (e) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    setTagError(null);
    try {
      await createTag({ name: newTagName.trim(), category: newTagCategory });
      setNewTagName('');
      showToast(`Tag "${newTagName.trim()}" created successfully!`);
      fetchAllTags();
    } catch (err) {
      setTagError(err.message || 'Failed to create tag.');
    }
  };

  // Filter projects by search
  const filteredProjects = projects.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.tagline?.toLowerCase().includes(q) ||
      p.tags?.some((t) => (typeof t === 'string' ? t : t.name).toLowerCase().includes(q))
    );
  });

  // 1. Loading authentication check
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated: Full Login View
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-orange-500 selection:text-white pb-24 md:pb-0">
        {/* Default Navbar Component */}
        <Navbar
          activeSection="admin"
          onNavigate={onNavigate || onBack}
          onNavigateToTelemetry={onNavigateToTelemetry}
          onNavigateToAdmin={onNavigateToAdmin}
        />

        {/* Login Box */}
        <main className="flex-1 flex items-center justify-center p-4 my-8 sm:my-12">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-900 text-orange-600 dark:text-orange-400">
                <LockIcon className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                Admin Authentication
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Sign in to manage projects, case studies, and inquiries.
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="pt-2">
                <PrimaryButton size="md" fullWidth type="submit" isLoading={loginLoading}>
                  Sign In
                </PrimaryButton>
              </div>
            </form>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onBack}
                className="text-xs text-slate-400 hover:text-orange-500 transition-colors cursor-pointer"
              >
                ← Return to public portfolio
              </button>
            </div>
          </div>
        </main>

        {/* Default Footer Component */}
        <Footer
          onNavigateToTelemetry={onNavigateToTelemetry}
          onNavigateToAdmin={onNavigateToAdmin}
        />

        {/* Default Mobile Bottom Navigation */}
        <MobileBottomNav
          activeSection="admin"
          onNavigate={onNavigate || onBack}
        />
      </div>
    );
  }

  // 3. Authenticated: Full Admin Control Panel
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-orange-500 selection:text-white">
      {/* Default Navbar Component */}
      <Navbar
        activeSection="admin"
        onNavigate={onNavigate || onBack}
        onNavigateToTelemetry={onNavigateToTelemetry}
        onNavigateToAdmin={onNavigateToAdmin}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Admin Session Identity Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span>{user.email || user.username}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  {user.is_superuser ? 'Superuser' : 'Staff Admin'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Admin session active via Django SimpleJWT &mdash; Full CRUD authorization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500 cursor-pointer transition-colors"
            >
              ← Back to Portfolio
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/80 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              Portfolio Projects ({Array.isArray(projects) ? projects.length : 0})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              Contact Inquiries ({Array.isArray(inquiries) ? inquiries.length : 0})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tags')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'tags'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              Technology Tags ({Array.isArray(tags) ? tags.length : 0})
            </button>
          </div>

          {activeTab === 'projects' && (
            <PrimaryButton size="sm" onClick={handleCreateProject} leftIcon={<PlusIcon className="w-3.5 h-3.5" />}>
              Add New Project
            </PrimaryButton>
          )}
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, tagline, or tech..."
                className="w-full sm:w-80 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={fetchAllProjects}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500 cursor-pointer"
              >
                <RefreshIcon className={`w-3.5 h-3.5 ${projectsLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {projectsLoading ? (
              <div className="py-12 text-center text-xs text-slate-400">Loading projects from backend...</div>
            ) : filteredProjects.length === 0 ? (
              <div className="py-12 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
                  No projects found matching your criteria.
                </p>
                <PrimaryButton size="sm" onClick={handleCreateProject}>
                  Create your first project
                </PrimaryButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id || p.slug}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">
                          {p.title}
                        </h3>
                        {p.featured && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 shrink-0">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {p.tagline}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(p.tags || []).slice(0, 4).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            {typeof t === 'string' ? t : t.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <a
                        href={`#/case-study/${p.slug || p.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-500 hover:text-orange-500 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View</span>
                        <ExternalLinkIcon className="w-3 h-3" />
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditProject(p)}
                          className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/40 rounded-lg transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(p)}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CONTACT INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Visitor Inquiries Submitted via Contact Form
              </h2>
              <button
                type="button"
                onClick={fetchAllInquiries}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500 cursor-pointer"
              >
                <RefreshIcon className={`w-3.5 h-3.5 ${inquiriesLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {inquiriesLoading ? (
              <div className="py-12 text-center text-xs text-slate-400">Loading inquiries...</div>
            ) : !Array.isArray(inquiries) || inquiries.length === 0 ? (
              <div className="py-12 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8 text-xs text-slate-500">
                No visitor inquiries received yet.
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id || inq.email || Math.random()}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MailIcon className="w-4 h-4 text-orange-500" />
                        <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100">
                          {inq.name}
                        </span>
                        <a
                          href={`mailto:${inq.email}`}
                          className="text-xs text-orange-500 hover:underline"
                        >
                          &lt;{inq.email}&gt;
                        </a>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {inq.created_at ? new Date(inq.created_at).toLocaleString() : 'Recently'}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Subject: {inq.subject || '(No Subject)'}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TAGS & SKILLS */}
        {activeTab === 'tags' && (
          <div className="space-y-6">
            {/* Create Tag Form */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                Add Technology Tag
              </h2>
              {tagError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 text-xs">
                  {tagError}
                </div>
              )}
              <form onSubmit={handleCreateTag} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Tag Name (e.g. FastAPI, GraphQL, Kafka)"
                  required
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-orange-500"
                />
                <select
                  value={newTagCategory}
                  onChange={(e) => setNewTagCategory(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-orange-500"
                >
                  <option value="backend">Backend & Architecture</option>
                  <option value="database">Databases & Caching</option>
                  <option value="devops">DevOps & Cloud</option>
                  <option value="frontend">Frontend & UI</option>
                  <option value="tools">Tools & Libraries</option>
                </select>
                <PrimaryButton size="sm" type="submit">
                  Save Tag
                </PrimaryButton>
              </form>
            </div>

            {/* Existing Tags Cloud */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Existing Portfolio Tags ({tags.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(tags) && tags.map((t) => (
                  <span
                    key={t.id || t.name}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {t.name} <span className="text-[10px] text-slate-400">({t.category})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Feedback Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-700 animate-slide-up">
          {toast}
        </div>
      )}

      {/* Project Create / Edit Modal */}
      <ProjectEditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onSaved={fetchAllProjects}
        onDeleted={fetchAllProjects}
      />

      {/* Default Footer Component */}
      <Footer
        onNavigateToTelemetry={onNavigateToTelemetry}
        onNavigateToAdmin={() => {}}
      />

      {/* Default Mobile Bottom Navigation */}
      <MobileBottomNav
        activeSection="admin"
        onNavigate={onNavigate || onBack}
      />
    </div>
  );
}

