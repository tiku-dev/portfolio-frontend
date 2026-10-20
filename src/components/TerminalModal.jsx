import React, { useState, useEffect, useRef } from 'react';
import { runTerminalCommand } from '../api/client';
import { CloseIcon, TerminalIcon } from './icons';

export function TerminalModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: "⚡ Connected to Portfolio CLI API v1.0.0. Type 'help' to inspect available system commands.",
    },
  ]);
  const [command, setCommand] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleExecute = async (e) => {
    e.preventDefault();
    const trimmed = command.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      setCommand('');
      return;
    }

    const userEntry = { type: 'input', text: trimmed };
    setHistory((prev) => [...prev, userEntry]);
    setCommand('');
    setLoading(true);

    try {
      const res = await runTerminalCommand(trimmed);
      setHistory((prev) => [...prev, { type: 'output', text: res.output }]);
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        { type: 'error', text: `Command failed: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickCommand = (cmd) => {
    setCommand(cmd);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl h-[85vh] sm:h-[560px] flex flex-col bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-mono text-sm animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-400 font-sans ml-2 font-medium">
              guest@portfolio-api:~$ (Simulated DRF Terminal)
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Command Pills */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 overflow-x-auto text-[11px] text-slate-400 font-sans">
          <span className="shrink-0 text-slate-500">Quick run:</span>
          {['help', 'whoami', 'skills --tree', 'projects', 'cat experience', 'uptime', 'clear'].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleQuickCommand(cmd)}
              className="shrink-0 px-2.5 py-0.5 rounded-md bg-slate-800 hover:bg-orange-500/20 hover:text-orange-400 border border-slate-700/80 text-slate-300 transition-colors cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Console Log Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
          {history.map((item, idx) => {
            if (item.type === 'input') {
              return (
                <div key={idx} className="flex items-start gap-2 text-orange-400">
                  <span className="text-emerald-400 font-bold">➜</span>
                  <span className="text-slate-500 font-bold">~</span>
                  <span className="text-slate-100">{item.text}</span>
                </div>
              );
            }
            if (item.type === 'error') {
              return (
                <div key={idx} className="text-rose-400 whitespace-pre-wrap pl-5">
                  {item.text}
                </div>
              );
            }
            return (
              <div key={idx} className="text-slate-300 whitespace-pre-wrap pl-5">
                {item.text}
              </div>
            );
          })}
          {loading && (
            <div className="text-orange-400 animate-pulse pl-5">
              Executing API command...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleExecute} className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-bold">➜</span>
          <span className="text-slate-500 font-bold">~</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type a command (e.g. skills --tree, whoami, help)..."
            className="flex-1 bg-transparent text-slate-100 text-xs focus:outline-none placeholder:text-slate-600"
          />
        </form>
      </div>
    </div>
  );
}

export default TerminalModal;

