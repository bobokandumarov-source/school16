export interface SchoolSettings {
  id: string;
  name: string;
  uzName?: string;
  address: string;
  postalCode: string;
  phone: string;
  counselorEmail: string;
  establishedYear: number;
  totalStudents: number;
  totalTeachers: number;
  gradesRange: string;
  schoolWeek: string;
  instructionalFramework: string;
  institutionType: string;
  heroHeadline: string;
  heroSupportingText: string;
  heroButtonPrimary: string;
  heroButtonSecondary: string;
  heroImageUrl: string;
  aboutIntroduction: string;
  mission: string;
  coreValues: string[];
  socialLinks: {
    telegram?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  officialPdfUrl?: string;
  lastUpdated: string;
}

export type SubjectCategory = 'Exact Sciences' | 'Natural Sciences' | 'Languages & Literature' | 'Social Sciences' | 'Arts, Technology & Physical Education';

export interface Subject {
  id: string;
  name: string;
  category: SubjectCategory;
  applicableGrades: string;
  isSpecialized: boolean;
  description: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface AssessmentComponent {
  id: string;
  code: string;
  name: string;
  description: string;
  maxPoints: number;
  displayOrder: number;
}

export interface GradingScaleItem {
  id: string;
  scoreRange: string;
  scoreMin: number;
  scoreMax: number;
  uzbekGrade: string;
  description: string;
  usReference: string;
  notes?: string;
  displayOrder: number;
}

export interface AcademicQuarter {
  id: string;
  quarterName: string;
  months: string;
  displayOrder: number;
  exactDates?: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  position: string;
  positionUz?: string;
  roleType: 'principal' | 'deputy';
  photoUrl?: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface DistinguishedAlumni {
  id: string;
  name: string;
  graduationYear: number;
  university: string;
  description: string;
  photoUrl?: string;
  externalLink?: string;
  isFeatured: boolean;
  displayOrder: number;
  isPublished: boolean;
}

export interface StudentAchievement {
  id: string;
  name: string;
  achievementTitle: string;
  achievementDescription: string;
  grade?: string;
  year?: string;
  category: string;
  photoUrl?: string;
  isFeatured: boolean;
  displayOrder: number;
  isPublished: boolean;
}

export interface OutstandingTeacher {
  id: string;
  name: string;
  subject?: string;
  achievement: string;
  qualifications?: string;
  photoUrl?: string;
  isFeatured: boolean;
  displayOrder: number;
  isPublished: boolean;
}

export interface ExtracurricularActivity {
  id: string;
  name: string;
  category: 'Clubs & Societies' | 'Arts & Culture' | 'Sports' | 'Science & Tech';
  description: string;
  fullDescription?: string;
  meetingTime?: string;
  location?: string;
  coordinator?: string;
  photoUrl?: string;
  gallery?: string[];
  objectives?: string[];
  displayOrder: number;
  isPublished: boolean;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  coverImage?: string;
  category: 'School News' | 'Academic Achievements' | 'Student Activities' | 'Events' | 'Announcements';
  publicationDate: string;
  isPublished: boolean;
  displayOrder: number;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}
