import React from 'react';
import { Award, Shield, Users, Compass, Lightbulb, Heart, User, CheckCircle2 } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { SectionHeading } from '../../components/common/SectionHeading';
import { translations } from '../../lib/translations';

export const AboutPage: React.FC = () => {
  const { settings, leadership, currentLanguage } = useSchoolData();

  const isUz = currentLanguage === 'uz';
  const t = translations[currentLanguage] || translations.en;

  const valuesIcons: Record<string, React.ElementType> = {
    'Academic Excellence': Award,
    'Integrity and Respect': Shield,
    'Collaboration': Users,
    'Leadership': Compass,
    'Creativity': Lightbulb,
    'Community Responsibility': Heart,
    'Akademik mukammallik': Award,
    'Halollik va hurmat': Shield,
    'Hamkorlik': Users,
    'Yetakchilik': Compass,
    'Ijodkorlik': Lightbulb,
    'Ijtimoiy mas\'uliyat': Heart,
  };

  const valuesList = isUz ? [
    {
      title: 'Akademik Mukammallik',
      desc: 'Chuqur ilmiy intizom, tahliliy tafakkur va barcha fanlarda yuqori standartlarga erishish intilishi.',
      icon: Award
    },
    {
      title: 'Halollik Va Hurmat',
      desc: 'O\'zaro ehtirom, insoniy qadr-qimmat, halollik va har bir xatti-harakatda shaxsiy mas\'uliyat.',
      icon: Shield
    },
    {
      title: 'Jamoaviy Hamkorlik',
      desc: 'Samarali jamoada ishlash, turli fikrlarni qadrlash va tengdoshlarining muvaffaqiyatini qo\'llab-quvvatlash.',
      icon: Users
    },
    {
      title: 'Yetakchilik Va Tashabbus',
      desc: 'O\'quvchi tashabbuskorligi, mustaqil qaror qabul qilish va ijobiy o\'zgarishlarga undash salohiyati.',
      icon: Compass
    },
    {
      title: 'Ijodkorlik Va Izlanish',
      desc: 'Innovatsion yondashuv, ijodiy tafakkur va doimiy o\'rganishga ochiqlik.',
      icon: Lightbulb
    },
    {
      title: 'Ijtimoiy Mas\'uliyat',
      desc: 'Faol fuqarolik pozitsiyasi, ekologik madaniyat va jamiyat ravnaqiga munosib hissa qo\'shish.',
      icon: Heart
    },
  ] : [
    {
      title: 'Academic Excellence',
      desc: 'Encouraging scholarly discipline, deep understanding, analytical thinking, and pursuit of high standards in all disciplines.',
      icon: Award
    },
    {
      title: 'Integrity and Respect',
      desc: 'Fostering moral character, mutual dignity, honesty, empathy, and personal accountability in learning and daily interactions.',
      icon: Shield
    },
    {
      title: 'Collaboration',
      desc: 'Instilling the capacity to work productively across teams, value multiple viewpoints, and support the success of peers.',
      icon: Users
    },
    {
      title: 'Leadership',
      desc: 'Nurturing student agency, ethical initiative, constructive problem solving, and confidence to effect positive change.',
      icon: Compass
    },
    {
      title: 'Creativity',
      desc: 'Cultivating innovative approaches, artistic inquiry, adaptability, and open-minded exploration beyond standard boundaries.',
      icon: Lightbulb
    },
    {
      title: 'Community Responsibility',
      desc: 'Engaging actively in civic life, environmental stewardship, cultural heritage, and positive contributions to society.',
      icon: Heart
    },
  ];

  const principal = leadership.find(l => l.roleType === 'principal');
  const deputies = leadership.filter(l => l.roleType === 'deputy');

  return (
    <div className="min-h-screen bg-white">
      
      {/* Page Header Banner */}
      <section className="bg-school-navy-dark text-white py-16 lg:py-20 border-b border-school-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-school-gold uppercase tracking-wider mb-4">
              {isUz ? "Tarixiy Meros Va Missiya" : "Institutional Heritage & Mission"}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              {t.about.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {isUz 
                ? "1966-yildan buyon Navoiy shahrida bilimdon, mas'uliyatli va faol yoshlarni tarbiyalab kelmoqdamiz." 
                : "Educating knowledgeable, responsible, and active young people in Navoi City, Uzbekistan, since 1966."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Introduction */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                badge={isUz ? "TARIXIY SHARH" : "HISTORICAL OVERVIEW"}
                title={isUz ? "Olti O'n Yillik Ta'limiy Sadoqat" : "Six Decades of Educational Commitment"}
                subtitle={isUz ? "Navoiy viloyatida umumta'lim tizimining mustahkam tayanchi." : "A pillar of secondary education in Navoi Region, Uzbekistan."}
              />

              <div className="space-y-4 text-school-text leading-relaxed text-base">
                <p>
                  {isUz 
                    ? "1966-yilda tashkil topgan Navoiy shahar 16-sonli ixtisoslashtirilgan davlat umumta'lim maktabi 60 yildan buyon Navoiy shahri ta'lim sohasining ajralmas qismi bo'lib kelmoqda." 
                    : "Established in 1966, Navoi City Specialized State Secondary School №16 has been part of the educational community of Navoi, Uzbekistan, for six decades."}
                </p>
                <p>
                  {isUz 
                    ? "Bugungi kunda maktabimizda 1–11-sinflar kesimida 2,448 nafar o'quvchi tahsil olmoqda, ularga 215 nafar malakali o'qituvchi ta'lim bermoqda. O'zbekiston milliy o'quv dasturi asosida matematika, fizika, ingliz tili, kimyo, biologiya va axborot texnologiyalari fanlari chuqurlashtirib o'qitiladi." 
                    : "Today, our school serves 2,448 students across Grades 1–11, supported by 215 teachers. Following Uzbekistan's national curriculum, we provide a comprehensive education with specialized instruction in Mathematics, Physics, English, Chemistry, Biology, and Information Technology."}
                </p>
                <p>
                  {isUz 
                    ? "Bizningcha, ta'lim faqat darsliklar, imtihonlar va baholardan iborat emas. Bizning maqsadimiz — nafaqat bilimdon o'quvchilarni, balki jamoada hamkorlik qila oladigan, mustaqil fikrlaydigan va jamiyatga ijobiy hissa qo'shadigan mas'uliyatli yoshlarni tarbiyalashdir." 
                    : "We believe education goes beyond textbooks, examinations, and academic achievement. Our mission is to nurture not only knowledgeable students, but also responsible, respectful, confident, and active young people who can collaborate, think independently, and contribute positively to their communities."}
                </p>
                <p>
                  {isUz 
                    ? "Akademik ta'lim, darsdan tashqari to'garaklar, ijodiy va sport mashg'ulotlari hamda o'quvchilar tashabbuslari orqali har bir yoshning kuchli tomonlarini kashf etishiga va yetakchilik qobiliyatini yuksaltirishga ko'maklashamiz." 
                    : "Through academic learning, extracurricular activities, creativity, sports, and student-led initiatives, we encourage every student to discover their strengths, develop leadership skills, and prepare for opportunities beyond the classroom."}
                </p>
              </div>

              {/* Curricular hallmarks */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-school-navy">
                <div className="flex items-center gap-2 p-3 bg-school-bg-secondary rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-school-gold" />
                  <span>{isUz ? "Davlat Ta'lim Standarti" : "State Secondary Accreditation"}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-school-bg-secondary rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-school-gold" />
                  <span>{isUz ? "6 Kunlik O'quv Haftasi" : "6-Day Academic Instruction"}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-school-bg-secondary rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-school-gold" />
                  <span>{isUz ? "Chuqurlashtirilgan STEM & Tillar" : "Specialized STEM & Languages"}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-school-bg-secondary rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-school-gold" />
                  <span>{isUz ? "Choraklik 100 Ballik Baholash" : "100-Point Quarterly Assessment"}</span>
                </div>
              </div>

            </div>

            {/* Quick Fact Box */}
            <div className="lg:col-span-5">
              <div className="bg-school-bg-secondary rounded-2xl p-8 border border-slate-200 shadow-card">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white shadow-subtle p-2.5 flex items-center justify-center border border-slate-200 overflow-hidden">
                    <img 
                      src="/logos/school-logo-symbol.jpg" 
                      alt="School Emblem" 
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="mt-3 text-xs text-school-gold uppercase font-bold tracking-wider">
                    {isUz ? "Muassasa Pasporti" : "Institutional Profile"}
                  </div>
                </div>

                <div className="divide-y divide-slate-200 text-xs sm:text-sm">
                  <div className="py-3 flex justify-between">
                    <span className="text-school-muted font-medium">{isUz ? "Rasmiy nomi" : "Official Name"}</span>
                    <span className="font-bold text-school-navy text-right max-w-[200px]">
                      {isUz ? settings.uzName || "16-sonli ixtisoslashtirilgan maktab" : settings.name}
                    </span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-school-muted font-medium">{t.about.foundationYear}</span>
                    <span className="font-bold text-school-navy">{settings.establishedYear}</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-school-muted font-medium">{t.about.institutionType}</span>
                    <span className="font-bold text-school-navy text-right max-w-[200px]">
                      {isUz ? "Chuqurlashtirilgan davlat umumta'lim maktabi" : "State Secondary with Specialized Instruction"}
                    </span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-school-muted font-medium">{t.about.jurisdiction}</span>
                    <span className="font-bold text-school-navy text-right">
                      {isUz ? "O'zbekiston Respublikasi Maktabgacha va maktab ta'limi vazirligi" : "Ministry of Preschool & School Education of Uzbekistan"}
                    </span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-school-muted font-medium">{t.about.locationLabel}</span>
                    <span className="font-bold text-school-navy">{isUz ? "Navoiy shahri, O'zbekiston" : "Navoi City, Uzbekistan"}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gradient-to-r from-school-navy via-school-navy-dark to-school-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-school-gold block mb-3">
            {t.about.missionBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold italic leading-snug text-white mb-6">
            "{isUz ? "Ta'lim olishga, yetakchilik qilishga, hamkorlikda ishlashga va jamiyatda ijobiy o'zgarishlar yaratishga qodir bilimdon, mas'uliyatli va faol yoshlarni tarbiyalash." : settings.mission}"
          </h2>
          <div className="w-16 h-1 bg-school-gold mx-auto rounded-full" />
        </div>
      </section>

      {/* Guiding Principles & Values */}
      <section className="py-20 bg-school-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={t.about.valuesBadge}
            title={t.about.valuesTitle}
            subtitle={t.about.valuesSubtitle}
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuesList.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title}
                  className="bg-white rounded-xl p-7 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-school-bg-secondary text-school-navy flex items-center justify-center mb-5 border border-slate-100">
                    <Icon className="w-6 h-6 text-school-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-school-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-school-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* School Leadership */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={t.about.leadershipBadge}
            title={t.about.leadershipTitle}
            subtitle={t.about.leadershipSubtitle}
            centered
          />

          {/* Principal Card */}
          {principal && (
            <div className="max-w-lg mx-auto mb-14">
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-elevated overflow-hidden group">
                <div className="w-full h-80 sm:h-96 bg-gradient-to-b from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center">
                  {principal.photoUrl ? (
                    <img 
                      src={principal.photoUrl} 
                      alt={principal.name} 
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
                    <span className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-school-navy text-school-gold border border-school-gold/40 shadow-md backdrop-blur-xs">
                      {isUz ? (principal.positionUz || t.about.principalBadge) : principal.position}
                    </span>
                  </div>
                </div>

                <div className="p-7 text-center">
                  <h3 className="text-2xl font-extrabold text-school-navy mb-1.5">
                    {principal.name}
                  </h3>
                  <p className="text-xs font-semibold text-school-gold-dark mb-1">
                    {isUz ? "Maktab Direktori" : "Head of School & Principal"}
                  </p>
                  <p className="text-xs text-school-muted">
                    {isUz ? "Navoiy shahar 16-sonli ixtisoslashtirilgan davlat umumta'lim maktabi" : "Navoi City Specialized State Secondary School №16"}
                  </p>
                </div>

                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {isUz ? "Ijrochi Rahbariyat" : "Executive Leadership"}
                  </span>
                  <span className="font-semibold text-school-navy">{isUz ? "Direktor Qabulxonasi" : "Principal's Office"}</span>
                </div>
              </div>
            </div>
          )}

          {/* Deputy Principals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deputies.map((deputy) => (
              <div 
                key={deputy.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="w-full h-60 bg-gradient-to-b from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center">
                    {deputy.photoUrl ? (
                      <img 
                        src={deputy.photoUrl} 
                        alt={deputy.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <User className="w-16 h-16 text-slate-400 stroke-[1.5]" />
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-school-navy border border-slate-200 shadow-sm backdrop-blur-xs">
                        {isUz ? (deputy.positionUz || t.about.deputyBadge) : deputy.position}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 text-center">
                    <h4 className="text-base font-bold text-school-navy mb-1">
                      {deputy.name}
                    </h4>
                    <p className="text-[11px] text-school-muted">
                      {isUz ? "Maktab Ma'muriyati" : "School Administration"}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-400">
                  {isUz ? "Direktor O'rinbosari" : "Deputy Directorate"}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};