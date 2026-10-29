import React, { useState } from 'react';
import { Plus, Edit2, Trash2, GraduationCap, Building, User } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { DistinguishedAlumni } from '../../types';
import { Modal } from '../../components/common/Modal';
import { ImageUpload } from '../../components/common/ImageUpload';

export const AdminAlumni: React.FC = () => {
  const { alumni, addAlumni, updateAlumni, deleteAlumni } = useSchoolData();
  const [editingAlumni, setEditingAlumni] = useState<DistinguishedAlumni | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormState: Omit<DistinguishedAlumni, 'id'> = {
    name: '',
    graduationYear: 2022,
    university: '',
    description: '',
    photoUrl: '',
    externalLink: '',
    isFeatured: true,
    displayOrder: alumni.length + 1,
    isPublished: true,
  };

  const [formData, setFormData] = useState<Omit<DistinguishedAlumni, 'id'>>(initialFormState);

  const handleOpenAdd = () => {
    setEditingAlumni(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (a: DistinguishedAlumni) => {
    setEditingAlumni(a);
    setFormData({
      name: a.name,
      graduationYear: a.graduationYear,
      university: a.university,
      description: a.description,
      photoUrl: a.photoUrl || '',
      externalLink: a.externalLink || '',
      isFeatured: a.isFeatured,
      displayOrder: a.displayOrder,
      isPublished: a.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove alumni record for "${name}"?`)) {
      deleteAlumni(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAlumni) {
      updateAlumni(editingAlumni.id, formData);
    } else {
      addAlumni(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
            Distinguished Alumni Management
          </h1>
          <p className="text-xs sm:text-sm text-school-muted mt-1">
            Maintain verified records of graduates advancing to universities worldwide.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white text-xs sm:text-sm font-bold transition-all shadow-subtle flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-school-gold" />
          <span>Add Alumni Record</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumni.map((alum) => (
          <div key={alum.id} className="bg-white rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-full h-52 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                {alum.photoUrl ? (
                  <img src={alum.photoUrl} alt={alum.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <User className="w-16 h-16 text-slate-400 stroke-[1.5]" />
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-school-navy text-school-gold shadow flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" /> Class of {alum.graduationYear}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-school-navy mb-1">
                  {alum.name}
                </h3>
                <div className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-school-gold flex-shrink-0" />
                  <span className="line-clamp-1">{alum.university}</span>
                </div>
                <p className="text-xs text-school-muted line-clamp-2 leading-relaxed">
                  {alum.description}
                </p>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[11px] font-bold ${alum.isPublished ? 'text-emerald-600' : 'text-slate-400'}`}>
                {alum.isPublished ? 'Published' : 'Hidden'}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleOpenEdit(alum)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-school-navy hover:bg-slate-100"
                  title="Edit alumni"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(alum.id, alum.name)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete alumni"
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
        title={editingAlumni ? `Edit Alumni: ${editingAlumni.name}` : 'Add Alumni Record'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Graduate Full Name
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
                Graduation Year
              </label>
              <input
                type="number"
                required
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) || 2022 })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-school-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                University / Institution
              </label>
              <input
                type="text"
                required
                placeholder="e.g. University of Minnesota Twin Cities"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Summary Description
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <ImageUpload
            label="Alumni Portrait Photo (JPG/PNG)"
            value={formData.photoUrl || ''}
            onChange={(url) => setFormData({ ...formData, photoUrl: url })}
            aspectRatio="portrait"
            helperText="Upload alumni portrait photo in JPG, PNG or WEBP format."
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
