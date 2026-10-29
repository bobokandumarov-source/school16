-- ==============================================================================
-- NAVOI CITY SPECIALIZED STATE SECONDARY SCHOOL №16
-- Official Supabase Database Schema, Row Level Security (RLS) & Seed Migration
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SCHOOL SETTINGS
CREATE TABLE IF NOT EXISTS public.school_settings (
    id TEXT PRIMARY KEY DEFAULT 'school_16_main',
    name TEXT NOT NULL DEFAULT 'Navoi City Specialized State Secondary School №16',
    uz_name TEXT DEFAULT 'Navoiy shahar 16-sonli ixtisoslashtirilgan davlat umumta''lim maktabi',
    address TEXT NOT NULL DEFAULT '15-A, Nurafshon Street, Navoi City, Uzbekistan',
    postal_code TEXT NOT NULL DEFAULT '210100',
    phone TEXT NOT NULL DEFAULT '+998 79 223 32 61',
    counselor_email TEXT NOT NULL DEFAULT 'counselorschool16@gmail.com',
    established_year INTEGER NOT NULL DEFAULT 1966,
    total_students INTEGER NOT NULL DEFAULT 2448,
    total_teachers INTEGER NOT NULL DEFAULT 215,
    grades_range TEXT NOT NULL DEFAULT 'Grades 1–11',
    school_week TEXT NOT NULL DEFAULT 'Six days per week',
    instructional_framework TEXT NOT NULL DEFAULT 'Uzbekistan National Curriculum',
    institution_type TEXT NOT NULL DEFAULT 'State secondary school with specialized subject instruction',
    hero_headline TEXT NOT NULL DEFAULT 'Educating Minds. Building Character. Inspiring Futures.',
    hero_supporting_text TEXT NOT NULL DEFAULT 'Welcome to Navoi City Specialized State Secondary School №16, where academic learning, personal development, and community engagement come together to prepare students for the future.',
    hero_button_primary TEXT NOT NULL DEFAULT 'Explore Our School',
    hero_button_secondary TEXT NOT NULL DEFAULT 'Discover Our Academics',
    hero_image_url TEXT DEFAULT '',
    about_introduction TEXT NOT NULL,
    mission TEXT NOT NULL,
    core_values TEXT[] DEFAULT ARRAY['Academic Excellence', 'Integrity and Respect', 'Collaboration', 'Leadership', 'Creativity', 'Community Responsibility'],
    social_telegram TEXT DEFAULT '',
    social_facebook TEXT DEFAULT '',
    social_instagram TEXT DEFAULT '',
    social_youtube TEXT DEFAULT '',
    official_pdf_url TEXT DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SUBJECTS
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    uz_name TEXT DEFAULT '',
    category TEXT NOT NULL CHECK (category IN ('Exact Sciences', 'Natural Sciences', 'Languages & Literature', 'Social Sciences', 'Arts, Technology & Physical Education')),
    applicable_grades TEXT NOT NULL DEFAULT 'Grades 1–11',
    is_specialized BOOLEAN NOT NULL DEFAULT false,
    description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 1,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ASSESSMENT COMPONENTS (100-Point Structure)
CREATE TABLE IF NOT EXISTS public.assessment_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    max_points INTEGER NOT NULL CHECK (max_points > 0 AND max_points <= 100),
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GRADING SCALE & CONCORDANCE
CREATE TABLE IF NOT EXISTS public.grading_scale (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    score_range TEXT NOT NULL,
    score_min INTEGER NOT NULL,
    score_max INTEGER NOT NULL,
    uzbek_grade TEXT NOT NULL,
    description TEXT NOT NULL,
    us_reference TEXT NOT NULL,
    notes TEXT DEFAULT '',
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ACADEMIC QUARTERS
CREATE TABLE IF NOT EXISTS public.academic_quarters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quarter_name TEXT NOT NULL,
    months TEXT NOT NULL,
    exact_dates TEXT DEFAULT '',
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. LEADERSHIP
CREATE TABLE IF NOT EXISTS public.leadership (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    role_type TEXT NOT NULL CHECK (role_type IN ('principal', 'deputy')),
    photo_url TEXT DEFAULT '',
    display_order INTEGER NOT NULL DEFAULT 1,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. DISTINGUISHED ALUMNI
CREATE TABLE IF NOT EXISTS public.alumni (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    graduation_year INTEGER NOT NULL,
    university TEXT NOT NULL,
    description TEXT NOT NULL,
    photo_url TEXT DEFAULT '',
    external_link TEXT DEFAULT '',
    is_featured BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 1,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. STUDENT ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    achievement_title TEXT NOT NULL,
    achievement_description TEXT NOT NULL,
    grade TEXT DEFAULT '',
    year TEXT DEFAULT '2026',
    category TEXT NOT NULL DEFAULT 'Academic Honors',
    photo_url TEXT DEFAULT '',
    is_featured BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 1,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. OUTSTANDING TEACHERS
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subject TEXT DEFAULT '',
    achievement TEXT NOT NULL,
    qualifications TEXT DEFAULT '',
    photo_url TEXT DEFAULT '',
    is_featured BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 1,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. EXTRACURRICULAR ACTIVITIES
CREATE TABLE IF NOT EXISTS public.extracurricular_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Clubs & Societies', 'Arts & Culture', 'Sports', 'Science & Tech')),
    description TEXT NOT NULL,
    photo_url TEXT DEFAULT '',
    coordinator TEXT DEFAULT '',
    display_order INTEGER NOT NULL DEFAULT 1,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. NEWS & ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT DEFAULT '',
    category TEXT NOT NULL CHECK (category IN ('School News', 'Academic Achievements', 'Student Activities', 'Events', 'Announcements')),
    publication_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ADMIN ROLES MAPPING
CREATE TABLE IF NOT EXISTS public.admin_roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'administrator',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    changes JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Helper check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        auth.role() = 'authenticated' AND (
            EXISTS (
                SELECT 1 FROM public.admin_roles
                WHERE user_id = auth.uid()
            )
            OR (auth.jwt() ->> 'email') = 'admin@school16.uz'
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grading_scale ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_quarters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extracurricular_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Anonymous & Authenticated)
CREATE POLICY "Public can view school settings" ON public.school_settings FOR SELECT USING (true);
CREATE POLICY "Public can view published subjects" ON public.subjects FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public can view assessment components" ON public.assessment_components FOR SELECT USING (true);
CREATE POLICY "Public can view grading scale" ON public.grading_scale FOR SELECT USING (true);
CREATE POLICY "Public can view academic quarters" ON public.academic_quarters FOR SELECT USING (true);
CREATE POLICY "Public can view published leadership" ON public.leadership FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public can view published alumni" ON public.alumni FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public can view published student achievements" ON public.students FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public can view published teachers" ON public.teachers FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public can view published activities" ON public.extracurricular_activities FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public can view published news" ON public.news FOR SELECT USING (is_published = true OR public.is_admin());

-- ADMIN MUTATION POLICIES (Only authorized administrators)
CREATE POLICY "Admins can update school settings" ON public.school_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify subjects" ON public.subjects FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify assessment components" ON public.assessment_components FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify grading scale" ON public.grading_scale FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify quarters" ON public.academic_quarters FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify leadership" ON public.leadership FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify alumni" ON public.alumni FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify students" ON public.students FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify teachers" ON public.teachers FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify activities" ON public.extracurricular_activities FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify news" ON public.news FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT USING (public.is_admin());
