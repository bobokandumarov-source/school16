import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  MapPin, 
  User, 
  ExternalLink, 
  Images, 
  Check, 
  X,
  Target
} from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { ExtracurricularActivity } from '../../types';
import { Modal } from '../../components/common/Modal';
import { ImageUpload, MultiImageUpload } from '../../components/common/ImageUpload';

interface ActivityFormData {
  name: string;
  category: 'Clubs & Societies' | 'Arts & Culture' | 'Sports' | 'Science & Tech';
  description: string;
  fullDescription: string;
  meetingTime: string;
  location: string;
  coordinator: string;
  photoUrl: string;
  gallery: string[];
  objectivesText: string;
  displayOrder: number;
  isPublished: boolean;
}

export const AdminActivities: React.FC = () => {
  const { activities, addActivity, updateActivity, deleteActivity } = useSchoolData();
  const [editingAct, setEditingAct] = useState<ExtracurricularActivity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormState: ActivityFormData = {
    name: '',
    category: 'Clubs & Societies',
    description: '',
    fullDescription: '',
    meetingTime: '',
    location: '',
    coordinator: '',
    photoUrl: '',
    gallery: [],
    objectivesText: '',
    displayOrder: activities.length + 1,
    isPublished: true,
  };

  const [formData, setFormData] = useState<ActivityFormData>(initialFormState);

  const handleOpenAdd = () => {
    setEditingAct(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (act: ExtracurricularActivity) => {
    setEditingAct(act);
    setFormData({
      name: act.name,
      category: act.category,
      description: act.description,
      fullDescription: act.fullDescription || '',
      meetingTime: act.meetingTime || '',
      location: act.location || '',
      coordinator: act.coordinator || '',
      photoUrl: act.photoUrl || '',
      gallery: act.gallery || [],
      objectivesText: (act.objectives || []).join('\n'),
      displayOrder: act.displayOrder,
      isPublished: act.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove activity "${name}"?`)) {
      deleteActivity(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse objectives from multiline text
    const objectives = formData.objectivesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const submissionData: Omit<ExtracurricularActivity, 'id'> = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      fullDescription: formData.fullDescription || formData.description,
      meetingTime: formData.meetingTime,
      location: formData.location,
      coordinator: formData.coordinator,
      photoUrl: formData.photoUrl,
      gallery: formData.gallery,
      objectives: objectives,
      displayOrder: formData.displayOrder,
      isPublished: formData.isPublished,
    };

    if (editingAct) {
      updateActivity(editingAct.id, submissionData);
    } else {
      addActivity(submissionData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
            Clubs & Extracurricular Activities
          </h1>
          <p className="text-xs sm:text-sm text-school-muted mt-1">
            Manage clubs, detailed activity pages, schedules, photo galleries, and learning objectives.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white text-xs sm:text-sm font-bold transition-all shadow-subtle flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-school-gold" />
          <span>Add New Club</span>
        </button>
      </div>

      {/* Grid of activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((act) => (
          <div key={act.id} className="bg-white rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between overflow-hidden">
            <div>
              {/* Cover Photo */}
              <div className="w-full h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                {act.photoUrl ? (
                  <img src={act.photoUrl} alt={act.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-400 text-xs font-semibold">No Cover Photo</div>
                )}
                
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-school-navy shadow-sm backdrop-blur-xs">
                    {act.category}
                  </span>
                </div>

                {act.gallery && act.gallery.length > 0 && (
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-school-navy-dark/80 text-white backdrop-blur-xs flex items-center gap-1">
                      <Images className="w-3 h-3 text-school-gold" /> {act.gallery.length} photos
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-bold ${act.isPublished ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {act.isPublished ? 'Published' : 'Hidden'}
                  </span>
                  <Link
                    to={`/student-life/${act.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-school-navy hover:text-school-gold transition-colors"
                    title="View public detail page"
                  >
                    <span>View Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <h3 className="text-lg font-bold text-school-navy mb-1.5">
                  {act.name}
                </h3>
                
                <p className="text-xs text-school-muted line-clamp-2 leading-relaxed mb-3">
                  {act.description}
                </p>

                {(act.meetingTime || act.location) && (
                  <div className="space-y-1 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {act.meetingTime && (
                      <div className="flex items-center gap-1.5 line-clamp-1">
                        <Calendar className="w-3.5 h-3.5 text-school-gold flex-shrink-0" />
                        <span>{act.meetingTime}</span>
                      </div>
                    )}
                    {act.location && (
                      <div className="flex items-center gap-1.5 line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-school-gold flex-shrink-0" />
                        <span>{act.location}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Order: #{act.displayOrder}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleOpenEdit(act)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-school-navy hover:bg-slate-100"
                  title="Edit activity"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(act.id, act.name)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete activity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Activity Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAct ? `Edit Club: ${editingAct.name}` : 'Add New Student Club & Page'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5 max-h-[80vh] overflow-y-auto px-1 pr-2">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Club / Activity Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy"
                placeholder="e.g. Debate Club, Eco Committee"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy"
              >
                <option value="Clubs & Societies">Clubs & Societies</option>
                <option value="Arts & Culture">Arts & Culture</option>
                <option value="Sports">Sports</option>
                <option value="Science & Tech">Science & Tech</option>
              </select>
            </div>
          </div>

          {/* Schedule & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Meeting Schedule
              </label>
              <input
                type="text"
                value={formData.meetingTime}
                onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                placeholder="e.g. Tuesdays & Thursdays, 15:00"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Room / Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                placeholder="e.g. Room 204 / Gymnasium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Faculty Coordinator
              </label>
              <input
                type="text"
                value={formData.coordinator}
                onChange={(e) => setFormData({ ...formData, coordinator: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                placeholder="e.g. Faculty Advisor"
              />
            </div>
          </div>

          {/* Short description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Short Summary Description (for listing cards)
            </label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              placeholder="1-2 sentences summarizing the club's purpose and general activities."
            />
          </div>

          {/* Full description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Full Dedicated Page Description (Narrative & Overview)
            </label>
            <textarea
              rows={5}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              placeholder="Detailed description displayed on the dedicated /student-life/:id page explaining curriculum, student roles, annual competitions, and history."
            />
          </div>

          {/* Key Objectives */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Key Learning Objectives & Skills (One objective per line)
            </label>
            <textarea
              rows={3}
              value={formData.objectivesText}
              onChange={(e) => setFormData({ ...formData, objectivesText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              placeholder="Enter one learning goal per line:&#10;Karl Popper debate format and logical argumentation&#10;Fluency in English academic public speaking&#10;Teamwork, peer research, and collaboration"
            />
          </div>

          {/* Cover Photo Upload */}
          <div className="pt-2 border-t border-slate-100">
            <ImageUpload
              label="Activity Main Cover Photo (JPG/PNG)"
              value={formData.photoUrl}
              onChange={(url) => setFormData({ ...formData, photoUrl: url })}
              aspectRatio="video"
              helperText="Upload primary cover image for the activity (JPG, PNG or WEBP)."
            />
          </div>

          {/* Multi Image Gallery Upload */}
          <div className="pt-2 border-t border-slate-100">
            <MultiImageUpload
              label="Dedicated Activity Photo Gallery (Multi-photo upload)"
              images={formData.gallery}
              onChange={(imgs) => setFormData({ ...formData, gallery: imgs })}
              maxImages={12}
              helperText="Upload multiple JPG / PNG photos from club sessions."
            />
          </div>

          {/* Settings */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 rounded text-school-navy"
              />
              <span className="text-xs font-bold text-slate-700">Display on Student Life Page and Public Directory</span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white py-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold transition-all shadow-subtle"
            >
              Save Club & Page
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};