import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SchoolSettings,
  Subject,
  AssessmentComponent,
  GradingScaleItem,
  AcademicQuarter,
  LeadershipMember,
  DistinguishedAlumni,
  StudentAchievement,
  OutstandingTeacher,
  ExtracurricularActivity,
  NewsArticle,
  MediaAsset
} from '../types';
import {
  initialSchoolSettings,
  initialSubjects,
  initialAssessmentComponents,
  initialGradingScale,
  initialAcademicQuarters,
  initialLeadership,
  initialAlumni,
  initialStudentAchievements,
  initialOutstandingTeachers,
  initialExtracurricularActivities,
  initialNews
} from './initialData';
import { supabase, isSupabaseConfigured } from './supabase';

interface SchoolDataContextType {
  settings: SchoolSettings;
  updateSettings: (newSettings: Partial<SchoolSettings>) => void;
  
  subjects: Subject[];
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;

  assessmentComponents: AssessmentComponent[];
  updateAssessmentComponent: (id: string, comp: Partial<AssessmentComponent>) => void;

  gradingScale: GradingScaleItem[];
  updateGradingScaleItem: (id: string, item: Partial<GradingScaleItem>) => void;

  academicQuarters: AcademicQuarter[];
  updateAcademicQuarter: (id: string, quarter: Partial<AcademicQuarter>) => void;

  leadership: LeadershipMember[];
  addLeadership: (member: Omit<LeadershipMember, 'id'>) => void;
  updateLeadership: (id: string, member: Partial<LeadershipMember>) => void;
  deleteLeadership: (id: string) => void;

  alumni: DistinguishedAlumni[];
  addAlumni: (alum: Omit<DistinguishedAlumni, 'id'>) => void;
  updateAlumni: (id: string, alum: Partial<DistinguishedAlumni>) => void;
  deleteAlumni: (id: string) => void;

  students: StudentAchievement[];
  addStudent: (student: Omit<StudentAchievement, 'id'>) => void;
  updateStudent: (id: string, student: Partial<StudentAchievement>) => void;
  deleteStudent: (id: string) => void;

  teachers: OutstandingTeacher[];
  addTeacher: (teacher: Omit<OutstandingTeacher, 'id'>) => void;
  updateTeacher: (id: string, teacher: Partial<OutstandingTeacher>) => void;
  deleteTeacher: (id: string) => void;

  activities: ExtracurricularActivity[];
  addActivity: (activity: Omit<ExtracurricularActivity, 'id'>) => void;
  updateActivity: (id: string, activity: Partial<ExtracurricularActivity>) => void;
  deleteActivity: (id: string) => void;

  news: NewsArticle[];
  addNews: (article: Omit<NewsArticle, 'id'>) => void;
  updateNews: (id: string, article: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;

  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => void;
  deleteMediaAsset: (id: string) => void;

  // Authentication
  isAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;

  // Language state
  currentLanguage: 'en' | 'uz';
  setLanguage: (lang: 'en' | 'uz') => void;

  // Reset to original factory defaults
  resetToDefaults: () => void;
}

const SchoolDataContext = createContext<SchoolDataContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'navoi16_';

function loadStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Error loading ${key} from storage`, e);
    return defaultValue;
  }
}

function loadStoredMerged<T extends { id: string }>(key: string, defaultItems: T[]): T[] {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    if (!item) return defaultItems;
    const parsed: T[] = JSON.parse(item);
    if (!Array.isArray(parsed)) return defaultItems;
    // Enrich with default values for new fields if not set
    return parsed.map((it) => {
      const def = defaultItems.find((d) => d.id === it.id);
      if (!def) return it;
      return { ...def, ...it, ...(def as any).photoUrl && !(it as any).photoUrl ? { photoUrl: (def as any).photoUrl } : {} };
    });
  } catch (e) {
    console.warn(`Error loading ${key} from storage`, e);
    return defaultItems;
  }
}

function saveStored<T>(key: string, value: T) {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error saving ${key} to storage`, e);
  }
}

