import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Tag, Search, ArrowRight } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { translations } from '../../lib/translations';

export const NewsPage: React.FC = () => {
  const { news, currentLanguage } = useSchoolData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const isUz = currentLanguage === 'uz';
  const t = translations[currentLanguage] || translations.en;

  const categoryMap: Record<string, { en: string; uz: string }> = {
    'All': { en: 'All', uz: 'Barchasi' },
    'School News': { en: 'School News', uz: 'Maktab yangiliklari' },
    'Academic Achievements': { en: 'Academic Achievements', uz: 'Akademik yutuqlar' },
    'Student Activities': { en: 'Student Activities', uz: 'O\'quvchilar hayoti' },
    'Events': { en: 'Events', uz: 'Tadbirlar' },
    'Announcements': { en: 'Announcements', uz: 'E\'lonlar' },
  };

  const categories = [
    'All',
    'School News',
    'Academic Achievements',
    'Student Activities',
    'Events',
    'Announcements',
  ];

  const publishedNews = news.filter((item) => {
    if (!item.isPublished) return false;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      
      {/* Page Header */}
      <section className="bg-school-navy-dark text-white py-16 lg:py-20 border-b border-school-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-school-gold uppercase tracking-wider mb-4">
              {isUz ? "Rasmiy Axborot Xizmati" : "Institutional Communications"}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              {t.newsPage.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {t.newsPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main News Directory */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter & Search Bar */}
          <div className="bg-school-bg-secondary p-4 rounded-2xl border border-slate-200 mb-10 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.newsPage.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2">
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

          {/* News Grid */}
          {publishedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedNews.map((item) => (
                <article 
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-48 bg-school-bg-secondary relative flex items-center justify-center border-b border-slate-100 p-6 overflow-hidden">
                      {item.coverImage ? (
                        <img 
                          src={item.coverImage} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-4">
                          <img 
                            src="/logos/school-logo-symbol.jpg" 
                            alt="Navoi School 16" 
                            className="h-16 w-auto opacity-30 object-contain mb-2 mix-blend-multiply"
                          />
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            {isUz ? "Rasmiy Axborot" : "Official Release"}
                          </span>
                        </div>
                      )}
                      <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-school-navy border border-slate-200 shadow-sm">
                        {isUz ? (categoryMap[item.category]?.uz || item.category) : item.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-school-muted mb-3 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-school-gold" />
                        <span>{item.publicationDate}</span>
                      </div>

                      <h2 className="text-base font-bold text-school-navy mb-2.5 line-clamp-2 group-hover:text-school-navy-light transition-colors">
                        <Link to={`/news/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-school-muted line-clamp-3 leading-relaxed mb-4">
                        {item.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Link
                      to={`/news/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy hover:text-school-gold transition-colors pt-3 border-t border-slate-100 w-full"
                    >
                      <span>{t.newsPage.readFullNotice}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-school-bg-secondary rounded-2xl border border-dashed border-slate-200 max-w-xl mx-auto">
              <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-school-navy">
                {isUz ? "Hech qanday e'lon topilmadi" : "No announcements found"}
              </h3>
              <p className="text-xs text-school-muted mt-1">
                {isUz 
                  ? "Siz tanlagan mezon bo'yicha e'lonlar mavjud emas." 
                  : "There are currently no published news items matching your criteria."}
              </p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};