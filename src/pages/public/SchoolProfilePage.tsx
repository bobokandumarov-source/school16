import React from 'react';
import { 
  Download, 
  Printer, 
  Building, 
  Award, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Globe2, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { generateSchoolProfilePdf } from '../../lib/pdfGenerator';
import { translations } from '../../lib/translations';

export const SchoolProfilePage: React.FC = () => {
  const { 
    settings, 
    subjects, 
    assessmentComponents, 
    gradingScale, 
    academicQuarters, 
    activities, 
    students,
    currentLanguage 
  } = useSchoolData();

  const isUz = currentLanguage === 'uz';
  const t = translations[currentLanguage] || translations.en;

  const handleDownloadPdf = () => {
    // If an administrator uploaded a custom PDF, open that, otherwise generate the fresh official PDF
    if (settings.officialPdfUrl) {
      window.open(settings.officialPdfUrl, '_blank');
    } else {
      generateSchoolProfilePdf(settings, subjects, assessmentComponents, gradingScale, academicQuarters);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const specializedList = subjects.filter(s => s.isSpecialized);

  return (
    <div className="min-h-screen bg-slate-100/70 py-10 print:py-0 print:bg-white">
      
      {/* Top Action Bar (hidden on print) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 no-print">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-xs font-bold text-school-gold-dark border border-school-gold/30 mb-2">
              <Award className="w-3.5 h-3.5" /> {isUz ? "Rasmiy Muassasa Profili (2026 Nashri)" : "Official Institutional Profile (2026 Edition)"}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
              {isUz ? "Universitet Qabul Komissiyalari Uchun Rasmiy Maktab Profili" : "School Profile for University Admissions & Credential Evaluators"}
            </h1>
            <p className="text-xs sm:text-sm text-school-muted mt-1">
              {isUz 
                ? "Xorijiy oliygohlar, stipendiya komissiyalari va akkreditatsiya tashkilotlari uchun tayyorlangan rasmiy hujjat." 
                : "Prepared for international higher education admissions officers, scholarship committees, and credential evaluation services."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
              title="Print document"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>{isUz ? "Chop etish" : "Print Page"}</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="px-5 py-2.5 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold transition-all shadow-subtle flex items-center gap-2 hover:shadow-card"
            >
              <Download className="w-4 h-4 text-school-gold" />
              <span>{t.schoolProfile.downloadPdf}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Document Body (A4 Style Paper) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-elevated border border-slate-200/80 p-8 sm:p-14 text-school-text space-y-12 print:shadow-none print:border-none print:p-0">
          
          {/* Document Header & Crest */}
          <div className="border-b-2 border-school-navy pb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-5 text-center sm:text-left">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-50 p-2 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  <img 
                    src="/logos/school-logo-symbol.jpg" 
                    alt="School Crest" 
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-school-gold block">
                    {isUz ? "O'zbekiston Respublikasi Maktabgacha va maktab ta'limi vazirligi" : "Ministry of Preschool & School Education • Republic of Uzbekistan"}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-school-navy tracking-tight uppercase leading-snug">
                    {isUz ? (settings.uzName || settings.name) : settings.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    {isUz ? "Navoiy shahri, O'zbekiston • 1966-yilda tashkil topgan" : "Navoi City, Uzbekistan • Established 1966"}
                  </p>
                </div>
              </div>

              <div className="text-right sm:text-right hidden sm:block">
                <span className="inline-block px-3 py-1 rounded bg-slate-100 text-[11px] font-bold text-school-navy uppercase tracking-wider">
                  CEEB / School Profile
                </span>
                <span className="block text-xs text-slate-400 mt-1">
                  {isUz ? "Tasdiqlangan sana:" : "Last Certified:"} {settings.lastUpdated}
                </span>
              </div>
            </div>

            {/* 4 Key Statistics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 bg-school-bg-secondary p-4 rounded-xl">
              <div>
                <span className="block text-[11px] text-slate-400 font-bold uppercase">{isUz ? "Tashkil topgan" : "Foundation"}</span>
                <span className="text-base font-extrabold text-school-navy">1966 ({isUz ? "60 yil" : "60 Yrs"})</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-bold uppercase">{isUz ? "O'quvchilar soni" : "Enrollment"}</span>
                <span className="text-base font-extrabold text-school-navy">{settings.totalStudents.toLocaleString()} {isUz ? "nafar" : "Students"}</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-bold uppercase">{isUz ? "O'qituvchilar" : "Faculty"}</span>
                <span className="text-base font-extrabold text-school-navy">{settings.totalTeachers} {isUz ? "nafar" : "Teachers"}</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-bold uppercase">{isUz ? "Sinflar qamrovi" : "Grade Span"}</span>
                <span className="text-base font-extrabold text-school-navy">{isUz ? "1–11-sinflar" : settings.gradesRange}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Institutional Identity & Overview */}
          <section className="space-y-4">
            <h3 className="text-base font-extrabold text-school-navy uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="text-school-gold font-black">1.</span> {isUz ? "Muassasa Tavsifi Va Hududiy Kontekst" : "Institutional Overview & Community Context"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {isUz 
                ? "Navoiy shahar 16-sonli ixtisoslashtirilgan davlat umumta'lim maktabi Navoiy shahrining nufuzli ta'lim muassasalaridan biri hisoblanadi. 1966-yilda tashkil topgan maktab O'zbekiston Respublikasi Maktabgacha va maktab ta'limi vazirligi tasarrufida faoliyat yuritadi. Maktabda 1–11-sinflar kesimida 2,448 nafar o'quvchi tahsil oladi. Ta'lim jarayoni haftasiga 6 kunlik qat'iy o'quv jadvali asosida tashkil etilgan." 
                : "Navoi City Specialized State Secondary School №16 is a premier public secondary institution located in the industrial and cultural hub of Navoi City, Uzbekistan. Founded in 1966, the institution operates under the statutory authority of the Ministry of Preschool and School Education of the Republic of Uzbekistan. The school serves 2,448 co-educational students across primary, middle, and upper secondary tiers (Grades 1 through 11). Instruction is conducted on a rigorous six-day weekly calendar."}
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700">
              <strong className="text-school-navy font-bold">{isUz ? "Maktabimiz Missiyasi:" : "Institutional Mission:"}</strong> "{isUz ? "Ta'lim olishga, yetakchilik qilishga, hamkorlikda ishlashga va jamiyatda ijobiy o'zgarishlar yaratishga qodir bilimdon, mas'uliyatli va faol yoshlarni tarbiyalash." : settings.mission}"
            </div>
          </section>

          {/* Section 2: Academic Program & Specialization */}
          <section className="space-y-4">
            <h3 className="text-base font-extrabold text-school-navy uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="text-school-gold font-black">2.</span> {isUz ? "Akademik Dastur Va Ixtisoslashtirilgan Fanlar" : "Academic Program & Specialized Concentrations"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {isUz 
                ? "O'zbekiston Milliy O'quv Dasturi asosida 16-sonli maktab o'quvchilarni yetakchi oliygohlarga tayyorlash uchun quyidagi ustuvor yo'nalishlarda chuqurlashtirilgan ta'lim beradi:" 
                : "Following Uzbekistan's standardized national secondary curriculum, School №16 provides rigorous general education with designated specialized instruction tracks designed to prepare students for demanding university programs worldwide. Specialized instruction focuses on:"}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {specializedList.map((sub) => (
                <div key={sub.id} className="p-3 bg-school-bg-secondary rounded-lg border border-slate-200">
                  <div className="text-xs font-bold text-school-navy">{sub.name}</div>
                  <div className="text-[11px] text-school-gold font-semibold uppercase">{sub.category}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{sub.applicableGrades}</div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 italic pt-2">
              {isUz 
                ? "O'quv eslatmasi: Maktabda davlat ta'lim standarti bo'yicha jami 20 ta umumta'lim fani yosh xususiyatlariga muvofiq sinflar kesimida taqsimlangan holda o'qitiladi." 
                : "Curricular Note: In total, the school provides instructional programming across 20 state-mandated subject disciplines distributed through age-appropriate developmental grades."}
            </p>
          </section>

          {/* Section 3: 100-Point Assessment System */}
          <section className="space-y-4">
            <h3 className="text-base font-extrabold text-school-navy uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="text-school-gold font-black">3.</span> {isUz ? "Choraklik 100 Ballik Baholash Tizimi" : "100-Point Quarterly Assessment Methodology"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {isUz 
                ? "Davlat ta'lim mezonlariga asosan har chorakda har bir fan bo'yicha yakuniy ball 100 ballik shkala asosida quyidagi 3 ta komponent orqali shakllanadi:" 
                : "In accordance with national educational directives, student subject outcomes are calculated each quarter out of 100 maximum points. The quarterly score reflects three distinct evaluation modalities:"}
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-school-navy text-white font-bold">
                    <th className="p-3">{isUz ? "Baholash Komponenti" : "Evaluation Component"}</th>
                    <th className="p-3 text-center">{isUz ? "Qisqartmasi" : "Identifier"}</th>
                    <th className="p-3 text-center">{isUz ? "Maksimal Ball" : "Max Points"}</th>
                    <th className="p-3">{isUz ? "Tavsifi Va O'tkazilish Tartibi" : "Methodology & Frequency"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {assessmentComponents.map((c) => (
                    <tr key={c.id}>
                      <td className="p-3 font-bold text-school-navy">{c.name}</td>
                      <td className="p-3 text-center font-semibold text-slate-600">{c.code}</td>
                      <td className="p-3 text-center font-extrabold text-school-gold-dark">{c.maxPoints} {isUz ? "ball" : "pts"}</td>
                      <td className="p-3 text-slate-600 text-[11px] leading-relaxed">{c.description}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td className="p-3 text-school-navy">{isUz ? "Choraklik Umumiy Ball" : "Quarterly Total"}</td>
                    <td className="p-3 text-center">COMPOSITE</td>
                    <td className="p-3 text-center text-school-navy">100 {isUz ? "ball" : "pts"}</td>
                    <td className="p-3 text-slate-600 text-[11px]">
                      {isUz ? "Choraklik yakuniy 5 ballik davlat bahosini belgilovchi umumiy ball." : "Cumulative total determining quarterly national grade (1–5)."}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: National Grading Scale & International Interpretation */}
          <section className="space-y-4">
            <h3 className="text-base font-extrabold text-school-navy uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="text-school-gold font-black">4.</span> {isUz ? "Davlat Baholash Shkalasi Va Xalqaro Ekvivalentlik" : "Grading Scale & International Concordance"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {isUz 
                ? "O'zbekiston maktab shahodatnomalarida 5 ballik baholash tizimi qayd etiladi. Quyida 100 ballik shkala va AQSH ekvivalenti ko'rsatilgan:" 
                : "Transcripts in Uzbekistan report the standard 5-point national grade. Below is the concordance matrix with illustrative US reference equivalents:"}
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-school-navy text-white font-bold">
                    <th className="p-3">{isUz ? "100 Ballik Oraliq" : "100-Point Score"}</th>
                    <th className="p-3 text-center">{isUz ? "Milliy Baho" : "Uzbek Grade"}</th>
                    <th className="p-3">{isUz ? "Bahoning Tavsifi" : "Qualitative Definition"}</th>
                    <th className="p-3 text-center">{isUz ? "AQSH Tizimi" : "US Reference"}</th>
                    <th className="p-3">{isUz ? "Qoidalar" : "Academic Protocols"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gradingScale.map((g) => (
                    <tr key={g.id}>
                      <td className="p-3 font-bold text-school-navy">{g.scoreRange}</td>
                      <td className="p-3 text-center font-extrabold text-sm">{g.uzbekGrade}</td>
                      <td className="p-3 font-semibold text-slate-700">
                        {isUz ? (
                          g.uzbekGrade === '5' ? "A'lo (High Academic Honors)" :
                          g.uzbekGrade === '4' ? "Yaxshi (Good Standing)" :
                          g.uzbekGrade === '3' ? "Qoniqarli (Satisfactory)" :
                          "Qoniqarsiz (Additional Support)"
                        ) : g.description}
                      </td>
                      <td className="p-3 text-center font-bold text-school-navy bg-slate-50">{g.usReference}</td>
                      <td className="p-3 text-slate-600 text-[11px]">
                        {isUz ? (
                          g.uzbekGrade === '5' ? "Mavzularni to'liq va mustaqil o'zlashtirgan." :
                          g.uzbekGrade === '4' ? "Asosiy o'quv dasturini to'liq egallagan." :
                          g.uzbekGrade === '3' ? "Asosiy talablarga javob beradi." :
                          "Qo'shimcha tayyorgarlik va qayta topshirish talab etiladi."
                        ) : g.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Credential Evaluation Guidance & Disclaimers */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs text-amber-950">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                {isUz ? "Xorijiy Universitetlar Uchun Rasmiy Eslatma:" : "Credential Evaluation Notice for Foreign Universities:"}
              </div>
              <p className="leading-relaxed">
                • <strong>{isUz ? "AQSH GPA Tizimi:" : "US GPA Interpretation:"}</strong> {isUz 
                  ? "\"Ushbu taqqoslashlar faqat tushunishni osonlashtirish uchun berilgan bo'lib, rasmiy GPA o'girish hisoblanmaydi. Universitetlar o'z baholash metodologiyalaridan foydalanishlari mumkin.\"" 
                  : "\"These comparisons are provided for general interpretation only. They are not official GPA conversions. Universities and credential evaluation organizations may use their own conversion methodologies.\""}
              </p>
              <p className="leading-relaxed">
                • <strong>{isUz ? "Buyuk Britaniya Tizimi:" : "United Kingdom Systems:"}</strong> {isUz 
                  ? "O'zbekiston maktab shahodatnomasi to'g'ridan-to'g'ri GCSE yoki A-Level baholariga tenglashtirilmaydi (UK ENIC / Ecctis agentligi xulosasi tavsiya etiladi)." 
                  : "Uzbek school grades cannot be directly equated with GCSE or GCE A-level grades without an authorized credential evaluation (such as UK ENIC / Ecctis)."}
              </p>
              <p className="leading-relaxed">
                • <strong>{isUz ? "Qayta Baholash Qoidasi:" : "Reassessment Policy:"}</strong> {isUz 
                  ? "45 balldan past natija o'quvchining sinfda qolishini emas, balki tuzilgan reja asosida qo'shimcha shug'ullanish va qayta topshirishini bildiradi." 
                  : "Scores below 45 points initiate structured remedial preparation and reassessment under school regulations, rather than automatic repetition of an entire academic year."}
              </p>
            </div>
          </section>

          {/* Section 5: Academic Quarters & Extracurricular Opportunities */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            <div>
              <h3 className="text-base font-extrabold text-school-navy uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2 mb-3">
                <span className="text-school-gold font-black">5.</span> {isUz ? "O'quv Yili Taqvim Choraklari" : "Academic Calendar"}
              </h3>
              <div className="space-y-2 text-xs">
                {academicQuarters.map((q, idx) => (
                  <div key={q.id} className="p-2.5 bg-slate-50 rounded-lg flex justify-between items-center">
                    <span className="font-bold text-school-navy">{isUz ? `${idx + 1}-chorak` : q.quarterName}</span>
                    <span className="text-slate-600">{q.months}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-school-navy uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2 mb-3">
                <span className="text-school-gold font-black">6.</span> {isUz ? "To'garaklar Va O'quvchilar Faoliyati" : "Extracurricular Scope"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {isUz 
                  ? "16-sonli maktabda munozara klubi, ekologiya qo'mitasi, hunarmandchilik to'garagi, virtual kimyo to'garagi, musiqa ansambli, rasm to'garagi, Turon teatri, raqs studiyasi hamda shaxmat, futbol, voleybol, tennis va kurash sport seksiyalari faoliyat ko'rsatadi." 
                  : "School №16 maintains active student societies including Debate Club, School Eco Committee, Sewing & Handicrafts Club, Virtual Chemistry Club, Instrumental Ensemble, Art Club, Turon Theatre, Dance & Ballet, and athletic teams in Chess, Football, Volleyball, Tennis, and Wrestling."}
              </p>
            </div>
          </section>

          {/* Section 7: Official Counselor Verification */}
          <div className="border-t-2 border-school-navy pt-8">
            <h3 className="text-base font-extrabold text-school-navy uppercase tracking-wider mb-4">
              {isUz ? "Bog'lanish Va Maslahatchi Tasdig'i" : "Institutional Contact & Counselor Verification"}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-700 bg-school-bg-secondary p-5 rounded-xl border border-slate-200">
              <div>
                <span className="font-bold text-school-navy block mb-1">{isUz ? "Maktab Manzili" : "Campus Address"}</span>
                <span className="text-slate-600">{settings.address}, {settings.postalCode}</span>
              </div>
              <div>
                <span className="font-bold text-school-navy block mb-1">{isUz ? "Telefon" : "Telephone"}</span>
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-school-navy font-semibold hover:underline">
                  {settings.phone}
                </a>
              </div>
              <div>
                <span className="font-bold text-school-navy block mb-1">{isUz ? "Kollej Maslahatchisi Emaili" : "Admissions Counselor Email"}</span>
                <a href={`mailto:${settings.counselorEmail}`} className="text-school-gold-dark font-bold hover:underline break-all">
                  {settings.counselorEmail}
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
              <span>{isUz ? "Navoiy shahar 16-sonli ixtisoslashtirilgan davlat umumta'lim maktabi • O'zbekiston Respublikasi" : "Navoi City Specialized State Secondary School №16 • Republic of Uzbekistan"}</span>
              <span>{isUz ? "Rasmiy Muassasa Hujjati • Matnli PDF" : "Official Institutional Document • Selectable PDF Text"}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};