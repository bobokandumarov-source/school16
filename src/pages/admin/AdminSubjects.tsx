import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, BookOpen, Check, X, Sparkles } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { Subject, SubjectCategory } from '../../types';
import { Modal } from '../../components/common/Modal';

export const AdminSubjects: React.FC = () => {
  const { subjects, addSubject, updateSubject, deleteSubject } = useSchoolData();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormState: Omit<Subject, 'id'> = {
    name: '',
    category: 'Exact Sciences',
    applicableGrades: 'Grades 5–11',
    isSpecialized: false,
    description: '',
    displayOrder: subjects.length + 1,
    isPublished: true,
  };

  const [formData, setFormData] = useState<Omit<Subject, 'id'>>(initialFormState);

  const handleOpenAdd = () => {
    setEditingSubject(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      category: subject.category,
      applicableGrades: subject.applicableGrades,
      isSpecialized: subject.isSpecialized,
      description: subject.description,
      displayOrder: subject.displayOrder,
      isPublished: subject.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the subject "${name}"?`)) {
      deleteSubject(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubject) {
      updateSubject(editingSubject.id, formData);
    } else {
      addSubject(formData);
    }
    setIsModalOpen(false);
  };

  const filtered = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.applicableGrades.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
            Curriculum & Subjects Management
          </h1>
          <p className="text-xs sm:text-sm text-school-muted mt-1">
            Manage course directory ({subjects.length} subjects), specialized concentrations, and grade scopes.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white text-xs sm:text-sm font-bold transition-all shadow-subtle flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-school-gold" />
          <span>Add New Subject</span>
        </button>
      </div>

      {/* Search and Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-school-bg-secondary">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter subjects by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="py-3 px-4">Subject Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Applicable Grades</th>
                <th className="py-3 px-4 text-center">Specialized</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((subject) => (
                <tr key={subject.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-school-navy">
                    {subject.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold">
                      {subject.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {subject.applicableGrades}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {subject.isSpecialized ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-school-gold-dark border border-school-gold/30">
                        <Sparkles className="w-3 h-3" /> Specialized
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">Standard</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      subject.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {subject.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(subject)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-school-navy hover:bg-slate-100 transition-colors"
                      title="Edit subject"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(subject.id, subject.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSubject ? `Edit Subject: ${editingSubject.name}` : 'Add New Curriculum Subject'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Subject Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Academic Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as SubjectCategory })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
              >
                <option value="Exact Sciences">Exact Sciences</option>
                <option value="Natural Sciences">Natural Sciences</option>
                <option value="Languages & Literature">Languages & Literature</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Arts, Technology & Physical Education">Arts, Technology & Physical Education</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Applicable Grades
              </label>
              <input
                type="text"
                placeholder="e.g. Grades 5–11"
                required
                value={formData.applicableGrades}
                onChange={(e) => setFormData({ ...formData, applicableGrades: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Subject Description & Objectives
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="flex items-center space-x-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isSpecialized}
                onChange={(e) => setFormData({ ...formData, isSpecialized: e.target.checked })}
                className="w-4 h-4 rounded text-school-navy"
              />
              <span className="text-xs font-bold text-school-navy">Specialized Academic Focus</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 rounded text-school-navy"
              />
              <span className="text-xs font-bold text-slate-700">Published to Public Directory</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-school-navy text-white text-xs font-bold hover:bg-school-navy-dark shadow"
            >
              Save Subject
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