export const SchoolDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SchoolSettings>(() => loadStored('settings', initialSchoolSettings));
  const [subjects, setSubjects] = useState<Subject[]>(() => loadStored('subjects', initialSubjects));
  const [assessmentComponents, setAssessmentComponents] = useState<AssessmentComponent[]>(() =>
    loadStored('assessmentComponents', initialAssessmentComponents)
  );
  const [gradingScale, setGradingScale] = useState<GradingScaleItem[]>(() =>
    loadStored('gradingScale', initialGradingScale)
  );
  const [academicQuarters, setAcademicQuarters] = useState<AcademicQuarter[]>(() =>
    loadStored('academicQuarters', initialAcademicQuarters)
  );
  const [leadership, setLeadership] = useState<LeadershipMember[]>(() =>
    loadStoredMerged('leadership', initialLeadership)
  );
  const [alumni, setAlumni] = useState<DistinguishedAlumni[]>(() => loadStoredMerged('alumni', initialAlumni));
  const [students, setStudents] = useState<StudentAchievement[]>(() =>
    loadStoredMerged('students', initialStudentAchievements)
  );
  const [teachers, setTeachers] = useState<OutstandingTeacher[]>(() =>
    loadStoredMerged('teachers', initialOutstandingTeachers)
  );
  const [activities, setActivities] = useState<ExtracurricularActivity[]>(() =>
    loadStoredMerged('activities', initialExtracurricularActivities)
  );
  const [news, setNews] = useState<NewsArticle[]>(() => loadStoredMerged('news', initialNews));
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => loadStored('mediaAssets', []));

  // Language (default 'en')
  const [currentLanguage, setLanguageState] = useState<'en' | 'uz'>('en');

  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_PREFIX + 'auth') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_PREFIX + 'admin_email') || null;
  });

  // Helper to sync changes to Supabase cloud database & disk backend & local cache
  const syncKeyToServer = (key: string, value: any) => {
    saveStored(key, value);

    // 1. If Supabase is connected, persist directly to cloud PostgreSQL database
    if (isSupabaseConfigured && supabase) {
      supabase
        .from('school_data_store')
        .upsert({
          key,
          data: value,
          updated_at: new Date().toISOString(),
        })
        .then(({ error }) => {
          if (error) console.warn(`[Store] Supabase save error for ${key}:`, error);
          else console.log(`[Store] Synced ${key} to Supabase cloud database successfully.`);
        })
        .catch((err) => console.warn(`[Store] Supabase sync error for ${key}:`, err));
    }

    // 2. Also notify local dev server if running
    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    }).catch(() => {});
  };

  // Synchronize state from Supabase cloud database / central server database on load & focus
  const loadServerData = async () => {
    // 1. Try Supabase cloud database first (for Vercel & 24/7 global sync)
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('school_data_store').select('*');
        if (!error && Array.isArray(data) && data.length > 0) {
          data.forEach((row: { key: string; data: any }) => {
            if (row.key === 'settings' && row.data) {
              setSettings(row.data);
              saveStored('settings', row.data);
            }
            if (row.key === 'subjects' && Array.isArray(row.data)) {
              setSubjects(row.data);
              saveStored('subjects', row.data);
            }
            if (row.key === 'assessmentComponents' && Array.isArray(row.data)) {
              setAssessmentComponents(row.data);
              saveStored('assessmentComponents', row.data);
            }
            if (row.key === 'gradingScale' && Array.isArray(row.data)) {
              setGradingScale(row.data);
              saveStored('gradingScale', row.data);
            }
            if (row.key === 'academicQuarters' && Array.isArray(row.data)) {
              setAcademicQuarters(row.data);
              saveStored('academicQuarters', row.data);
            }
            if (row.key === 'leadership' && Array.isArray(row.data)) {
              setLeadership(row.data);
              saveStored('leadership', row.data);
            }
            if (row.key === 'alumni' && Array.isArray(row.data)) {
              setAlumni(row.data);
              saveStored('alumni', row.data);
            }
            if (row.key === 'students' && Array.isArray(row.data)) {
              setStudents(row.data);
              saveStored('students', row.data);
            }
            if (row.key === 'teachers' && Array.isArray(row.data)) {
              setTeachers(row.data);
              saveStored('teachers', row.data);
            }
            if (row.key === 'activities' && Array.isArray(row.data)) {
              setActivities(row.data);
              saveStored('activities', row.data);
            }
            if (row.key === 'news' && Array.isArray(row.data)) {
              setNews(row.data);
              saveStored('news', row.data);
            }
            if (row.key === 'mediaAssets' && Array.isArray(row.data)) {
              setMediaAssets(row.data);
              saveStored('mediaAssets', row.data);
            }
          });
          console.log('[Store] Cloud Supabase database synchronized successfully.');
          return;
        }
      } catch (err) {
        console.warn('[Store] Supabase query error, trying /api/data fallback:', err);
      }
    }

    // 2. Fallback to local server /api/data
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          if (data.settings) {
            setSettings(data.settings);
            saveStored('settings', data.settings);
          }
          if (Array.isArray(data.subjects)) {
            setSubjects(data.subjects);
            saveStored('subjects', data.subjects);
          }
          if (Array.isArray(data.assessmentComponents)) {
            setAssessmentComponents(data.assessmentComponents);
            saveStored('assessmentComponents', data.assessmentComponents);
          }
          if (Array.isArray(data.gradingScale)) {
            setGradingScale(data.gradingScale);
            saveStored('gradingScale', data.gradingScale);
          }
          if (Array.isArray(data.academicQuarters)) {
            setAcademicQuarters(data.academicQuarters);
            saveStored('academicQuarters', data.academicQuarters);
          }
          if (Array.isArray(data.leadership)) {
            setLeadership(data.leadership);
            saveStored('leadership', data.leadership);
          }
          if (Array.isArray(data.alumni)) {
            setAlumni(data.alumni);
            saveStored('alumni', data.alumni);
          }
          if (Array.isArray(data.students)) {
            setStudents(data.students);
            saveStored('students', data.students);
          }
          if (Array.isArray(data.teachers)) {
            setTeachers(data.teachers);
            saveStored('teachers', data.teachers);
          }
          if (Array.isArray(data.activities)) {
            setActivities(data.activities);
            saveStored('activities', data.activities);
          }
          if (Array.isArray(data.news)) {
            setNews(data.news);
            saveStored('news', data.news);
          }
          if (Array.isArray(data.mediaAssets)) {
            setMediaAssets(data.mediaAssets);
            saveStored('mediaAssets', data.mediaAssets);
          }
          console.log('[Store] Central server database (school-data.json) synchronized successfully.');
        }
      }
    } catch (e) {
      console.warn('[Store] Could not load from /api/data, using local cache', e);
    }
  };

  useEffect(() => {
    loadServerData();

    // Auto-refresh when tab gains focus
    const onFocus = () => loadServerData();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  // Auth methods
  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // 1. Master institutional administrator credentials (instant access anytime)
    // Supports official logins:
    // - admin@school16.uz / school16navoi!
    // - admin / admin16 (yoki school16navoi!)
    // - sitoramavlonova@school16.uz / school16navoi!
    if (
      (cleanEmail === 'admin@school16.uz' && cleanPass === 'school16navoi!') ||
      (cleanEmail === 'admin' && (cleanPass === 'admin16' || cleanPass === 'school16navoi!')) ||
      (cleanEmail === 'sitoramavlonova@school16.uz' && cleanPass === 'school16navoi!')
    ) {
      setIsAuthenticated(true);
      setAdminEmail(cleanEmail);
      localStorage.setItem(STORAGE_KEY_PREFIX + 'auth', 'true');
      localStorage.setItem(STORAGE_KEY_PREFIX + 'admin_email', cleanEmail);
      return { success: true };
    }

    // 2. If Supabase is configured, also try Supabase Auth
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPass,
        });
        if (!error && data.user) {
          setIsAuthenticated(true);
          setAdminEmail(data.user.email || cleanEmail);
          localStorage.setItem(STORAGE_KEY_PREFIX + 'auth', 'true');
          localStorage.setItem(STORAGE_KEY_PREFIX + 'admin_email', data.user.email || cleanEmail);
          return { success: true };
        }
      } catch (err: any) {
        console.warn('[Auth] Supabase auth check error', err);
      }
    }

    return {
      success: false,
      error: 'Noto\'g\'ri administrator login yoki paroli. Iltimos, qaytadan tekshirib kiriting.',
    };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setAdminEmail(null);
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'auth');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'admin_email');
  };

  const setLanguage = (lang: 'en' | 'uz') => {
    setLanguageState(lang);
  };

  // Mutators - automatically persist updates to server disk & local cache
  const updateSettings = (newSettings: Partial<SchoolSettings>) => {
    setSettings((prev) => {
      const next = {
        ...prev,
        ...newSettings,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      syncKeyToServer('settings', next);
      return next;
    });
  };

  const addSubject = (subject: Omit<Subject, 'id'>) => {
    const id = `sub_${Date.now()}`;
    setSubjects((prev) => {
      const next = [...prev, { ...subject, id }];
      syncKeyToServer('subjects', next);
      return next;
    });
  };

  const updateSubject = (id: string, updated: Partial<Subject>) => {
    setSubjects((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...updated } : s));
      syncKeyToServer('subjects', next);
      return next;
    });
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => {
      const next = prev.filter((s) => s.id !== id);
      syncKeyToServer('subjects', next);
      return next;
    });
  };

  const updateAssessmentComponent = (id: string, updated: Partial<AssessmentComponent>) => {
    setAssessmentComponents((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updated } : c));
      syncKeyToServer('assessmentComponents', next);
      return next;
    });
  };

  const updateGradingScaleItem = (id: string, updated: Partial<GradingScaleItem>) => {
    setGradingScale((prev) => {
      const next = prev.map((g) => (g.id === id ? { ...g, ...updated } : g));
      syncKeyToServer('gradingScale', next);
      return next;
    });
  };

  const updateAcademicQuarter = (id: string, updated: Partial<AcademicQuarter>) => {
    setAcademicQuarters((prev) => {
      const next = prev.map((q) => (q.id === id ? { ...q, ...updated } : q));
      syncKeyToServer('academicQuarters', next);
      return next;
    });
  };

  const addLeadership = (member: Omit<LeadershipMember, 'id'>) => {
    const id = `lead_${Date.now()}`;
    setLeadership((prev) => {
      const next = [...prev, { ...member, id }];
      syncKeyToServer('leadership', next);
      return next;
    });
  };

  const updateLeadership = (id: string, updated: Partial<LeadershipMember>) => {
    setLeadership((prev) => {
      const next = prev.map((l) => (l.id === id ? { ...l, ...updated } : l));
      syncKeyToServer('leadership', next);
      return next;
    });
  };

  const deleteLeadership = (id: string) => {
    setLeadership((prev) => {
      const next = prev.filter((l) => l.id !== id);
      syncKeyToServer('leadership', next);
      return next;
    });
  };

  const addAlumni = (alum: Omit<DistinguishedAlumni, 'id'>) => {
    const id = `alumni_${Date.now()}`;
    setAlumni((prev) => {
      const next = [...prev, { ...alum, id }];
      syncKeyToServer('alumni', next);
      return next;
    });
  };

  const updateAlumni = (id: string, updated: Partial<DistinguishedAlumni>) => {
    setAlumni((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, ...updated } : a));
      syncKeyToServer('alumni', next);
      return next;
    });
  };

  const deleteAlumni = (id: string) => {
    setAlumni((prev) => {
      const next = prev.filter((a) => a.id !== id);
      syncKeyToServer('alumni', next);
      return next;
    });
  };

  const addStudent = (student: Omit<StudentAchievement, 'id'>) => {
    const id = `ach_${Date.now()}`;
    setStudents((prev) => {
      const next = [...prev, { ...student, id }];
      syncKeyToServer('students', next);
      return next;
    });
  };

  const updateStudent = (id: string, updated: Partial<StudentAchievement>) => {
    setStudents((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...updated } : s));
      syncKeyToServer('students', next);
      return next;
    });
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => {
      const next = prev.filter((s) => s.id !== id);
      syncKeyToServer('students', next);
      return next;
    });
  };

  const addTeacher = (teacher: Omit<OutstandingTeacher, 'id'>) => {
    const id = `teacher_${Date.now()}`;
    setTeachers((prev) => {
      const next = [...prev, { ...teacher, id }];
      syncKeyToServer('teachers', next);
      return next;
    });
  };

  const updateTeacher = (id: string, updated: Partial<OutstandingTeacher>) => {
    setTeachers((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, ...updated } : t));
      syncKeyToServer('teachers', next);
      return next;
    });
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => {
      const next = prev.filter((t) => t.id !== id);
      syncKeyToServer('teachers', next);
      return next;
    });
  };

  const addActivity = (activity: Omit<ExtracurricularActivity, 'id'>) => {
    const id = `act_${Date.now()}`;
    setActivities((prev) => {
      const next = [...prev, { ...activity, id }];
      syncKeyToServer('activities', next);
      return next;
    });
  };

  const updateActivity = (id: string, updated: Partial<ExtracurricularActivity>) => {
    setActivities((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, ...updated } : a));
      syncKeyToServer('activities', next);
      return next;
    });
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => {
      const next = prev.filter((a) => a.id !== id);
      syncKeyToServer('activities', next);
      return next;
    });
  };

  const addNews = (article: Omit<NewsArticle, 'id'>) => {
    const id = `news_${Date.now()}`;
    setNews((prev) => {
      const next = [{ ...article, id }, ...prev];
      syncKeyToServer('news', next);
      return next;
    });
  };

  const updateNews = (id: string, updated: Partial<NewsArticle>) => {
    setNews((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, ...updated } : n));
      syncKeyToServer('news', next);
      return next;
    });
  };

  const deleteNews = (id: string) => {
    setNews((prev) => {
      const next = prev.filter((n) => n.id !== id);
      syncKeyToServer('news', next);
      return next;
    });
  };

  const addMediaAsset = (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => {
    const newAsset: MediaAsset = {
      ...asset,
      id: `media_${Date.now()}`,
      uploadedAt: new Date().toISOString(),
    };
    setMediaAssets((prev) => {
      const next = [newAsset, ...prev];
      syncKeyToServer('mediaAssets', next);
      return next;
    });
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets((prev) => {
      const next = prev.filter((m) => m.id !== id);
      syncKeyToServer('mediaAssets', next);
      return next;
    });
  };

  const resetToDefaults = () => {
    setSettings(initialSchoolSettings);
    setSubjects(initialSubjects);
    setAssessmentComponents(initialAssessmentComponents);
    setGradingScale(initialGradingScale);
    setAcademicQuarters(initialAcademicQuarters);
    setLeadership(initialLeadership);
    setAlumni(initialAlumni);
    setStudents(initialStudentAchievements);
    setTeachers(initialOutstandingTeachers);
    setActivities(initialExtracurricularActivities);
    setNews(initialNews);
    setMediaAssets([]);
    localStorage.clear();
    saveStored('auth', isAuthenticated ? 'true' : 'false');

    const defaultState = {
      settings: initialSchoolSettings,
      subjects: initialSubjects,
      assessmentComponents: initialAssessmentComponents,
      gradingScale: initialGradingScale,
      academicQuarters: initialAcademicQuarters,
      leadership: initialLeadership,
      alumni: initialAlumni,
      students: initialStudentAchievements,
      teachers: initialOutstandingTeachers,
      activities: initialExtracurricularActivities,
      news: initialNews,
      mediaAssets: [],
    };

    if (isSupabaseConfigured && supabase) {
      const rows = Object.entries(defaultState).map(([k, v]) => ({
        key: k,
        data: v,
        updated_at: new Date().toISOString(),
      }));
      supabase
        .from('school_data_store')
        .upsert(rows)
        .then(() => console.log('[Store] Reset all data in Supabase successfully.'))
        .catch((err) => console.warn('[Store] Supabase reset error', err));
    }

    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        allData: defaultState,
      }),
    }).catch((err) => console.warn('[Store] Reset sync failed', err));
  };

  return (
    <SchoolDataContext.Provider
      value={{
        settings,
        updateSettings,
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        assessmentComponents,
        updateAssessmentComponent,
        gradingScale,
        updateGradingScaleItem,
        academicQuarters,
        updateAcademicQuarter,
        leadership,
        addLeadership,
        updateLeadership,
        deleteLeadership,
        alumni,
        addAlumni,
        updateAlumni,
        deleteAlumni,
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        teachers,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        activities,
        addActivity,
        updateActivity,
        deleteActivity,
        news,
        addNews,
        updateNews,
        deleteNews,
        mediaAssets,
        addMediaAsset,
        deleteMediaAsset,
        isAuthenticated,
        adminEmail,
        login,
        logout,
        currentLanguage,
        setLanguage,
        resetToDefaults,
      }}
    >
      {children}
    </SchoolDataContext.Provider>
  );
};

export const useSchoolData = () => {
  const context = useContext(SchoolDataContext);
  if (!context) {
    throw new Error('useSchoolData must be used within a SchoolDataProvider');
  }
  return context;
};
