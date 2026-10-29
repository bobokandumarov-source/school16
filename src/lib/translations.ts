export type Language = 'en' | 'uz';

export interface Translations {
  // Navigation & Header
  nav: {
    home: string;
    about: string;
    academics: string;
    curriculum: string;
    curriculumDesc: string;
    assessment: string;
    assessmentDesc: string;
    studentLife: string;
    ourPeople: string;
    news: string;
    contact: string;
    schoolProfile: string;
    staffPortal: string;
    adminDashboard: string;
    officialProfilePdf: string;
    established: string;
    brandTitle: string;
    brandSubtitle: string;
    langActive: string;
    langUz: string;
    langEn: string;
  };
  
  // Common UI & Buttons
  common: {
    readMore: string;
    viewAll: string;
    explore: string;
    downloadPdf: string;
    contactUs: string;
    search: string;
    all: string;
    published: string;
    share: string;
    shareLinkCopied: string;
    back: string;
    close: string;
    zoom: string;
    details: string;
    schedule: string;
    location: string;
    coordinator: string;
    targetGrades: string;
    verifiedRecord: string;
    officialAdministration: string;
    facultyDistinction: string;
    studentHonors: string;
    alumniDirectory: string;
  };

  // Home Page
  home: {
    statsFoundation: string;
    statsFoundationDesc: string;
    statsStudents: string;
    statsStudentsDesc: string;
    statsTeachers: string;
    statsTeachersDesc: string;
    statsSpan: string;
    statsSpanDesc: string;
    curriculumBadge: string;
    sixDayBadge: string;
    specializedBadge: string;
    disciplinesBadge: string;
    disciplinesTitle: string;
    disciplinesSubtitle: string;
    exploreCurriculum: string;
    studentLifeBadge: string;
    studentLifeTitle: string;
    studentLifeSubtitle: string;
    viewAllClubs: string;
    achievementsBadge: string;
    achievementsTitle: string;
    achievementsSubtitle: string;
    viewAllPeople: string;
    newsBadge: string;
    newsTitle: string;
    newsSubtitle: string;
    allNews: string;
    noNews: string;
    noNewsDesc: string;
  };

  // About Page
  about: {
    badge: string;
    title: string;
    subtitle: string;
    quickFactsTitle: string;
    foundationYear: string;
    institutionType: string;
    jurisdiction: string;
    locationLabel: string;
    missionBadge: string;
    missionTitle: string;
    valuesBadge: string;
    valuesTitle: string;
    valuesSubtitle: string;
    leadershipBadge: string;
    leadershipTitle: string;
    leadershipSubtitle: string;
    principalBadge: string;
    deputyBadge: string;
  };

  // Student Life & Activities
  studentLife: {
    badge: string;
    title: string;
    subtitle: string;
    allCategories: string;
    clubsAndSocieties: string;
    artsAndCulture: string;
    sports: string;
    scienceAndTech: string;
    viewDetail: string;
    detailOverviewTitle: string;
    detailObjectivesTitle: string;
    detailGalleryTitle: string;
    detailGalleryEmpty: string;
    detailGalleryEmptyDesc: string;
    detailInfoTitle: string;
    detailJoinButton: string;
    detailShareTitle: string;
    detailRelatedTitle: string;
    detailNotFound: string;
    detailNotFoundDesc: string;
    detailReturn: string;
  };

  // Our People Page
  ourPeople: {
    badge: string;
    title: string;
    subtitle: string;
    tabLeadership: string;
    tabAlumni: string;
    tabStudents: string;
    tabTeachers: string;
    leadershipBadge: string;
    leadershipTitle: string;
    leadershipSubtitle: string;
    alumniBadge: string;
    alumniTitle: string;
    alumniSubtitle: string;
    studentsBadge: string;
    studentsTitle: string;
    studentsSubtitle: string;
    teachersBadge: string;
    teachersTitle: string;
    teachersSubtitle: string;
    classOf: string;
    alumna: string;
    policyNote: string;
  };

