import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Sparkles, Star, User } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { StudentAchievement } from '../../types';
import { Modal } from '../../components/common/Modal';
import { ImageUpload } from '../../components/common/ImageUpload';

export const AdminStudents: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useSchoolData();
  const [editingStudent, setEditingStudent] = useState<StudentAchievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormState: Omit<StudentAchievement, 'id'> = {
    name: '',
    achievementTitle: '',
    achievementDescription: '',
    grade: '',
    year: '2026',
    category: 'Academic Honors',
    photoUrl: '',
    isFeatured: true,
    displayOrder: students.length + 1,
    isPublished: true,
  };

  const [formData, setFormData] = useState<Omit<StudentAchievement, 'id'>>(initialFormState);

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student: StudentAchievement) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      achievementTitle: student.achievementTitle,
      achievementDescription: student.achievementDescription,
      grade: student.grade || '',
      year: student.year || '',
      category: student.category,
      photoUrl: student.photoUrl || '',
      isFeatured: student.isFeatured,
      displayOrder: student.displayOrder,
      isPublished: student.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove achievement record for "${name}"?`)) {
      deleteStudent(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
    } else {
      addStudent(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
            Student Achievements Registry
          </h1>
          <p className="text-xs sm:text-sm text-school-muted mt-1">
            Manage Olympiad winners, academic honors, and student distinctions.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white text-xs sm:text-sm font-bold transition-all shadow-subtle flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-school-gold" />
          <span>Add Student Achievement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-40 h-48 sm:h-auto bg-slate-100 relative overflow-hidden flex items-center justify-center flex-shrink-0">
                  {student.photoUrl ? (
                    <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <User className="w-12 h-12 text-slate-400 stroke-[1.5]" />
                  )}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-school-navy text-school-gold shadow">
                      {student.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-school-muted font-medium">
                        {student.grade || 'Student Achievement'}
                      </span>
                      {student.isFeatured && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                          <Star className="w-3 h-3 fill-amber-500" /> Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-school-navy mb-1">
                      {student.name}
                    </h3>
                    <div className="text-xs font-bold text-slate-800 mb-1.5 line-clamp-1">
                      {student.achievementTitle}
                    </div>
                    <p className="text-xs text-school-muted line-clamp-2 leading-relaxed">
                      {student.achievementDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[11px] font-bold ${student.isPublished ? 'text-emerald-600' : 'text-slate-400'}`}>
                {student.isPublished ? 'Published' : 'Hidden'}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleOpenEdit(student)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-school-navy hover:bg-slate-100"
                  title="Edit achievement"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(student.id, student.name)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete achievement"
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
        title={editingStudent ? `Edit Student: ${editingStudent.name}` : 'Add Student Achievement Record'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Student Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mathematics, Academic Honors"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Grade Level (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Grade 10"
                value={formData.grade || ''}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Achievement Title
            </label>
            <input
              type="text"
              required
              value={formData.achievementTitle}
              onChange={(e) => setFormData({ ...formData, achievementTitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Detailed Description
            </label>
            <textarea
              rows={3}
              required
              value={formData.achievementDescription}
              onChange={(e) => setFormData({ ...formData, achievementDescription: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <ImageUpload
            label="Student Portrait / Award Photo (JPG/PNG)"
            value={formData.photoUrl || ''}
            onChange={(url) => setFormData({ ...formData, photoUrl: url })}
            aspectRatio="portrait"
            helperText="Upload student recognition portrait in JPG, PNG or WEBP format."
          />

          <div className="flex items-center space-x-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded text-school-navy"
              />
              <span className="text-xs font-bold text-school-navy">Feature on Homepage</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 rounded text-school-navy"
              />
              <span className="text-xs font-bold text-slate-700">Published</span>
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
