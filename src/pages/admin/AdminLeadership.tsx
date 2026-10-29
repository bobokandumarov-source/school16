import React, { useState } from 'react';
import { Plus, Edit2, Trash2, User, Sparkles } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { LeadershipMember } from '../../types';
import { Modal } from '../../components/common/Modal';
import { ImageUpload } from '../../components/common/ImageUpload';

export const AdminLeadership: React.FC = () => {
  const { leadership, addLeadership, updateLeadership, deleteLeadership } = useSchoolData();
  const [editingMember, setEditingMember] = useState<LeadershipMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormState: Omit<LeadershipMember, 'id'> = {
    name: '',
    position: 'Deputy Principal',
    roleType: 'deputy',
    photoUrl: '',
    displayOrder: leadership.length + 1,
    isPublished: true,
  };

  const [formData, setFormData] = useState<Omit<LeadershipMember, 'id'>>(initialFormState);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: LeadershipMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      roleType: member.roleType,
      photoUrl: member.photoUrl || '',
      displayOrder: member.displayOrder,
      isPublished: member.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove leadership profile "${name}"?`)) {
      deleteLeadership(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateLeadership(editingMember.id, formData);
    } else {
      addLeadership(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
            School Leadership Administration
          </h1>
          <p className="text-xs sm:text-sm text-school-muted mt-1">
            Manage profile cards for the Principal and Deputy Principals.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white text-xs sm:text-sm font-bold transition-all shadow-subtle flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-school-gold" />
          <span>Add Leadership Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leadership.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-full h-56 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                {member.photoUrl ? (
                  <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <User className="w-16 h-16 text-slate-400 stroke-[1.5]" />
                )}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow ${
                    member.roleType === 'principal' ? 'bg-school-navy text-school-gold' : 'bg-white/95 text-slate-700 border border-slate-200'
                  }`}>
                    {member.position}
                  </span>
                </div>
              </div>

              <div className="p-5 text-center">
                <h3 className="text-base font-bold text-school-navy mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-school-muted">
                  Navoi City Specialized State Secondary School №16
                </p>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[11px] font-bold ${member.isPublished ? 'text-emerald-600' : 'text-slate-400'}`}>
                {member.isPublished ? 'Published' : 'Hidden'}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-school-navy hover:bg-slate-100"
                  title="Edit member"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id, member.name)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMember ? `Edit Leadership: ${editingMember.name}` : 'Add Leadership Member'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Full Official Name
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
                Role Type
              </label>
              <select
                value={formData.roleType}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  roleType: e.target.value as 'principal' | 'deputy',
                  position: e.target.value === 'principal' ? 'Principal' : 'Deputy Principal'
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
              >
                <option value="principal">Principal</option>
                <option value="deputy">Deputy Principal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Display Position Title
              </label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <ImageUpload
            label="Leadership Portrait Photo (JPG/PNG)"
            value={formData.photoUrl || ''}
            onChange={(url) => setFormData({ ...formData, photoUrl: url })}
            aspectRatio="portrait"
            helperText="Upload official leadership portrait in JPG, PNG or WEBP format. Quality will be automatically optimized."
          />

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 rounded text-school-navy"
              />
              <span className="text-xs font-bold text-slate-700">Display on Public Website</span>
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
              Save Profile
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
