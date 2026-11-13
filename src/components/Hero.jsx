import React from 'react';
import { PrimaryButton } from './Button';
import { ServerIcon } from './icons';
import { Skeleton } from './Skeleton';

export function Hero({ bio, loading }) {
  const isLoading = loading !== undefined ? loading : !bio;
  const profileName = bio?.full_name || 'Tiku Faith';
  const headline = bio?.headline || 'Senior Full Stack & Systems Engineer';
  const fallbackSummary =
    "Intermediate full-stack software engineer with 2+ years of experience building web and mobile applications in Python, JavaScript and Dart. Shipped TikuShop, an ecommerce platform with online payments, and built an AI-powered file management app during an internship at Digimark Consulting SARL. Completing a Master's in Computer Engineering in 2027 and seeking a remote software engineering role.";
  const summary = bio?.summary || (!isLoading ? fallbackSummary : '');

  const techStack = [
    { name: 'React 19 & Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Django & Python', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis Streams', category: 'Caching & Queues' },
    { name: 'REST & WebSockets', category: 'API Design' },
    { name: 'Docker & DevOps', category: 'DevOps' },
  ];

  return (
    <section id="hero" className="relative overflow-hidden py-16 sm:py-24 scroll-mt-20">
      {/* Decorative ambient background glow with gentle breathing animation */}
      <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl -z-10 pointer-events-none animate-ambient-glow" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Availability Pill with Staggered Entrance */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-700 dark:text-orange-300 text-xs font-semibold shadow-xs hover:scale-105 transition-transform duration-300">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span>Available for Full Stack & Lead Roles</span>
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
          {isLoading ? (
            <div
              className="max-w-2xl mx-auto space-y-2.5 px-2 py-1 flex flex-col items-center"
              aria-label="Loading bio summary"
              role="status"
            >
              <Skeleton className="w-full h-4 sm:h-5 rounded-lg" />
              <Skeleton className="w-11/12 h-4 sm:h-5 rounded-lg" />
              <Skeleton className="w-4/5 h-4 sm:h-5 rounded-lg" />
              <Skeleton className="w-3/5 h-4 sm:h-5 rounded-lg" />
            </div>
          ) : (
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed px-2 animate-fade-in">
              {summary}
            </p>
          )}
        </div>

        {/* Action Buttons with Staggered Entrance and Micro-interactions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 w-full max-w-sm sm:max-w-none mx-auto animate-fade-in-up [animation-delay:300ms]">
          <a href="#projects" className="w-full sm:w-auto">
            <PrimaryButton size="lg" fullWidth leftIcon={<ServerIcon className="w-5 h-5 text-white" />}>
              Explore Full Projects
            </PrimaryButton>
          </a>
        </div>

        {/* Tech Stack Competencies with Hover Lift */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 animate-fade-in-up [animation-delay:450ms]">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-4">
            Full Stack Core Competencies
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
