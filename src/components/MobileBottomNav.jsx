import React from 'react';
import { ServerIcon, ActivityIcon, BriefcaseIcon, TerminalIcon, MailIcon } from './icons';

export function MobileBottomNav({ onOpenTerminal }) {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-4 inset-x-4 z-40 max-w-sm mx-auto backdrop-blur-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl shadow-2xl p-1.5 flex items-center justify-around transition-all"
    >
      <a
        href="#projects"
        className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-50/60 dark:hover:bg-orange-950/30 transition-colors"
      >
        <ServerIcon className="w-4 h-4" />
        <span className="text-[10px] font-semibold mt-1">Projects</span>
      </a>

      <a
        href="#telemetry"
        className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-50/60 dark:hover:bg-orange-950/30 transition-colors"
      >
        <ActivityIcon className="w-4 h-4" />
        <span className="text-[10px] font-semibold mt-1">Telemetry</span>
      </a>

      {/* Center CLI Quick Action Button */}
      <button
        type="button"
        onClick={onOpenTerminal}
        className="flex flex-col items-center justify-center p-2 rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/25 active:scale-95 transition-transform cursor-pointer"
        title="Open Developer Console"
      >
        <TerminalIcon className="w-4 h-4" />
        <span className="text-[9px] font-bold mt-0.5">CLI</span>
      </button>

      <a
        href="#experience"
        className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-50/60 dark:hover:bg-orange-950/30 transition-colors"
      >
        <BriefcaseIcon className="w-4 h-4" />
        <span className="text-[10px] font-semibold mt-1">History</span>
      </a>

      <a
        href="#contact"
        className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-50/60 dark:hover:bg-orange-950/30 transition-colors"
      >
        <MailIcon className="w-4 h-4" />
        <span className="text-[10px] font-semibold mt-1">Contact</span>
      </a>
    </nav>
  );
}

export default MobileBottomNav;

