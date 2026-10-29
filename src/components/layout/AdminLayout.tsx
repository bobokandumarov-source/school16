import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  School, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Users, 
  Briefcase, 
  Calendar, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useSchoolData } from '../../lib/store';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { adminEmail, logout, resetToDefaults } = useSchoolData();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'School Information', path: '/admin/info', icon: School },
    { name: 'Homepage & Hero', path: '/admin/hero', icon: Sparkles },
    { name: 'Curriculum & Subjects', path: '/admin/subjects', icon: BookOpen },
    { name: 'Assessment & Grading', path: '/admin/assessment', icon: Award },
    { name: 'Leadership Team', path: '/admin/leadership', icon: Users },
    { name: 'Student Achievements', path: '/admin/students', icon: GraduationCap },
    { name: 'Outstanding Teachers', path: '/admin/teachers', icon: Award },
    { name: 'Distinguished Alumni', path: '/admin/alumni', icon: Briefcase },
    { name: 'Clubs & Activities', path: '/admin/activities', icon: Calendar },
    { name: 'News & Announcements', path: '/admin/news', icon: FileText },
    { name: 'School Profile (PDF)', path: '/admin/school-profile', icon: FileText },
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to restore all official default school records from the master prompt? Any unsaved edits will be overwritten.')) {
      resetToDefaults();
      alert('Official institutional records restored successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-school-navy-dark text-white border-b border-school-navy sticky top-0 z-30">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/admin" className="flex items-center space-x-2.5">
              <img src="/logos/school-logo-symbol.jpg" alt="Logo" className="h-8 w-auto rounded bg-white p-0.5" />
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white uppercase">
                  School №16 Admin
                </span>
                <span className="text-[10px] text-school-gold font-semibold uppercase tracking-wider">
                  Administrative Management Portal
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-school-gold" />
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{adminEmail || 'admin@school16.uz'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold transition-colors flex items-center gap-1"
              title="Sign out of Admin Dashboard"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar Navigation */}
        <aside 
          className={`fixed lg:static inset-y-0 left-0 z-20 w-64 bg-school-navy text-slate-300 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } pt-16 lg:pt-0 border-r border-school-navy-light/40`}
        >
          <div className="overflow-y-auto py-4 px-3 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-school-gold">
              Content Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? 'bg-school-gold text-school-navy-dark font-extrabold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-school-navy-dark' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Reset Database to Original Prompt Records */}
          <div className="p-3 border-t border-white/10">
            <button
              onClick={handleResetData}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              title="Reset content to initial official school records"
            >
              <RotateCcw className="w-3.5 h-3.5 text-school-gold" />
              <span>Restore Prompt Defaults</span>
            </button>
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)} 
            className="fixed inset-0 z-10 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};
