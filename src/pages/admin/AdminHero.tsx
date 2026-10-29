import React, { useState } from 'react';
import { Save, CheckCircle2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { ImageUpload } from '../../components/common/ImageUpload';

export const AdminHero: React.FC = () => {
  const { settings, updateSettings } = useSchoolData();
  const [formData, setFormData] = useState({
    heroHeadline: settings.heroHeadline,
    heroSupportingText: settings.heroSupportingText,
    heroButtonPrimary: settings.heroButtonPrimary,
    heroButtonSecondary: settings.heroButtonSecondary,
    heroImageUrl: settings.heroImageUrl,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
            Homepage Hero Configuration
          </h1>
          <p className="text-xs sm:text-sm text-school-muted mt-1">
            Customize main headline, supporting text, call-to-action buttons, and the school building background.
          </p>
        </div>

        {saved && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Hero Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        
        {/* Main Headline */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Main Hero Headline (Prompt Standard)
          </label>
          <input
            type="text"
            name="heroHeadline"
            value={formData.heroHeadline}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-base font-bold text-school-navy focus:outline-none focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy"
          />
        </div>

        {/* Supporting Text */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Supporting Subtitle Text
          </label>
          <textarea
            name="heroSupportingText"
            rows={3}
            value={formData.heroSupportingText}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Primary Button Text (Links to /about)
            </label>
            <input
              type="text"
              name="heroButtonPrimary"
              value={formData.heroButtonPrimary}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Secondary Button Text (Links to /academics)
            </label>
            <input
              type="text"
              name="heroButtonSecondary"
              value={formData.heroButtonSecondary}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        {/* Hero Background Image or Elegant Branded Placeholder */}
        <div>
          <ImageUpload
            label="Hero School Building Background Photo (JPG/PNG)"
            value={formData.heroImageUrl}
            onChange={(url) => setFormData((prev) => ({ ...prev, heroImageUrl: url }))}
            aspectRatio="wide"
            helperText="Upload a JPG, PNG, or WEBP photo of the school campus. Leave empty to use the official navy & gold branded graphic."
          />
        </div>

        {/* Live Preview Box */}
        <div className="bg-school-navy-dark rounded-xl p-6 text-white text-center relative overflow-hidden">
          <div className="text-[10px] font-bold uppercase tracking-widest text-school-gold mb-2">
            Live Header Preview
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
            {formData.heroHeadline}
          </h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto mb-4">
            {formData.heroSupportingText}
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="px-4 py-1.5 rounded-lg bg-school-gold text-school-navy font-bold text-xs">
              {formData.heroButtonPrimary}
            </span>
            <span className="px-4 py-1.5 rounded-lg bg-white/20 text-white font-bold text-xs">
              {formData.heroButtonSecondary}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white font-bold text-xs sm:text-sm transition-all shadow-subtle flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-school-gold" />
            <span>Save Hero Configuration</span>
          </button>
        </div>

      </form>
    </div>
  );
};
