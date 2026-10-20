import React from 'react';
import { PrimaryButton, SecondaryButton } from './Button';
import { TerminalIcon, ServerIcon } from './icons';

export function Hero({ onOpenTerminal, bio }) {
  const profileName = bio?.full_name || 'Alex Mercer';
  const headline = bio?.headline || 'Senior Backend & Distributed Systems Engineer';
  const summary =
    bio?.summary ||
    'Architecting high-throughput event pipelines, resilient microservices, and database-optimized APIs with Django, PostgreSQL, Redis, and Celery.';

  const techStack = [
    { name: 'Django 5.x', category: 'Framework' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis Streams', category: 'Caching & Queues' },
    { name: 'Celery Workers', category: 'Async Tasks' },
    { name: 'Docker & K8s', category: 'DevOps' },
    { name: 'Django REST / OpenAPI', category: 'API Design' },
  ];

  return (
    <section id="hero" className="relative overflow-hidden py-16 sm:py-24">
      {/* Decorative ambient background glow with gentle breathing animation */}
      <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl -z-10 pointer-events-none animate-ambient-glow" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Availability Pill with Staggered Entrance */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-700 dark:text-orange-300 text-xs font-semibold shadow-xs hover:scale-105 transition-transform duration-300">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span>Available for Senior Backend & Staff Roles</span>
          </div>
        </div>

        {/* Main Title & Headline with Staggered Fade In */}
        <div className="space-y-4 animate-fade-in-up [animation-delay:150ms]">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-700 dark:text-slate-100 leading-tight">
            Hi, I'm <span className="text-orange-500">{profileName}</span>.
            <br />
            <span className="text-xl sm:text-3xl md:text-4xl font-bold text-slate-600 dark:text-slate-300">
              {headline}
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed px-2">
            {summary}
          </p>
        </div>

        {/* Action Buttons with Staggered Entrance and Micro-interactions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 w-full max-w-sm sm:max-w-none mx-auto animate-fade-in-up [animation-delay:300ms]">
          <a href="#projects" className="w-full sm:w-auto">
            <PrimaryButton size="lg" fullWidth leftIcon={<ServerIcon className="w-5 h-5 text-white" />}>
              Explore Case Studies
            </PrimaryButton>
          </a>

          <SecondaryButton
            size="lg"
            fullWidth
            onClick={onOpenTerminal}
            leftIcon={<TerminalIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
          >
            Launch CLI Terminal
          </SecondaryButton>
        </div>

        {/* Tech Stack Competencies with Hover Lift */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 animate-fade-in-up [animation-delay:450ms]">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-4">
            Production Core Competencies
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs hover:border-orange-400 hover:text-orange-600 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 cursor-default"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
