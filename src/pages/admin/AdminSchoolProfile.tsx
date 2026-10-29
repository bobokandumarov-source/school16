import React, { useState } from 'react';
import { Download, FileText, Upload, CheckCircle2, Trash2, Eye, ExternalLink } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { generateSchoolProfilePdf } from '../../lib/pdfGenerator';

export const AdminSchoolProfile: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    subjects, 
    assessmentComponents, 
    gradingScale, 
    academicQuarters 
  } = useSchoolData();

  const [customPdfUrl, setCustomPdfUrl] = useState(settings.officialPdfUrl || '');
  const [saved, setSaved] = useState(false);

  const handleGeneratePdf = () => {
    generateSchoolProfilePdf(settings, subjects, assessmentComponents, gradingScale, academicQuarters);
  };

  const handleSavePdfSetting = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ officialPdfUrl: customPdfUrl });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleRemoveCustomPdf = () => {
    if (window.confirm('Remove uploaded custom PDF link? The site will revert to generating the official structured PDF automatically.')) {
      setCustomPdfUrl('');
      updateSettings({ officialPdfUrl: '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
            School Profile & Official PDF Management
          </h1>
          <p className="text-xs sm:text-sm text-school-muted mt-1">
            Configure the downloadable institutional PDF presented to international admissions officers.
          </p>
        </div>

        {saved && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile Configuration Saved!</span>
          </div>
        )}
      </div>

      {/* Generator Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-school-bg-secondary text-school-navy flex items-center justify-center">
            <FileText className="w-5 h-5 text-school-gold" />
          </div>
          <div>
            <h2 className="text-base font-bold text-school-navy">
              Live Vector PDF Generator
            </h2>
            <p className="text-xs text-school-muted">
              Dynamically builds a 2-page A4 publication with selectable text and authentic school branding.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
          This system synthesizes the current live values from your database (enrolled students, 215 faculty, 100-point BSB/CHSB grading structure, and official disclaimers) into an A4 PDF document suitable for university admissions officers.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={handleGeneratePdf}
            className="px-5 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white text-xs sm:text-sm font-bold transition-all shadow-subtle flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-school-gold" />
            <span>Test Download Generated PDF</span>
          </button>

          <a
            href="/school-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Preview Public Profile Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Custom PDF Upload / URL Overwrite */}
      <form onSubmit={handleSavePdfSetting} className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-base font-bold text-school-navy mb-1">
            Custom Uploaded PDF Document (Optional Override)
          </h2>
          <p className="text-xs text-school-muted">
            If your administration has a pre-printed signed and sealed document from the Ministry, you can attach its URL here.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Document Storage URL or Hosted Path
          </label>
          <input
            type="text"
            placeholder="e.g. https://.../Official_Navoi_School_16_Profile.pdf"
            value={customPdfUrl}
            onChange={(e) => setCustomPdfUrl(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20"
          />
          <p className="text-[11px] text-slate-400 mt-1.5">
            Leave blank to use the automated dynamic PDF generator.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {settings.officialPdfUrl ? (
            <button
              type="button"
              onClick={handleRemoveCustomPdf}
              className="px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove Custom Override</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400">Status: Dynamic Generation Active</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white font-bold text-xs sm:text-sm shadow-subtle"
          >
            Save PDF Setting
          </button>
        </div>
      </form>

    </div>
  );
};
