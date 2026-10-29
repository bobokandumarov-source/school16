import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Sparkles, 
  Trophy, 
  Palette, 
  MessageSquare, 
  Leaf, 
  Scissors, 
  FlaskConical, 
  Music, 
  Drama, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Image as ImageIcon 
} from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { SectionHeading } from '../../components/common/SectionHeading';
import { translations } from '../../lib/translations';

export const StudentLifePage: React.FC = () => {
  const { activities, currentLanguage } = useSchoolData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const t = translations[currentLanguage] || translations.en;

  const categories = [
    { id: 'All', label: t.studentLife.allCategories },
    { id: 'Clubs & Societies', label: t.studentLife.clubsAndSocieties },
    { id: 'Arts & Culture', label: t.studentLife.artsAndCulture },
    { id: 'Sports', label: t.studentLife.sports },
    { id: 'Science & Tech', label: t.studentLife.scienceAndTech },
  ];

  const getClubIcon = (name: string) => {
    switch (name) {
      case 'Debate Club': return MessageSquare;
      case 'School Eco Committee': return Leaf;
      case 'Sewing and Handicrafts Club': return Scissors;
      case 'Virtual Chemistry Club': return FlaskConical;
      case 'Instrumental Ensemble': return Music;
      case 'Art Club': return Palette;
      case 'Turon Theatre Club': return Drama;
      case 'Dance and Ballet Club': return Sparkles;
      case 'Sports Clubs': return Trophy;
      default: return Activity;
    }
  };

  const filteredActivities = activities.filter((act) => {
    if (!act.isPublished) return false;
    return selectedCategory === 'All' || act.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      
      {/* Page Header Banner */}
      <section className="bg-school-navy-dark text-white py-16 lg:py-20 border-b border-school-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-school-gold uppercase tracking-wider mb-4">
              {t.studentLife.badge}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              {t.studentLife.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {t.studentLife.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Clubs & Activities Directory */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <SectionHeading
              badge={currentLanguage === 'uz' ? "TO'GARAKLAR RO'YXATI" : "CLUBS & SOCIETIES"}
              title={currentLanguage === 'uz' ? "Maktab to'garaklari va faoliyatlari" : "Active Student Societies & Clubs"}
              subtitle={currentLanguage === 'uz' 
                ? "Har bir to'garakning batafsil sahifasida uning dars jadvali, mas'ul rahbari va fotogalereyasi bilan tanishishingiz mumkin." 
                : "Explore dedicated pages for each society detailing meeting schedules, faculty coordinators, curriculum, and photo galleries."}
              className="mb-0"
            />
            
            {/* Category Filter */}
            <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-school-navy text-white shadow-sm'
                      : 'bg-school-bg-secondary text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((act) => {
              const Icon = getClubIcon(act.name);
              const galleryCount = (act.gallery || []).length;
              return (
                <div 
                  key={act.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-subtle hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:border-school-navy/30"
                >
                  <div>
                    {/* Large Cover Image Frame */}
                    <div className="h-52 w-full bg-slate-100 relative overflow-hidden flex items-center justify-center">
                      {act.photoUrl ? (
                        <img
                          src={act.photoUrl}
                          alt={act.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-school-navy-dark via-school-navy to-school-navy-light flex flex-col items-center justify-center text-white p-6 relative">
                          <Icon className="w-12 h-12 text-school-gold mb-2 opacity-80" />
                          <span className="text-xs font-bold text-slate-200 tracking-wider uppercase text-center">
                            {act.name}
                          </span>
                        </div>
                      )}

                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-school-navy border border-slate-200 shadow-sm backdrop-blur-xs">
                          {act.category}
                        </span>
                      </div>

                      {galleryCount > 0 && (
                        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-school-navy-dark/80 text-white backdrop-blur-xs flex items-center gap-1 shadow">
                          <ImageIcon className="w-3 h-3 text-school-gold" /> {galleryCount} {currentLanguage === 'uz' ? 'ta foto' : 'photos'}
                        </span>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-school-navy mb-2.5 group-hover:text-school-navy-light transition-colors">
                        <Link to={`/student-life/${act.id}`}>
                          {act.name}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-school-muted leading-relaxed line-clamp-3 mb-4">
                        {act.description}
                      </p>

                      {act.name === 'Sports Clubs' && (
                        <div className="mb-2 pt-2 border-t border-slate-100">
                          <div className="flex flex-wrap gap-1">
                            {(currentLanguage === 'uz' 
                              ? ['Shaxmat', 'Futbol', 'Voleybol', 'Tennis', 'Kurash'] 
                              : ['Chess', 'Football', 'Volleyball', 'Table Tennis', 'Kurash']
                            ).map((s) => (
                              <span key={s} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Link
                      to={`/student-life/${act.id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-school-bg-secondary hover:bg-school-navy text-school-navy hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 group-hover:shadow"
                    >
                      <span>{t.studentLife.viewDetail}</span>
                      <ArrowRight className="w-4 h-4 text-school-gold group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};