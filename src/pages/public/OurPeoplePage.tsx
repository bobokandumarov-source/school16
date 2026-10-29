import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Award, 
  Sparkles, 
  User, 
  ExternalLink, 
  Calendar, 
  Building,
  CheckCircle2
} from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { SectionHeading } from '../../components/common/SectionHeading';
import { translations } from '../../lib/translations';

export const OurPeoplePage: React.FC = () => {
  const { leadership, alumni, students, teachers, currentLanguage } = useSchoolData();
  const [activeTab, setActiveTab] = useState<'leadership' | 'alumni' | 'students' | 'teachers'>('leadership');

  const isUz = currentLanguage === 'uz';
  const t = translations[currentLanguage] || translations.en;

  const tabs = [
    { id: 'leadership', label: t.ourPeople.tabLeadership, icon: Building, count: leadership.length },
    { id: 'alumni', label: t.ourPeople.tabAlumni, icon: GraduationCap, count: alumni.length },
    { id: 'students', label: t.ourPeople.tabStudents, icon: Sparkles, count: students.length },
    { id: 'teachers', label: t.ourPeople.tabTeachers, icon: Award, count: teachers.length },
  ] as const;

  return (
    <div className="min-h-screen bg-white">
      
      {/* Page Header */}
      <section className="bg-school-navy-dark text-white py-16 lg:py-20 border-b border-school-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-school-gold uppercase tracking-wider mb-4">
              {t.ourPeople.badge}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              {t.ourPeople.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {t.ourPeople.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto gap-2 sm:gap-4 mb-12 pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-school-navy text-white shadow-card'
                      : 'bg-school-bg-secondary text-school-muted hover:text-school-navy hover:bg-slate-200/80 border border-slate-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-school-gold' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: SCHOOL LEADERSHIP */}
          {activeTab === 'leadership' && (
            <div>
              <SectionHeading
                badge={t.ourPeople.leadershipBadge}
                title={t.ourPeople.leadershipTitle}
                subtitle={t.ourPeople.leadershipSubtitle}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {leadership.map((member) => (
                  <div 
                    key={member.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Prominent Large Portrait Photo */}
                      <div className="w-full h-80 bg-gradient-to-b from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center">
                        {member.photoUrl ? (
                          <img 
                            src={member.photoUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <User className="w-24 h-24 mb-2 stroke-[1.5]" />
                            <span className="text-xs font-semibold text-slate-500">
                              {isUz ? "Rasmiy Portret" : "Official Portrait"}
                            </span>
                          </div>
                        )}

                        <div className="absolute top-4 left-4">
                          <span className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md backdrop-blur-xs ${
                            member.roleType === 'principal' 
                              ? 'bg-school-navy text-school-gold border border-school-gold/40' 
                              : 'bg-white/95 text-school-navy border border-slate-200'
                          }`}>
                            {isUz ? (member.positionUz || member.position) : member.position}
                          </span>
                        </div>
                      </div>

                      {/* Details Box */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-school-navy mb-1.5 leading-snug">
                          {member.name}
                        </h3>
                        <p className="text-xs font-semibold text-school-gold-dark mb-1">
                          {isUz ? (member.positionUz || member.position) : member.position}
                        </p>
                        <p className="text-xs text-school-muted">
                          {isUz ? "Navoiy shahar 16-sonli ixtisoslashtirilgan davlat umumta'lim maktabi" : "Navoi City Specialized State Secondary School №16"}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {isUz ? "Tasdiqlangan Rahbariyat" : "Certified Leader"}
                      </span>
                      <span className="font-semibold text-school-navy">{isUz ? "Maktab Ma'muriyati" : "Executive Board"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DISTINGUISHED ALUMNI */}
          {activeTab === 'alumni' && (
            <div>
              <SectionHeading
                badge={t.ourPeople.alumniBadge}
                title={t.ourPeople.alumniTitle}
                subtitle={t.ourPeople.alumniSubtitle}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {alumni.map((alum) => (
                  <div 
                    key={alum.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Prominent Large Portrait Photo */}
                      <div className="w-full h-72 bg-gradient-to-b from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center">
                        {alum.photoUrl ? (
                          <img 
                            src={alum.photoUrl} 
                            alt={alum.name} 
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <GraduationCap className="w-20 h-20 mb-2 stroke-[1.5] text-school-gold" />
                            <span className="text-xs font-semibold text-slate-500">
                              {isUz ? "Maktab Bitiruvchisi" : "Alumni Graduate"}
                            </span>
                          </div>
                        )}

                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-school-navy/90 text-school-gold border border-school-gold/30 shadow flex items-center gap-1.5 backdrop-blur-xs">
                            <GraduationCap className="w-3.5 h-3.5" /> {t.ourPeople.classOf} {alum.graduationYear}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-school-navy mb-1.5">
                          {alum.name}
                        </h3>

                        <div className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                          <Building className="w-4 h-4 text-school-gold flex-shrink-0" />
                          <span>{alum.university}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                          {alum.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-school-muted">
                      <span>{t.common.alumniDirectory}</span>
                      <span className="font-semibold text-school-navy">{isUz ? "16-sonli maktab" : "Navoi School №16"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT ACHIEVEMENTS */}
          {activeTab === 'students' && (
            <div>
              <SectionHeading
                badge={t.ourPeople.studentsBadge}
                title={t.ourPeople.studentsTitle}
                subtitle={t.ourPeople.studentsSubtitle}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {students.map((student) => (
                  <div 
                    key={student.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col md:flex-row overflow-hidden group"
                  >
                    {/* Prominent Large Portrait Photo */}
                    <div className="w-full md:w-5/12 h-64 md:h-auto min-h-[260px] bg-gradient-to-b from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center flex-shrink-0">
                      {student.photoUrl ? (
                        <img 
                          src={student.photoUrl} 
                          alt={student.name} 
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                          <Sparkles className="w-16 h-16 mb-2 stroke-[1.5] text-school-gold" />
                          <span className="text-xs font-semibold text-slate-500">
                            {isUz ? "Iqtidorli O'quvchi" : "Student Scholar"}
                          </span>
                        </div>
                      )}

                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-school-navy text-school-gold shadow">
                          {student.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          {student.grade && (
                            <span className="text-xs font-semibold text-school-gold-dark">
                              {student.grade}
                            </span>
                          )}
                          <Sparkles className="w-4 h-4 text-school-gold" />
                        </div>

                        <h3 className="text-xl font-bold text-school-navy mb-2">
                          {student.name}
                        </h3>

                        <div className="text-sm font-bold text-slate-800 mb-2">
                          {student.achievementTitle}
                        </div>

                        <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                          {student.achievementDescription}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-school-muted">
                        <span>{t.common.verifiedRecord}</span>
                        <span className="font-semibold text-school-navy">{isUz ? "16-sonli maktab" : "Navoi School №16"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: OUTSTANDING TEACHERS */}
          {activeTab === 'teachers' && (
            <div>
              <SectionHeading
                badge={t.ourPeople.teachersBadge}
                title={t.ourPeople.teachersTitle}
                subtitle={t.ourPeople.teachersSubtitle}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {teachers.map((teacher) => (
                  <div 
                    key={teacher.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col md:flex-row overflow-hidden group"
                  >
                    {/* Prominent Large Portrait Photo */}
                    <div className="w-full md:w-5/12 h-64 md:h-auto min-h-[260px] bg-gradient-to-b from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center flex-shrink-0">
                      {teacher.photoUrl ? (
                        <img 
                          src={teacher.photoUrl} 
                          alt={teacher.name} 
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                          <Award className="w-16 h-16 mb-2 stroke-[1.5] text-school-gold" />
                          <span className="text-xs font-semibold text-slate-500">
                            {isUz ? "Fidoyi Ustoz" : "Distinguished Faculty"}
                          </span>
                        </div>
                      )}

                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-school-gold-dark border border-school-gold/30 shadow flex items-center gap-1">
                          <Award className="w-3 h-3" /> {t.common.facultyDistinction}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-400 font-semibold">{isUz ? "Ixtisoslashgan pedagog" : "Specialized Faculty"}</span>
                          {teacher.subject && (
                            <span className="text-xs font-bold text-school-navy bg-slate-100 px-2 py-0.5 rounded">
                              {teacher.subject}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-school-navy mb-2">
                          {teacher.name}
                        </h3>

                        <div className="text-sm font-bold text-slate-800 mb-2">
                          {teacher.achievement}
                        </div>

                        {teacher.qualifications && (
                          <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                            {teacher.qualifications}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-school-muted">
                        <span>{t.common.verifiedRecord}</span>
                        <span className="font-semibold text-school-navy">{isUz ? "16-sonli maktab" : "Navoi School №16"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data integrity note */}
          <div className="mt-16 p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-school-muted">
            <span className="font-bold text-school-navy">{isUz ? "Rasmiy Ma'lumot Kafolati:" : "Institutional Record Policy:"}</span> {t.ourPeople.policyNote}
          </div>

        </div>
      </section>

    </div>
  );
};