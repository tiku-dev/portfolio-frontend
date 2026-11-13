import React, { useState } from 'react';
import { InputField, TextareaField } from './Form';
import { PrimaryButton, SecondaryButton } from './Button';
import { sendContactMessage } from '../api/client';
import { CheckCircleIcon, WhatsappIcon, MailIcon } from './icons';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website_url_hp: '', // Hidden honeypot field
  });
  const [submitting, setSubmitting] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResponseStatus(null);

    try {
      const res = await sendContactMessage(formData);
      setResponseStatus({
        type: 'success',
        message: res.message || 'Thank you! Your message was delivered successfully.',
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        website_url_hp: '',
      });
    } catch (err) {
      setResponseStatus({
        type: 'error',
        message: err.message || 'Failed to deliver transmission. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      website_url_hp: '',
    });
    setResponseStatus(null);
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 reveal-on-scroll scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
          Get In Touch
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Start a Technical Conversation
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Have an engineering challenge, full stack product build, or role to discuss? Reach out through your preferred channel.
        </p>
      </div>

      {/* 2-Column Split: WhatsApp Quick Chat (Left) vs. Manual Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT COLUMN: WhatsApp Quick Chat */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-950 border border-emerald-300/80 dark:border-emerald-800/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs space-y-6">
          <div className="space-y-5">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Fastest Response Option</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
                <WhatsappIcon className="w-7 h-7 text-emerald-500 shrink-0" />
                <span>Chat on WhatsApp</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Prefer immediate messaging over email forms? Skip the wait and start a real-time conversation directly on WhatsApp.
              </p>
            </div>

            {/* Benefit Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-emerald-200/60 dark:border-emerald-900/40 shadow-2xs">
                <div className="w-6 h-6 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ⚡
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Rapid Turnaround</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Direct notifications to mobile for prompt replies.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-emerald-200/60 dark:border-emerald-900/40 shadow-2xs">
                <div className="w-6 h-6 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  💬
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Direct Engineering Line</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Discuss architecture, tech stacks, or project scopes directly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA & Direct Details */}
          <div className="space-y-4 pt-4 border-t border-emerald-200/60 dark:border-emerald-900/50">
            <a
              href="https://wa.me/237671486996?text=Hi%20Tiku,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
            >
              <WhatsappIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Chat Quickly on WhatsApp</span>
            </a>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 px-1">
              <span className="font-medium">+237 671 486 996</span>
              <a
                href="mailto:tikufaith10@gmail.com"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
              >
                <MailIcon className="w-3.5 h-3.5" />
                <span>tikufaith10@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Manual Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Or Send an Email Transmission
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              Fill Form Manually
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Provide project details, timelines, and requirements. Submissions are delivered to my inbox and recorded in the system.
            </p>
          </div>

          {/* Response Alert */}
          {responseStatus && (
            <div
              className={`p-4 rounded-2xl text-sm flex items-start gap-3 ${
                responseStatus.type === 'success'
                  ? 'bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
              }`}
            >
              {responseStatus.type === 'success' && <CheckCircleIcon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />}
              <div>
                <p className="font-semibold">{responseStatus.type === 'success' ? 'Transmission Successful' : 'Notice'}</p>
                <p className="text-xs mt-0.5">{responseStatus.message}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field for bot mitigation */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website_url_hp"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website_url_hp}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Your Full Name"
                name="name"
                placeholder="e.g. Sarah Jenkins"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <InputField
                label="Work Email Address"
                name="email"
                type="email"
                placeholder="sarah@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <InputField
              label="Subject"
              name="subject"
              placeholder="e.g. Full Stack role / React & Django architecture"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <TextareaField
              label="Project or Role Details"
              name="message"
              placeholder="Share details regarding your tech stack, system requirements, or inquiry..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <PrimaryButton
                type="submit"
                size="md"
                isLoading={submitting}
              >
                Submit Message
              </PrimaryButton>

              <SecondaryButton
                type="button"
                size="md"
                onClick={handleReset}
                disabled={submitting}
              >
                Reset Form
              </SecondaryButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

