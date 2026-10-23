import React, { useState, useEffect } from 'react';
import { getProjectDetail, pingProject } from '../api/client';
import { PrimaryButton, SecondaryButton } from './Button';
import {
  GithubIcon,
  ExternalLinkIcon,
  TerminalIcon,
  RefreshIcon,
  ActivityIcon,
} from './icons';
import logoSvg from '../assets/dev-tiku.svg';

export function CaseStudyPage({ projectId, onBack, onOpenTerminal }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pingLoading, setPingLoading] = useState(false);
  const [pingResult, setPingResult] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLoading(true);
    setError(null);

    getProjectDetail(projectId)
      .then((data) => {
        if (!data) throw new Error('Project details not found.');
        setProject(data);
      })
      .catch((err) => {
        console.error('Failed to load case study:', err);
        setError(err.message || 'Unable to load case study.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId]);

  // Handle escape key to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const handlePing = async () => {
    if (!project) return;
    setPingLoading(true);
    try {
      const res = await pingProject(project.slug || projectId);
      setPingResult(res);
    } catch {
      setPingResult({ status: 'offline', latency_ms: null });
    } finally {
      setPingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex flex-col font-sans">
        {/* Simple Header */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="#projects" onClick={onBack} className="flex items-center">
                <img src={logoSvg} alt="tiku.dev logo" className="h-8 w-auto rounded-xl" />
              </a>
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors cursor-pointer"
              >
                ← Back to Portfolio
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-44 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl mt-8" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex flex-col font-sans">
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="#projects" onClick={onBack} className="flex items-center">
                <img src={logoSvg} alt="tiku.dev logo" className="h-8 w-auto rounded-xl" />
              </a>
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors cursor-pointer"
              >
                ← Back to Portfolio
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-xl mx-auto px-4 py-24 text-center space-y-4 flex-1">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-3xl mx-auto flex items-center justify-center text-2xl font-bold">
            !
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Case Study Not Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The requested project identifier "{projectId}" could not be retrieved.
          </p>
          <div className="pt-4">
            <PrimaryButton onClick={onBack}>
              Return to All Projects
            </PrimaryButton>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-orange-500 selection:text-white">
      {/* Top Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-slate-950/95 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Back to Projects Button */}
          <div className="flex items-center gap-3">
            <a
              href="#projects"
              onClick={onBack}
              className="flex items-center hover:opacity-90 transition-opacity"
              title="Return to Main Portfolio"
            >
              <img src={logoSvg} alt="tiku.dev logo" className="h-8 sm:h-9 w-auto rounded-xl" />
            </a>

            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-400 hover:text-orange-600 transition-all cursor-pointer group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span className="hidden sm:inline">Back to Projects</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>

          {/* Right: Repository & Live Demo Actions */}
          <div className="flex items-center gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-400 hover:text-orange-600 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}

            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-xs"
              >
                <ExternalLinkIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Live Deployment</span>
                <span className="sm:hidden">Live</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Case Study Article */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 flex-1 w-full">
        {/* Breadcrumb & Top Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <button
              type="button"
              onClick={onBack}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={onBack}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Case Studies
            </button>
            <span>/</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {project.title}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/60">
            Engineering Case Study & Architecture Review
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl font-medium">
            {project.tagline}
          </p>

          {/* Quick Metrics Badge Ribbon */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePing}
              disabled={pingLoading}
              title="Ping live endpoint to verify uptime & latency"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-400 text-slate-700 dark:text-slate-300 hover:text-orange-600 transition-all cursor-pointer shadow-xs"
            >
              <RefreshIcon className={`w-3.5 h-3.5 text-orange-500 ${pingLoading ? 'animate-spin' : ''}`} />
              <span>
                {pingResult
                  ? pingResult.latency_ms
                    ? `Operational (${pingResult.latency_ms}ms) 🟢`
                    : 'Service Offline 🔴'
                  : `Health: ${project.health_status || 'healthy'} 🟢`}
              </span>
            </button>

            {project.github_stars !== undefined && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shadow-xs">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>{project.github_stars} Stars on GitHub</span>
              </span>
            )}

            {project.tags &&
              project.tags.map((t) => (
                <span
                  key={t.slug || t.name}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
                >
                  {t.name}
                </span>
              ))}
          </div>
        </div>

        {/* Section 1: The Problem & Constraints */}
        <section className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              The Engineering Challenge & System Constraints
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base bg-slate-50 dark:bg-slate-950/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/60">
            {project.problem_statement}
          </p>
        </section>

        {/* Section 2: Architecture & Technical Decisions */}
        <section className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Architecture Overview & Design Decisions
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            {project.architecture_overview}
          </p>
        </section>

        {/* Section 3: Key Technical Milestones */}
        {project.key_achievements && project.key_achievements.length > 0 && (
          <section className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Key Technical Milestones & Wins
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 pt-2">
              {project.key_achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/60"
                >
                  <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Measurable Production Impact */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Measurable Production Metrics
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {project.metrics.map((m) => (
                <div
                  key={m.id || m.label}
                  className="p-5 rounded-2xl bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200/70 dark:border-orange-800/50 space-y-1"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400">
                    {m.label}
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                    {m.value}
                  </div>
                  {m.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug pt-1">
                      {m.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Navigation & CTA Bar */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <SecondaryButton size="md" onClick={onBack} leftIcon={<span>←</span>}>
            Back to All Projects
          </SecondaryButton>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <SecondaryButton
                  size="md"
                  fullWidth
                  leftIcon={<GithubIcon className="w-4 h-4" />}
                >
                  View Code
                </SecondaryButton>
              </a>
            )}

            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <PrimaryButton
                  size="md"
                  fullWidth
                  leftIcon={<ExternalLinkIcon className="w-4 h-4 text-white" />}
                >
                  Live Deployment
                </PrimaryButton>
              </a>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} tiku.dev &mdash; All case studies & systems documentation.</p>
          <button
            type="button"
            onClick={onBack}
            className="text-orange-500 hover:underline cursor-pointer"
          >
            ← Return to Main Portfolio
          </button>
        </div>
      </footer>
    </div>
  );
}

export default CaseStudyPage;

