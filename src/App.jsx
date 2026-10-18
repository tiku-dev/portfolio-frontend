import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
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

  useEffect(() => {
    getResumeData()
      .then((data) => {
        if (data?.profile) setProfileBio(data.profile);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-orange-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

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
    </div>
  );
}

export default App;
