import React, { useState } from 'react';
import { Save, CheckCircle2, Award, Edit2, Info } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { AssessmentComponent, GradingScaleItem } from '../../types';
import { Modal } from '../../components/common/Modal';

export const AdminAssessment: React.FC = () => {
  const { 
    assessmentComponents, 
    updateAssessmentComponent, 
    gradingScale, 
    updateGradingScaleItem 
  } = useSchoolData();

  const [editingComp, setEditingComp] = useState<AssessmentComponent | null>(null);
  const [editingScale, setEditingScale] = useState<GradingScaleItem | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSaveComp = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingComp) {
      updateAssessmentComponent(editingComp.id, editingComp);
      setEditingComp(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleSaveScale = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingScale) {
      updateGradingScaleItem(editingScale.id, editingScale);
      setEditingScale(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
            Assessment & Grading System Management
          </h1>
          <p className="text-xs sm:text-sm text-school-muted mt-1">
            Configure the 100-point quarterly breakdown, BSB/CHSB weights, and international concordance references.
          </p>
        </div>

        {saved && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Updated Assessment Data!</span>
          </div>
        )}
      </div>

      {/* 1. Assessment Components (100-pt structure) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8">
        <h2 className="text-base font-bold text-school-navy uppercase tracking-wider mb-2">
          100-Point Quarterly Assessment Components
        </h2>
        <p className="text-xs text-school-muted mb-6">
          Defines the statutory weighting and pedagogical descriptions of each quarterly evaluation element.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessmentComponents.map((comp) => (
            <div key={comp.id} className="bg-school-bg-secondary rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-school-navy bg-white px-2 py-0.5 rounded border border-slate-200">
                    {comp.code}
                  </span>
                  <span className="text-base font-black text-school-gold-dark">
                    {comp.maxPoints} pts
                  </span>
                </div>
                <h3 className="text-sm font-bold text-school-navy mb-2">
                  {comp.name}
                </h3>
                <p className="text-xs text-school-muted leading-relaxed">
                  {comp.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex justify-end">
                <button
                  onClick={() => setEditingComp({ ...comp })}
                  className="inline-flex items-center gap-1 text-xs font-bold text-school-navy hover:text-school-gold transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Points & Text</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. National Grading Scale & Concordance */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8">
        <h2 className="text-base font-bold text-school-navy uppercase tracking-wider mb-2">
          Uzbek National Grading Scale & US Concordance
        </h2>
        <p className="text-xs text-school-muted mb-6">
          Conversion thresholds from 100-point composite scores to national Uzbek grades (1–5) and international US GPA benchmarks.
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="py-3 px-4">Score Range</th>
                <th className="py-3 px-4 text-center">Uzbek Grade</th>
                <th className="py-3 px-4">Qualitative Descriptor</th>
                <th className="py-3 px-4 text-center">US Reference</th>
                <th className="py-3 px-4">Academic Notes</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {gradingScale.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-school-navy">{item.scoreRange}</td>
                  <td className="py-3 px-4 text-center font-extrabold">{item.uzbekGrade}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{item.description}</td>
                  <td className="py-3 px-4 text-center font-bold text-school-navy">{item.usReference}</td>
                  <td className="py-3 px-4 text-xs text-school-muted">{item.notes}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setEditingScale({ ...item })}
                      className="p-1 rounded text-slate-500 hover:text-school-navy"
                      title="Edit scale item"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Component Modal */}
      {editingComp && (
        <Modal
          isOpen={Boolean(editingComp)}
          onClose={() => setEditingComp(null)}
          title={`Edit Assessment Component: ${editingComp.name}`}
        >
          <form onSubmit={handleSaveComp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Component Name
              </label>
              <input
                type="text"
                required
                value={editingComp.name}
                onChange={(e) => setEditingComp({ ...editingComp, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Max Weighted Points (Out of 100)
              </label>
              <input
                type="number"
                required
                value={editingComp.maxPoints}
                onChange={(e) => setEditingComp({ ...editingComp, maxPoints: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-school-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Methodology & Frequency Explanation
              </label>
              <textarea
                rows={4}
                required
                value={editingComp.description}
                onChange={(e) => setEditingComp({ ...editingComp, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingComp(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-school-navy text-white text-xs font-bold"
              >
                Save Component
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Scale Modal */}
      {editingScale && (
        <Modal
          isOpen={Boolean(editingScale)}
          onClose={() => setEditingScale(null)}
          title={`Edit Grade Tier: ${editingScale.uzbekGrade}`}
        >
          <form onSubmit={handleSaveScale} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Score Range
                </label>
                <input
                  type="text"
                  required
                  value={editingScale.scoreRange}
                  onChange={(e) => setEditingScale({ ...editingScale, scoreRange: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  US Reference Equivalent
                </label>
                <input
                  type="text"
                  required
                  value={editingScale.usReference}
                  onChange={(e) => setEditingScale({ ...editingScale, usReference: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Qualitative Descriptor
              </label>
              <input
                type="text"
                required
                value={editingScale.description}
                onChange={(e) => setEditingScale({ ...editingScale, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Academic Standing Notes
              </label>
              <textarea
                rows={3}
                value={editingScale.notes || ''}
                onChange={(e) => setEditingScale({ ...editingScale, notes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingScale(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-school-navy text-white text-xs font-bold"
              >
                Save Scale
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
