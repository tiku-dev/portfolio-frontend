import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { InstallAppModal } from './components/InstallAppModal';
import { CaseStudyPage } from './components/CaseStudyPage';
import { TelemetryPage } from './components/TelemetryPage';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { getResumeData } from './api/client';

function parseRoute() {
  const hash = window.location.hash || '';
  const matchCaseStudy = hash.match(/^#\/?case-?study\/([^/?#]+)/i);
  if (matchCaseStudy) {
    return { view: 'case-study', id: decodeURIComponent(matchCaseStudy[1]) };
  }
  const matchTelemetry = hash.match(/^#\/?telemetry(\b|\/|\?|$)/i);
  if (matchTelemetry) {
    return { view: 'telemetry' };
  }
  const matchAdmin = hash.match(/^#\/?(admin|login)(\b|\/|\?|$)/i);
  if (matchAdmin) {
    return { view: 'admin' };
  }
  return { view: 'home' };
}

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [installPromptOpen, setInstallPromptOpen] = useState(false);
  const [profileBio, setProfileBio] = useState(null);
  const [bioLoading, setBioLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('projects');
  const [currentRoute, setCurrentRoute] = useState(parseRoute);

  // Listen to hash changes and browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(parseRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    setBioLoading(true);
    getResumeData()
      .then((data) => {
        if (data?.profile) setProfileBio(data.profile);
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setBioLoading(false), 300);
      });
  }, []);

  // Synchronize initial hash if on home page
  useEffect(() => {
    if (currentRoute.view !== 'home') return;
    const hash = window.location.hash.replace('#', '');
    if (hash && ['projects', 'experience', 'contact'].includes(hash)) {
      requestAnimationFrame(() => setActiveSection(hash));
    }
  }, [currentRoute]);

  const handleNavigateToCaseStudy = (slugOrId) => {
    window.location.hash = `#/case-study/${slugOrId}`;
    setCurrentRoute({ view: 'case-study', id: slugOrId });
  };

  const handleNavigateToTelemetry = () => {
    window.location.hash = '#/telemetry';
    setCurrentRoute({ view: 'telemetry' });
  };

  const handleNavigateToAdmin = () => {
    window.location.hash = '#/admin';
    setCurrentRoute({ view: 'admin' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToPortfolio = () => {
    window.location.hash = '#projects';
    setCurrentRoute({ view: 'home' });
    setTimeout(() => {
      // Immediately force all sections visible so nothing remains blank
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-visible');
      });
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Automatically show PWA install prompt ONLY ONCE to the user via pop up
  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    // Permanent flag in localStorage so the pop up only ever triggers ONCE
    const hasPrompted = localStorage.getItem('pwa_prompt_shown_once');

    // If not already running as installed app and hasn't been prompted before
    if (!isStandalone && !hasPrompted) {
      const timer = setTimeout(() => {
        setInstallPromptOpen(true);
        // Mark as shown so it never auto-pops up again across reloads or future visits
        localStorage.setItem('pwa_prompt_shown_once', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseInstallPrompt = () => {
    setInstallPromptOpen(false);
    localStorage.setItem('pwa_prompt_shown_once', 'true');
  };

  // Smooth scroll handler for both desktop and mobile navigation clicks
  const handleNavigate = (sectionId) => {
    if (sectionId === 'telemetry') {
      handleNavigateToTelemetry();
      return;
    }
    if (sectionId === 'admin' || sectionId === 'login') {
      handleNavigateToAdmin();
      return;
    }
    setActiveSection(sectionId);
    if (currentRoute.view !== 'home') {
      window.location.hash = sectionId === 'hero' ? '' : `#${sectionId}`;
      setCurrentRoute({ view: 'home' });
      setTimeout(() => {
        document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
          el.classList.add('is-visible');
        });
        if (sectionId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const target = document.getElementById(sectionId);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', ' ');
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  // Scrollspy to synchronize active nav links as the user scrolls
  useEffect(() => {
    if (currentRoute.view !== 'home') return;

    const sectionIds = ['hero', 'projects', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Highest intersection ratio wins
          const topVisible = visible.reduce((max, e) =>
            e.intersectionRatio > max.intersectionRatio ? e : max
          );
          if (topVisible.target.id && topVisible.target.id !== 'hero') {
            setActiveSection(topVisible.target.id);
          }
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentRoute.view]);

  // Smooth scroll reveal observer for animated components
  useEffect(() => {
    if (currentRoute.view !== 'home') return;

    // Immediately reveal all sections that are already mounted to guarantee zero blank spaces
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      el.classList.add('is-visible');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '120px 0px 120px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentRoute.view]);

  // If viewing a dedicated Case Study page
  if (currentRoute.view === 'case-study') {
    return (
      <>
        <CaseStudyPage
          projectId={currentRoute.id}
          onBack={handleBackToPortfolio}
          onNavigate={handleNavigate}
          onNavigateToTelemetry={handleNavigateToTelemetry}
          onNavigateToAdmin={handleNavigateToAdmin}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* Interactive Developer Terminal / Console Modal */}
        <TerminalModal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />

        {/* Download / Install App Modal for Mobile & PC */}
        <InstallAppModal
          isOpen={installPromptOpen}
          onClose={handleCloseInstallPrompt}
        />
      </>
    );
  }

  // If viewing dedicated Live Telemetry page
  if (currentRoute.view === 'telemetry') {
    return (
      <>
        <TelemetryPage
          onBack={handleBackToPortfolio}
          onNavigate={handleNavigate}
          onNavigateToAdmin={handleNavigateToAdmin}
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenInstall={() => setInstallPromptOpen(true)}
        />

        {/* Interactive Developer Terminal / Console Modal */}
        <TerminalModal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />

        {/* Download / Install App Modal for Mobile & PC */}
        <InstallAppModal
          isOpen={installPromptOpen}
          onClose={handleCloseInstallPrompt}
        />

        {/* Mobile Floating Bottom Navigation Bar */}
        <MobileBottomNav
          activeSection="projects"
          onNavigate={handleNavigate}
        />
      </>
    );
  }

  // If viewing dedicated Admin Management Dashboard
  if (currentRoute.view === 'admin') {
    return (
      <>
        <AdminDashboardPage
          onBack={handleBackToPortfolio}
          onNavigate={handleNavigate}
          onNavigateToTelemetry={handleNavigateToTelemetry}
          onNavigateToAdmin={handleNavigateToAdmin}
        />

        {/* Interactive Developer Terminal / Console Modal */}
        <TerminalModal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />

        {/* Download / Install App Modal for Mobile & PC */}
        <InstallAppModal
          isOpen={installPromptOpen}
          onClose={handleCloseInstallPrompt}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-orange-500 selection:text-white pb-24 md:pb-0">
      {/* Top Navigation with Mobile Drawer, Live Status & Install App Trigger */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onNavigateToAdmin={handleNavigateToAdmin}
      />

      <main className="flex-1 space-y-4">
        {/* Hero Section */}
        <Hero
          bio={profileBio}
          loading={bioLoading}
        />

        {/* Systems & Case Studies with Live Ping Probe */}
        <ProjectsSection onNavigateToCaseStudy={handleNavigateToCaseStudy} />

        {/* Career Timeline & Experience */}
        <ExperienceSection />

        {/* Contact Pipeline with Rounded Inputs & Honeypot */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenTerminal={() => setTerminalOpen(true)}
        onNavigateToTelemetry={handleNavigateToTelemetry}
        onNavigateToAdmin={handleNavigateToAdmin}
      />

      {/* Interactive Developer Terminal / Console Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Download / Install App Modal for Mobile & PC */}
      <InstallAppModal
        isOpen={installPromptOpen}
        onClose={handleCloseInstallPrompt}
      />

      {/* Mobile Floating Bottom Navigation Bar */}
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
