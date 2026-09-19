const fs = require('fs');
const path = require('path');

// Map of file -> array of {from, to} replacements
const replacements = [
  // SimplifiedHeader.tsx - Sparkles + //
  {
    file: 'app/components/layout/SimplifiedHeader.tsx',
    pairs: [
      ['CORE FOUNDATION // START HERE', 'CORE FOUNDATION · START HERE'],
    ]
  },
  // HeroEditorial.tsx
  {
    file: 'app/components/homepage/HeroEditorial.tsx',
    pairs: [
      ['ORIGIN // UNCONVENTIONAL LEARNING', 'ORIGIN · UNCONVENTIONAL LEARNING'],
    ]
  },
  // IntroStatement.tsx
  {
    file: 'app/components/homepage/IntroStatement.tsx',
    pairs: [
      ['The Origin Thesis //', 'The Origin Thesis —'],
    ]
  },
  // OriginChallengesPreview.tsx
  {
    file: 'app/components/homepage/OriginChallengesPreview.tsx',
    pairs: [
      ['ORIGIN CHALLENGES // REAL-WORLD PRESSURES', 'ORIGIN CHALLENGES · REAL-WORLD PRESSURES'],
      ['08 // {ch.category}', '08 · {ch.category}'],
    ]
  },
  // OriginCourseCatalog.tsx
  {
    file: 'app/components/homepage/OriginCourseCatalog.tsx',
    pairs: [
      ['{c.number} // {c.tier}', '{c.number} · {c.tier}'],
      ['{currentCourse.number} // {currentCourse.tier}', '{currentCourse.number} · {currentCourse.tier}'],
    ]
  },
  // OriginPrinciples.tsx
  {
    file: 'app/components/homepage/OriginPrinciples.tsx',
    pairs: [
      ['01 // THE SHIFT IN LEARNING', '01 · THE SHIFT IN LEARNING'],
      ['02 // THE 4-STEP FRAMEWORK', '02 · THE 4-STEP FRAMEWORK'],
      ['03 // THE PURPOSE', '03 · THE PURPOSE'],
      ['04 // THE STANDARD', '04 · THE STANDARD'],
    ]
  },
  // EditorialPhilosophy.tsx
  {
    file: 'app/components/homepage/EditorialPhilosophy.tsx',
    pairs: [
      ['01 // Flexible Schedule (Ages 10–45)', '01 · Flexible Schedule (Ages 10–45)'],
      ['02 // Permanent Value', '02 · Permanent Value'],
      ['03 // Actionable Assets', '03 · Actionable Assets'],
      ['04 // Instant Activation', '04 · Instant Activation'],
    ]
  },
  // QuestionDiscoveryMatrix.tsx
  {
    file: 'app/components/homepage/QuestionDiscoveryMatrix.tsx',
    pairs: [
      ['DISCOVERY ENGINE // INQUIRY-FIRST', 'DISCOVERY ENGINE · INQUIRY-FIRST'],
    ]
  },
  // StartHereGuide.tsx
  {
    file: 'app/components/homepage/StartHereGuide.tsx',
    pairs: [
      ['RECOMMENDED PATHWAY // {currentTrack.goal}', 'RECOMMENDED PATHWAY · {currentTrack.goal}'],
    ]
  },
  // ChallengeSimulationModal.tsx
  {
    file: 'app/components/homepage/ChallengeSimulationModal.tsx',
    pairs: [
      ['SIMULATION COMPLETE // 2 OF 7 CRISIS STAGES RESOLVED', 'SIMULATION COMPLETE · 2 OF 7 CRISIS STAGES RESOLVED'],
    ]
  },
  // Testimonials.tsx
  {
    file: 'app/components/sections/Testimonials.tsx',
    pairs: [
      ['01 // Capital & Time Allocation', '01 · Capital & Time Allocation'],
      ['02 // Problem Decomposition', '02 · Problem Decomposition'],
      ['03 // Communication & Intent', '03 · Communication & Intent'],
      ['04 // Youth Reasoning & Choice', '04 · Youth Reasoning & Choice'],
      ['05 // Consequence Analysis', '05 · Consequence Analysis'],
      ['06 // Adaptability & Antifragility', '06 · Adaptability & Antifragility'],
    ]
  },
  // contact/page.tsx
  {
    file: 'app/contact/page.tsx',
    pairs: [
      ['Get in Touch // Dedicated Concierge', 'Get in Touch · Dedicated Concierge'],
    ]
  },
  // courses/[id]/page.tsx
  {
    file: 'app/courses/[id]/page.tsx',
    pairs: [
      ['ORIGIN // " + course.trackId.toUpperCase()', 'ORIGIN · " + course.trackId.toUpperCase()'],
      ['GO DEEPER // ORIGIN READING COMPANION', 'GO DEEPER · ORIGIN READING COMPANION'],
    ]
  },
  // events/page.tsx
  {
    file: 'app/events/page.tsx',
    pairs: [
      ['DAY 1 // SATURDAY @ 5:00 PM WAT', 'DAY 1 · SATURDAY @ 5:00 PM WAT'],
      ['DAY 2 // SUNDAY @ 5:00 PM WAT', 'DAY 2 · SUNDAY @ 5:00 PM WAT'],
      ['SESSION 1 // 5:00 PM – 6:15 PM WAT', 'SESSION 1 · 5:00 PM – 6:15 PM WAT'],
      ['SESSION 2 // 6:30 PM – 8:00 PM WAT', 'SESSION 2 · 6:30 PM – 8:00 PM WAT'],
      ['MORNING SESSION // 9:00 AM – 1:00 PM', 'MORNING SESSION · 9:00 AM – 1:00 PM'],
      ['AFTERNOON SESSION // 2:00 PM – 5:00 PM', 'AFTERNOON SESSION · 2:00 PM – 5:00 PM'],
      ['THE BECOMING INSTITUTE // LIVE EVENTS &amp; SESSIONS', 'THE BECOMING INSTITUTE · LIVE EVENTS &amp; SESSIONS'],
      ['{unit.num} // {unit.role}', '{unit.num} · {unit.role}'],
    ]
  },
  // jumpstart/page.tsx
  {
    file: 'app/jumpstart/page.tsx',
    pairs: [
      ['THE BECOMING INSTITUTE // 2-DAY ACCELERATOR (HYBRID)', 'THE BECOMING INSTITUTE · 2-DAY ACCELERATOR (HYBRID)'],
      ['01 // DAILY PROMPTS', '01 · DAILY PROMPTS'],
      ['02 // PEER AUDITS', '02 · PEER AUDITS'],
      ['03 // VOICE DIRECTIVES', '03 · VOICE DIRECTIVES'],
      ['{u.num} // UNIT', '{u.num} · UNIT'],
      ['DAY 1 // SATURDAY @ 5:00 PM WAT', 'DAY 1 · SATURDAY @ 5:00 PM WAT'],
      ['DAY 2 // SUNDAY @ 5:00 PM WAT', 'DAY 2 · SUNDAY @ 5:00 PM WAT'],
      ['THE BECOMING INSTITUTE // 2-DAY ACCELERATOR', 'THE BECOMING INSTITUTE · 2-DAY ACCELERATOR'],
    ]
  },
  // page.tsx (homepage)
  {
    file: 'app/page.tsx',
    pairs: [
      ['01 // SCHOOLS', '01 · SCHOOLS'],
      ['02 // MULTI-STATE', '02 · MULTI-STATE'],
      ['03 // 100% FREE', '03 · 100% FREE'],
    ]
  },
  // store/page.tsx
  {
    file: 'app/store/page.tsx',
    pairs: [
      ['FEATURED RELEASE // {selectedProduct.category.toUpperCase()}', 'FEATURED RELEASE · {selectedProduct.category.toUpperCase()}'],
    ]
  },
  // store/[id]/page.tsx
  {
    file: 'app/store/[id]/page.tsx',
    pairs: [
      ['DAY 1 // SATURDAY @ 5:00 PM WAT', 'DAY 1 · SATURDAY @ 5:00 PM WAT'],
      ['DAY 2 // SUNDAY @ 5:00 PM WAT', 'DAY 2 · SUNDAY @ 5:00 PM WAT'],
      ['SESSION 1 // 5:00 PM – 6:15 PM WAT', 'SESSION 1 · 5:00 PM – 6:15 PM WAT'],
      ['SESSION 2 // 6:30 PM – 8:00 PM WAT', 'SESSION 2 · 6:30 PM – 8:00 PM WAT'],
      ['MORNING SESSION // 9:00 AM – 1:00 PM', 'MORNING SESSION · 9:00 AM – 1:00 PM'],
      ['AFTERNOON SESSION // 2:00 PM – 5:00 PM', 'AFTERNOON SESSION · 2:00 PM – 5:00 PM'],
      ['THE BECOMING INSTITUTE // 2-DAY ACCELERATOR', 'THE BECOMING INSTITUTE · 2-DAY ACCELERATOR'],
      ['ORIGIN AUTHORIZED RELEASE // ${product.category.toUpperCase()}', 'ORIGIN AUTHORIZED RELEASE · ${product.category.toUpperCase()}'],
      ['{unit.num} // {unit.role}', '{unit.num} · {unit.role}'],
    ]
  },
  // learn/[courseId]/page.tsx
  {
    file: 'app/learn/[courseId]/page.tsx',
    pairs: [
      ['ORIGIN // {activeCourseData.flagshipTitle}', 'ORIGIN · {activeCourseData.flagshipTitle}'],
      ['STAGE {currentStage.stageNumber} // {STAGE_LABELS[currentStage.stageType]?.label}', 'STAGE {currentStage.stageNumber} · {STAGE_LABELS[currentStage.stageType]?.label}'],
    ]
  },
];

let totalChanges = 0;

replacements.forEach(({ file, pairs }) => {
  const fullPath = path.join('.', file);
  if (!fs.existsSync(fullPath)) {
    console.log('SKIP (not found): ' + fullPath);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;
  pairs.forEach(([from, to]) => {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
      totalChanges++;
      console.log('  REPLACED: ' + from + ' -> ' + to + ' in ' + file);
    } else {
      console.log('  NOT FOUND: ' + from + ' in ' + file);
    }
  });
  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
  }
});

console.log('\nDone. Total replacements: ' + totalChanges);
