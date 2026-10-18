import React from 'react';
import { CloseIcon, GithubIcon, ExternalLinkIcon } from './icons';
import { PrimaryButton, SecondaryButton } from './Button';

export function CaseStudyModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 mb-2">
              Deep-Dive Engineering Case Study
            </div>
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-100">
              {project.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Problem Statement */}
        <div className="space-y-2">
          <h3 className="text-sm uppercase tracking-wider font-bold text-orange-500">
            The Problem & System Constraints
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60">
            {project.problem_statement}
          </p>
        </div>

        {/* 2. Architecture & Design Decisions */}
        <div className="space-y-2">
          <h3 className="text-sm uppercase tracking-wider font-bold text-orange-500">
            Architecture & Design Decisions
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.architecture_overview}
          </p>
        </div>

        {/* 3. Key Technical Achievements */}
        {project.key_achievements && project.key_achievements.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm uppercase tracking-wider font-bold text-orange-500">
              Key Technical Milestones
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
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
          <div className="space-y-2">
            <h3 className="text-sm uppercase tracking-wider font-bold text-orange-500">
              Measurable Production Impact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.id || m.label}
                  className="p-3.5 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-800/50"
                >
                  <span className="text-xs text-orange-700 dark:text-orange-400 font-semibold">
                    {m.label}
                  </span>
                  <div className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                    {m.value}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                    {m.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository ({project.github_stars || 0}★)</span>
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <ExternalLinkIcon className="w-4 h-4" />
                <span>Live Deployment</span>
              </a>
            )}
          </div>

          <SecondaryButton size="sm" onClick={onClose}>
            Close Case Study
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyModal;

