import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  CheckCircle2, 
  Share2, 
  Image as ImageIcon, 
  X, 
  ChevronRight,
  Sparkles,
  Users,
  Award
} from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { translations } from '../../lib/translations';

export const ActivityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { activities, settings, currentLanguage } = useSchoolData();
  const navigate = useNavigate();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const t = translations[currentLanguage] || translations.en;

  const activity = activities.find((a) => a.id === id || a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id);

  if (!activity) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-school-navy mb-3">{t.studentLife.detailNotFound}</h1>
        <p className="text-sm text-school-muted mb-6">
          {t.studentLife.detailNotFoundDesc}
        </p>
        <Link
          to="/student-life"
          className="px-6 py-2.5 rounded-xl bg-school-navy text-white text-xs font-bold hover:bg-school-navy-dark transition-all"
        >
          {t.studentLife.detailReturn}
        </Link>
      </div>
    );
  }

  const relatedActivities = activities
    .filter((a) => a.id !== activity.id && a.isPublished)
    .slice(0, 3);

  const galleryImages = activity.gallery || [];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Top Banner & Breadcrumb */}
      <section className="bg-school-navy-dark text-white py-12 lg:py-16 border-b border-school-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/student-life"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-school-gold hover:text-school-gold-light mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.studentLife.detailReturn}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-school-gold border border-school-gold/30">
              {activity.category}
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {currentLanguage === 'uz' ? "Maktab to'garagi • 16-sonli maktab" : 'School Society • Navoi School №16'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {activity.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {activity.description}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left 8 Cols: Large Photo, Narrative, Objectives, Photo Gallery */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Featured Cover Photo */}
              {activity.photoUrl ? (
                <div className="rounded-2xl overflow-hidden shadow-card border border-slate-200 bg-slate-100 max-h-[460px]">
                  <img
                    src={activity.photoUrl}
                    alt={activity.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-2xl p-10 bg-gradient-to-br from-school-bg-secondary to-slate-100 border border-slate-200 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-subtle flex items-center justify-center mb-4 border border-slate-100">
                    <img src="/logos/school-logo-symbol.jpg" alt="Logo" className="w-10 h-10 object-contain mix-blend-multiply opacity-80" />
                  </div>
                  <h3 className="text-lg font-bold text-school-navy mb-1">{activity.name}</h3>
                  <p className="text-xs text-school-muted">{activity.category} • Navoi School №16</p>
                </div>
              )}

              {/* Detailed Narrative */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-school-navy border-b border-slate-100 pb-3">
                  {t.studentLife.detailOverviewTitle}
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {activity.fullDescription || activity.description}
                </div>
              </div>

              {/* Key Objectives & Learning Goals */}
              {activity.objectives && activity.objectives.length > 0 && (
                <div className="bg-school-bg-secondary rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
                  <h3 className="text-lg font-bold text-school-navy flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-school-gold" />
                    <span>{t.studentLife.detailObjectivesTitle}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {activity.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                          {obj}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo Gallery Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-school-navy flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-school-gold" />
                    <span>{t.studentLife.detailGalleryTitle}</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">
                    {galleryImages.length} {currentLanguage === 'uz' ? 'ta foto' : 'photos'}
                  </span>
                </div>

                {galleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {galleryImages.map((photo, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxImage(photo)}
                        className="group relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-subtle hover:shadow-card transition-all"
                      >
                        <img
                          src={photo}
                          alt={`${activity.name} photo ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-school-navy-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3 py-1 bg-white/90 text-school-navy rounded-lg text-xs font-bold shadow">
                            {t.common.zoom}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center">
                    <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-school-navy">{t.studentLife.detailGalleryEmpty}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {t.studentLife.detailGalleryEmptyDesc}
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Right 4 Cols: Meta Card, Joining Info, Related */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Quick Info Box */}
              <div className="bg-school-bg-secondary rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-school-gold block">
                  {t.studentLife.detailInfoTitle}
                </span>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  {activity.coordinator && (
                    <div className="flex items-start gap-3 pb-3 border-b border-slate-200/80">
                      <User className="w-4 h-4 text-school-navy shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[11px] font-semibold uppercase">{t.common.coordinator}</span>
                        <span className="text-school-navy font-bold">{activity.coordinator}</span>
                      </div>
                    </div>
                  )}

                  {activity.meetingTime && (
                    <div className="flex items-start gap-3 pb-3 border-b border-slate-200/80">
                      <Calendar className="w-4 h-4 text-school-navy shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[11px] font-semibold uppercase">{t.common.schedule}</span>
                        <span className="text-slate-700 font-semibold">{activity.meetingTime}</span>
                      </div>
                    </div>
                  )}

                  {activity.location && (
                    <div className="flex items-start gap-3 pb-3 border-b border-slate-200/80">
                      <MapPin className="w-4 h-4 text-school-navy shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[11px] font-semibold uppercase">{t.common.location}</span>
                        <span className="text-slate-700 font-semibold">{activity.location}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-school-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[11px] font-semibold uppercase">
                        {currentLanguage === 'uz' ? 'Qamrov doirasi' : 'Eligibility'}
                      </span>
                      <span className="text-school-navy font-bold">{t.common.targetGrades}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <a
                    href={`mailto:${settings.counselorEmail}?subject=${encodeURIComponent(activity.name + " club inquiry")}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white font-bold text-xs transition-all shadow-subtle flex items-center justify-center gap-2"
                  >
                    <span>{t.studentLife.detailJoinButton}</span>
                    <ChevronRight className="w-4 h-4 text-school-gold" />
                  </a>
                </div>
              </div>

              {/* Share Box */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center space-y-2">
                <span className="text-xs font-bold text-slate-700 block">{t.studentLife.detailShareTitle}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: activity.name, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert(t.common.shareLinkCopied);
                    }
                  }}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-school-navy text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t.common.share}</span>
                </button>
              </div>

              {/* Related Activities */}
              {relatedActivities.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-school-navy uppercase tracking-wider">
                    {t.studentLife.detailRelatedTitle}
                  </h4>
                  <div className="space-y-3">
                    {relatedActivities.map((rel) => (
                      <Link
                        key={rel.id}
                        to={`/student-life/${rel.id}`}
                        className="block p-3 rounded-xl border border-slate-100 hover:border-school-gold hover:bg-school-bg-secondary transition-all group"
                      >
                        <span className="text-[10px] font-bold text-school-gold uppercase block mb-0.5">
                          {rel.category}
                        </span>
                        <h5 className="text-xs sm:text-sm font-bold text-school-navy group-hover:text-school-navy-light line-clamp-1">
                          {rel.name}
                        </h5>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={lightboxImage} alt="Enlarged" className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-school-gold p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};