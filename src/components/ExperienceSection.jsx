import React, { useState, useEffect } from 'react';
import { getResumeData, getResumePdfDownloadUrl } from '../api/client';
import { DownloadIcon, RefreshIcon } from './icons';
import { PrimaryButton, SecondaryButton } from './Button';
import { ExperienceSkeleton } from './Skeleton';

export function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResumeData()
      .then((data) => {
        setExperiences(data.experiences || []);
        setEducation(data.education || []);
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setLoading(false), 200);
      });
  }, []);

  return (
    <section id="experience" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
            Career Timeline
          </span>
          <h2 className="text-3xl font-extrabold text-slate-700 dark:text-slate-100 tracking-tight mt-1">
            Work Experience & Systems Track Record
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
            Track record in leading backend initiatives, high-throughput microservices, and database tuning.
          </p>
        </div>

        {/* Dynamic PDF Trigger */}
        <div className="flex items-center gap-3">
          <a
            href={getResumePdfDownloadUrl('backend')}
            target="_blank"
            rel="noreferrer"
          >
            <PrimaryButton size="sm" leftIcon={<DownloadIcon className="w-4 h-4 text-white" />}>
              Download Backend PDF
            </PrimaryButton>
          </a>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="relative pt-10 space-y-8 before:absolute before:inset-0 before:left-3 sm:before:left-5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {loading ? (
          <ExperienceSkeleton />
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* Timeline Indicator Dot */}
              <div className="relative z-10 w-7 h-7 sm:w-10 sm:h-10 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border-2 border-orange-500 flex items-center justify-center text-orange-600 font-bold shrink-0 text-xs shadow-xs">
                λ
              </div>

              {/* Experience Card */}
              <div className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm group-hover:border-orange-300 dark:group-hover:border-orange-900/60 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-lg font-bold text-slate-700 dark:text-slate-100">
                    {exp.role} <span className="text-orange-500 font-semibold">@ {exp.company}</span>
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 self-start sm:self-auto">
                    {exp.start_date} &mdash; {exp.is_current ? 'Present' : exp.end_date}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {exp.summary}
                </p>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2 mb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold">↳</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Technologies */}
                {exp.tags && exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    {exp.tags.map((t) => (
                      <span
                        key={t.name}
                        className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default ExperienceSection;

