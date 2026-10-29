import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useSchoolData();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-school-navy-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-school-navy/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-school-gold/10 blur-3xl pointer-events-none" />

      {/* Return to website link */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-school-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Official Website
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        
        {/* Emblem & Title */}
        <div className="text-center mb-8">
          <div className="inline-block p-2 bg-white rounded-2xl shadow-elevated mb-4">
            <img 
              src="/logos/school-logo-symbol.jpg" 
              alt="School №16 Emblem" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Administrator Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Navoi City Specialized State Secondary School №16
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-2xl shadow-elevated p-8 sm:p-10 border border-slate-200">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="admin@school16.uz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-school-navy hover:bg-school-navy-dark text-white font-bold text-sm transition-all shadow-subtle hover:shadow-card flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-school-gold" />
                </>
              )}
            </button>
          </form>

          {/* Institutional note */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-school-gold" />
              <span>Restricted Administrative Access</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Only authorized institutional staff with verified system credentials may access content management functions.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 bg-slate-50 p-2 rounded-lg border border-slate-200">
              Default Provisioned Access: <code className="text-school-navy font-bold">admin@school16.uz</code> / <code className="text-school-navy font-bold">school16navoi!</code>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
