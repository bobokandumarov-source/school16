import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Lock, Download, Award, BookOpen, Check } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { translations } from '../../lib/translations';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicsDropdown, setAcademicsDropdown] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { currentLanguage, setLanguage, isAuthenticated, settings } = useSchoolData();

  const t = translations[currentLanguage] || translations.en;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAcademicsDropdown(false);
    setLangMenuOpen(false);
  }, [location.pathname]);

  // Clean navigation links without the redundant "School Profile" link
  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { 
      name: t.nav.academics, 
      path: '/academics',
      hasDropdown: true,
      children: [
        { name: t.nav.curriculum, path: '/academics', desc: t.nav.curriculumDesc },
        { name: t.nav.assessment, path: '/academics/assessment', desc: t.nav.assessmentDesc },
      ]
    },
    { name: t.nav.studentLife, path: '/student-life' },
    { name: t.nav.ourPeople, path: '/our-people' },
    { name: t.nav.news, path: '/news' },
    { name: t.nav.contact, path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top institutional ribbon */}
      <div className="bg-school-navy-dark text-slate-300 text-xs py-2 px-4 border-b border-school-navy/80 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-school-gold font-medium">
              <Award className="w-3.5 h-3.5" /> {currentLanguage === 'uz' && settings.uzName ? settings.uzName : settings.name}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">{t.nav.established}</span>
          </div>

          <div className="flex items-center space-x-5">
            <Link 
              to="/school-profile" 
              className="text-slate-200 hover:text-school-gold flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-school-gold" /> {t.nav.officialProfilePdf}
            </Link>
            <span className="text-slate-400">|</span>
            {isAuthenticated ? (
              <Link 
                to="/admin" 
                className="text-school-gold hover:text-school-gold-light flex items-center gap-1 font-semibold transition-colors"
              >
                <Lock className="w-3 h-3" /> {t.nav.adminDashboard}
              </Link>
            ) : (
              <Link 
                to="/admin/login" 
                className="text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
              >
                <Lock className="w-3 h-3" /> {t.nav.staffPortal}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-slate-100 py-2.5' 
            : 'bg-white border-b border-slate-200 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* School Brand & Logo (Sleek Circular Crest, No Square Box!) */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-50 border border-slate-200/90 shadow-subtle p-1.5 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-school-gold/60 transition-colors">
                <img 
                  src="/logos/school-logo-symbol.jpg" 
                  alt="Navoi School 16 Emblem" 
                  className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105 duration-200"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-extrabold tracking-tight text-school-navy uppercase leading-tight">
                  {t.nav.brandTitle}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-school-gold uppercase tracking-wider">
                  {t.nav.brandSubtitle}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div 
                      key={link.name} 
                      className="relative"
                      onMouseEnter={() => setAcademicsDropdown(true)}
                      onMouseLeave={() => setAcademicsDropdown(false)}
                    >
                      <button
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          isActive(link.path)
                            ? 'text-school-navy bg-school-bg-secondary'
                            : 'text-school-text hover:text-school-navy hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-school-navy" />
                      </button>

                      {/* Dropdown Menu */}
                      {academicsDropdown && (
                        <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-elevated border border-slate-100 py-2 z-50 animate-fadeIn">
                          {link.children?.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`block px-4 py-3 transition-colors ${
                                location.pathname === child.path
                                  ? 'bg-school-bg-secondary text-school-navy border-l-2 border-school-gold'
                                  : 'text-school-text hover:bg-slate-50 hover:text-school-navy'
                              }`}
                            >
                              <div className="text-sm font-bold">{child.name}</div>
                              <div className="text-xs text-school-muted mt-0.5 leading-snug">{child.desc}</div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive(link.path)
                        ? 'text-school-navy bg-school-bg-secondary font-bold'
                        : 'text-school-text hover:text-school-navy hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Language Selector & Action */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Interactive Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-school-text hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <Globe className="w-3.5 h-3.5 text-school-navy" />
                  <span className="uppercase font-bold">{currentLanguage}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-elevated border border-slate-100 py-1.5 z-50 animate-fadeIn">
                    <button
                      onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                        currentLanguage === 'en' ? 'bg-school-bg-secondary font-bold text-school-navy' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-bold">EN</span>
                        <span>English</span>
                      </span>
                      {currentLanguage === 'en' && <Check className="w-3.5 h-3.5 text-school-gold" />}
                    </button>

                    <button
                      onClick={() => { setLanguage('uz'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between border-t border-slate-100 transition-colors ${
                        currentLanguage === 'uz' ? 'bg-school-bg-secondary font-bold text-school-navy' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-bold">UZ</span>
                        <span>O'zbek tili</span>
                      </span>
                      {currentLanguage === 'uz' && <Check className="w-3.5 h-3.5 text-school-gold" />}
                    </button>
                  </div>
                )}
              </div>

              {/* School Profile Action Button */}
              <Link
                to="/school-profile"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold transition-all shadow-subtle hover:shadow-card"
              >
                <BookOpen className="w-3.5 h-3.5 text-school-gold" />
                <span>{t.nav.schoolProfile}</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              {/* Quick Mobile Language Switcher */}
              <button
                onClick={() => setLanguage(currentLanguage === 'en' ? 'uz' : 'en')}
                className="px-2 py-1 text-xs font-bold text-school-navy bg-slate-100 rounded-lg border border-slate-200"
                title="Switch Language"
              >
                {currentLanguage === 'en' ? 'UZ' : 'EN'}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-school-navy hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="space-y-1">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="py-1">
                      <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-school-muted">
                        {link.name}
                      </div>
                      <div className="pl-4 space-y-1">
                        {link.children?.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                              location.pathname === child.path
                                ? 'bg-school-bg-secondary text-school-navy font-bold'
                                : 'text-school-text hover:bg-slate-50'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                      isActive(link.path)
                        ? 'bg-school-bg-secondary text-school-navy font-bold'
                        : 'text-school-text hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-school-muted px-2">
                <span>{currentLanguage === 'uz' ? 'Tanlangan til:' : 'Language:'}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      currentLanguage === 'en' ? 'bg-school-navy text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('uz')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      currentLanguage === 'uz' ? 'bg-school-navy text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    UZ
                  </button>
                </div>
              </div>
              <Link
                to="/school-profile"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-school-navy text-white text-sm font-bold shadow"
              >
                <Download className="w-4 h-4 text-school-gold" />
                <span>{t.nav.schoolProfile}</span>
              </Link>
              <div className="text-center pt-2">
                <Link
                  to="/admin/login"
                  className="text-xs text-school-muted hover:text-school-navy font-medium inline-flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" /> {t.nav.staffPortal}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};