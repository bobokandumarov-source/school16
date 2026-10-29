import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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
} from '../src/lib/initialData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DB_FILE = path.join(DATA_DIR, 'school-data.json');
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

if (!fs.existsSync(DB_FILE)) {
  const initialData = {
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
    mediaAssets: []
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  console.log('✅ Created data/school-data.json with initial database.');
} else {
  console.log('ℹ️ data/school-data.json already exists.');
}
