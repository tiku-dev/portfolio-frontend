import { GithubIcon, LinkedinIcon, TerminalIcon, WhatsappIcon, ActivityIcon, LockIcon } from './icons';
import logoSvg from '../assets/dev-tiku.svg';

export function Footer({ onOpenTerminal, onNavigateToTelemetry, onNavigateToAdmin }) {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src={logoSvg}
            alt="tiku dev logo"
            className="h-8 w-auto rounded-xl shadow-xs"
          />
          <div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              tiku dev &mdash; Full Stack Systems & Product Engineering
            </p>
            <p className="text-xs text-slate-400">
              Architected with React 19, TypeScript, Tailwind CSS, Django REST, PostgreSQL & Redis.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <a
            href="#/admin"
            onClick={(e) => {
              if (onNavigateToAdmin) {
                e.preventDefault();
                onNavigateToAdmin();
              }
            }}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-orange-500 font-semibold transition-colors cursor-pointer"
            title="Admin Login & Management Portal"
          >
            <LockIcon className="w-3.5 h-3.5 text-orange-500" />
            <span>Admin Portal</span>
          </a>

          <a
            href="#/telemetry"
            onClick={(e) => {
              if (onNavigateToTelemetry) {
                e.preventDefault();
                onNavigateToTelemetry();
              }
            }}
            className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 hover:text-orange-500 font-semibold transition-colors cursor-pointer"
            title="View Live System Telemetry & Infrastructure"
          >
            <ActivityIcon className="w-4 h-4 text-orange-500" />
            <span>Live Telemetry</span>
          </a>

          <button
            type="button"
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <TerminalIcon className="w-4 h-4 text-orange-500" />
            <span>Developer Console</span>
          </button>

          <a
            href="https://github.com/tiku-dev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-orange-500 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/tiku-faith-2305103a3"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-orange-500 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://wa.me/237671486996"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
            title="Chat on WhatsApp (+237 671 486 996)"
          >
            <WhatsappIcon className="w-4 h-4 text-emerald-500" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

