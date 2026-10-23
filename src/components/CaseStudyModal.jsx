import React, { useEffect } from 'react';
import { CloseIcon, GithubIcon, ExternalLinkIcon } from './icons';
import { PrimaryButton, SecondaryButton } from './Button';

export function CaseStudyModal({ project, onClose }) {
  if (!project) return null;

  // Lock body scroll while modal is open to prevent background scrolling on mobile
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 bg-slate-950/75 backdrop-blur-none sm:backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl h-[calc(100dvh-1.75rem)] sm:h-auto sm:max-h-[88vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-7 animate-modal-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (pinned at top) */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 mb-1.5">
              Deep-Dive Engineering Case Study
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-100 leading-snug">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {project.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close case study"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overscroll-contain py-3.5 space-y-4 pr-1">
          {/* 1. Problem Statement */}
          <div className="space-y-1.5">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider font-bold text-orange-500">
              The Problem & System Constraints
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/60">
              {project.problem_statement}
            </p>
          </div>

          {/* 2. Architecture & Design Decisions */}
          <div className="space-y-1.5">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider font-bold text-orange-500">
              Architecture & Design Decisions
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.architecture_overview}
            </p>
          </div>

          {/* 3. Key Technical Achievements */}
          {project.key_achievements && project.key_achievements.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-xs sm:text-sm uppercase tracking-wider font-bold text-orange-500">
                Key Technical Milestones
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {project.key_achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-orange-500 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 4. Measurable Outcomes */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-xs sm:text-sm uppercase tracking-wider font-bold text-orange-500">
                Measurable Production Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {project.metrics.map((m) => (
                  <div
                    key={m.id || m.label}
                    className="p-3 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-800/50"
                  >
                    <span className="text-[11px] text-orange-700 dark:text-orange-400 font-semibold">
                      {m.label}
                    </span>
                    <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                      {m.value}
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                      {m.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions (pinned at bottom) */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub ({project.github_stars || 0}★)</span>
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <ExternalLinkIcon className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <SecondaryButton size="sm" onClick={onClose}>
            Close
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyModal;

