import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SchoolSettings, Subject, AssessmentComponent, GradingScaleItem, AcademicQuarter } from '../types';

export const generateSchoolProfilePdf = (
  settings: SchoolSettings,
  subjects: Subject[],
  assessmentComponents: AssessmentComponent[],
  gradingScale: GradingScaleItem[],
  academicQuarters: AcademicQuarter[]
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryNavy: [number, number, number] = [16, 45, 83]; // #102D53
  const darkNavy: [number, number, number] = [8, 29, 56];     // #081D38
  const accentGold: [number, number, number] = [201, 164, 92]; // #C9A45C
  const textDark: [number, number, number] = [24, 37, 54];     // #182536
  const mutedText: [number, number, number] = [100, 116, 139]; // #64748B

  // PAGE 1: INSTITUTIONAL IDENTITY, MISSION, STATS & CURRICULUM
  // Top Header Banner
  doc.setFillColor(...primaryNavy);
  doc.rect(0, 0, 210, 36, 'F');

  // Gold accent bar
  doc.setFillColor(...accentGold);
  doc.rect(0, 36, 210, 2, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('NAVOI CITY SPECIALIZED STATE SECONDARY SCHOOL №16', 105, 14, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(220, 230, 245);
  doc.text('OFFICIAL INSTITUTIONAL PROFILE FOR UNIVERSITY ADMISSIONS & EVALUATORS', 105, 21, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(201, 164, 92);
  doc.text('Ministry of Preschool and School Education of the Republic of Uzbekistan • Navoi Region', 105, 28, { align: 'center' });

  // Quick Metadata Box
  doc.setFillColor(246, 248, 251);
  doc.roundedRect(14, 43, 182, 22, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 43, 182, 22, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryNavy);

  // 4 Key Stats in Boxes
  const statCols = [
    { label: 'ESTABLISHED', val: `${settings.establishedYear} (60 Years)` },
    { label: 'STUDENT ENROLLMENT', val: `${settings.totalStudents.toLocaleString()} Students` },
    { label: 'FACULTY & STAFF', val: `${settings.totalTeachers} Specialized Teachers` },
    { label: 'GRADE SPAN', val: `${settings.gradesRange}` },
  ];

  statCols.forEach((col, idx) => {
    const x = 18 + idx * 45;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...mutedText);
    doc.text(col.label, x, 51);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...darkNavy);
    doc.text(col.val, x, 58);
  });

  // Section 1: Institutional Overview & Context
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryNavy);
  doc.text('1. INSTITUTIONAL OVERVIEW & JURISDICTION', 14, 73);

  doc.setDrawColor(...accentGold);
  doc.setLineWidth(0.5);
  doc.line(14, 75, 75, 75);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);

  const overviewText = [
    'Navoi City Specialized State Secondary School №16 is a leading public secondary education institution situated in Navoi City, Uzbekistan.',
    'Operating continuously since 1966, the school provides an enriched academic program under the Uzbekistan National Curriculum framework.',
    'Instruction is conducted over a six-day academic week across Grades 1 through 11, blending rigorous general education with accelerated,',
    'specialized tracks in core scientific, quantitative, and linguistic disciplines.'
  ].join(' ');

  const splitOverview = doc.splitTextToSize(overviewText, 182);
  doc.text(splitOverview, 14, 80);

  // Section 2: Mission & Core Principles
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryNavy);
  doc.text('2. MISSION & CORE PRINCIPLES', 14, 98);
  doc.line(14, 100, 58, 100);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkNavy);
  const missionText = `"${settings.mission}"`;
  const splitMission = doc.splitTextToSize(missionText, 182);
  doc.text(splitMission, 14, 106);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...mutedText);
  doc.text('Guiding Institutional Values:', 14, 116);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...textDark);
  doc.text('Academic Excellence  •  Integrity & Respect  •  Collaboration  •  Leadership  •  Creativity  •  Community Responsibility', 55, 116);

  // Section 3: Academic Program & Specialized Instruction
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryNavy);
  doc.text('3. ACADEMIC PROGRAM & CURRICULAR CONCENTRATIONS', 14, 126);
  doc.line(14, 128, 85, 128);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);
  const currText = 'The school delivers the comprehensive Uzbekistan State Secondary Curriculum with advanced specialized concentrations in six designated disciplines: Mathematics, Physics, English Language, Chemistry, Biology, and Information Technology. Below is the active subject directory:';
  const splitCurr = doc.splitTextToSize(currText, 182);
  doc.text(splitCurr, 14, 134);

  // Table of Subjects
  const specializedSubjects = subjects.filter(s => s.isSpecialized);
  const generalSubjects = subjects.filter(s => !s.isSpecialized);

  const subjectTableRows = [
    ...specializedSubjects.map(s => [s.name, s.category, s.applicableGrades, 'Specialized Academic Concentration']),
    ...generalSubjects.slice(0, 8).map(s => [s.name, s.category, s.applicableGrades, 'General Curricular Requirement']),
  ];

  autoTable(doc, {
    startY: 142,
    margin: { left: 14, right: 14 },
    head: [['Subject Name', 'Academic Division', 'Grade Levels', 'Curricular Status']],
    body: subjectTableRows,
    theme: 'grid',
    headStyles: {
      fillColor: primaryNavy,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: textDark,
      cellPadding: 1.8,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 55, fontStyle: 'bold' },
      1: { cellWidth: 45 },
      2: { cellWidth: 32 },
      3: { cellWidth: 50 },
    },
  });

  // Footer Page 1
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text('Navoi City Specialized State Secondary School №16 • Official Institutional Profile', 14, 288);
  doc.text('Page 1 of 2', 196, 288, { align: 'right' });


  // ==========================================
  // PAGE 2: ASSESSMENT STRUCTURE, GRADING SCALE, INTERNATIONAL COMPARISONS
  // ==========================================
  doc.addPage('a4', 'portrait');

  // Top header on page 2
  doc.setFillColor(...primaryNavy);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setFillColor(...accentGold);
  doc.rect(0, 20, 210, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('NAVOI CITY SPECIALIZED STATE SECONDARY SCHOOL №16 — SCHOOL PROFILE', 14, 13);
  doc.setFontSize(8);
  doc.setTextColor(201, 164, 92);
  doc.text('EVALUATION POLICIES & INTERNATIONAL GRADING CONCORDANCE', 196, 13, { align: 'right' });

  // Section 4: 100-Point Quarterly Assessment Structure
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryNavy);
  doc.text('4. 100-POINT QUARTERLY ASSESSMENT STRUCTURE', 14, 29);
  doc.setLineWidth(0.5);
  doc.setDrawColor(...accentGold);
  doc.line(14, 31, 80, 31);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);
  const assessExpl = 'Student evaluation across all secondary grades operates on a comprehensive 100-point quarterly assessment framework established under national educational directives. The final quarterly score directly synthesizes continuous formative participation with modular and cumulative summative evaluations:';
  doc.text(doc.splitTextToSize(assessExpl, 182), 14, 37);

  const assessRows = assessmentComponents.map(c => [
    c.name,
    c.code,
    `${c.maxPoints} pts`,
    c.description
  ]);

  autoTable(doc, {
    startY: 47,
    margin: { left: 14, right: 14 },
    head: [['Assessment Component', 'Identifier', 'Weight', 'Methodology & Frequency']],
    body: [
      ...assessRows,
      ['Cumulative Quarterly Grade', 'TOTAL', '100 pts', 'Final quarterly composite determining national performance band (1–5).']
    ],
    theme: 'grid',
    headStyles: {
      fillColor: primaryNavy,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: textDark,
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'bold' },
      1: { cellWidth: 25 },
      2: { cellWidth: 22, halign: 'center', fontStyle: 'bold' },
      3: { cellWidth: 85 },
    },
  });

  const nextY1 = (doc as any).lastAutoTable.finalY + 8;

  // Section 5: Uzbek National Grading Scale & International Reference
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryNavy);
  doc.text('5. UZBEK NATIONAL GRADING SCALE & INTERNATIONAL INTERPRETATION', 14, nextY1);
  doc.line(14, nextY1 + 2, 105, nextY1 + 2);

  const scaleRows = gradingScale.map(g => [
    g.scoreRange,
    g.uzbekGrade,
    g.description,
    g.usReference,
    g.notes || ''
  ]);

  autoTable(doc, {
    startY: nextY1 + 6,
    margin: { left: 14, right: 14 },
    head: [['100-pt Score', 'National Grade', 'Qualitative Descriptor', 'US Reference', 'Academic Standing & Procedures']],
    body: scaleRows,
    theme: 'grid',
    headStyles: {
      fillColor: darkNavy,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: textDark,
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 26, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 32, halign: 'center', fontStyle: 'bold' },
      2: { cellWidth: 35 },
      3: { cellWidth: 27, halign: 'center', fontStyle: 'bold' },
      4: { cellWidth: 62 },
    },
  });

  const nextY2 = (doc as any).lastAutoTable.finalY + 6;

  // Important International Credential Disclaimer Box
  doc.setFillColor(246, 248, 251);
  doc.roundedRect(14, nextY2, 182, 24, 1.5, 1.5, 'F');
  doc.setDrawColor(201, 164, 92);
  doc.setLineWidth(0.4);
  doc.roundedRect(14, nextY2, 182, 24, 1.5, 1.5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...primaryNavy);
  doc.text('INTERNATIONAL CREDENTIAL EVALUATION GUIDELINES & DISCLAIMER:', 18, nextY2 + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...textDark);
  const disclaimerText = [
    '• US GPA Equivalence: These comparisons are provided for general interpretation only. They are not official GPA conversions. Universities and credential evaluation organizations (e.g., WES, ECE) may use their own proprietary conversion methodologies.',
    '• United Kingdom Context: Uzbek secondary school credentials cannot be directly equated with GCSE or GCE A-Level certifications without an authorized national credential comparability assessment (e.g., UK ENIC / Ecctis).',
    '• Reassessment Policy: Scores below 45 points initiate structured remedial preparation and reassessment under school regulations, rather than automatic year repetition.'
  ].join('\n');
  doc.text(disclaimerText, 18, nextY2 + 10);

  const nextY3 = nextY2 + 30;

  // Section 6: Academic Calendar & Institutional Contact
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryNavy);
  doc.text('6. ACADEMIC CALENDAR & COUNSELOR CONTACT', 14, nextY3);
  doc.line(14, nextY3 + 2, 75, nextY3 + 2);

  // Left column: Academic Quarters table
  autoTable(doc, {
    startY: nextY3 + 6,
    margin: { left: 14 },
    tableWidth: 85,
    head: [['Academic Quarter', 'Term Range']],
    body: academicQuarters.map(q => [q.quarterName, q.months]),
    theme: 'grid',
    headStyles: {
      fillColor: primaryNavy,
      textColor: [255, 255, 255],
      fontSize: 7.5,
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: textDark,
      cellPadding: 1.5,
    },
  });

  // Right column: Contact Information box
  const rightBoxX = 105;
  const rightBoxY = nextY3 + 6;
  doc.setFillColor(246, 248, 251);
  doc.roundedRect(rightBoxX, rightBoxY, 91, 35, 1.5, 1.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rightBoxX, rightBoxY, 91, 35, 1.5, 1.5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...primaryNavy);
  doc.text('INSTITUTIONAL CONTACT & VERIFICATION', rightBoxX + 4, rightBoxY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textDark);
  doc.text(`Official Address: ${settings.address}, ${settings.postalCode}`, rightBoxX + 4, rightBoxY + 12);
  doc.text(`Telephone: ${settings.phone}`, rightBoxX + 4, rightBoxY + 17);
  doc.text(`Counselor / Admissions Email: ${settings.counselorEmail}`, rightBoxX + 4, rightBoxY + 22);
  doc.text('School Code / Jurisdiction: Navoi City Public Education Board', rightBoxX + 4, rightBoxY + 27);
  doc.text(`Profile Last Certified: ${settings.lastUpdated}`, rightBoxX + 4, rightBoxY + 32);

  // Footer Page 2
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text('Navoi City Specialized State Secondary School №16 • Official Institutional Profile', 14, 288);
  doc.text('Page 2 of 2', 196, 288, { align: 'right' });

  // Save the PDF
  doc.save('Navoi_School_16_Official_Profile.pdf');
};