  // Academics & Assessment
  academics: {
    badge: string;
    title: string;
    subtitle: string;
    tracksBadge: string;
    tracksTitle: string;
    tracksSubtitle: string;
    subjectsBadge: string;
    subjectsTitle: string;
    subjectsSubtitle: string;
    searchPlaceholder: string;
    assessmentBadge: string;
    assessmentTitle: string;
    assessmentSubtitle: string;
    componentsTitle: string;
    gradingTitle: string;
    quartersTitle: string;
    viewGradingDetails: string;
  };

  // News Page
  newsPage: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    readFullNotice: string;
    noticeNotFound: string;
    noticeNotFoundDesc: string;
    returnToNews: string;
    relatedTitle: string;
    pressOffice: string;
  };

  // School Profile Page
  schoolProfile: {
    badge: string;
    title: string;
    subtitle: string;
    downloadPdf: string;
    overviewTitle: string;
    accreditationTitle: string;
    gradingEquivalenceTitle: string;
    demographicsTitle: string;
    contactCounselor: string;
  };

  // Contact Page
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    infoTitle: string;
    campusAddress: string;
    telephone: string;
    counselorEmail: string;
    hours: string;
    hoursValue: string;
    locationNotice: string;
  };

  // Footer
  footer: {
    schoolName: string;
    location: string;
    description: string;
    grades: string;
    officialContact: string;
    address: string;
    telephone: string;
    counselorEmail: string;
    quickLinks: string;
    governance: string;
    rightsReserved: string;
    privacyPolicy: string;
    termsOfService: string;
    accessibility: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      academics: 'Academics',
      curriculum: 'Curriculum & Subjects',
      curriculumDesc: 'National curriculum, 20-subject directory, and specialized instruction tracks',
      assessment: 'Assessment & Grading',
      assessmentDesc: '100-point structure, BSB/CHSB framework, and international grade comparison',
      studentLife: 'Student Life',
      ourPeople: 'Our People',
      news: 'News',
      contact: 'Contact',
      schoolProfile: 'School Profile',
      staffPortal: 'Staff Portal',
      adminDashboard: 'Admin Dashboard',
      officialProfilePdf: 'Official School Profile (PDF)',
      established: 'Established 1966 • Grades 1–11',
      brandTitle: 'Navoi School №16',
      brandSubtitle: 'Specialized State Secondary',
      langActive: 'English',
      langUz: "O'zbek tili",
      langEn: 'English',
    },
    common: {
      readMore: 'Read More',
      viewAll: 'View All',
      explore: 'Explore',
      downloadPdf: 'Download School Profile (PDF)',
      contactUs: 'Contact School',
      search: 'Search...',
      all: 'All',
      published: 'Published',
      share: 'Share',
      shareLinkCopied: 'Link copied to clipboard!',
      back: 'Back',
      close: 'Close',
      zoom: 'Enlarge',
      details: 'Details',
      schedule: 'Schedule',
      location: 'Location',
      coordinator: 'Coordinator',
      targetGrades: 'Eligible for Grades 1–11',
      verifiedRecord: 'Verified Institutional Record',
      officialAdministration: 'Official Administration Member',
      facultyDistinction: 'Faculty Distinction',
      studentHonors: 'Academic Honors',
      alumniDirectory: 'Verified Alumni Record',
    },
    home: {
      statsFoundation: 'HISTORICAL FOUNDATION',
      statsFoundationDesc: 'Serving the Navoi educational community for six decades.',
      statsStudents: 'STUDENT BODY',
      statsStudentsDesc: 'Active learners enrolled in primary and secondary education.',
      statsTeachers: 'SPECIALIZED FACULTY',
      statsTeachersDesc: 'Dedicated teachers guiding subject mastery and character.',
      statsSpan: 'ACADEMIC SPAN',
      statsSpanDesc: 'Comprehensive state secondary education curriculum.',
      curriculumBadge: 'Uzbekistan National Curriculum',
      sixDayBadge: 'Six-Day Academic Week',
      specializedBadge: 'Specialized Subject Tracks',
      disciplinesBadge: 'SPECIALIZED INSTRUCTION',
      disciplinesTitle: 'Academic Excellence in Core Disciplines',
      disciplinesSubtitle: 'The school offers specialized academic instruction in six designated scientific, mathematical, and linguistic tracks.',
      exploreCurriculum: 'Explore Complete 20-Subject Directory & Curriculum',
      studentLifeBadge: 'STUDENT LIFE',
      studentLifeTitle: 'Beyond the Classroom',
      studentLifeSubtitle: 'Cultivating leadership, creativity, sportsmanship, and civic engagement through diverse student-led societies.',
      viewAllClubs: 'View All Clubs & Sports',
      achievementsBadge: 'STUDENT RECOGNITION',
      achievementsTitle: 'Featured Student Achievements',
      achievementsSubtitle: 'Honoring actual student accomplishments in regional competitions, academic Olympiads, and international credentials.',
      viewAllPeople: 'View Full Directory of Students, Alumni & Teachers',
      newsBadge: 'ANNOUNCEMENTS',
      newsTitle: 'Latest School News',
      newsSubtitle: 'Official announcements and informational updates from Navoi City Specialized State Secondary School №16.',
      allNews: 'All News Articles',
      noNews: 'No Published News Yet',
      noNewsDesc: 'Official announcements will appear here once published by school administration.',
    },
    about: {
      badge: 'INSTITUTIONAL PROFILE',
      title: 'About Our School',
      subtitle: 'Sixty years of academic excellence, national curriculum mastery, and dedicated character education in Navoi City.',
      quickFactsTitle: 'Quick Institutional Facts',
      foundationYear: 'Foundation Year',
      institutionType: 'Institution Type',
      jurisdiction: 'Jurisdiction',
      locationLabel: 'Location',
      missionBadge: 'OUR INSTITUTIONAL MISSION',
      missionTitle: 'Guiding Mission Statement',
      valuesBadge: 'GUIDING PRINCIPLES',
      valuesTitle: 'Core Values That Shape Our Community',
      valuesSubtitle: 'These values represent our shared guiding commitments informing teaching, student conduct, and school life.',
      leadershipBadge: 'ADMINISTRATION',
      leadershipTitle: 'Our Leadership',
      leadershipSubtitle: 'The executive leadership team guiding academic quality, school governance, and student welfare at School №16.',
      principalBadge: 'Head of School & Principal',
      deputyBadge: 'Deputy Principal',
    },
    studentLife: {
      badge: 'CO-CURRICULAR PROGRAMS',
      title: 'Student Life & Extracurricular Activities',
      subtitle: 'Enriching academic learning through science societies, competitive athletics, dramatic arts, ecological committees, and cultural clubs.',
      allCategories: 'All Categories',
      clubsAndSocieties: 'Clubs & Societies',
      artsAndCulture: 'Arts & Culture',
      sports: 'Sports',
      scienceAndTech: 'Science & Tech',
      viewDetail: 'View Club Page',
      detailOverviewTitle: 'Activity & Club Overview',
      detailObjectivesTitle: 'Key Objectives & Learning Goals',
      detailGalleryTitle: 'Activity Photo Gallery',
      detailGalleryEmpty: 'Photos Coming Soon',
      detailGalleryEmptyDesc: 'Photo documentation from club sessions will be posted once updated by school administration.',
      detailInfoTitle: 'Club Information & Schedule',
      detailJoinButton: 'Register for this Club',
      detailShareTitle: 'Share this Activity',
      detailRelatedTitle: 'Other Extracurricular Societies',
      detailNotFound: 'Activity Not Found',
      detailNotFoundDesc: 'The requested extracurricular society could not be located.',
      detailReturn: 'Back to All Activities',
    },
    ourPeople: {
      badge: 'COMMUNITY DIRECTORY',
      title: 'Our People',
      subtitle: 'Celebrating the school leaders, dedicated faculty, accomplished graduates, and recognized students who embody the spirit of Navoi School №16.',
      tabLeadership: 'School Leadership',
      tabAlumni: 'Distinguished Alumni',
      tabStudents: 'Student Achievements',
      tabTeachers: 'Outstanding Teachers',
      leadershipBadge: 'GOVERNANCE',
      leadershipTitle: 'School Leadership Administration',
      leadershipSubtitle: 'The executive leadership team managing instructional standards, institutional governance, and student development.',
      alumniBadge: 'GRADUATE DESTINATIONS',
      alumniTitle: 'Distinguished Alumni',
      alumniSubtitle: 'Honoring alumni who have graduated from School №16 and advanced to higher education institutions.',
      studentsBadge: 'ACADEMIC MERIT',
      studentsTitle: 'Student Achievements',
      studentsSubtitle: 'Verified records of current and recent students recognized for academic honors and competition success.',
      teachersBadge: 'FACULTY HONORS',
      teachersTitle: 'Outstanding Teachers',
      teachersSubtitle: 'Recognizing faculty members honored with national pedagogical awards and international standardized certifications.',
      classOf: 'Class of',
      alumna: 'Alumna',
      policyNote: 'Institutional Record Policy: All achievements, faculty awards, and alumni milestones displayed are documented official records verified by school administration.',
    },
    academics: {
      badge: 'INSTRUCTIONAL FRAMEWORK',
      title: 'Academics & Specialized Tracks',
      subtitle: 'Rigorous implementation of the Uzbekistan National Curriculum enhanced by specialized instruction across six academic disciplines.',
      tracksBadge: 'CURRICULUM ARCHITECTURE',
      tracksTitle: 'Specialized Instruction Disciplines',
      tracksSubtitle: 'School №16 offers state-accredited specialized instruction tracks with enriched laboratory work and competition coaching.',
      subjectsBadge: 'SUBJECT DIRECTORY',
      subjectsTitle: 'Complete 20-Subject Curriculum Directory',
      subjectsSubtitle: 'Comprehensive directory of all 20 secondary subjects taught at School №16 across Grades 1–11.',
      searchPlaceholder: 'Search subjects by title or description...',
      assessmentBadge: 'ACADEMIC EVALUATION',
      assessmentTitle: 'Assessment & Grading Methodology',
      assessmentSubtitle: 'Clear overview of the 100-point quarterly evaluation framework, BSB and CHSB components, and international grade conversions.',
      componentsTitle: '100-Point Quarterly Assessment Components',
      gradingTitle: 'Official 5-Point National Grading Scale',
      quartersTitle: 'Academic Year Quarters & Examination Timelines',
      viewGradingDetails: 'View Complete Assessment Methodology',
    },
    newsPage: {
      badge: 'INSTITUTIONAL COMMUNICATIONS',
      title: 'News & Announcements',
      subtitle: 'Official press bulletins, academic notices, examination updates, and school events from Navoi School №16.',
      searchPlaceholder: 'Search announcements and news...',
      readFullNotice: 'Read Full Notice',
      noticeNotFound: 'Notice Not Found',
      noticeNotFoundDesc: 'The requested news article could not be located or has been archived.',
      returnToNews: 'Return to Announcements',
      relatedTitle: 'Related School Announcements',
      pressOffice: 'Administration Press Office',
    },
    schoolProfile: {
      badge: 'OFFICIAL ADMISSIONS PROFILE',
      title: 'School Profile',
      subtitle: 'Comprehensive institutional reference detailing our curriculum structure, grading methodology, student demographics, and international credentials.',
      downloadPdf: 'Download Official Profile (PDF)',
      overviewTitle: 'Institutional Overview',
      accreditationTitle: 'Accreditation & Curriculum Standards',
      gradingEquivalenceTitle: 'Uzbek 100-Point Grading Scale & US Grade References',
      demographicsTitle: 'Student Demographics & Class Size',
      contactCounselor: 'Contact School College Counselor',
    },
    contact: {
      badge: 'CAMPUS DIRECTORY',
      title: 'Contact Information',
      subtitle: 'Reach out to the administration, admissions counseling office, or schedule an official campus visit.',
      infoTitle: 'Official Contact Details',
      campusAddress: 'Physical Campus Address',
      telephone: 'Telephone Inquiries',
      counselorEmail: 'Admissions & University Counselor Email',
      hours: 'Administrative Hours',
      hoursValue: 'Monday – Saturday: 08:00 – 17:00 (Sunday Closed)',
      locationNotice: 'Located in Navoi City, Navoi Region, Republic of Uzbekistan.',
    },
    footer: {
      schoolName: 'Navoi City Specialized State Secondary School №16',
      location: 'Navoi City, Uzbekistan',
      description: 'Providing rigorous academic learning, character formation, and specialized instruction in Mathematics, Physics, English, Chemistry, Biology, and IT under the Uzbekistan National Curriculum.',
      grades: 'State Secondary Institution • Grades 1–11',
      officialContact: 'Official Contact',
      address: 'Official Address',
      telephone: 'Telephone',
      counselorEmail: 'Admissions Counselor Email',
      quickLinks: 'Quick Links',
      governance: 'Governance & Integrity',
      rightsReserved: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      accessibility: 'Accessibility Notice',
    },
  },

  uz: {
    nav: {
      home: 'Bosh sahifa',
      about: 'Maktab haqida',
      academics: "Ta'lim",
      curriculum: "O'quv reja va fanlar",
      curriculumDesc: "O'zbekiston milliy dasturi, 20 ta fan katalogi va chuqurlashtirilgan yo'nalishlar",
      assessment: 'Baholash mezonlari',
      assessmentDesc: '100 ballik baholash tizimi, BSB/CHSB tartibi va xalqaro baholash taqqosi',
      studentLife: 'Maktab hayoti',
      ourPeople: 'Bizning jamoa',
      news: 'Yangiliklar',
      contact: "Bog'lanish",
      schoolProfile: 'Maktab profili',
      staffPortal: 'Xodimlar portali',
      adminDashboard: 'Boshqaruv paneli',
      officialProfilePdf: 'Rasmiy maktab profili (PDF)',
      established: '1966-yilda tashkil topgan • 1–11-sinflar',
      brandTitle: '16-sonli maktab',
      brandSubtitle: 'Ixtisoslashtirilgan davlat maktabi',
      langActive: "O'zbek tili",
      langUz: "O'zbek tili",
      langEn: 'English',
    },
    common: {
      readMore: "Batafsil o'qish",
      viewAll: "Barchasini ko'rish",
      explore: "O'rganish",
      downloadPdf: 'Maktab profilini yuklab olish (PDF)',
      contactUs: "Bog'lanish",
      search: 'Qidirish...',
      all: 'Barchasi',
      published: 'E\'lon qilingan',
      share: 'Ulashish',
      shareLinkCopied: 'Havola nusxalandi!',
      back: 'Orqaga',
      close: 'Yopish',
      zoom: 'Kattalashtirish',
      details: "Batafsil ma'lumot",
      schedule: 'Mashg‘ulot vaqti',
      location: 'O‘tkazilish joyi',
      coordinator: 'Mas‘ul rahbar',
      targetGrades: "1–11-sinf o'quvchilari uchun",
      verifiedRecord: 'Tasdiqlangan rasmiy qayd',
      officialAdministration: "Rasmiy ma'muriyat a'zosi",
      facultyDistinction: 'Faxriy pedagog',
      studentHonors: "Akademik yutuqlar",
      alumniDirectory: 'Tasdiqlangan bitiruvchi qaydi',
    },
    home: {
      statsFoundation: 'TARIXIY ASOS',
      statsFoundationDesc: 'Navoiy shahar ta\'lim tizimida olti o‘n yillik shonli tajriba.',
      statsStudents: 'O‘QUVCHILAR SONI',
      statsStudentsDesc: 'Boshlang‘ich va umumiy o‘rta ta\'limda tahsil olayotgan yoshlar.',
      statsTeachers: 'MALAKALI O‘QITUVCHILAR',
      statsTeachersDesc: 'Bilim va tarbiya beruvchi oliy toifali mutaxassislar.',
      statsSpan: 'TA\'LIM BOSQICHLARI',
      statsSpanDesc: '1–11-sinflarni to‘liq qamrab oluvchi davlat ta\'lim standarti.',
      curriculumBadge: 'O‘zbekiston Milliy O‘quv Dasturi',
      sixDayBadge: 'Olti Kunlik O‘quv Haftasi',
      specializedBadge: 'Ixtisoslashtirilgan Fan Yo‘nalishlari',
      disciplinesBadge: 'CHUQURLASHTIRILGAN TA\'LIM',
      disciplinesTitle: 'Asosiy Fanlar Bo‘yicha Yuqori Akademik Sifat',
      disciplinesSubtitle: 'Maktabimiz oltita ustuvor ilmiy, tabiiy, matematik va lingvistik yo‘nalishda ixtisoslashtirilgan ta\'lim beradi.',
      exploreCurriculum: '20 Ta Fan Katalogi Va O‘quv Rejasini Ko‘rish',
      studentLifeBadge: 'MAKTAB HAYOTI',
      studentLifeTitle: 'Darsdan Tashqari Mashg‘ulotlar',
      studentLifeSubtitle: 'To‘garaklar, sport seksiyalari, intellektual to‘garaklar va ekologik qo‘mita orqali faol yoshlar kamoloti.',
      viewAllClubs: 'Barcha To‘garaklar Va Sportni Ko‘rish',
      achievementsBadge: 'O‘QUVCHILAR E\'TIROFI',
      achievementsTitle: 'O‘quvchilarimizning Yuksak Yutuqlari',
      achievementsSubtitle: 'Respublika va viloyat fan olimpiadalari, xalqaro sertifikatlar hamda nufuzli musobaqalar g‘oliblari.',
      viewAllPeople: 'Barcha O‘quvchilar, Bitiruvchilar Va Ustozlar Ro‘yxati',
      newsBadge: 'E\'LONLAR VA YANGILIKLAR',
      newsTitle: 'Maktabimizning So‘nggi Yangiliklari',
      newsSubtitle: 'Navoiy shahar 16-sonli ixtisoslashtirilgan maktabining rasmiy xabarlari va muhim bildirishnomalari.',
      allNews: 'Barcha Yangiliklar',
      noNews: 'Hozircha yangiliklar yo‘q',
      noNewsDesc: 'Maktab ma\'muriyati tomonidan yangiliklar e\'lon qilinganda shu yerda paydo bo‘ladi.',
    },
    about: {
      badge: 'MUASSASA TAVSIFI',
      title: 'Maktabimiz Haqida',
      subtitle: 'Navoiy shahrida oltmish yillik akademik an\'analar, milliy ta\'lim dasturi va yuksak ahloqiy tarbiya maskani.',
      quickFactsTitle: 'Maktabning Asosiy Ko‘rsatkichlari',
      foundationYear: 'Tashkil topgan yili',
      institutionType: 'Muassasa turi',
      jurisdiction: 'Bo‘ysunuv idorasi',
      locationLabel: 'Joylashuv',
      missionBadge: 'MAKTABIMIZ MISSIYASI',
      missionTitle: 'Asosiy Ta\'limiy Maqsadimiz',
      valuesBadge: 'ETAKCHI QADRIYATLAR',
      valuesTitle: 'Jamoamizni Birlashtiruvchi Qadriyatlar',
      valuesSubtitle: 'Ushbu qadriyatlar o‘quv jarayoni, o‘quvchi xulq-atvori va butun maktab muhitini belgilab beradi.',
      leadershipBadge: 'MAKTAB MA\'MURIYATI',
      leadershipTitle: 'Rahbariyat Jamoasi',
      leadershipSubtitle: '16-sonli maktabda ta\'lim sifati, ma\'muriy tartib va o‘quvchilar kamolotiga rahbarlik qiluvchi jamoa.',
      principalBadge: 'Maktab Direktori',
      deputyBadge: 'Direktor O‘rinbosari',
    },
    studentLife: {
      badge: 'DARDAN TASHQARI TA\'LIM',
      title: 'Maktab Hayoti Va To‘garaklar',
      subtitle: 'Ilmiy to‘garaklar, sport seksiyalari, teatr studiyalari, ekologiya qo‘mitasi va madaniy to‘plamlar orqali qobiliyatlarni rivojlantirish.',
      allCategories: 'Barcha Yo‘nalishlar',
      clubsAndSocieties: 'To‘garaklar va Jamiyatlar',
      artsAndCulture: 'San\'at va Madaniyat',
      sports: 'Sport To‘garaklari',
      scienceAndTech: 'Fan va Texnologiya',
      viewDetail: 'To‘garak Sahifasini Ko‘rish',
      detailOverviewTitle: 'To‘garak Va Faoliyat Haqida Batafsil',
      detailObjectivesTitle: 'Asosiy Maqsad Va Rivojlantiruvchi Ko‘nikmalar',
      detailGalleryTitle: 'Mashg‘ulot Jarayonidan Fotolavhalar',
      detailGalleryEmpty: 'Rasmlar kutilmoqda',
      detailGalleryEmptyDesc: 'Mashg‘ulotlardan yangi fotosuratlar admin tomonidan tez orada joylashtiriladi.',
      detailInfoTitle: 'To‘garak Ma\'lumotlari Va Jadvali',
      detailJoinButton: 'Ushbu To‘garakka Yozilish',
      detailShareTitle: 'To‘garakni Do‘stlarga Ulashing',
      detailRelatedTitle: 'Boshqa Qiziqarli To‘garaklar',
      detailNotFound: 'To‘garak Topilmadi',
      detailNotFoundDesc: 'Siz qidirgan to‘garak mavjud emas yoki nomi o‘zgartirilgan bo‘lishi mumkin.',
      detailReturn: 'Barcha To‘garaklar Ro‘yxatiga Qaytish',
    },
    ourPeople: {
      badge: 'JAMOAMIZ ALBOMI',
      title: 'Bizning Jamoa',
      subtitle: 'Maktabimiz rahbariyati, fidoyi ustozlar, faxriy bitiruvchilar va iqtidorli o‘quvchilarimiz bilan tanishing.',
      tabLeadership: 'Maktab Rahbariyati',
      tabAlumni: 'Faxriy Bitiruvchilar',
      tabStudents: 'O‘quvchilar Yutuqlari',
      tabTeachers: 'Ustozlarimiz',
      leadershipBadge: 'BOSHQARUV',
      leadershipTitle: 'Maktab Rahbariyati Ma\'muriyati',
      leadershipSubtitle: 'O‘quv standartlari, ma\'muriy boshqaruv va o‘quvchilar rivojiga mas\'ul rahbarlar jamoasi.',
      alumniBadge: 'BITIRUVCHILARIMIZ MUVAFFAQIYATI',
      alumniTitle: 'Faxriy Bitiruvchilar',
      alumniSubtitle: '16-sonli maktabni tamomlab, nufuzli xalqaro va mahalliy oliygohlarda tahsil olayotgan bitiruvchilar.',
      studentsBadge: 'AKADEMIK SHON-SHARAF',
      studentsTitle: 'O‘quvchilarimiz Yutuqlari',
      studentsSubtitle: 'Fan olimpiadalari, tanlovlar va xalqaro imtihonlarda g‘olib bo‘lgan iqtidorli o‘quvchilar qaydnomasi.',
      teachersBadge: 'USTOZLAR SHON-SHARAFI',
      teachersTitle: 'Atoqli Ustozlarimiz',
      teachersSubtitle: 'Davlat mukofotlari, "Yil o‘qituvchisi" tanlovi g‘oliblari va xalqaro sertifikat sohibi bo‘lgan pedagoglar.',
      classOf: 'Bitirgan yili:',
      alumna: 'Bitiruvchi',
      policyNote: 'Rasmiy Ma\'lumot Kafolati: Ushbu sahifada ko‘rsatilgan barcha yutuqlar, mukofotlar va bitiruvchilar ma\'lumotlari maktab ma\'muriyati tomonidan rasman tasdiqlangan.',
    },
    academics: {
      badge: 'O‘QUV TIZIMI',
      title: 'Ta\'lim Va Chuqurlashtirilgan Yo‘nalishlar',
      subtitle: 'O‘zbekiston Milliy O‘quv Dasturi asosida oltita ixtisoslashtirilgan yo‘nalishda sifatli ta\'lim.',
      tracksBadge: 'IXTISOSLASHGAN FANLAR',
      tracksTitle: 'Chuqurlashtirilgan Ta\'lim Yo‘nalishlari',
      tracksSubtitle: '16-sonli maktabda laboratoriya amaliyotlari va olimpiada tayyorgarligi bilan boyitilgan maxsus yo‘nalishlar.',
      subjectsBadge: 'FANLAR MAJMUASI',
      subjectsTitle: 'Barcha 20 Ta Fan Katalogi',
      subjectsSubtitle: '1–11-sinflar kesimida o‘qitiladigan barcha 20 ta umumta\'lim fanining to‘liq ro‘yxati.',
      searchPlaceholder: 'Fan nomi yoki tavsifi bo‘yicha qidiring...',
      assessmentBadge: 'BAHOLASH MEZONI',
      assessmentTitle: 'Baholash Tizimi Va Standartlari',
      assessmentSubtitle: 'Choraklik 100 ballik baholash tizimi, BSB va CHSB mezonlari hamda 5 baholik davlat tizimiga o‘girish.',
      componentsTitle: 'Choraklik 100 Ballik Baholash Tuzilmasi',
      gradingTitle: 'Davlat 5 Ballik Baholash Shkalasi',
      quartersTitle: 'O‘quv Choraklari Va Imtihon Muddatlari',
      viewGradingDetails: 'To‘liq Baholash Tartibini O‘rganish',
    },
    newsPage: {
      badge: 'RASMIY AXBOROT',
      title: 'Yangiliklar Va E\'lonlar',
      subtitle: 'Navoiy shahar 16-sonli maktabning rasmiy press-relizlari, o‘quv e\'lonlari va muhim tadbirlari.',
      searchPlaceholder: 'E\'lonlar va yangiliklarni qidirish...',
      readFullNotice: 'To‘liq Xabarni O‘qish',
      noticeNotFound: 'Xabar Topilmadi',
      noticeNotFoundDesc: 'Siz qidirgan xabar mavjud emas yoki arxivlangan bo‘lishi mumkin.',
      returnToNews: 'Barcha E\'lonlarga Qaytish',
      relatedTitle: 'Mavzuga Doir Boshqa E\'lonlar',
      pressOffice: 'Ma\'muriyat Axborot Xizmati',
    },
    schoolProfile: {
      badge: 'RASMIY AKADEMIK PROFIL',
      title: 'Maktab Profili (School Profile)',
      subtitle: 'Xalqaro universitetlar, qabul komissiyalari va xorijiy tashkilotlar uchun rasmiy ta\'limiy ma\'lumotnoma.',
      downloadPdf: 'Rasmiy Profilni Yuklab Olish (PDF)',
      overviewTitle: 'Muassasa Haqida Qisqacha',
      accreditationTitle: 'Akkreditatsiya Va Ta\'lim Standartlari',
      gradingEquivalenceTitle: 'O‘zbekiston 100 Ballik Shkalasi Va AQSH GPA Ekvivalentligi',
      demographicsTitle: 'O‘quvchilar Kontingenti Va Sinflar',
      contactCounselor: 'Kollej Maslahatchisi Bilan Bog‘lanish',
    },
    contact: {
      badge: 'ALOQA MA\'LUMOTLARI',
      title: 'Bog‘lanish Va Manzil',
      subtitle: 'Maktab ma\'muriyati yoki kollej maslahatchisi bilan bog‘laning yoki maktabimizga tashrif buyuring.',
      infoTitle: 'Rasmiy Bog‘lanish Bo‘limi',
      campusAddress: 'Maktabning Aniq Manzili',
      telephone: 'Bog‘lanish Telefoni',
      counselorEmail: 'Universitet Va Qabul Maslahatchisi Email',
      hours: 'Ish Vaqti',
      hoursValue: 'Dushanba – Shanba: 08:00 – 17:00 (Yakshanba dam olish)',
      locationNotice: 'O‘zbekiston Respublikasi, Navoiy viloyati, Navoiy shahri.',
    },
    footer: {
      schoolName: 'Navoiy Shahar 16-Sonli Ixtisoslashtirilgan Davlat Umumta\'lim Maktabi',
      location: 'Navoiy shahri, O‘zbekiston',
      description: 'O‘zbekiston Milliy O‘quv Dasturi asosida matematika, fizika, ingliz tili, kimyo, biologiya va IT yo‘nalishlarida chuqurlashtirilgan sifatli ta\'lim.',
      grades: 'Davlat umumta\'lim muassasasi • 1–11-sinflar',
      officialContact: 'Rasmiy Aloqa',
      address: 'Rasmiy Manzil',
      telephone: 'Telefon',
      counselorEmail: 'Qabul Maslahatchisi Emaili',
      quickLinks: 'Foydali Havolalar',
      governance: 'Boshqaruv Va Shaffoflik',
      rightsReserved: 'Barcha huquqlar himoyalangan.',
      privacyPolicy: 'Maxfiylik siyosati',
      termsOfService: 'Foydalanish shartlari',
      accessibility: 'Qulaylik standarti',
    },
  },
};

export const useT = (lang: Language) => {
  return translations[lang] || translations.en;
};