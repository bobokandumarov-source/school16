import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  Download, 
  Globe2, 
  BarChart3, 
  FileCheck2,
  Info
} from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { SectionHeading } from '../../components/common/SectionHeading';
import { generateSchoolProfilePdf } from '../../lib/pdfGenerator';
import { translations } from '../../lib/translations';

export const AssessmentPage: React.FC = () => {
  const { settings, subjects, assessmentComponents, gradingScale, academicQuarters, currentLanguage } = useSchoolData();

  const isUz = currentLanguage === 'uz';
  const t = translations[currentLanguage] || translations.en;

  const handleDownloadPdf = () => {
    generateSchoolProfilePdf(settings, subjects, assessmentComponents, gradingScale, academicQuarters);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Page Header Banner */}
      <section className="bg-school-navy-dark text-white py-16 lg:py-20 border-b border-school-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-school-gold uppercase tracking-wider mb-4">
              {isUz ? "Xalqaro Qabul Qo'llanmasi" : "International Admissions Guide"}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              {t.academics.assessmentTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {isUz 
                ? "O'zbekistonda amal qiluvchi choraklik 100 ballik baholash tizimi, BSB va CHSB summativ baholash mexanizmlari hamda xalqaro baholarga o'girish qoidalari." 
                : "A comprehensive explanation of Uzbekistan's 100-point quarterly grading architecture, summative assessment models (BSB & CHSB), and international concordance benchmarks."}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Context */}
      <section className="py-14 bg-school-bg-secondary border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-school-gold block mb-1">
                {isUz ? "Qabul Komissiyalari Uchun Rasmiy Izoh" : "Institutional Context For Admissions Officers"}
              </span>
              <h2 className="text-xl font-bold text-school-navy mb-2">
                {isUz ? "Davlat Ta'lim Standartlari Asosida Baholash" : "Standardized Evaluation Under the National Framework"}
              </h2>
              <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                {isUz 
                  ? "O'zbekiston maktablarida Maktabgacha va maktab ta'limi vazirligi tomonidan tasdiqlangan yagona baholash tizimi amal qiladi. O'quvchining har chorakdagi o'zlashtirishi kunlik baholar va summativ imtihonlar uyg'unligidan iborat 100 ballik tizim orqali aniqlanadi." 
                  : "Secondary schools across Uzbekistan operate under uniform statutory assessment regulations administered by the Ministry of Preschool and School Education. Rather than relying on cumulative percentage GPAs, quarterly outcomes are computed through a rigorous 100-point composite of formative daily engagement and formal summative examinations."}
              </p>
            </div>
            <button
              onClick={handleDownloadPdf}
              className="px-5 py-3 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white text-xs sm:text-sm font-bold transition-all shadow-subtle flex items-center gap-2 shrink-0"
            >
              <Download className="w-4 h-4 text-school-gold" />
              <span>{t.schoolProfile.downloadPdf}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 100-Point Quarterly Assessment Structure */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge={isUz ? "CHORAKLIK BAHOLASH MODELI" : "QUARTERLY EVALUATION MODEL"}
            title={t.academics.componentsTitle}
            subtitle={isUz ? "Har bir o'quv choragida har bir fan bo'yicha yakuniy ball uchta asosiy komponent yig'indisi sifatida 100 ballik tizimda hisoblanadi." : "Each academic quarter, student mastery in every subject is calculated on a 100-point scale synthesized from three distinct components."}
          />

          {/* Visual horizontal breakdown progress indicator */}
          <div className="mb-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card">
            <h3 className="text-xs font-bold uppercase tracking-wider text-school-muted mb-4">
              {isUz ? "Choraklik 100 Ballik Taqsimot Tuzilmasi" : "Composite Quarterly Distribution (100 Points Total)"}
            </h3>
            
            <div className="w-full h-12 rounded-xl overflow-hidden flex shadow-inner bg-slate-100 p-1 gap-1">
              {/* Daily 10% */}
              <div 
                className="h-full bg-slate-700 text-white rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm px-2 transition-all hover:bg-slate-800"
                style={{ width: '10%' }}
                title="Kundalik baholash: maksimal 10 ball"
              >
                10%
              </div>

              {/* BSB 50% */}
              <div 
                className="h-full bg-school-navy text-white rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm px-2 transition-all hover:bg-school-navy-light"
                style={{ width: '50%' }}
                title="BSB bo'lim summativ baholash: maksimal 50 ball"
              >
                BSB: 50%
              </div>

              {/* CHSB 40% */}
              <div 
                className="h-full bg-school-gold text-school-navy-dark rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm px-2 transition-all hover:bg-school-gold-light"
                style={{ width: '40%' }}
                title="CHSB choraklik imtihon: maksimal 40 ball"
              >
                CHSB: 40%
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs text-school-muted">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-700 shrink-0" />
                <span><strong>{isUz ? "Kundalik dars faolligi:" : "Daily Classroom:"}</strong> {isUz ? "maksimal 10 ball" : "10 max points"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-school-navy shrink-0" />
                <span><strong>{isUz ? "BSB (Bo'lim summativ baholash):" : "BSB (Summative Units):"}</strong> {isUz ? "maksimal 50 ball" : "up to 50 max points"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-school-gold shrink-0" />
                <span><strong>{isUz ? "CHSB (Choraklik imtihon):" : "CHSB (Quarterly Exam):"}</strong> {isUz ? "maksimal 40 ball" : "40 max points"}</span>
              </div>
            </div>
          </div>

          {/* Component Explanatory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Daily Classroom Assessment */}
            <div className="bg-school-bg-secondary rounded-2xl p-7 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {isUz ? "Formativ Baholash" : "Formative Component"}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-white text-school-navy border border-slate-200">
                    {isUz ? "Maks. 10 Ball" : "10 Points Max"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-school-navy mb-3">
                  {isUz ? "Kundalik Dars Faolligi" : "Daily Classroom Assessment"}
                </h3>
                <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                  {isUz 
                    ? "Kundalik dars faolligi choraklik bahoga 10 ballgacha hissa qo'shadi. Bu darsga tayyorgarlik, uy vazifalarini muntazam bajarish, og'zaki javoblar va darsdagi amaliy topshiriqlarni o'z ichiga oladi." 
                    : "Daily classroom performance contributes up to 10 points toward the quarterly assessment. This ongoing evaluation reflects lesson preparation, regular homework completion, active participation, oral answers, and daily practical execution in class."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500">
                {isUz ? "Chorak davomida muntazam baholanadi" : "Continuous teacher evaluation across the quarter"}
              </div>
            </div>

            {/* BSB Summative Assessment */}
            <div className="bg-school-bg-secondary rounded-2xl p-7 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-school-navy font-extrabold">
                    BSB (Bo'lim Summativ Baholash)
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-school-navy text-white">
                    {isUz ? "Maks. 50 Ball" : "50 Points Max"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-school-navy mb-3">
                  {isUz ? "Bo'lim Summativ Baholash" : "Unit-Based Summative Assessment"}
                </h3>
                <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                  {isUz 
                    ? "BSB o'quv dasturining ma'lum bo'lim yoki mavzulari yakunida o'tkaziladi. Chorak davomida o'tkazilgan barcha BSB nazorat ishlarining umumiy yig'indisi choraklik bahoga maksimal 50 ball beradi." 
                    : "BSB refers to unit-based summative assessment. It is conducted after relevant textbook units or learning sections have been completed. The combined BSB contribution across all evaluated units is up to 50 points per quarter. (Note: Individual BSB tests do not each award 50 points; their cumulative total constitutes up to 50 points)."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500">
                {isUz ? "Bo'limlar yakunida navbatma-navbat o'tkaziladi" : "Conducted at regular sectional intervals throughout the quarter"}
              </div>
            </div>

            {/* CHSB Summative Assessment */}
            <div className="bg-school-bg-secondary rounded-2xl p-7 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-school-gold-dark font-extrabold">
                    CHSB (Choraklik Summativ Baholash)
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-school-gold text-school-navy-dark">
                    {isUz ? "Maks. 40 Ball" : "40 Points Max"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-school-navy mb-3">
                  {isUz ? "Choraklik Yakuniy Imtihon" : "Quarterly Summative Assessment"}
                </h3>
                <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                  {isUz 
                    ? "CHSB — chorak oxirida o'tkaziladigan yagona yakuniy imtihon bo'lib, o'quvchining chorak davomida olgan bilimlarini tekshiradi va umumiy chorak bahosiga 40 ballgacha hissa qo'shadi." 
                    : "CHSB refers to the comprehensive quarterly summative examination. Administered once toward the conclusion of each quarter, it assesses cumulative understanding and retention across the entire quarter's curriculum and contributes up to 40 points toward the final grade."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500">
                {isUz ? "Chorak yakunida o'tkaziladigan yagona imtihon" : "Unified end-of-quarter standardized examination"}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Uzbek National Grading Scale Table */}
      <section className="py-16 bg-school-bg-secondary border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge={isUz ? "DAVLAT BAHOLASH SHKALASI" : "NATIONAL GRADING SCALE"}
            title={t.academics.gradingTitle}
            subtitle={isUz ? "100 ballik shkala natijasi rasmiy baholar jurnaliga va shahodatnomaga qo'yiladigan 5 ballik davlat bahosiga to'g'ridan-to'g'ri o'giriladi." : "The combined points (out of 100) translate directly into the official 5-point national grade recorded on official state transcripts."}
          />

          <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-school-navy text-white text-xs uppercase tracking-wider">
                    <th className="py-4 px-6 font-bold">{isUz ? "100 Ballik Oraliq" : "100-Point Score Range"}</th>
                    <th className="py-4 px-6 font-bold text-center">{isUz ? "Davlat Bahosi" : "Uzbek Grade"}</th>
                    <th className="py-4 px-6 font-bold">{isUz ? "Bahoning Tavsifi" : "Qualitative Standing"}</th>
                    <th className="py-4 px-6 font-bold">{isUz ? "Qo'shimcha Qoidalar" : "Academic Standing & Protocols"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {gradingScale.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 font-extrabold text-school-navy">
                        {item.scoreRange}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                          item.uzbekGrade === '5' ? 'bg-emerald-100 text-emerald-800' :
                          item.uzbekGrade === '4' ? 'bg-blue-100 text-blue-800' :
                          item.uzbekGrade === '3' ? 'bg-amber-100 text-amber-800' :
                          item.uzbekGrade === '2' ? 'bg-rose-100 text-rose-800' :
                          'bg-slate-100 text-slate-700 text-xs px-2 w-auto'
                        }`}>
                          {item.uzbekGrade}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-800">
                        {isUz ? (
                          item.uzbekGrade === '5' ? "A'lo (High Academic Honors)" :
                          item.uzbekGrade === '4' ? "Yaxshi (Good Standing)" :
                          item.uzbekGrade === '3' ? "Qoniqarli (Satisfactory)" :
                          "Qoniqarsiz (Additional Support)"
                        ) : item.description}
                      </td>
                      <td className="py-4 px-6 text-school-muted leading-relaxed">
                        {isUz ? (
                          item.uzbekGrade === '5' ? "Mavzularni to'liq o'zlashtirgan va chuqur mustaqil tahliliy ko'nikmaga ega." :
                          item.uzbekGrade === '4' ? "Asosiy o'quv dasturi talablarini to'liq va mustaqil o'zlashtirgan." :
                          item.uzbekGrade === '3' ? "Asosiy standartlarga mos, minimal ijobiy baho hisoblanadi." :
                          "O'quvchi bilan qayta ishlash va qo'shimcha topshiriqlar beriladi."
                        ) : item.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-school-muted flex items-start gap-2">
              <Info className="w-4 h-4 text-school-navy shrink-0 mt-0.5" />
              <span>
                <strong>{isUz ? "Akademik Qoida:" : "Academic Standing Policy:"}</strong> {isUz 
                  ? "45 balldan past natija ko'rsatgan o'quvchiga maktab nizomiga muvofiq qo'shimcha darslar va qayta topshirish imkoniyati beriladi." 
                  : "Below 45 points, students are assigned structured additional preparation and reassessment according to school academic procedures. This does not automatically entail repeating an entire academic year."}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* International Grading Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge={isUz ? "XALQARO TAQQOSLASH" : "CREDENTIAL CONCORDANCE"}
            title={isUz ? "Baholarni Xalqaro Standartlar Bilan Taqqoslash" : "Understanding Uzbek Grades Internationally"}
            subtitle={isUz ? "Xorijiy universitetlar qabul komissiyalari va xalqaro tashkilotlar uchun tavsiyaviy ma'lumotnoma." : "Illustrative reference guidance for overseas university admissions officers and credential evaluation services."}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Concordance Table */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
                <div className="p-5 bg-school-navy text-white">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-school-gold" />
                    {isUz ? "Xalqaro Baholar Ekvivalenti Jadvali" : "Illustrative Grade Equivalence Table"}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {isUz ? "O'zbekiston maktab shahodatnomalarini tushunish uchun umumiy ma'lumotnoma." : "General concordance references for admissions officers interpreting Uzbek secondary transcripts."}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                        <th className="py-3 px-5">{isUz ? "Ball Oralig'i" : "Uzbek Score"}</th>
                        <th className="py-3 px-5 text-center">{isUz ? "Milliy Baho" : "Uzbek Grade"}</th>
                        <th className="py-3 px-5 text-center">{isUz ? "AQSH Tizimi" : "US-Style Reference"}</th>
                        <th className="py-3 px-5">{isUz ? "O'zlashtirish Darajasi" : "Performance Level"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-5 font-bold text-school-navy">85–100</td>
                        <td className="py-3.5 px-5 text-center font-bold">5</td>
                        <td className="py-3.5 px-5 text-center font-bold text-emerald-700 bg-emerald-50/50">A / 4.0</td>
                        <td className="py-3.5 px-5 text-slate-600">{isUz ? "Standartlarni a'lo darajada o'zlashtirish" : "Excellent mastery of curricular standards"}</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-5 font-bold text-school-navy">75–84</td>
                        <td className="py-3.5 px-5 text-center font-bold">4</td>
                        <td className="py-3.5 px-5 text-center font-bold text-blue-700 bg-blue-50/50">B / 3.0</td>
                        <td className="py-3.5 px-5 text-slate-600">{isUz ? "Yaxshi va chuqur tushunchaga ega" : "Good, well-developed conceptual understanding"}</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-5 font-bold text-school-navy">60–74</td>
                        <td className="py-3.5 px-5 text-center font-bold">3</td>
                        <td className="py-3.5 px-5 text-center font-bold text-amber-700 bg-amber-50/50">C / 2.0</td>
                        <td className="py-3.5 px-5 text-slate-600">{isUz ? "Qoniqarli; asosiy talablarga javob beradi" : "Satisfactory; meets core requirements"}</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-5 font-bold text-school-navy">45–59</td>
                        <td className="py-3.5 px-5 text-center font-bold">2</td>
                        <td className="py-3.5 px-5 text-center font-bold text-rose-700 bg-rose-50/50">D–F / 0–1.0</td>
                        <td className="py-3.5 px-5 text-slate-600">{isUz ? "Qoniqarsiz; minimal talabdan past" : "Unsatisfactory; below threshold"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mandatory Disclaimer Box */}
                <div className="p-5 bg-amber-50/70 border-t border-amber-200/80 text-xs text-amber-950 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    {isUz ? "Rasmiy Ogohlantirish" : "Official Institutional Disclaimer"}
                  </div>
                  <p className="leading-relaxed">
                    {isUz 
                      ? "\"Ushbu taqqoslashlar faqat umumiy tushuncha berish maqsadida keltirilgan. Ular rasmiy GPA konvertatsiyasi hisoblanmaydi. Universitetlar va akkreditatsiya tashkilotlari o'z baholash mezonlaridan foydalanishlari mumkin.\"" 
                      : "\"These comparisons are provided for general interpretation only. They are not official GPA conversions. Universities and credential evaluation organizations may use their own conversion methodologies.\""}
                  </p>
                </div>
              </div>
            </div>

            {/* International Context Notes */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* United Kingdom Context Card */}
              <div className="bg-school-bg-secondary rounded-2xl p-6 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-school-navy block mb-2">
                  {isUz ? "Buyuk Britaniya Qabul Tizimi" : "United Kingdom Admissions Context"}
                </span>
                <h4 className="text-base font-bold text-school-navy mb-2">
                  {isUz ? "GCSE & A-Level Ekvivalentligi Bo'yicha" : "GCSE & A-Level Equivalency Guidelines"}
                </h4>
                <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                  {isUz 
                    ? "O'zbekiston shahodatnomasi to'g'ridan-to'g'ri GCSE yoki A-Level baholariga tenglashtirilmaydi. Xorijiy universitetlar UK ENIC / Ecctis kabi rasmiy baholash agentliklari xulosasiga tayanadilar." 
                    : "Uzbek secondary school grades cannot be directly equated with GCSE or GCE A-level grades without an authorized credential evaluation (such as UK ENIC / Ecctis). Navoi School №16 does not assign arbitrary letter grades or numerical GCSE-equivalent scores. Overseas institutions are encouraged to request verified syllabus content or counselor transcripts."}
                </p>
              </div>

              {/* General International Context Card */}
              <div className="bg-school-bg-secondary rounded-2xl p-6 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-school-gold block mb-2">
                  {isUz ? "Qabul Maslahati" : "Admissions Consultation"}
                </span>
                <h4 className="text-base font-bold text-school-navy mb-2">
                  {isUz ? "Kollej Maslahatchisi Bilan Bog'lanish" : "Counselor Verification"}
                </h4>
                <p className="text-xs sm:text-sm text-school-muted leading-relaxed mb-4">
                  {isUz 
                    ? "Rasmiy o'quvchi baholari jadvallari, sertifikatlangan shkalalar va o'quv dasturi bo'yicha maktabimizning kollej maslahatchisi bilan bog'lanishingiz mumkin:" 
                    : "For official student transcripts, certified grading scale verifications, or curriculum inquiries, please contact our institutional counselor office directly:"}
                </p>
                <div className="text-xs space-y-1 text-school-navy font-semibold">
                  <div>Email: <a href={`mailto:${settings.counselorEmail}`} className="text-school-gold hover:underline">{settings.counselorEmail}</a></div>
                  <div>{isUz ? "Telefon:" : "Telephone:"} {settings.phone}</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};