import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building, 
  ExternalLink, 
  ShieldCheck,
  Send,
  CheckCircle2
} from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { SectionHeading } from '../../components/common/SectionHeading';
import { translations } from '../../lib/translations';

export const ContactPage: React.FC = () => {
  const { settings, currentLanguage } = useSchoolData();

  const isUz = currentLanguage === 'uz';
  const t = translations[currentLanguage] || translations.en;

  const mapAddressQuery = encodeURIComponent(`${settings.address}, ${settings.postalCode}`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapAddressQuery}`;

  return (
    <div className="min-h-screen bg-white">
      
      {/* Page Header */}
      <section className="bg-school-navy-dark text-white py-16 lg:py-20 border-b border-school-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-school-gold uppercase tracking-wider mb-4">
              {isUz ? "Rasmiy Aloqa Bo'limi" : "Institutional Contact"}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              {t.contact.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {isUz 
                ? "O'quvchilar, ota-onalar, xorijiy universitetlar qabul komissiyalari va hamkor tashkilotlar uchun rasmiy aloqa kanallari." 
                : "Official communication channels for students, prospective parents, university admissions officers, and partner institutions."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Cards Column */}
            <div className="lg:col-span-5 space-y-6">
              
              <SectionHeading
                badge={isUz ? "RASMIY ALOQA" : "OFFICIAL DIRECTORY"}
                title={isUz ? "Biz Bilan Bog'laning" : "Get in Touch"}
                subtitle={isUz ? "Maktab ma'muriyati va maslahatchi xizmati bilan tasdiqlangan rasmiy kanallar orqali bog'laning." : "Reach our administration and counseling office directly via verified institutional channels."}
              />

              {/* Physical Address Card */}
              <div className="bg-school-bg-secondary rounded-2xl p-6 border border-slate-200 shadow-subtle hover:shadow-card transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-school-navy text-school-gold flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {t.contact.campusAddress}
                  </span>
                  <h3 className="text-base font-bold text-school-navy mb-1">
                    {settings.address}
                  </h3>
                  <p className="text-xs text-school-muted mb-3">
                    {isUz ? "Pochta indeksi:" : "Postal Code:"} {settings.postalCode} • {isUz ? "Navoiy shahri, O'zbekiston Respublikasi" : "Navoi City, Republic of Uzbekistan"}
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-school-gold-dark hover:underline"
                  >
                    <span>{isUz ? "Google Xaritalarda ochish" : "Open in Google Maps"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Telephone Card */}
              <div className="bg-school-bg-secondary rounded-2xl p-6 border border-slate-200 shadow-subtle hover:shadow-card transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-school-navy text-school-gold flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {t.contact.telephone}
                  </span>
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="text-lg font-extrabold text-school-navy hover:text-school-gold transition-colors block mb-1"
                  >
                    {settings.phone}
                  </a>
                  <p className="text-xs text-school-muted">
                    {isUz ? "Qabul vaqti: Dushanba – Shanba (08:30 – 17:00)" : "Available during administrative hours: Monday – Saturday (8:30 AM – 5:00 PM UZT)"}
                  </p>
                </div>
              </div>

              {/* Counselor Email Card */}
              <div className="bg-school-bg-secondary rounded-2xl p-6 border border-slate-200 shadow-subtle hover:shadow-card transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-school-navy text-school-gold flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {t.contact.counselorEmail}
                  </span>
                  <a
                    href={`mailto:${settings.counselorEmail}`}
                    className="text-base font-bold text-school-navy hover:text-school-gold transition-colors block mb-1 break-all"
                  >
                    {settings.counselorEmail}
                  </a>
                  <p className="text-xs text-school-muted">
                    {isUz 
                      ? "O'quvchi ma'lumotnomalari, tavsiyanomalar va baholar varaqasi bo'yicha to'g'ridan-to'g'ri aloqa." 
                      : "Direct channel for admissions verification, recommendation requests, and transcripts."}
                  </p>
                </div>
              </div>

              {/* Operational Schedule */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-school-navy">
                  <Clock className="w-4 h-4 text-school-gold" />
                  <span>{isUz ? "O'quv Tartibi Va Ish Vaqti" : "Academic Schedule & Hours"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span>{isUz ? "O'quv haftasi:" : "Instructional Week:"}</span>
                  <span className="font-semibold text-school-navy">{isUz ? "Olti kunlik dars jadvali" : settings.schoolWeek}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span>{isUz ? "Dars mashg'ulotlari:" : "Classroom Timetable:"}</span>
                  <span className="font-semibold text-school-navy">08:00 – 14:00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>{isUz ? "Ma'muriyat qabul vaqti:" : "Administrative Office:"}</span>
                  <span className="font-semibold text-school-navy">08:30 – 17:00</span>
                </div>
              </div>

            </div>

            {/* Map Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
                <div className="p-5 bg-school-navy text-white flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-school-gold" />
                      {isUz ? "Maktabning Xaritadagi O'rni" : "School Location Map"}
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      15-A, Nurafshon Street, Navoi City, Uzbekistan, 210100
                    </p>
                  </div>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-school-gold transition-all flex items-center gap-1"
                  >
                    <span>{isUz ? "Katta Xaritada" : "Satellite View"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* OpenStreetMap verified interactive frame */}
                <div className="w-full h-[400px] sm:h-[480px] bg-slate-100 relative">
                  <iframe
                    title="Navoi City School 16 Location Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent('15-A Nurafshon Street, Navoi City, Uzbekistan')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>

                <div className="p-5 bg-school-bg-secondary border-t border-slate-200 text-xs text-school-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-school-gold" />
                    <span>{isUz ? "16-sonli maktabning rasmiy tasdiqlangan binosi." : "Official verified physical address for public state school №16."}</span>
                  </div>
                  <a
                    href={`https://yandex.com/maps/?text=${mapAddressQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-school-navy font-semibold hover:text-school-gold flex items-center gap-1 shrink-0"
                  >
                    <span>Yandex Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};