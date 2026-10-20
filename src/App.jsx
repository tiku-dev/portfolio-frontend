import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { TelemetryRibbon } from './components/TelemetryRibbon';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { getResumeData } from './api/client';

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [profileBio, setProfileBio] = useState(null);
  const [activeSection, setActiveSection] = useState('projects');

  useEffect(() => {
    getResumeData()
      .then((data) => {
        if (data?.profile) setProfileBio(data.profile);
      })
      .catch(() => {});
  }, []);

  // Synchronize initial hash if present
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['projects', 'telemetry', 'experience', 'contact'].includes(hash)) {
      setActiveSection(hash);
    }
  }, []);

  // Smooth scroll handler for both desktop and mobile navigation clicks
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
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
    const sectionIds = ['hero', 'projects', 'telemetry', 'experience', 'contact'];
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
  }, []);

  // Smooth scroll reveal observer for animated components
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-orange-500 selection:text-white pb-24 md:pb-0">
      {/* Top Navigation with Mobile Drawer & Live Status */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      <main className="flex-1 space-y-4">
        {/* Hero Section */}
        <Hero
          bio={profileBio}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* Live Backend Telemetry Stats */}
        <TelemetryRibbon />

        {/* Systems & Case Studies with Live Ping Probe */}
        <ProjectsSection />

        {/* Career Timeline & Experience */}
        <ExperienceSection />

        {/* Contact Pipeline with Rounded Inputs & Honeypot */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive Developer Terminal / Console Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Mobile Floating Bottom Navigation Bar */}
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTerminal={() => setTerminalOpen(true)}
      />
    </div>
  );
}

export default App;
