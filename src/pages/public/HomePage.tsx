import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Users, 
  Calendar, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Calculator,
  Atom,
  Languages,
  FlaskConical,
  Dna,
  Binary,
  GraduationCap
} from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { SectionHeading } from '../../components/common/SectionHeading';
import { StatsCard } from '../../components/common/StatsCard';
import { generateSchoolProfilePdf } from '../../lib/pdfGenerator';
import { translations } from '../../lib/translations';

export const HomePage: React.FC = () => {
  const { 
    settings, 
    subjects, 
    activities, 
    students, 
    news,
    assessmentComponents,
    gradingScale,
    academicQuarters,
    currentLanguage
  } = useSchoolData();

  const isUz = currentLanguage === 'uz';
  const t = translations[currentLanguage] || translations.en;

  const specializedDisciplines = [
    { 
      name: isUz ? 'Matematika' : 'Mathematics', 
      icon: Calculator, 
      desc: isUz ? 'Kvantitativ tahlil, teoremalar isboti va algebraik fikrlash.' : 'Advanced quantitative reasoning, proofs, and algebraic analysis.' 
    },
    { 
      name: isUz ? 'Fizika' : 'Physics', 
      icon: Atom, 
      desc: isUz ? 'Klassik mexanika, termodinamika, elektromagnetizm va laboratoriya tajribalari.' : 'Classical mechanics, thermodynamics, electromagnetism, and laboratory inquiry.' 
    },
    { 
      name: isUz ? 'Ingliz Tili' : 'English Language', 
      icon: Languages, 
      desc: isUz ? 'Akademik nutq, muloqot erkinligi va xalqaro imtihonlarga tayyorgarlik.' : 'Academic fluency, communicative competence, and international examination readiness.' 
    },
    { 
      name: isUz ? 'Kimyo' : 'Chemistry', 
      icon: FlaskConical, 
      desc: isUz ? 'Anorganik va organik reaksiyalar kinetikasi, stexiometriya va amaliy tajribalar.' : 'Inorganic and organic reaction kinetics, stoichiometry, and experiments.' 
    },
    { 
      name: isUz ? 'Biologiya' : 'Biology', 
      icon: Dna, 
      desc: isUz ? 'Genetika, hujayra biologiyasi, fiziologiya va ekologik tizimlar.' : 'Genetics, cell biology, physiology, and ecological understanding.' 
    },
    { 
      name: isUz ? 'Axborot Texnologiyalari' : 'Information Technology', 
      icon: Binary, 
      desc: isUz ? 'Algoritmik masalalar yechish, raqamli ko‘nikmalar va dasturlash asoslari.' : 'Algorithmic problem-solving, digital skills, and programming fundamentals.' 
    },
  ];

  const featuredAchievements = students.filter(s => s.isFeatured && s.isPublished).slice(0, 3);
  const latestNews = news.filter(n => n.isPublished).slice(0, 3);

  const handleDownloadPdf = () => {
    generateSchoolProfilePdf(settings, subjects, assessmentComponents, gradingScale, academicQuarters);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 4.1 Hero Section */}
      <section className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center bg-school-navy-dark text-white overflow-hidden">
        {/* Background Image / Branded Institutional Placeholder */}
        {settings.heroImageUrl ? (
          <img 
            src={settings.heroImageUrl} 
            alt="Navoi School 16 Campus" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#081D38] via-[#102D53] to-[#0A2244]">
            {/* Elegant institutional geometric watermark */}
            <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] rounded-full border-[40px] border-white/[0.03] pointer-events-none" />
            <div className="absolute left-1/3 top-10 w-[400px] h-[400px] rounded-full border-[2px] border-school-gold/[0.1] pointer-events-none" />
            <div 
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '32px 32px'
              }}
            />
          </div>
        )}

        {/* Dark readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-school-navy-dark via-school-navy-dark/85 to-school-navy/75 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-school-gold/30 backdrop-blur-md text-xs sm:text-sm font-semibold text-school-gold mb-6 animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-school-gold animate-pulse" />
            {isUz ? "Rasmiy Ta'lim Portali • Navoiy shahri, O'zbekiston" : "Official Educational Portal • Navoi City, Uzbekistan"}
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isUz ? "Bilim Va Tafakkur. Yuksak Ma'naviyat. Porloq Kelajak." : (settings.heroHeadline || "Educating Minds. Building Character. Inspiring Futures.")}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            {isUz ? "Navoiy shahar 16-sonli ixtisoslashtirilgan davlat umumta'lim maktabi rasmiy portaliga xush kelibsiz. Bu yerda sifatli ta'lim, shaxsiy kamolot va yoshlarimiz kelajagi shakllanadi." : (settings.heroSupportingText || "Welcome to Navoi City Specialized State Secondary School №16, where academic learning, personal development, and community engagement come together to prepare students for the future.")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-school-gold hover:bg-school-gold-light text-school-navy-dark font-extrabold text-sm sm:text-base tracking-wide transition-all shadow-elevated hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>{isUz ? "Maktabimiz bilan tanishing" : (settings.heroButtonPrimary || "Explore Our School")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/academics"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-base transition-all backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-school-gold" />
              <span>{isUz ? "O'quv dasturi va fanlar" : (settings.heroButtonSecondary || "Discover Our Academics")}</span>
            </Link>
          </div>

          {/* Accreditation line */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-school-gold" /> {t.home.curriculumBadge}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-school-gold" /> {t.home.sixDayBadge}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-school-gold" /> {t.home.specializedBadge}
            </span>
          </div>

        </div>
      </section>

      {/* 4.2 School Statistics */}
      <section className="py-12 bg-school-bg-secondary relative -mt-8 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              label={t.home.statsFoundation}
              value={`Est. ${settings.establishedYear}`}
              description={t.home.statsFoundationDesc}
              icon={<Calendar className="w-5 h-5" />}
            />
            <StatsCard
              label={t.home.statsStudents}
              value={settings.totalStudents.toLocaleString()}
              description={t.home.statsStudentsDesc}
              icon={<Users className="w-5 h-5" />}
            />
            <StatsCard
              label={t.home.statsTeachers}
              value={settings.totalTeachers}
              description={t.home.statsTeachersDesc}
              icon={<GraduationCap className="w-5 h-5" />}
            />
            <StatsCard
              label={t.home.statsSpan}
              value={settings.gradesRange}
              description={t.home.statsSpanDesc}
              icon={<Award className="w-5 h-5" />}
            />
          </div>
        </div>
      </section>

      {/* 4.3 About Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-elevated bg-school-bg-secondary p-8 text-center relative group">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white shadow-subtle p-3 flex items-center justify-center border border-slate-200/90 overflow-hidden">
                  <img 
                    src="/logos/school-logo-symbol.jpg" 
                    alt="School Emblem" 
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-school-gold">
                  {isUz ? "Tarixiy Meros" : "Institutional Heritage"}
                </span>
                <h3 className="text-xl font-extrabold text-school-navy mt-1 mb-3">
                  {isUz ? "Oltmish Yillik Shonli Ta'lim Yo'li" : "Six Decades of Educational Service"}
                </h3>
                <p className="text-xs text-school-muted leading-relaxed">
                  {isUz 
                    ? "1966-yilda Navoiy shahrida tashkil etilgan bo'lib, mustaqil fikrlash, akademik halollik va fuqarolik mas'uliyatini tarbiyalaydi." 
                    : "Founded in 1966 in Navoi City, Uzbekistan, fostering academic integrity, independent thought, and civic responsibility."}
                </p>
                <div className="mt-6 pt-6 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-left">
                  <div>
                    <span className="block text-[11px] text-school-muted uppercase font-semibold">
                      {isUz ? "Manzil" : "Location"}
                    </span>
                    <span className="text-xs font-bold text-school-navy">
                      {isUz ? "Navoiy shahri, O'zbekiston" : "Navoi City, UZ"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-school-muted uppercase font-semibold">
                      {isUz ? "O'quv haftasi" : "Schedule"}
                    </span>
                    <span className="text-xs font-bold text-school-navy">
                      {isUz ? "6 Kunlik O'quv Haftasi" : "6 Days / Week"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                badge={isUz ? "MAKTABIMIZ HAQIDA" : "ABOUT OUR INSTITUTION"}
                title={isUz ? "Akademik Sadoqat Va Barkamol Avlod Tarbiyasi" : "A Tradition of Academic Dedication & Character Building"}
                subtitle={isUz ? "1966-yilda tashkil topgan Navoiy shahar 16-sonli ixtisoslashtirilgan maktabi avlodlar uchun yuqori sifatli ta'lim berib kelmoqda." : "Established in 1966, Navoi City Specialized State Secondary School №16 has provided high-caliber public education for generations of students."}
              />

              <p className="text-school-muted text-base leading-relaxed">
                {isUz 
                  ? "Bugungi kunda maktabimizda 1–11-sinflar kesimida 2,448 nafar o'quvchi tahsil olmoqda, ularga 215 nafar malakali o'qituvchi ta'lim bermoqda. O'zbekiston milliy o'quv dasturi asosida matematika, fizika, ingliz tili, kimyo, biologiya va axborot texnologiyalari fanlari chuqurlashtirib o'qitiladi."
                  : "Today, our school serves 2,448 students across Grades 1–11, supported by 215 teachers. Following Uzbekistan's national curriculum, we provide a comprehensive education with specialized instruction in Mathematics, Physics, English, Chemistry, Biology, and Information Technology."}
              </p>

              <p className="text-school-muted text-base leading-relaxed">
                {isUz 
                  ? "Bizningcha, ta'lim faqatgina darsliklar va imtihonlardan iborat emas. Bizning maqsadimiz — nafaqat bilimdon o'quvchilarni, balki jamoada ishlay oladigan, mustaqil fikrlovchi va jamiyatga foyda keltiradigan mas'uliyatli, hurmatli va faol yoshlarni tarbiyalashdir."
                  : "We believe education goes beyond textbooks and examinations. Our mission is to nurture not only knowledgeable students, but also responsible, respectful, confident, and active young people who can collaborate, think independently, and contribute positively to their communities."}
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white font-bold text-sm transition-all shadow-subtle hover:shadow-card"
                >
                  <span>{isUz ? "Maktab Haqida Batafsil Ma'lumot" : "Learn More About Our School"}</span>
                  <ArrowRight className="w-4 h-4 text-school-gold" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4.4 Academic Excellence */}
      <section className="py-20 bg-school-bg-secondary border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={t.home.disciplinesBadge}
            title={t.home.disciplinesTitle}
            subtitle={t.home.disciplinesSubtitle}
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedDisciplines.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.name}
                  className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200/80 shadow-subtle hover:shadow-elevated transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-school-bg-secondary text-school-navy flex items-center justify-center mb-5 group-hover:bg-school-navy group-hover:text-school-gold transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-school-navy mb-2 group-hover:text-school-navy-light transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-school-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/academics"
              className="inline-flex items-center gap-2 text-school-navy hover:text-school-navy-light font-bold text-sm group"
            >
              <span>{t.home.exploreCurriculum}</span>
              <ChevronRight className="w-4 h-4 text-school-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4.5 Beyond the Classroom: Extracurricular */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              badge={t.home.studentLifeBadge}
              title={t.home.studentLifeTitle}
              subtitle={t.home.studentLifeSubtitle}
              className="mb-0"
            />
            <Link
              to="/student-life"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-school-navy font-bold text-sm hover:text-school-gold transition-colors"
            >
              <span>{t.home.viewAllClubs}</span>
              <ArrowRight className="w-4 h-4 text-school-gold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.slice(0, 6).map((club) => (
              <Link 
                key={club.id}
                to={`/student-life/${club.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle hover:shadow-card hover:border-school-gold/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="w-full h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                    {club.photoUrl ? (
                      <img 
                        src={club.photoUrl} 
                        alt={club.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="text-slate-400 text-xs font-semibold">
                        {club.category}
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-school-navy shadow-sm backdrop-blur-xs">
                        {club.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-bold text-school-navy mb-1.5 group-hover:text-school-gold-dark transition-colors">
                      {club.name}
                    </h3>
                    <p className="text-xs text-school-muted line-clamp-2 leading-relaxed">
                      {club.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-school-navy font-semibold">
                  <span>{isUz ? "Faoliyatni O'rganish" : "Explore Activity"}</span>
                  <ChevronRight className="w-4 h-4 text-school-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4.6 Student Achievements */}
      <section className="py-20 bg-school-bg-secondary border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={t.home.achievementsBadge}
            title={t.home.achievementsTitle}
            subtitle={t.home.achievementsSubtitle}
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredAchievements.map((student) => (
              <div 
                key={student.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col sm:flex-row overflow-hidden group"
              >
                {/* Prominent Portrait Photo */}
                <div className="w-full sm:w-5/12 h-60 sm:h-auto min-h-[220px] bg-slate-100 relative overflow-hidden flex items-center justify-center flex-shrink-0">
                  {student.photoUrl ? (
                    <img 
                      src={student.photoUrl} 
                      alt={student.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                      <Sparkles className="w-12 h-12 mb-2 text-school-gold stroke-[1.5]" />
                      <span className="text-[11px] font-semibold text-slate-500">
                        {isUz ? "Iqtidorli O'quvchi" : "Honored Student"}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-school-navy text-school-gold shadow">
                      {student.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-school-gold-dark">
                        {student.category}
                      </span>
                      <Sparkles className="w-4 h-4 text-school-gold" />
                    </div>

                    <h3 className="text-lg font-bold text-school-navy mb-1.5">
                      {student.name}
                    </h3>
                    <div className="text-sm font-semibold text-slate-700 mb-2 leading-snug">
                      {student.achievementTitle}
                    </div>
                    <p className="text-xs text-school-muted leading-relaxed line-clamp-3">
                      {student.achievementDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-school-muted">
                    <span>{t.common.verifiedRecord}</span>
                    <span className="font-semibold text-school-navy">{isUz ? "16-sonli maktab" : "Navoi School №16"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/our-people"
              className="inline-flex items-center gap-2 text-school-navy font-bold text-sm hover:underline"
            >
              <span>{t.home.viewAllPeople}</span>
              <ArrowRight className="w-4 h-4 text-school-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4.7 Latest News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              badge={t.home.newsBadge}
              title={t.home.newsTitle}
              subtitle={t.home.newsSubtitle}
              className="mb-0"
            />
            <Link
              to="/news"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-school-navy font-bold text-sm hover:text-school-gold transition-colors"
            >
              <span>{t.home.allNews}</span>
              <ArrowRight className="w-4 h-4 text-school-gold" />
            </Link>
          </div>

          {latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((item) => (
                <article 
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col group"
                >
                  <div className="h-48 bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                    {item.coverImage ? (
                      <img 
                        src={item.coverImage} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <img 
                        src="/logos/school-logo-symbol.jpg" 
                        alt="News badge" 
                        className="h-16 w-auto opacity-40 object-contain mix-blend-multiply"
                      />
                    )}
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-school-navy border border-slate-200 shadow-sm backdrop-blur-xs">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-school-muted mb-2 font-medium">
                        {item.publicationDate}
                      </div>
                      <h3 className="text-base font-bold text-school-navy mb-2 line-clamp-2 hover:text-school-navy-light">
                        <Link to={`/news/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-school-muted line-clamp-3 leading-relaxed mb-4">
                        {item.shortDescription}
                      </p>
                    </div>

                    <Link
                      to={`/news/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy hover:text-school-gold transition-colors pt-2 border-t border-slate-100"
                    >
                      <span>{t.newsPage.readFullNotice}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-school-bg-secondary rounded-2xl p-12 text-center max-w-xl mx-auto border border-dashed border-slate-300">
              <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-school-navy">{t.home.noNews}</h3>
              <p className="text-xs text-school-muted mt-1">
                {t.home.noNewsDesc}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4.8 School Profile Section (International Universities & Admissions Officers) */}
      <section className="py-20 bg-gradient-to-r from-school-navy-dark via-school-navy to-school-navy-dark text-white relative overflow-hidden">
        {/* Subtle decorative gold line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-school-gold" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-school-gold uppercase tracking-wider mb-6">
            <Award className="w-3.5 h-3.5" /> {isUz ? "Xalqaro Universitetlar Qabul Komissiyalari Uchun" : "For International University Admissions & Credential Evaluators"}
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-5">
            {isUz ? "Maktabimizning Akademik Tizimi Bilan Tanishing" : "Understanding Our Academic System"}
          </h2>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            {isUz 
              ? "Rasmiy maktab profilimiz orqali o'quv dasturi, baholash mezonlari, ballar tizimi va ta'lim muhitimiz bilan batafsil tanishing." 
              : "Explore our curriculum, assessment structure, grading practices, and educational environment through our official School Profile."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/school-profile"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-school-navy font-bold text-sm sm:text-base hover:bg-slate-100 transition-all shadow-card flex items-center justify-center gap-2"
            >
              <span>{isUz ? "Maktab Profilini Ko'rish" : "View School Profile"}</span>
              <ArrowRight className="w-4 h-4 text-school-gold" />
            </Link>

            <button
              onClick={handleDownloadPdf}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-school-gold hover:bg-school-gold-light text-school-navy font-bold text-sm sm:text-base transition-all shadow-card flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-school-navy" />
              <span>{t.schoolProfile.downloadPdf}</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-8 max-w-xl mx-auto">
            {isUz 
              ? "100 ballik baholash tizimi, milliy fanlar katalogi va xalqaro baholarga o'girish qoidalarini jamlagan 2 sahifali rasmiy hujjat." 
              : "Directly formatted as an official 2-page institutional document detailing the 100-point grading structure, national course directory, and conversion methodology."}
          </p>

        </div>
      </section>

    </div>
  );
};