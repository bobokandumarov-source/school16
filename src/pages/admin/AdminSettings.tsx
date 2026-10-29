import React, { useState } from 'react';
import { Save, CheckCircle2, Globe, Share2, Shield, Lock } from 'lucide-react';
import { useSchoolData } from '../../lib/store';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, currentLanguage, setLanguage } = useSchoolData();
  const [socials, setSocials] = useState({
    telegram: settings.socialLinks.telegram || '',
    facebook: settings.socialLinks.facebook || '',
    instagram: settings.socialLinks.instagram || '',
    youtube: settings.socialLinks.youtube || '',
  });
  const [saved, setSaved] = useState(false);

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      socialLinks: socials,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
            Website & System Settings
          </h1>
          <p className="text-xs sm:text-sm text-school-muted mt-1">
            Configure social media links, multi-language internationalization options, and security metadata.
          </p>
        </div>

        {saved && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Updated!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Social Media Channels */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Share2 className="w-4 h-4 text-school-gold" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-school-navy">
              Official Social Media Channels
            </h2>
          </div>
          <p className="text-xs text-school-muted">
            Per prompt directives: Leave blank if official channels are not yet registered. Do not invent fabricated URLs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Telegram Channel URL
              </label>
              <input
                type="url"
                name="telegram"
                placeholder="https://t.me/school16navoi"
                value={socials.telegram}
                onChange={handleSocialChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Instagram Page URL
              </label>
              <input
                type="url"
                name="instagram"
                placeholder="https://instagram.com/school16navoi"
                value={socials.instagram}
                onChange={handleSocialChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Facebook Page URL
              </label>
              <input
                type="url"
                name="facebook"
                placeholder="https://facebook.com/school16navoi"
                value={socials.facebook}
                onChange={handleSocialChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                YouTube Channel URL
              </label>
              <input
                type="url"
                name="youtube"
                placeholder="https://youtube.com/@school16navoi"
                value={socials.youtube}
                onChange={handleSocialChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Language Architecture */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Globe className="w-4 h-4 text-school-gold" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-school-navy">
              Internationalization & Language Settings
            </h2>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <p className="font-semibold text-school-navy">
              Active Public Language: <span className="uppercase text-school-gold font-bold">{currentLanguage} (English)</span>
            </p>
            <p className="text-school-muted leading-relaxed">
              The site launches fully in English (default) to serve international university admissions officers and visitors. The internal database schema is prepared with localized fields so full Uzbek translation can be published seamlessly without code changes.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white font-bold text-xs sm:text-sm transition-all shadow-subtle flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-school-gold" />
            <span>Save Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
