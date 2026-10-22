import React, { useState, useEffect } from 'react';
import { Button, PrimaryButton } from './Button';
import { getBackendHealth, getResumePdfDownloadUrl } from '../api/client';
import { TerminalIcon, DownloadIcon, MenuIcon, CloseIcon, DeviceMobileIcon } from './icons';

export function Navbar({ onOpenTerminal, activeSection = 'projects', onNavigate, onOpenInstall }) {
  const [health, setHealth] = useState({ status: 'checking', database: 'checking' });
  const [resumeDropdown, setResumeDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'projects', label: 'Case Studies', mobileLabel: 'Case Studies & Projects' },
    { id: 'telemetry', label: 'Live Telemetry', mobileLabel: 'Live Telemetry & Stats' },
    { id: 'experience', label: 'Experience', mobileLabel: 'Career Experience Timeline' },
    { id: 'contact', label: 'Contact', mobileLabel: 'Contact Pipeline' },
  ];

  useEffect(() => {
    getBackendHealth()
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: 'offline', database: 'disconnected' }));
  }, []);

  const isHealthy = health.status === 'healthy';

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    closeMobileMenu();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="flex items-center gap-2 group"
          >
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

        {/* Desktop Navigation Links with Active State */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                  isActive
                    ? 'bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200/90 dark:border-orange-800/80 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:bg-slate-100/70 dark:hover:bg-slate-900/70 border border-transparent'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Install App Prompt Button */}
          {onOpenInstall && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenInstall}
              leftIcon={<DeviceMobileIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />}
            >
              Install App
            </Button>
          )}

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
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 text-xs font-medium animate-slide-down"
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

        {/* Mobile Hamburger & Actions */}
        <div className="flex md:hidden items-center gap-2">
          <PrimaryButton
            size="sm"
            onClick={() => window.open(getResumePdfDownloadUrl('backend'), '_blank')}
            leftIcon={<DownloadIcon className="w-3.5 h-3.5 text-white" />}
          >
            PDF
          </PrimaryButton>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer Menu with Active Highlights */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-slide-down">
          {/* Status badge in mobile menu */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80 text-xs">
            <span className="text-slate-500 dark:text-slate-400">Backend API Status:</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
              <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              {isHealthy ? 'Operational 🟢' : 'Standby 🟡'}
            </span>
          </div>

          <nav className="flex flex-col space-y-1.5 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-orange-500 text-white font-bold shadow-sm shadow-orange-500/25 pl-4'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 pl-3.5 font-medium'
                  }`}
                >
                  <span>{item.mobileLabel}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </a>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            {onOpenInstall && (
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => {
                  closeMobileMenu();
                  onOpenInstall();
                }}
                leftIcon={<DeviceMobileIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />}
              >
                Install App on Device
              </Button>
            )}

            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => {
                closeMobileMenu();
                onOpenTerminal();
              }}
              leftIcon={<TerminalIcon className="w-4 h-4 text-orange-500" />}
            >
              Launch Developer Console
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
