import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Award, ArrowUpRight, Lock, ExternalLink } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { translations } from '../../lib/translations';

export const Footer: React.FC = () => {
  const { settings, currentLanguage } = useSchoolData();
  const t = translations[currentLanguage] || translations.en;

  const schoolTitle = currentLanguage === 'uz' && settings.uzName ? settings.uzName : settings.name;

  return (
    <footer className="bg-school-navy-dark text-slate-300 border-t-4 border-school-gold">
      {/* Upper Footer: Main Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: School Identity & Rounded Emblem */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-14 h-14 rounded-full bg-white p-1.5 shadow-md border-2 border-school-gold/40 flex items-center justify-center shrink-0 overflow-hidden">
                <img 
                  src="/logos/school-logo-symbol.jpg" 
                  alt="Navoi School 16" 
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base tracking-tight leading-snug">
                  {schoolTitle}
                </h3>
                <p className="text-school-gold text-xs font-semibold tracking-wider uppercase">
                  {t.footer.location}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pr-4">
              {t.footer.description}
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                <Award className="w-3.5 h-3.5 text-school-gold" />
                <span>{t.footer.grades}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Institutional Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2">
              {t.footer.officialContact}
            </h4>
            
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-school-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-xs">{t.footer.address}</span>
                  <span className="text-slate-200">
                    {settings.address}, {settings.postalCode}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-school-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-xs">{t.footer.telephone}</span>
                  <a 
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`} 
                    className="text-slate-200 hover:text-school-gold transition-colors font-medium"
                  >
                    {settings.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-school-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-xs">{t.footer.counselorEmail}</span>
                  <a 
                    href={`mailto:${settings.counselorEmail}`} 
                    className="text-slate-200 hover:text-school-gold transition-colors font-medium break-all"
                  >
                    {settings.counselorEmail}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Admissions Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.curriculum}
                </Link>
              </li>
              <li>
                <Link to="/academics/assessment" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.assessment}
                </Link>
              </li>
              <li>
                <Link to="/student-life" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.studentLife}
                </Link>
              </li>
              <li>
                <Link to="/our-people" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.ourPeople}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-slate-400 hover:text-white transition-colors">
                  {t.nav.news}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: For Universities & Evaluators */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2">
              {currentLanguage === 'uz' ? 'Universitetlar Uchun' : 'For Universities'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {currentLanguage === 'uz'
                ? "Xalqaro qabul komissiyalari va diplom baholash tashkilotlari uchun maxsus tayyorlangan."
                : "Designed specifically for international admissions officers and credential evaluation services."}
            </p>
            <Link
              to="/school-profile"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-school-gold/15 text-school-gold hover:bg-school-gold/25 border border-school-gold/30 text-xs font-bold transition-all"
            >
              <span>{t.nav.schoolProfile}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Social channels if configured in admin */}
            {(settings.socialLinks.telegram || settings.socialLinks.facebook || settings.socialLinks.instagram || settings.socialLinks.youtube) && (
              <div className="pt-2">
                <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-1.5">
                  {currentLanguage === 'uz' ? 'Rasmiy Sahifalar' : 'Official Channels'}
                </span>
                <div className="flex gap-2">
                  {settings.socialLinks.telegram && (
                    <a href={settings.socialLinks.telegram} target="_blank" rel="noreferrer" className="text-xs text-slate-300 hover:text-school-gold">Telegram</a>
                  )}
                  {settings.socialLinks.instagram && (
                    <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-xs text-slate-300 hover:text-school-gold">Instagram</a>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Admin Portal */}
      <div className="bg-[#051325] py-4 px-4 sm:px-6 lg:px-8 border-t border-white/5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} {schoolTitle}. {t.footer.rightsReserved}
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/contact" className="hover:text-slate-200 transition-colors">
              {t.nav.contact}
            </Link>
            <Link to="/school-profile" className="hover:text-slate-200 transition-colors">
              {t.nav.schoolProfile}
            </Link>
            <Link 
              to="/admin/login" 
              className="text-slate-400 hover:text-school-gold flex items-center gap-1 transition-colors"
            >
              <Lock className="w-3 h-3" /> {t.nav.adminDashboard}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};