import React from 'react';
import { ServerIcon, ActivityIcon, BriefcaseIcon, TerminalIcon, MailIcon } from './icons';

export function MobileBottomNav({ onOpenTerminal, activeSection = 'projects', onNavigate }) {
  const navItems = [
    { id: 'projects', label: 'Projects', icon: ServerIcon },
    { id: 'telemetry', label: 'Telemetry', icon: ActivityIcon },
    { id: 'experience', label: 'History', icon: BriefcaseIcon },
    { id: 'contact', label: 'Contact', icon: MailIcon },
  ];

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-4 inset-x-4 z-40 max-w-sm mx-auto backdrop-blur-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl shadow-2xl p-1.5 flex items-center justify-around transition-all"
    >
      {/* First two nav items */}
      {navItems.slice(0, 2).map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleLinkClick(e, item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-orange-600 dark:text-orange-400 bg-orange-100/90 dark:bg-orange-950/70 font-bold ring-1 ring-orange-400/50 dark:ring-orange-700/60 shadow-xs scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-50/60 dark:hover:bg-orange-950/30 font-medium'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px] mt-1">{item.label}</span>
          </a>
        );
      })}

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

      {/* Remaining two nav items */}
      {navItems.slice(2).map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleLinkClick(e, item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-orange-600 dark:text-orange-400 bg-orange-100/90 dark:bg-orange-950/70 font-bold ring-1 ring-orange-400/50 dark:ring-orange-700/60 shadow-xs scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-50/60 dark:hover:bg-orange-950/30 font-medium'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px] mt-1">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export default MobileBottomNav;
