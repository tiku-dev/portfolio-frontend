import React, { useState, useEffect } from 'react';
import { CloseIcon, DownloadIcon, CheckCircleIcon, ShareIcon } from './icons';
import { PrimaryButton, SecondaryButton } from './Button';
import logoSvg from '../assets/dev-tiku.svg';

export function InstallAppModal({ isOpen, onClose }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Check if already running in standalone PWA mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS devices (Safari does not support beforeinstallprompt)
    const isIosDevice =
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
      !window.MSStream;

    setIsIOS(isIosDevice);

    // Capture standard PWA install prompt on Android, Chrome, Edge, Windows, Mac
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallSuccess(true);
      setDeferredPrompt(null);
      setTimeout(() => {
        onClose();
      }, 2500);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [onClose]);

  if (!isOpen || isInstalled) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallSuccess(true);
        setTimeout(() => onClose(), 2000);
      }
      setDeferredPrompt(null);
    } else if (!isIOS) {
      // In desktop Chrome/Edge without captured event, trigger alert or guide
      alert(
        "To install on your PC/Mac: Click the install icon (⊕ or computer display) located in the right side of your browser's address bar!"
      );
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close install prompt"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Header with App Icon */}
        <div className="flex items-center gap-4">
          <img
            src="/pwa-icon.svg"
            alt="tiku.dev app icon"
            className="w-14 h-14 rounded-2xl shadow-md shrink-0 object-contain"
          />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-500">
              Download Web App
            </span>
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-100 leading-tight">
              Install tiku.dev
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Available for PC & Mobile
            </p>
          </div>
        </div>

        {/* Success message when installed */}
        {installSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-3">
            <CheckCircleIcon className="w-6 h-6 text-emerald-500 shrink-0" />
            <div className="text-sm font-medium">
              FullStack.io has been installed! You can now launch it directly from your device.
            </div>
          </div>
        ) : (
          <>
            {/* Feature Perks */}
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center font-bold text-[11px] shrink-0">
                  ⚡
                </span>
                <span>Fast zero-latency loading with offline caching</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center font-bold text-[11px] shrink-0">
                  🖥️
                </span>
                <span>Native app window on PC & home-screen app on Mobile</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center font-bold text-[11px] shrink-0">
                  📟
                </span>
                <span>Full-screen terminal console without browser address bars</span>
              </div>
            </div>

            {/* iOS Specific Instructions */}
            {isIOS ? (
              <div className="p-3.5 rounded-2xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-900/40 space-y-2 text-xs">
                <div className="font-semibold text-orange-700 dark:text-orange-300 flex items-center gap-1.5">
                  <ShareIcon className="w-4 h-4 text-orange-500" />
                  <span>How to install on iPhone & iPad:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
                  <li>
                    Tap the <strong>Share</strong> button <span className="text-orange-500 font-bold">⎋</span> at the bottom of Safari
                  </li>
                  <li>
                    Scroll down and tap <strong>"Add to Home Screen"</strong> <span className="text-orange-500 font-bold">⊞</span>
                  </li>
                  <li>
                    Tap <strong>"Add"</strong> in the top-right corner
                  </li>
                </ol>
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
              {!isIOS ? (
                <PrimaryButton
                  size="md"
                  fullWidth
                  onClick={handleInstallClick}
                  leftIcon={<DownloadIcon className="w-4 h-4 text-white" />}
                >
                  Install App Now
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  size="md"
                  fullWidth
                  onClick={onClose}
                >
                  Got It!
                </PrimaryButton>
              )}

              <SecondaryButton
                size="md"
                fullWidth
                onClick={onClose}
              >
                Maybe Later
              </SecondaryButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InstallAppModal;

