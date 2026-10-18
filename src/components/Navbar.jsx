import React, { useState, useEffect } from 'react';
import { Button, PrimaryButton } from './Button';
import { getBackendHealth, getResumePdfDownloadUrl } from '../api/client';
import { TerminalIcon, DownloadIcon } from './icons';

export function Navbar({ onOpenTerminal }) {
  const [health, setHealth] = useState({ status: 'checking', database: 'checking' });
  const [resumeDropdown, setResumeDropdown] = useState(false);

  useEffect(() => {
    getBackendHealth()
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: 'offline', database: 'disconnected' }));
  }, []);

  const isHealthy = health.status === 'healthy';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-2xl bg-orange-500 text-white font-extrabold flex items-center justify-center text-lg shadow-sm shadow-orange-500/20 group-hover:scale-105 transition-transform">
              λ
            </div>
            <span className="font-bold text-lg text-slate-800 dark:text-slate-100 tracking-tight">
              Backend<span className="text-orange-500">.io</span>
            </span>
          </a>

          {/* Live Backend Indicator Badge */}
          <div
            title={`Backend status: ${health.status} (DB: ${health.database})`}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span>{isHealthy ? 'API Online' : 'API Standby'}</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#projects" className="hover:text-orange-500 transition-colors">
            Case Studies
          </a>
          <a href="#telemetry" className="hover:text-orange-500 transition-colors">
            Live Telemetry
          </a>
          <a href="#experience" className="hover:text-orange-500 transition-colors">
            Experience
          </a>
          <a href="#contact" className="hover:text-orange-500 transition-colors">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Terminal Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenTerminal}
            leftIcon={<TerminalIcon className="w-4 h-4 text-orange-500" />}
          >
            CLI Console
          </Button>

          {/* Dynamic Resume PDF Download Dropdown */}
          <div className="relative">
            <PrimaryButton
              size="sm"
              onClick={() => setResumeDropdown(!resumeDropdown)}
              leftIcon={<DownloadIcon className="w-4 h-4 text-white" />}
            >
              Resume PDF
            </PrimaryButton>

            {resumeDropdown && (
              <div
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 text-xs font-medium"
                onMouseLeave={() => setResumeDropdown(false)}
              >
                <div className="px-3 py-1.5 text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
                  Generate Tailored PDF
                </div>
                <a
                  href={getResumePdfDownloadUrl('backend')}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600"
                >
                  ⚡ Backend Focus PDF
                </a>
                <a
                  href={getResumePdfDownloadUrl('devops')}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600"
                >
                  ☁️ DevOps & Cloud PDF
                </a>
                <a
                  href={getResumePdfDownloadUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600"
                >
                  📄 Full Comprehensive CV
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
