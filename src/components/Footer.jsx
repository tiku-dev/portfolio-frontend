import React from 'react';
import { GithubIcon, TerminalIcon } from './icons';

export function Footer({ onOpenTerminal }) {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
            λ
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Senior Portfolio Backend & Frontend
            </p>
            <p className="text-xs text-slate-400">
              Powered by Django REST Framework, PostgreSQL, Redis & React.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <button
            type="button"
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <TerminalIcon className="w-4 h-4 text-orange-500" />
            <span>Developer Console</span>
          </button>

          <a
            href="https://github.com/octocat"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-orange-500 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Profile</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

