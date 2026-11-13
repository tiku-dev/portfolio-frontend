import { useState, useEffect } from 'react';
import { createProject, updateProject, deleteProject, getTags } from '../api/client';
import { PrimaryButton, SecondaryButton } from './Button';
import { CloseIcon, TrashIcon, PlusIcon } from './icons';

export function ProjectEditModal({ isOpen, onClose, project, onSaved, onDeleted }) {
  const isEditing = Boolean(project?.id || project?.slug);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [architectureOverview, setArchitectureOverview] = useState('');
  const [keyAchievementsText, setKeyAchievementsText] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [healthStatus, setHealthStatus] = useState('healthy');

  // Tags selection
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  // Metrics list [{ label, value, description }]
  const [metrics, setMetrics] = useState([]);

  // Status & error states
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Load available tags
  useEffect(() => {
    if (isOpen) {
      getTags()
        .then((tags) => setAvailableTags(tags || []))
        .catch(() => setAvailableTags([]));
    }
  }, [isOpen]);

  // Populate form fields
  useEffect(() => {
    if (!isOpen) return;

    if (project) {
      setTitle(project.title || '');
      setSlug(project.slug || '');
      setTagline(project.tagline || '');
      setProblemStatement(project.problem_statement || '');
      setArchitectureOverview(project.architecture_overview || '');
      setKeyAchievementsText(
        Array.isArray(project.key_achievements)
          ? project.key_achievements.join('\n')
          : ''
      );
      setGithubUrl(project.github_url || '');
      setDemoUrl(project.demo_url || '');
      setFeatured(Boolean(project.featured));
      setHealthStatus(project.health_status || 'healthy');

      // Selected tags
      if (Array.isArray(project.tags)) {
        setSelectedTagIds(project.tags.map((t) => (typeof t === 'object' ? t.id : t)));
      } else {
        setSelectedTagIds([]);
      }

      // Metrics
      if (Array.isArray(project.metrics) && project.metrics.length > 0) {
        setMetrics(
          project.metrics.map((m) => ({
            label: m.label || '',
            value: m.value || '',
            description: m.description || '',
          }))
        );
      } else {
        setMetrics([
          { label: 'Performance', value: '100%', description: 'Optimized response time' },
        ]);
      }
    } else {
      // Reset form for new project
      setTitle('');
      setSlug('');
      setTagline('');
      setProblemStatement('');
      setArchitectureOverview('');
      setKeyAchievementsText('');
      setGithubUrl('');
      setDemoUrl('');
      setFeatured(false);
      setHealthStatus('healthy');
      setSelectedTagIds([]);
      setMetrics([
        { label: 'Latency', value: 'Sub-20ms', description: 'Optimized API response time' },
      ]);
    }
    setError(null);
  }, [isOpen, project]);

  if (!isOpen) return null;

  const handleAddMetric = () => {
    setMetrics([...metrics, { label: '', value: '', description: '' }]);
  };

  const handleRemoveMetric = (index) => {
    setMetrics(metrics.filter((_, i) => i !== index));
  };

  const handleMetricChange = (index, field, val) => {
    const updated = [...metrics];
    updated[index][field] = val;
    setMetrics(updated);
  };

  const toggleTag = (tagId) => {
    if (selectedTagIds.includes(tagId)) {
      setSelectedTagIds(selectedTagIds.filter((id) => id !== tagId));
    } else {
      setSelectedTagIds([...selectedTagIds, tagId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const achievementsList = keyAchievementsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug: slug.trim() || undefined,
      tagline,
      problem_statement: problemStatement,
      architecture_overview: architectureOverview,
      key_achievements: achievementsList,
      github_url: githubUrl,
      demo_url: demoUrl,
      featured,
      health_status: healthStatus,
      tag_ids: selectedTagIds,
      metrics_data: metrics.filter((m) => m.label && m.value),
    };

    try {
      let saved;
      if (isEditing) {
        const identifier = project.slug || project.id;
        saved = await updateProject(identifier, payload);
      } else {
        saved = await createProject(payload);
      }
      if (onSaved) onSaved(saved);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save project. Ensure you are logged in as admin.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to permanently delete "${project.title}"?`)) {
      return;
    }
    setDeleting(true);
    setError(null);
    try {
      const identifier = project.slug || project.id;
      await deleteProject(identifier);
      if (onDeleted) onDeleted(identifier);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to delete project.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100">
              {isEditing ? `Edit: ${project.title}` : 'Create New Portfolio Project'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Changes are immediately synchronized with the Django REST API using your SimpleJWT session.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Project Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Distributed Task Queue Engine"
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                URL Slug (Optional)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated from title if blank"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              One-Sentence Tagline *
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="High-throughput distributed asynchronous worker system written in Python & Celery"
              required
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Problem Statement */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Problem Statement *
            </label>
            <textarea
              rows={3}
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="Describe the engineering challenge, performance bottlenecks, or business problem solved..."
              required
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Architecture Overview */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Architecture Overview *
            </label>
            <textarea
              rows={4}
              value={architectureOverview}
              onChange={(e) => setArchitectureOverview(e.target.value)}
              placeholder="Explain system dataflow, microservices, database design, caching layers, and tradeoffs..."
              required
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Key Achievements (one per line) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Key Technical Achievements (one per line)
            </label>
            <textarea
              rows={3}
              value={keyAchievementsText}
              onChange={(e) => setKeyAchievementsText(e.target.value)}
              placeholder={"Reduced P99 latency from 450ms to 32ms\nHandled 15,000 requests/sec with Redis cluster\nAutomated CI/CD with GitHub Actions and Docker"}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Links & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/tiku-dev/project"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Live Demo / Website URL
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://demo.example.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Flags & Health */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Operational Health Status
              </label>
              <select
                value={healthStatus}
                onChange={(e) => setHealthStatus(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="healthy">Operational 🟢</option>
                <option value="degraded">Degraded 🟡</option>
                <option value="offline">Offline 🔴</option>
                <option value="unknown">Unknown ⚪</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-4 sm:pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Featured Case Study
                </span>
              </label>
            </div>
          </div>

          {/* Tags Multi-select */}
          {availableTags.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Tech Stack Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((t) => {
                  const isSelected = selectedTagIds.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTag(t.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-orange-500 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Metrics Builder */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Benchmark Metrics
              </label>
              <button
                type="button"
                onClick={handleAddMetric}
                className="inline-flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 dark:text-orange-400 font-semibold cursor-pointer"
              >
                <PlusIcon className="w-3.5 h-3.5" />
                <span>Add Metric</span>
              </button>
            </div>

            <div className="space-y-2">
              {metrics.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={m.label}
                    onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                    placeholder="Metric Label (e.g. Latency)"
                    className="w-1/3 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-1 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    value={m.value}
                    onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 18ms)"
                    className="w-1/4 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-1 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    value={m.description}
                    onChange={(e) => handleMetricChange(idx, 'description', e.target.value)}
                    placeholder="Description (e.g. via Redis multi-level cache)"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-1 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMetric(idx)}
                    className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer"
                    title="Remove metric"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            {isEditing ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting || loading}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer disabled:opacity-50"
              >
                <TrashIcon className="w-4 h-4" />
                <span>{deleting ? 'Deleting...' : 'Delete Project'}</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <SecondaryButton size="md" type="button" onClick={onClose} disabled={loading}>
                Cancel
              </SecondaryButton>
              <PrimaryButton size="md" type="submit" isLoading={loading}>
                {isEditing ? 'Save Changes' : 'Publish Project'}
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

