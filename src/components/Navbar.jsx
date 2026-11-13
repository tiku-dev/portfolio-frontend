import { useState, useEffect } from 'react';
import { Button, PrimaryButton } from './Button';
import { getBackendHealth, getResumePdfDownloadUrl, getStoredUser, getCurrentUser } from '../api/client';
import { TerminalIcon, DownloadIcon, MenuIcon, CloseIcon, DeviceMobileIcon, ActivityIcon, LockIcon } from './icons';
import logoSvg from '../assets/dev-tiku.svg';

export function Navbar({
  onOpenTerminal,
  activeSection = 'projects',
  onNavigate,
  onOpenInstall,
  onNavigateToTelemetry,
  onNavigateToAdmin,
}) {
  const [health, setHealth] = useState({ status: 'checking', database: 'checking' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(getStoredUser());

  const navItems = [
    { id: 'projects', label: 'Case Studies', mobileLabel: 'Full Stack Case Studies' },
    { id: 'experience', label: 'Experience', mobileLabel: 'Career & Track Record' },
    { id: 'contact', label: 'Contact', mobileLabel: 'Contact Pipeline' },
  ];

  useEffect(() => {
    getBackendHealth()
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: 'offline', database: 'disconnected' }));

    getCurrentUser()
      .then((u) => {
        if (u) setCurrentUser(u);
      })
      .catch(() => {});
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
            className="flex items-center group py-1"
            title="tiku dev - Full Stack Engineer"
          >
            <img
              src={logoSvg}
              alt="tiku dev logo"
              className="h-8 sm:h-9 w-auto rounded-xl shadow-xs group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Live Full Stack Indicator Badge - Links to Telemetry */}
          <button
            type="button"
            onClick={() => {
              if (onNavigateToTelemetry) onNavigateToTelemetry();
              else window.location.hash = '#/telemetry';
            }}
            title={`Full stack status: ${health.status} (DB: ${health.database}) — Click to view Telemetry`}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-orange-300 dark:hover:border-orange-800/80 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span>{isHealthy ? 'Full Stack API Online' : 'API Standby'}</span>
          </button>
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
          {/* Admin Management / Login Trigger */}
          <button
            type="button"
            onClick={() => {
              if (onNavigateToAdmin) onNavigateToAdmin();
              else window.location.hash = '#/admin';
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentUser
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/80 dark:border-slate-800'
            }`}
            title={currentUser ? `Admin Portal (${currentUser.email || currentUser.username})` : 'Sign in to manage projects & portfolio'}
          >
            {currentUser ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ) : (
              <LockIcon className="w-3.5 h-3.5 text-orange-500" />
            )}
            <span>{currentUser ? `Admin @${(currentUser.username || currentUser.email.split('@')[0])}` : 'Admin Login'}</span>
          </button>

          {/* Download App Trigger */}
          {onOpenInstall && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenInstall}
              leftIcon={<DeviceMobileIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />}
              title="Download & Install tiku dev App"
            >
              Download App
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

          {/* Direct Resume PDF Download */}
          <PrimaryButton
            as="a"
            href={getResumePdfDownloadUrl()}
            target="_blank"
            rel="noreferrer"
            download="Tiku-Faith-Software-Engineer-Resume.pdf"
            title="Download Tiku Faith's Resume PDF"
            size="sm"
            leftIcon={<DownloadIcon className="w-4 h-4 text-white" />}
          >
            Resume PDF
          </PrimaryButton>
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Admin Icon Button */}
          <button
            type="button"
            onClick={() => {
              if (onNavigateToAdmin) onNavigateToAdmin();
              else window.location.hash = '#/admin';
            }}
            className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
              currentUser
                ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
            title="Admin Login & Management"
          >
            <LockIcon className="w-4 h-4 text-orange-500" />
          </button>

          {onOpenInstall && (
            <button
              type="button"
              onClick={onOpenInstall}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-orange-50 dark:bg-orange-950/60 border border-orange-200/90 dark:border-orange-800/80 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/60 transition-colors"
              title="Download & Install tiku dev App"
            >
              <DeviceMobileIcon className="w-3.5 h-3.5" />
              <span>App</span>
            </button>
          )}

          <PrimaryButton
            as="a"
            href={getResumePdfDownloadUrl()}
            target="_blank"
            rel="noreferrer"
            download="Tiku-Faith-Software-Engineer-Resume.pdf"
            size="sm"
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
          <button
            type="button"
            onClick={() => {
              closeMobileMenu();
              if (onNavigateToTelemetry) onNavigateToTelemetry();
              else window.location.hash = '#/telemetry';
            }}
            className="w-full flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80 text-xs hover:text-orange-500 transition-colors cursor-pointer"
          >
            <span className="text-slate-500 dark:text-slate-400">Full Stack System Status:</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
              <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              {isHealthy ? 'Operational 🟢' : 'Standby 🟡'}
            </span>
          </button>

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

            {/* Live Telemetry Mobile Link */}
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                if (onNavigateToTelemetry) onNavigateToTelemetry();
                else window.location.hash = '#/telemetry';
              }}
              className="px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 pl-3.5 font-medium cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ActivityIcon className="w-4 h-4 text-orange-500" />
                <span>Live System Telemetry</span>
              </span>
              <span className="text-[10px] font-bold text-orange-500 uppercase">Live</span>
            </button>

            {/* Admin Management Mobile Link */}
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                if (onNavigateToAdmin) onNavigateToAdmin();
                else window.location.hash = '#/admin';
              }}
              className="px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 pl-3.5 font-medium cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <LockIcon className="w-4 h-4 text-orange-500" />
                <span>{currentUser ? `Admin Portal (@${(currentUser.username || currentUser.email.split('@')[0])})` : 'Admin Sign In'}</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase">{currentUser ? 'Active' : 'Auth'}</span>
            </button>
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
