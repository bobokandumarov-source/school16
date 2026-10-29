import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag, Share2, Award, ChevronRight, User } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { translations } from '../../lib/translations';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { news, currentLanguage } = useSchoolData();
  const navigate = useNavigate();

  const isUz = currentLanguage === 'uz';
  const t = translations[currentLanguage] || translations.en;

  const article = news.find((n) => n.slug === slug || n.id === slug);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-school-navy mb-3">{t.newsPage.noticeNotFound}</h1>
        <p className="text-sm text-school-muted mb-6">
          {t.newsPage.noticeNotFoundDesc}
        </p>
        <Link
          to="/news"
          className="px-6 py-2.5 rounded-xl bg-school-navy text-white text-xs font-bold hover:bg-school-navy-dark transition-all"
        >
          {t.newsPage.returnToNews}
        </Link>
      </div>
    );
  }

  const relatedNews = news
    .filter((n) => n.id !== article.id && n.isPublished)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Top Banner */}
      <section className="bg-school-navy-dark text-white py-12 lg:py-16 border-b border-school-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-school-gold hover:text-school-gold-light mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {isUz ? "Yangiliklar va e'lonlarga qaytish" : "Back to News & Announcements"}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-school-gold border border-school-gold/30">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-school-gold" /> {article.publicationDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Main Article Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Featured Cover Image if present */}
          {article.coverImage && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-card border border-slate-200">
              <img 
                src={article.coverImage} 
                alt={article.title} 
                className="w-full max-h-[480px] object-cover"
              />
            </div>
          )}

          {/* Lead Excerpt */}
          <div className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed pb-8 border-b border-slate-200 mb-8 italic">
            {article.shortDescription}
          </div>

          {/* Article Body */}
          <div className="prose prose-slate max-w-none text-school-text leading-relaxed space-y-6 text-sm sm:text-base whitespace-pre-line">
            {article.content}
          </div>

          {/* Institutional Certification Footer */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-school-bg-secondary p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-subtle p-1 flex items-center justify-center border border-slate-200 overflow-hidden">
                <img 
                  src="/logos/school-logo-symbol.jpg" 
                  alt="Navoi School 16" 
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div>
                <span className="block text-xs font-bold text-school-navy">
                  {t.newsPage.pressOffice}
                </span>
                <span className="text-[11px] text-school-muted">
                  {isUz ? "Navoiy shahar 16-sonli ixtisoslashtirilgan maktab" : "Navoi City Specialized State Secondary School №16"}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert(t.common.shareLinkCopied);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-school-navy hover:bg-slate-50 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-school-gold" />
              <span>{t.common.share}</span>
            </button>
          </div>

          {/* Related Announcements */}
          {relatedNews.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200">
              <h3 className="text-xl font-bold text-school-navy mb-6">
                {t.newsPage.relatedTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedNews.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/news/${rel.slug}`}
                    className="p-5 rounded-xl border border-slate-200 hover:border-school-navy transition-all bg-white shadow-subtle flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-school-gold block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold text-school-navy group-hover:text-school-navy-light line-clamp-2 mb-2">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {rel.publicationDate}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
};