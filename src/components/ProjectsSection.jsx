import React, { useState, useEffect } from 'react';
import { getProjects, pingProject } from '../api/client';
import { PrimaryButton, SecondaryButton } from './Button';
import { CaseStudyModal } from './CaseStudyModal';
import { ActivityIcon, ExternalLinkIcon, GithubIcon, RefreshIcon } from './icons';
import { ProjectCardSkeleton } from './Skeleton';

export function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [pingStates, setPingStates] = useState({});

  const filterTags = [
    { label: 'All Projects', slug: 'all' },
    { label: 'Django', slug: 'django' },
    { label: 'Redis', slug: 'redis' },
    { label: 'PostgreSQL', slug: 'postgresql' },
    { label: 'Docker', slug: 'docker' },
  ];

  useEffect(() => {
    setLoading(true);
    getProjects(selectedTag === 'all' ? null : selectedTag)
      .then((data) => setProjects(data))
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setLoading(false), 250);
      });
  }, [selectedTag]);

  const handlePing = async (slug) => {
    setPingStates((prev) => ({
      ...prev,
      [slug]: { loading: true, result: null },
    }));

    try {
      const res = await pingProject(slug);
      setPingStates((prev) => ({
        ...prev,
        [slug]: { loading: false, result: res },
      }));
    } catch (e) {
      setPingStates((prev) => ({
        ...prev,
        [slug]: { loading: false, result: { status: 'offline', latency_ms: null } },
      }));
    }
  };

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
            Systems & Case Studies
          </span>
          <h2 className="text-3xl font-extrabold text-slate-700 dark:text-slate-100 tracking-tight mt-1">
            Engineered Projects & Micro-Demos
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
            Real backend case studies with measurable throughput, latency benchmarks, and active health checks.
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          {filterTags.map((t) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => setSelectedTag(t.slug)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedTag === t.slug
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-orange-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
        {loading ? (
          <>
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </>
        ) : projects.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 text-sm">
            No projects found matching the selected tag.
          </div>
        ) : (
          projects.map((p) => {
            const pingInfo = pingStates[p.slug];

            return (
              <div
                key={p.slug}
                className="group relative flex flex-col justify-between bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-orange-900/60 transition-all"
              >
                <div>
                  {/* Top line: Status probe pill & stars */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => handlePing(p.slug)}
                      disabled={pingInfo?.loading}
                      title="Trigger live HTTP GET probe to test demo uptime"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-slate-600 dark:text-slate-300 hover:text-orange-600 cursor-pointer transition-colors"
                    >
                      <RefreshIcon className={`w-3 h-3 ${pingInfo?.loading ? 'animate-spin' : ''}`} />
                      {pingInfo?.result ? (
                        <span>
                          {pingInfo.result.latency_ms ? `${pingInfo.result.latency_ms}ms 🟢` : 'Offline 🔴'}
                        </span>
                      ) : (
                        <span>Probe Live Uptime</span>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>{p.github_stars || 0}★</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-slate-700 dark:text-slate-100 group-hover:text-orange-500 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                    {p.tagline}
                  </p>

                  {/* Measurable Metric Badges */}
                  {p.metrics && p.metrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-5">
                      {p.metrics.slice(0, 3).map((m) => (
                        <div
                          key={m.id || m.label}
                          className="p-2.5 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40"
                        >
                          <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 block truncate">
                            {m.label}
                          </span>
                          <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.tags?.map((t) => (
                      <span
                        key={t.name}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300"
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons: Primary & Secondary */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <PrimaryButton
                    size="sm"
                    onClick={() => setActiveModalProject(p)}
                  >
                    Read Case Study
                  </PrimaryButton>

                  {p.github_url && (
                    <a href={p.github_url} target="_blank" rel="noreferrer">
                      <SecondaryButton size="sm" leftIcon={<GithubIcon className="w-3.5 h-3.5" />}>
                        Source
                      </SecondaryButton>
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Deep-dive Case Study Modal */}
      {activeModalProject && (
        <CaseStudyModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}

export default ProjectsSection;
