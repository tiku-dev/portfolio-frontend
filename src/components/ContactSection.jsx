import React, { useState } from 'react';
import { InputField, TextareaField } from './Form';
import { PrimaryButton, SecondaryButton } from './Button';
import { sendContactMessage } from '../api/client';
import { CheckCircleIcon } from './icons';

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
    <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 reveal-on-scroll">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
            Get In Touch
          </span>
          <h2 className="text-3xl font-extrabold text-slate-700 dark:text-slate-100 tracking-tight">
            Start a Technical Conversation
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Have an engineering challenge, full stack product build, or senior role to discuss?
          </p>
        </div>

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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot field for bot mitigation (visually hidden from human visitors) */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            placeholder="e.g. Senior Full Stack role / React & Django architecture"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <TextareaField
            label="Project or Role Details"
            name="message"
            placeholder="Share details regarding your tech stack, system requirements, or inquiry..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />

          {/* Side-by-side buttons: Solid Orange 500 & Soft Orange Tint */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <PrimaryButton
              type="submit"
              size="md"
              isLoading={submitting}
            >
              Dispatch Transmission
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
    </section>
  );
}

export default ContactSection;

