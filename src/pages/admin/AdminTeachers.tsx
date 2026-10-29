import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Award, User } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { OutstandingTeacher } from '../../types';
import { Modal } from '../../components/common/Modal';
import { ImageUpload } from '../../components/common/ImageUpload';

export const AdminTeachers: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useSchoolData();
  const [editingTeacher, setEditingTeacher] = useState<OutstandingTeacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormState: Omit<OutstandingTeacher, 'id'> = {
    name: '',
    achievement: '',
    qualifications: '',
    subject: '',
    photoUrl: '',
    isFeatured: true,
    displayOrder: teachers.length + 1,
    isPublished: true,
  };

  const [formData, setFormData] = useState<Omit<OutstandingTeacher, 'id'>>(initialFormState);

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: OutstandingTeacher) => {
    setEditingTeacher(t);
    setFormData({
      name: t.name,
      achievement: t.achievement,
      qualifications: t.qualifications || '',
      subject: t.subject || '',
      photoUrl: t.photoUrl || '',
      isFeatured: t.isFeatured,
      displayOrder: t.displayOrder,
      isPublished: t.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove teacher record for "${name}"?`)) {
      deleteTeacher(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacher) {
      updateTeacher(editingTeacher.id, formData);
    } else {
      addTeacher(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
            Outstanding Teachers Management
          </h1>
          <p className="text-xs sm:text-sm text-school-muted mt-1">
            Recognize faculty members honored with national pedagogical awards and international credentials.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white text-xs sm:text-sm font-bold transition-all shadow-subtle flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-school-gold" />
          <span>Add Teacher Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-40 h-48 sm:h-auto bg-slate-100 relative overflow-hidden flex items-center justify-center flex-shrink-0">
                  {teacher.photoUrl ? (
                    <img src={teacher.photoUrl} alt={teacher.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <User className="w-12 h-12 text-slate-400 stroke-[1.5]" />
                  )}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-school-gold-dark border border-school-gold/30 shadow flex items-center gap-1">
                      <Award className="w-3 h-3" /> Faculty
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-school-muted font-medium">
                        {teacher.subject || 'Specialized Faculty'}
                      </span>
                      <span className={`text-[11px] font-bold ${teacher.isPublished ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {teacher.isPublished ? 'Published' : 'Hidden'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-school-navy mb-1">
                      {teacher.name}
                    </h3>
                    <div className="text-xs font-bold text-slate-800 mb-1.5 line-clamp-1">
                      {teacher.achievement}
                    </div>
                    {teacher.qualifications && (
                      <p className="text-xs text-school-muted line-clamp-2 leading-relaxed">
                        {teacher.qualifications}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Specialized Faculty</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleOpenEdit(teacher)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-school-navy hover:bg-slate-100"
                  title="Edit teacher"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(teacher.id, teacher.name)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete teacher"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTeacher ? `Edit Teacher: ${editingTeacher.name}` : 'Add Teacher Record'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Teacher Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Official Award / Achievement
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Winner of the national 'Best Teacher' competition"
              value={formData.achievement}
              onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Credentials / Subject Taught (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Holder of international GMAT and SAT certificates"
              value={formData.qualifications || ''}
              onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <ImageUpload
            label="Teacher Portrait Photo (JPG/PNG)"
            value={formData.photoUrl || ''}
            onChange={(url) => setFormData({ ...formData, photoUrl: url })}
            aspectRatio="portrait"
            helperText="Upload teacher portrait photo in JPG, PNG or WEBP format."
          />

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 rounded text-school-navy"
              />
              <span className="text-xs font-bold text-slate-700">Display in Public Directory</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-school-navy text-white text-xs font-bold"
            >
              Save Record
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
