import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Calendar, 
  Award, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Download
} from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { generateSchoolProfilePdf } from '../../lib/pdfGenerator';

export const AdminDashboardPage: React.FC = () => {
  const { 
    settings, 
    subjects, 
    leadership, 
    alumni, 
    students, 
    teachers, 
    activities, 
    news,
    assessmentComponents,
    gradingScale,
    academicQuarters
  } = useSchoolData();

  const handleDownloadPdf = () => {
    generateSchoolProfilePdf(settings, subjects, assessmentComponents, gradingScale, academicQuarters);
  };

  const statCards = [
    { label: 'Enrolled Students', value: settings.totalStudents.toLocaleString(), link: '/admin/info', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active Teachers', value: settings.totalTeachers, link: '/admin/info', icon: Award, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Curriculum Subjects', value: subjects.length, link: '/admin/subjects', icon: BookOpen, color: 'text-amber-600 bg-amber-50' },
    { label: 'Leadership Members', value: leadership.length, link: '/admin/leadership', icon: Users, color: 'text-purple-600 bg-purple-50' },
    { label: 'Student Achievements', value: students.length, link: '/admin/students', icon: GraduationCap, color: 'text-rose-600 bg-rose-50' },
    { label: 'Distinguished Alumni', value: alumni.length, link: '/admin/alumni', icon: Briefcase, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Clubs & Sports', value: activities.length, link: '/admin/activities', icon: Calendar, color: 'text-cyan-600 bg-cyan-50' },
    { label: 'Published News', value: news.filter(n => n.isPublished).length, link: '/admin/news', icon: FileText, color: 'text-orange-600 bg-orange-50' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-school-navy via-school-navy-dark to-school-navy rounded-2xl p-6 sm:p-8 text-white shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-school-gold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Administrative Management Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {settings.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Live institutional database management. Content modifications reflect immediately across all public school portal pages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2.5 rounded-xl bg-school-gold hover:bg-school-gold-light text-school-navy-dark text-xs font-bold transition-all flex items-center gap-1.5 shadow"
          >
            <Download className="w-4 h-4" />
            <span>Generate Official PDF</span>
          </button>
          
          <Link
            to="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all"
          >
            Open Live Portal
          </Link>
        </div>
      </div>

      {/* Overview Statistics Grid */}
      <div>
        <h2 className="text-base font-bold text-school-navy mb-4">
          Institutional Records Summary
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                to={stat.link}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-subtle hover:shadow-card transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-school-muted">
                    {stat.label}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-school-navy group-hover:text-school-navy-light transition-colors">
                  {stat.value}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-school-muted">
                  <span>Manage Records</span>
                  <ArrowRight className="w-3.5 h-3.5 text-school-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Module Quick Nav 1 */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle">
          <h3 className="text-base font-bold text-school-navy mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-school-gold" />
            Curriculum & Assessment
          </h3>
          <p className="text-xs text-school-muted leading-relaxed mb-4">
            Update the 20 curriculum subjects, specialized status, 100-point BSB/CHSB breakdown, and international GPA notes.
          </p>
          <div className="space-y-2">
            <Link to="/admin/subjects" className="block text-xs font-semibold text-school-navy hover:underline">
              → Edit 20 Course Directory
            </Link>
            <Link to="/admin/assessment" className="block text-xs font-semibold text-school-navy hover:underline">
              → Configure 100-pt Assessment & Grading Scale
            </Link>
          </div>
        </div>

        {/* Module Quick Nav 2 */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle">
          <h3 className="text-base font-bold text-school-navy mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-school-gold" />
            Faculty & Student Records
          </h3>
          <p className="text-xs text-school-muted leading-relaxed mb-4">
            Manage principal and deputy principal cards, distinguished alumni, outstanding teachers, and Olympiad student awards.
          </p>
          <div className="space-y-2">
            <Link to="/admin/leadership" className="block text-xs font-semibold text-school-navy hover:underline">
              → Update School Leadership Cards
            </Link>
            <Link to="/admin/students" className="block text-xs font-semibold text-school-navy hover:underline">
              → Manage Student Achievements
            </Link>
            <Link to="/admin/teachers" className="block text-xs font-semibold text-school-navy hover:underline">
              → Manage Outstanding Teachers
            </Link>
          </div>
        </div>

        {/* Module Quick Nav 3 */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-subtle">
          <h3 className="text-base font-bold text-school-navy mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-school-gold" />
            Official School Profile PDF
          </h3>
          <p className="text-xs text-school-muted leading-relaxed mb-4">
            Upload custom school profile PDF versions, inspect generated selectable vector layouts, or update admissions counselor contact details.
          </p>
          <div className="space-y-2">
            <Link to="/admin/school-profile" className="block text-xs font-semibold text-school-navy hover:underline">
              → Manage School Profile PDF Document
            </Link>
            <Link to="/admin/news" className="block text-xs font-semibold text-school-navy hover:underline">
              → Publish News & Press Announcements
            </Link>
          </div>
        </div>

      </div>

      {/* System Status / Information Box */}
      <div className="bg-school-bg-secondary rounded-xl p-5 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>System Operational:</strong> Relational state active. Edits automatically persist and update the live website.
          </span>
        </div>
        <div className="text-slate-400">
          Last system certification: {settings.lastUpdated}
        </div>
      </div>

    </div>
  );
};
