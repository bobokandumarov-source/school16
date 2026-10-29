import React, { useState } from 'react';
import { Save, CheckCircle2, RotateCcw } from 'lucide-react';
import { useSchoolData } from '../../lib/store';

export const AdminSchoolInfo: React.FC = () => {
  const { settings, updateSettings } = useSchoolData();
  const [formData, setFormData] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'totalStudents' || name === 'totalTeachers' || name === 'establishedYear' 
        ? Number(value) || 0 
        : value,
    }));
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
            School Information & Contacts
          </h1>
          <p className="text-xs sm:text-sm text-school-muted mt-1">
            Manage official institution identity, statistics, address, phone numbers, and admissions email.
          </p>
        </div>

        {saved && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Changes Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        
        {/* Core Identity */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-school-navy border-b border-slate-100 pb-2 mb-4">
            Official Institution Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Official English School Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Official Uzbek School Name (Uzbek)
              </label>
              <input
                type="text"
                name="uzName"
                value={formData.uzName || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Institution Type
              </label>
              <input
                type="text"
                name="institutionType"
                value={formData.institutionType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Instructional Framework
              </label>
              <input
                type="text"
                name="instructionalFramework"
                value={formData.instructionalFramework}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy"
              />
            </div>
          </div>
        </div>

        {/* 4 School Statistics */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-school-navy border-b border-slate-100 pb-2 mb-4">
            Official School Statistics (Prompt Requirements)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Established Year
              </label>
              <input
                type="number"
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-school-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Total Students
              </label>
              <input
                type="number"
                name="totalStudents"
                value={formData.totalStudents}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-school-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Total Teachers
              </label>
              <input
                type="number"
                name="totalTeachers"
                value={formData.totalTeachers}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-school-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Grades Range
              </label>
              <input
                type="text"
                name="gradesRange"
                value={formData.gradesRange}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-school-navy"
              />
            </div>
          </div>
        </div>

        {/* Physical Address & Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-school-navy border-b border-slate-100 pb-2 mb-4">
            Physical Campus & Official Contact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Campus Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Telephone (Click-to-Call)
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Admissions Counselor Email (Click-to-Email)
              </label>
              <input
                type="email"
                name="counselorEmail"
                value={formData.counselorEmail}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mission & Narrative */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-school-navy border-b border-slate-100 pb-2 mb-4">
            Mission Statement & Institutional Narrative
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Official Institutional Mission
              </label>
              <textarea
                name="mission"
                rows={3}
                value={formData.mission}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                About Introduction Narrative
              </label>
              <textarea
                name="aboutIntroduction"
                rows={6}
                value={formData.aboutIntroduction}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white font-bold text-xs sm:text-sm transition-all shadow-subtle flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-school-gold" />
            <span>Save School Information</span>
          </button>
        </div>

      </form>
    </div>
  );
};
