import React, { useState } from 'react';
import { Button, PrimaryButton, SecondaryButton } from './components/Button';
import { StandardForm } from './components/Form';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate API submission
    setTimeout(() => {
      setSubmittedData(data);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReset = () => {
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-700 dark:text-slate-200">
            Portfolio Component Showcase
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Engineered with the chosen Orange theme: rounded inputs and side-by-side complementary buttons.
          </p>
        </header>

        {/* Section 1: Side-by-Side Orange Buttons (No Black) */}
        <section className="bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200">
              1. Side-by-Side Standard Buttons
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Solid Orange 500 primary button paired with a soft-tinted Orange secondary button (no black).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Orange 500 Button */}
            <PrimaryButton>
              Explore Projects
            </PrimaryButton>

            {/* Secondary Soft Orange (Different visual weight, no black) */}
            <SecondaryButton>
              View Architecture
            </SecondaryButton>

            {/* Outline Orange */}
            <Button variant="outline">
              Download CV
            </Button>
          </div>
        </section>

        {/* Section 2: Form with Extra-Rounded Inputs */}
        <section className="space-y-4">
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200">
              2. Standard Form with Rounded Corners
            </h2>
          </div>

          <StandardForm
            onSubmit={handleSubmit}
            onReset={handleReset}
            isSubmitting={isSubmitting}
          />

          {submittedData && (
            <div className="max-w-xl mx-auto p-4 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-200 rounded-2xl text-sm">
              <p className="font-semibold">Transmission Captured:</p>
              <pre className="mt-1 text-xs overflow-x-auto">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
