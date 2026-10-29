import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  Clock,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { SectionHeading } from '../../components/common/SectionHeading';
import { translations } from '../../lib/translations';

export const AcademicsPage: React.FC = () => {
  const { subjects, academicQuarters, currentLanguage } = useSchoolData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const isUz = currentLanguage === 'uz';
  const t = translations[currentLanguage] || translations.en;

  const categoryMap: Record<string, { en: string; uz: string }> = {
    'All': { en: 'All', uz: 'Barchasi' },
    'Exact Sciences': { en: 'Exact Sciences', uz: 'Aniq fanlar' },
    'Natural Sciences': { en: 'Natural Sciences', uz: 'Tabiiy fanlar' },
    'Languages & Literature': { en: 'Languages & Literature', uz: 'Tillar va adabiyot' },
    'Social Sciences': { en: 'Social Sciences', uz: 'Ijtimoiy fanlar' },
    'Arts, Technology & Physical Education': { en: 'Arts, Technology & Physical Education', uz: 'San\'at, texnologiya va jismoniy tarbiya' },
  };

  const categories = [
    'All',
    'Exact Sciences',
    'Natural Sciences',
    'Languages & Literature',
    'Social Sciences',
    'Arts, Technology & Physical Education',
  ];

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch = 
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.applicableGrades.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      
      {/* Page Header */}
      <section className="bg-school-navy-dark text-white py-16 lg:py-20 border-b border-school-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-school-gold uppercase tracking-wider mb-4">
              {isUz ? "O'zbekiston Milliy O'quv Dasturi" : "Uzbekistan National Curriculum"}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              {t.academics.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {isUz 
                ? "1–11-sinflarni to'liq qamrab oluvchi 6 kunlik akademik o'quv dasturi, aniq va tabiiy fanlar hamda tillar chuqurlashtirilgan holda o'qitiladi." 
                : "Rigorous six-day secondary academic instruction spanning Grades 1 through 11, featuring advanced specialization in quantitative sciences and languages."}
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Framework Overview */}
      <section className="py-16 bg-school-bg-secondary border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-school-bg-secondary text-school-navy flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-school-gold" />
              </div>
              <h3 className="text-base font-bold text-school-navy mb-2">
                {isUz ? "Milliy Ta'lim Standarti" : "National Educational Framework"}
              </h3>
              <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                {isUz 
                  ? "Maktab O'zbekiston Respublikasi Maktabgacha va maktab ta'limi vazirligi tomonidan tasdiqlangan davlat ta'lim andozalari asosida faoliyat yuritadi." 
                  : "The school delivers the standardized national secondary curriculum established by the Ministry of Preschool and School Education of the Republic of Uzbekistan."}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-school-bg-secondary text-school-navy flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-school-gold" />
              </div>
              <h3 className="text-base font-bold text-school-navy mb-2">
                {isUz ? "Olti Kunlik O'quv Haftasi" : "Six-Day School Schedule"}
              </h3>
              <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                {isUz 
                  ? "Darslar haftasiga 6 kun (dushanbadan shanbagacha) olib boriladi, bu esa dars soatlari va laboratoriya amaliyotlarini to'liq o'zlashtirish imkonini beradi." 
                  : "Academic instruction is conducted six days per week (Monday through Saturday), ensuring comprehensive instructional hours and laboratory engagement."}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-school-bg-secondary text-school-navy flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-school-gold" />
              </div>
              <h3 className="text-base font-bold text-school-navy mb-2">
                {isUz ? "Chuqurlashtirilgan Fanlar" : "Specialized Subject Instruction"}
              </h3>
              <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                {isUz 
                  ? "O'quvchilar matematika, fizika, ingliz tili, kimyo, biologiya va IT yo'nalishlarida universitetlarga kirish uchun kuchaytirilgan ta'lim oladilar." 
                  : "Students receive enriched instruction in Mathematics, Physics, English, Chemistry, Biology, and Information Technology to prepare for university admissions."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Assessment System Banner Link */}
      <section className="py-8 bg-amber-50/60 border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <GraduationCap className="w-6 h-6 text-school-gold shrink-0" />
            <div>
              <span className="font-bold text-sm text-school-navy block">
                {isUz ? "Baholash tartibi va xalqaro baholarga o'girish tizimi qiziqmi?" : "Looking for grading policy and international grade conversions?"}
              </span>
              <span className="text-xs text-school-muted">
                {isUz ? "Choraklik 100 ballik BSB/CHSB baholash tizimi bo'yicha to'liq qo'llanmani o'rganing." : "Read our full guide to the 100-point BSB/CHSB quarterly assessment structure."}
              </span>
            </div>
          </div>
          <Link
            to="/academics/assessment"
            className="px-4 py-2 rounded-lg bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
          >
            <span>{isUz ? "Baholash Va Shkalalar Tizimini Ko'rish" : "View Assessment & Grading System"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-school-gold" />
          </Link>
        </div>
      </section>

      {/* Searchable Subject Directory */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <SectionHeading
              badge={t.academics.subjectsBadge}
              title={t.academics.subjectsTitle}
              subtitle={t.academics.subjectsSubtitle}
              className="mb-0"
            />
            <div className="mt-4 md:mt-0 text-xs text-school-muted">
              {isUz 
                ? <>Ko'rsatilmoqda: <span className="font-bold text-school-navy">{filteredSubjects.length}</span> ta / jami {subjects.length} ta fan</>
                : <>Showing <span className="font-bold text-school-navy">{filteredSubjects.length}</span> of {subjects.length} subjects</>}
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-school-bg-secondary p-4 rounded-2xl border border-slate-200 mb-8 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.academics.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy transition-all"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-school-navy text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {isUz ? categoryMap[cat]?.uz || cat : categoryMap[cat]?.en || cat}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <div 
                key={subject.id}
                className={`rounded-xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  subject.isSpecialized 
                    ? 'bg-white border-school-navy/30 shadow-subtle hover:shadow-card hover:border-school-navy' 
                    : 'bg-white border-slate-200 shadow-subtle hover:shadow-card'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-school-muted">
                      {isUz ? (categoryMap[subject.category]?.uz || subject.category) : subject.category}
                    </span>
                    {subject.isSpecialized && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-school-gold-dark border border-school-gold/30">
                        {isUz ? "Chuqurlashtirilgan" : "Specialized Focus"}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-school-navy mb-2">
                    {subject.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-school-muted leading-relaxed mb-4">
                    {subject.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{isUz ? "O'quv qamrovi:" : "Curricular Scope:"}</span>
                  <span className="font-bold text-school-navy px-2 py-0.5 bg-slate-100 rounded">
                    {subject.applicableGrades}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredSubjects.length === 0 && (
            <div className="text-center py-16 bg-school-bg-secondary rounded-2xl border border-dashed border-slate-200">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-school-navy">
                {isUz ? "Mos keladigan fan topilmadi." : "No subjects matching your criteria."}
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} 
                className="mt-2 text-xs font-semibold text-school-gold hover:underline"
              >
                {isUz ? "Filtrni tozalash" : "Clear filters"}
              </button>
            </div>
          )}

          {/* Important Academic Clarification */}
          <div className="mt-12 p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-school-muted leading-relaxed">
            <span className="font-bold text-school-navy">{isUz ? "Muhim Eslatma:" : "Curriculum Implementation Notice:"}</span> {isUz 
              ? "Ushbu 20 ta fan O'zbekiston Milliy O'quv Dasturi asosida 1-dan 11-sinfgacha bosqichma-bosqich o'qitiladi. O'quvchilar barcha 20 ta fanni bir vaqtda emas, balki belgilangan sinf rejasiga muvofiq o'rganadilar." 
              : "The 20 subjects listed above reflect the institutional course inventory taught across primary and secondary tiers under the Uzbekistan National Curriculum. Individual grade levels follow designated course progressions in accordance with age-appropriate national curricula; students do not enroll in all 20 subjects simultaneously in every academic year."}
          </div>

        </div>
      </section>

      {/* Academic Calendar Section */}
      <section className="py-16 bg-school-bg-secondary border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={isUz ? "YILLIK TAQVIM" : "ANNUAL CYCLE"}
            title={t.academics.quartersTitle}
            subtitle={isUz ? "O'zbekistonda umumta'lim o'quv yili to'rtta chorakka bo'lingan bo'lib, har bir chorak ta'tillar bilan yakunlanadi." : "The secondary school academic year in Uzbekistan is organized into four quarters, punctuated by seasonal school breaks."}
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {academicQuarters.map((quarter, idx) => (
              <div 
                key={quarter.id}
                className="bg-white rounded-xl p-6 border border-slate-200 text-center shadow-subtle hover:shadow-card transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-school-bg-secondary text-school-navy font-extrabold flex items-center justify-center mx-auto mb-3 border border-slate-100">
                  {idx + 1}
                </div>
                <h4 className="text-base font-bold text-school-navy mb-1">
                  {isUz ? `${idx + 1}-chorak` : quarter.quarterName}
                </h4>
                <div className="text-sm font-semibold text-school-gold mb-2">
                  {quarter.months}
                </div>
                {quarter.exactDates && (
                  <p className="text-xs text-school-muted">
                    {quarter.exactDates}
                  </p>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-center text-slate-400 mt-8 max-w-xl mx-auto">
            {isUz 
              ? "Eslatma: Ta'til kunlari va chorak muddatlari Maktabgacha va maktab ta'limi vazirligi buyrug'i asosida tasdiqlanadi." 
              : "Note: Specific vacation dates and term boundaries follow annual statutory directives issued by the Ministry of Preschool and School Education."}
          </p>
        </div>
      </section>

    </div>
  );
};