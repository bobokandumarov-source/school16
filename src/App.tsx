import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { SchoolDataProvider, useSchoolData } from './lib/store';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { AcademicsPage } from './pages/public/AcademicsPage';
import { AssessmentPage } from './pages/public/AssessmentPage';
import { StudentLifePage } from './pages/public/StudentLifePage';
import { ActivityDetailPage } from './pages/public/ActivityDetailPage';
import { OurPeoplePage } from './pages/public/OurPeoplePage';
import { NewsPage } from './pages/public/NewsPage';
import { NewsDetailPage } from './pages/public/NewsDetailPage';
import { SchoolProfilePage } from './pages/public/SchoolProfilePage';
import { ContactPage } from './pages/public/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminSchoolInfo } from './pages/admin/AdminSchoolInfo';
import { AdminHero } from './pages/admin/AdminHero';
import { AdminSubjects } from './pages/admin/AdminSubjects';
import { AdminAssessment } from './pages/admin/AdminAssessment';
import { AdminLeadership } from './pages/admin/AdminLeadership';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminTeachers } from './pages/admin/AdminTeachers';
import { AdminAlumni } from './pages/admin/AdminAlumni';
import { AdminActivities } from './pages/admin/AdminActivities';
import { AdminNews } from './pages/admin/AdminNews';
import { AdminSchoolProfile } from './pages/admin/AdminSchoolProfile';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminSettings } from './pages/admin/AdminSettings';

// Public Root Layout
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Protected Admin Guard
const ProtectedAdminRoute: React.FC = () => {
  const { isAuthenticated } = useSchoolData();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout />;
};

export const App: React.FC = () => {
  return (
    <SchoolDataProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/academics/assessment" element={<AssessmentPage />} />
            <Route path="/student-life" element={<StudentLifePage />} />
            <Route path="/student-life/:id" element={<ActivityDetailPage />} />
            <Route path="/our-people" element={<OurPeoplePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/school-profile" element={<SchoolProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Console */}
          <Route path="/admin" element={<ProtectedAdminRoute />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="info" element={<AdminSchoolInfo />} />
            <Route path="hero" element={<AdminHero />} />
            <Route path="subjects" element={<AdminSubjects />} />
            <Route path="assessment" element={<AdminAssessment />} />
            <Route path="leadership" element={<AdminLeadership />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="alumni" element={<AdminAlumni />} />
            <Route path="activities" element={<AdminActivities />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="school-profile" element={<AdminSchoolProfile />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SchoolDataProvider>
  );
};

export default App;
