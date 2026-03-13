/**
 * Weekly Challenges — B1 level (gifted 6th graders)
 * 10 challenges across 5 categories
 * Each: 100 XP bonus · digital certificate · special badge · Hebrew instructions · example
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ChallengeCat = "reading" | "writing" | "speaking" | "vocab" | "combined";

export interface ChallengeTask {
  task_he: string;    // Hebrew task description
  task_en?: string;   // Optional English label
}

export interface WeeklyChallenge {
  id: string;
  cat: ChallengeCat;
  icon: string;
  title_he: string;
  subtitle_he: string;
  difficulty: 1 | 2 | 3;          // 1=⭐ 2=⭐⭐ 3=⭐⭐⭐
  instructions_he: string;         // Full Hebrew instructions
  steps_he: string[];              // Step-by-step guide (Hebrew)
  example_he: string;              // Example of good completion
  tasks: ChallengeTask[];          // 3–5 sub-tasks (self-reported checklist)
  xp: number;                      // Always 100
  badge: string;                   // Badge emoji
  badge_name_he: string;           // Badge name in Hebrew
  cert_color: string;              // Tailwind gradient for certificate
  cert_message_he: string;         // Personalised certificate message
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const CHALLENGE_XP = 100;
export const CHALLENGE_TOTAL = 10;

export const CAT_META: Record<ChallengeCat, {
  label_he: string; icon: string; color: string;
}> = {
  reading:  { label_he: "קריאה",          icon: "📖", color: "from-violet-500 to-purple-600" },
  writing:  { label_he: "כתיבה",          icon: "✍️", color: "from-rose-500 to-pink-600"    },
  speaking: { label_he: "דיבור",          icon: "🎤", color: "from-blue-500 to-indigo-600"  },
  vocab:    { label_he: "אוצר מילים",     icon: "📚", color: "from-amber-500 to-orange-500" },
  combined: { label_he: "אתגר משולב",     icon: "🦸", color: "from-emerald-500 to-teal-600" },
};

// ─────────────────────────────────────────────────────────────────────────────
// The 10 challenges
// ─────────────────────────────────────────────────────────────────────────────

export const WEEKLY_CHALLENGES: WeeklyChallenge[] = [

  // ── A. READING ──────────────────────────────────────────────────────────────

  {
    id: "ch-01",
    cat: "reading",
    icon: "📑",
    title_he: "קורא מומחה",
    subtitle_he: "קרא 3 טקסטים וסכם כל אחד",
    difficulty: 2,
    instructions_he:
      "כנס ל'קריאה מתקדמת' ובחר 3 טקסטים שונים — ממש בחר מ-3 קטגוריות שונות (דעה, מדע, ביוגרפיה). קרא כל טקסט היטב, ואז כתוב בעברית/אנגלית 3 משפטים שמסכמים אותו: מה הנושא, הנקודה הראשית, ומה דעתך.",
    steps_he: [
      "כנס ל'קריאה מתקדמת' ובחר טקסט Opinion",
      "קרא את הטקסט לפחות פעמיים — פעם לפי הפלואידיות, פעם לפי ההבנה",
      "כתוב 3 משפטים: 'The text is about... / The main point is... / I think that...'",
      "חזור על אותו תהליך עם טקסט Science",
      "חזור על אותו תהליך עם טקסט Biography",
      "קרא את 3 הסיכומים שלך — האם הם ברורים ומדויקים?",
    ],
    example_he:
      "דוגמה לסיכום טקסט 'The Ocean is in Danger':\n\"The text is about pollution in our oceans. The main point is that plastic waste is killing marine life and harming entire ecosystems. I think this is one of the most urgent environmental problems we face, and everyone can help by reducing single-use plastic.\"",
    tasks: [
      { task_he: "קראתי טקסט 1 וכתבתי 3 משפטי סיכום" },
      { task_he: "קראתי טקסט 2 וכתבתי 3 משפטי סיכום" },
      { task_he: "קראתי טקסט 3 וכתבתי 3 משפטי סיכום" },
      { task_he: "עברתי על כל הסיכומים ותיקנתי שגיאות" },
    ],
    xp: CHALLENGE_XP,
    badge: "📑",
    badge_name_he: "קורא מומחה",
    cert_color: "from-violet-600 to-purple-700",
    cert_message_he: "הצטיין/ה בקריאה וסיכום של 3 טקסטים מתקדמים — כישרון אמיתי!",
  },

  {
    id: "ch-02",
    cat: "reading",
    icon: "🖊️",
    title_he: "מחבר סיפורים",
    subtitle_he: "קרא סיפור וכתוב לו סוף אחר",
    difficulty: 2,
    instructions_he:
      "כנס ל'קריאה מתקדמת' ובחר אחד מהסיפורים (קטגוריית Story). קרא אותו בעיון ונסה להבין את הדמויות, הרגשות והמתח. עכשיו — כתוב לו סוף אחר לגמרי! הסוף צריך להיות לפחות 50 מילים ולהישאר עקבי עם הדמויות והסיטואציה.",
    steps_he: [
      "כנס ל'קריאה מתקדמת' ובחר Story (כמו 'The Lost Dog' או 'The Midnight Letter')",
      "קרא את הסיפור ועצור לפני הסוף — חשוב: מה אתה רוצה שיקרה?",
      "כתוב 'My Alternative Ending:' וצא לכתיבה חופשית",
      "הסוף שלך צריך: להתחיל מנקודת הסיום הנוכחית, לפתור את הסיפור, ולהיות לפחות 50 מילים",
      "קרא את הסוף שלך בקול רם — האם הוא נשמע טוב?",
    ],
    example_he:
      "דוגמה לסוף חלופי:\n\"...Suddenly, Maya heard a familiar bark from behind the old oak tree. She ran towards it, her heart pounding. There was Bruno, muddy and tired but wagging his tail furiously. Maya hugged him tight, tears streaming down her face. 'I'll never let you go again,' she whispered. That evening, they both curled up by the fireplace, and Maya decided she would write a story about their adventure — a story with a happy ending, just like this one.\"",
    tasks: [
      { task_he: "בחרתי סיפור מהקריאה המתקדמת וקראתי אותו" },
      { task_he: "חשבתי על 3 אפשרויות לסוף שונה" },
      { task_he: "כתבתי סוף חלופי (50+ מילים)" },
      { task_he: "קראתי את הסוף בקול רם ותיקנתי" },
    ],
    xp: CHALLENGE_XP,
    badge: "🖊️",
    badge_name_he: "מחבר סיפורים",
    cert_color: "from-fuchsia-600 to-pink-700",
    cert_message_he: "הראה/תה דמיון ויצירתיות יוצאי דופן בכתיבת סוף חלופי לסיפור!",
  },

  // ── B. WRITING ───────────────────────────────────────────────────────────────

  {
    id: "ch-03",
    cat: "writing",
    icon: "📓",
    title_he: "כותב יומן",
    subtitle_he: "כתוב יומן אנגלי של 5 ימים",
    difficulty: 2,
    instructions_he:
      "כתוב יומן באנגלית במשך 5 ימים רצופים — לפחות 3-5 משפטים כל יום. כתוב על מה שקרה באותו יום, איך הרגשת, ומה חשבת. השתמש בפועל בזמן עבר, ביטויים שלמדת, ומשפטים מחוברים (because, although, when).",
    steps_he: [
      "פתח מחברת (או קובץ) בשם 'My English Diary'",
      "כתוב כותרת: 'Day 1 — [יום ותאריך]' ואז 3-5 משפטים על היום",
      "השתמש בלפחות ביטוי אחד חדש כל יום (e.g., 'I couldn't help but...', 'All of a sudden...')",
      "חזור על כך במשך 5 ימים",
      "ביום 5: קרא את כל היומן וסמן את המשפטים שאתה הכי גאה בהם",
    ],
    example_he:
      "דוגמה ליומן יום 1:\n\"Monday, Day 1\nToday was an interesting day. I woke up late and had to rush to school, which was quite stressful. However, in the afternoon my friend and I played football, and I scored two goals — I was absolutely thrilled! In the evening I read for an hour. I couldn't help but feel that today was actually a good day despite the chaotic start.\"",
    tasks: [
      { task_he: "כתבתי יומן יום 1 — לפחות 3 משפטים" },
      { task_he: "כתבתי יומן יום 2 — לפחות 3 משפטים" },
      { task_he: "כתבתי יומן יום 3 — לפחות 4 משפטים" },
      { task_he: "כתבתי יומן יום 4 — לפחות 4 משפטים" },
      { task_he: "כתבתי יומן יום 5 — לפחות 5 משפטים וקראתי הכל" },
    ],
    xp: CHALLENGE_XP,
    badge: "📓",
    badge_name_he: "כותב יומן",
    cert_color: "from-rose-600 to-red-700",
    cert_message_he: "שמר/ה יומן באנגלית 5 ימים ברצף — מחויבות אמיתית ללמידה!",
  },

  {
    id: "ch-04",
    cat: "writing",
    icon: "🌟",
    title_he: "סיפורן מילים",
    subtitle_he: "כתוב סיפור עם 10 מילים חדשות",
    difficulty: 3,
    instructions_he:
      "כנס ל'Advanced Vocabulary' ובחר 10 מילים שלמדת לאחרונה. עכשיו — כתוב סיפור קצר (לפחות 70 מילים) שמשתמש בכל 10 המילים בצורה טבעית. הסיפור צריך להיות מעניין ולהיקרא בצורה טבעית — לא רשימת מילים!",
    steps_he: [
      "כנס ל'Advanced Vocabulary' ורשום 10 מילים שלמדת (מקטגוריות שונות)",
      "בחר ז'אנר לסיפורך: הרפתקה / מסתורין / מדע בדיוני / יומיומי",
      "כתוב טיוטה ראשונה — השתמש בכל 10 המילים",
      "הדגש/סמן את 10 המילים בסיפור שלך",
      "קרא את הסיפור — האם הוא זורם? תקן ושפר",
    ],
    example_he:
      "דוגמה לסיפור עם מילים: (מילות מפתח: resilient, melancholy, inevitable, persevere, elaborate)\n\"The scientist felt a deep melancholy as she stared at her elaborate experiment, which had failed for the third time. But she was resilient — she knew that failure was inevitable in research. She would persevere. The next morning, she began again, this time with a new hypothesis. Sometimes, the greatest discoveries come to those who simply refuse to give up.\"",
    tasks: [
      { task_he: "בחרתי 10 מילים מ-Advanced Vocabulary ורשמתי אותן" },
      { task_he: "כתבתי טיוטה ראשונה של הסיפור (70+ מילים)" },
      { task_he: "הדגשתי את 10 המילים בסיפור" },
      { task_he: "קראתי את הסיפור, תיקנתי וסיימתי" },
    ],
    xp: CHALLENGE_XP,
    badge: "🌟",
    badge_name_he: "סיפורן מילים",
    cert_color: "from-amber-600 to-orange-600",
    cert_message_he: "שילב/ה 10 מילות אוצר מתקדמות בסיפור יצירתי — מרשים ביותר!",
  },

  // ── C. SPEAKING ──────────────────────────────────────────────────────────────

  {
    id: "ch-05",
    cat: "speaking",
    icon: "🎤",
    title_he: "דובר שוטף",
    subtitle_he: "הקלט עצמך מדבר על 3 נושאים",
    difficulty: 2,
    instructions_he:
      "הקלט את עצמך מדבר על 3 נושאים שונים — דקה על כל נושא. אל תקרא מניירות — דבר בצורה חופשית! לאחר ההקלטה, האזן לעצמך וכתוב: מה היה טוב, מה רצית לשפר.",
    steps_he: [
      "נושא 1: 'My Favourite Place' — תאר מקום שאתה אוהב, למה הוא מיוחד",
      "נושא 2: 'A Person Who Inspires Me' — ספר על אדם שמשפיע עליך",
      "נושא 3: 'My Dream for the Future' — ספר מה אתה רוצה להיות/לעשות",
      "לכל נושא: דבר לפחות דקה ללא הפסקה",
      "האזן להקלטות — כתוב הערות לשיפור לכל נושא",
    ],
    example_he:
      "דוגמה לדקה על 'My Favourite Place':\n\"My favourite place in the whole world is my grandmother's garden. It's a small garden full of colourful flowers and old fruit trees. Whenever I'm there, I feel completely peaceful. There's a wooden bench under a big lemon tree where I love to sit and read. The garden always smells of jasmine and fresh earth, especially after rain. I think what makes it so special is the memories — every corner of that garden holds a different story from my childhood.\"",
    tasks: [
      { task_he: "הקלטתי דקה על 'My Favourite Place'" },
      { task_he: "הקלטתי דקה על 'A Person Who Inspires Me'" },
      { task_he: "הקלטתי דקה על 'My Dream for the Future'" },
      { task_he: "האזנתי לכל 3 ההקלטות וכתבתי הערות לשיפור" },
    ],
    xp: CHALLENGE_XP,
    badge: "🎤",
    badge_name_he: "דובר שוטף",
    cert_color: "from-blue-600 to-indigo-700",
    cert_message_he: "הקליט/ה עצמו/ה מדבר/ת על 3 נושאים — אומץ ושיפור אמיתיים!",
  },

  {
    id: "ch-06",
    cat: "speaking",
    icon: "🤝",
    title_he: "שיח מלא",
    subtitle_he: "בצע 3 שיחות מלאות עם Buddy",
    difficulty: 2,
    instructions_he:
      "כנס ל'דיבור מתקדם' ובצע 3 שיחות מלאות עם Buddy — אחת מכל קטגוריה. בכל שיחה: השלם את כל 3 התורות, השתמש בביטויים המוצעים, ותן תשובות של לפחות 3 משפטים לכל תור.",
    steps_he: [
      "כנס ל'דיבור מתקדם' ובחר נושא מ-'Express Your Opinion'",
      "השלם את כל 3 תורות השיחה — כתוב תשובות מפורטות",
      "חזור על אותו תהליך עם נושא מ-'Would You Rather'",
      "חזור על אותו תהליך עם נושא מ-'Tell Me About'",
      "בדוק: השתמשת בלפחות 3 ביטויים חדשים בכל שיחה?",
    ],
    example_he:
      "דוגמה לתשובה מצוינת בשיחת Opinion:\n\"Question: 'What do you think about kids having smartphones?'\nAnswer: 'In my opinion, children under 12 should not have their own smartphones. The main reason is that social media can be addictive and harmful to developing minds. For example, studies show that excessive screen time reduces children's ability to concentrate. That said, I understand that safety is important, so perhaps a simple phone for calls would be a reasonable compromise.'\"",
    tasks: [
      { task_he: "השלמתי שיחת Opinion מלאה (3 תורות)" },
      { task_he: "השלמתי שיחת Would You Rather מלאה (3 תורות)" },
      { task_he: "השלמתי שיחת Tell Me About מלאה (3 תורות)" },
      { task_he: "בדקתי שהשתמשתי בביטויים חדשים בכל שיחה" },
    ],
    xp: CHALLENGE_XP,
    badge: "🤝",
    badge_name_he: "שיח מלא",
    cert_color: "from-sky-600 to-blue-700",
    cert_message_he: "ביצע/ה 3 שיחות מלאות מאתגרות עם Buddy — שיחה ברמה גבוהה!",
  },

  // ── D. VOCABULARY ────────────────────────────────────────────────────────────

  {
    id: "ch-07",
    cat: "vocab",
    icon: "📖",
    title_he: "לוחם מילים",
    subtitle_he: "למד 30 מילים חדשות השבוע",
    difficulty: 2,
    instructions_he:
      "כנס ל-'Advanced Vocabulary' ולמד 30 מילים חדשות במשך השבוע — 10 מילים ביום במשך 3 ימים. לכל קבוצת מילים: למד את ההגדרה, כתוב משפט משלך עם כל מילה, ואז צור כרטיסיות חזרה (ברשומה/מחברת).",
    steps_he: [
      "יום 1: למד 10 מילים (Academic Words) — כתוב משפט עם כל מילה",
      "יום 2: למד 10 מילים (Advanced Emotions) — כתוב משפט עם כל מילה",
      "יום 3: למד 10 מילים לבחירתך — כתוב משפט עם כל מילה",
      "צור חוברת חזרה: כתוב מילה באנגלית → הגדרה → משפט",
      "חזור על כל 30 המילים ביום 4 — כמה אתה זוכר?",
    ],
    example_he:
      "דוגמה לרשומת מילה:\n\"resilient — able to recover quickly from difficulties\nMy sentence: After failing the test, she was resilient enough to study harder and pass next time.\n\nmelancholy — a feeling of pensive sadness\nMy sentence: There was a quiet melancholy in his eyes when he spoke about his old home.\"",
    tasks: [
      { task_he: "למדתי 10 מילים ביום 1 וכתבתי משפטים" },
      { task_he: "למדתי 10 מילים ביום 2 וכתבתי משפטים" },
      { task_he: "למדתי 10 מילים ביום 3 וכתבתי משפטים" },
      { task_he: "יצרתי חוברת חזרה לכל 30 המילים" },
      { task_he: "חזרתי על כל 30 המילים וסיימתי בביטחון" },
    ],
    xp: CHALLENGE_XP,
    badge: "📖",
    badge_name_he: "לוחם מילים",
    cert_color: "from-amber-500 to-yellow-600",
    cert_message_he: "למד/ה 30 מילים מתקדמות חדשות — אוצר מילים שמתרחב כל השבוע!",
  },

  {
    id: "ch-08",
    cat: "vocab",
    icon: "💡",
    title_he: "מלך הביטויים",
    subtitle_he: "כתוב משפטים עם 15 phrasal verbs",
    difficulty: 3,
    instructions_he:
      "Phrasal Verbs הם ביטויים עם פועל + מילה קטנה (up, out, off, on...) שנותנים משמעות חדשה. כנס ל-'Advanced Vocabulary' לקטגוריית Phrasal Verbs ובחר 15 ביטויים. לכל ביטוי: כתוב משפט שמראה שהבנת את המשמעות — לא תרגום ישיר!",
    steps_he: [
      "כנס ל-'Advanced Vocabulary' ובחר קטגוריית Phrasal Verbs",
      "בחר 5 Phrasal Verbs על נושא תנועה/נסיעה (set off, come across, get away...)",
      "כתוב משפט קשרי לכל אחד — משפטים שמראים הבנה של ההקשר",
      "בחר 5 נוספים על רגשות (break down, cheer up, give up...) וכתוב משפטים",
      "בחר 5 נוספים לבחירה חופשית וכתוב משפטים",
      "קרא את כל 15 המשפטים — האם הם נשמעים טבעיים?",
    ],
    example_he:
      "דוגמה למשפטים עם Phrasal Verbs:\n\"• set off — We set off early in the morning to avoid traffic on the motorway.\n• come across — While reading, I came across a word I had never seen before.\n• give up — She almost gave up on learning French, but her teacher encouraged her to continue.\n• cheer up — His funny story really cheered me up after a terrible day.\n• break down — The old car broke down in the middle of the desert, and we had to call for help.\"",
    tasks: [
      { task_he: "כתבתי 5 משפטים עם Phrasal Verbs של תנועה" },
      { task_he: "כתבתי 5 משפטים עם Phrasal Verbs של רגשות" },
      { task_he: "כתבתי 5 משפטים עם Phrasal Verbs לבחירה חופשית" },
      { task_he: "קראתי את כל 15 המשפטים ותיקנתי" },
    ],
    xp: CHALLENGE_XP,
    badge: "💡",
    badge_name_he: "מלך הביטויים",
    cert_color: "from-orange-500 to-amber-600",
    cert_message_he: "שלט/ה ב-15 Phrasal Verbs וכתב/ה משפטים יצירתיים — מרשים!",
  },

  // ── E. COMBINED ───────────────────────────────────────────────────────────────

  {
    id: "ch-09",
    cat: "combined",
    icon: "🔬",
    title_he: "חוקר שפה",
    subtitle_he: "פרויקט מלא: קרא, כתוב, הקלט",
    difficulty: 3,
    instructions_he:
      "פרויקט משולב בן 3 חלקים! בחר טקסט Science מהקריאה המתקדמת. חלק א: קרא אותו ועשה את החידון שלו. חלק ב: כתוב תגובה אישית (50+ מילים) — מה דעתך על הנושא המדעי? חלק ג: הקלט עצמך מסכם את הטקסט ב-30 שניות בלבד.",
    steps_he: [
      "חלק א — קריאה: כנס לקריאה מתקדמת, בחר טקסט Science, קרא ועשה את ה-8 שאלות",
      "חלק ב — כתיבה: כתוב 'My Response' — דעתך על הנושא, בצד שני של הנייר",
      "הכתיבה צריכה: מה למדת, מה הפתיע אותך, ומה היית רוצה לחקור עוד",
      "חלק ג — דיבור: הכן סיכום של 30 שניות: Main topic, Key fact, My opinion",
      "הקלט את הסיכום. נסה שוב אם לא הספקת ב-30 שניות",
    ],
    example_he:
      "דוגמה לתגובה כתובה (חלק ב):\n\"After reading about bioluminescence in deep-sea creatures, I'm fascinated by how life adapts to the darkest environments on Earth. I was especially surprised to learn that over 75% of deep-sea creatures produce their own light. This made me wonder — could we ever use bioluminescence to replace artificial lighting? I would love to read more about the science behind it and whether it has any practical applications.\"\n\nדוגמה לסיכום 30 שניות (חלק ג):\n\"This text explains how deep-sea creatures create their own light through a process called bioluminescence. The most surprising fact is that most deep-sea animals glow in the dark to hunt or attract mates. I think this shows how incredible evolution is.\"",
    tasks: [
      { task_he: "קראתי טקסט Science ועשיתי את החידון שלו" },
      { task_he: "כתבתי תגובה אישית (50+ מילים)" },
      { task_he: "הכנתי סיכום של 30 שניות" },
      { task_he: "הקלטתי את הסיכום ב-30 שניות" },
    ],
    xp: CHALLENGE_XP,
    badge: "🔬",
    badge_name_he: "חוקר שפה",
    cert_color: "from-emerald-600 to-teal-700",
    cert_message_he: "השלים/ה פרויקט שלושה-בחלקים — קריאה, כתיבה ודיבור — בהצלחה מרשימה!",
  },

  {
    id: "ch-10",
    cat: "combined",
    icon: "🦸",
    title_he: "אתגר הסופר-על",
    subtitle_he: "כתוב מאמר 100 מילים והקלט אותו",
    difficulty: 3,
    instructions_he:
      "האתגר האולטימטיבי! בחר נושא מ-Opinion Writing, כתוב מאמר דעה מלא ומושלם של לפחות 100 מילים, ואז הקלט את עצמך קורא אותו בקול רם בצורה ברורה ומרשימה. זהו שילוב מושלם של כל הכישורים שפיתחת!",
    steps_he: [
      "בחר נושא מ-'כתיבה יצירתית' → Opinion Writing",
      "כתוב טיוטה ראשונה — לפחות 100 מילים עם מבנה: Introduction → 2 Arguments → Conclusion",
      "עבור על הדקדוק: Present Perfect? Conditionals? Passive Voice? השתמש!",
      "תקן, שפר, והגדל — הוסף ביטויים מתקדמים",
      "הקלט את עצמך קורא את המאמר בקול ברור ורצוף",
      "האזן — האם הקצב טוב? התיקון נכון? עשה שוב אם צריך",
    ],
    example_he:
      "דוגמה למאמר דעה מלא (100+ מילים):\n\"Should school start later in the morning?\n\nIn my opinion, school should definitely start later — at 9am rather than 7:30am. There are two strong reasons for this.\n\nFirstly, scientific research has shown that teenagers' biological clocks are different from adults'. Adolescents naturally fall asleep later and need more sleep to function well. A study by Oxford University found that sleep-deprived students perform up to 25% worse in exams.\n\nSecondly, a later start would improve students' mental health and wellbeing. Tired students are more likely to feel anxious, irritable, and unmotivated. Schools that have trialled later start times reported higher attendance and better grades.\n\nIn conclusion, starting school later is not just comfortable — it is backed by science. I strongly believe it would transform education for the better.\"",
    tasks: [
      { task_he: "בחרתי נושא Opinion וכתבתי טיוטה ראשונה" },
      { task_he: "עברתי על הדקדוק והוספתי ביטויים מתקדמים" },
      { task_he: "המאמר הגיע לפחות ל-100 מילים עם מבנה מלא" },
      { task_he: "הקלטתי את עצמי קורא את המאמר בקול" },
      { task_he: "האזנתי להקלטה ואני מרוצה מהתוצאה" },
    ],
    xp: CHALLENGE_XP,
    badge: "🦸",
    badge_name_he: "סופר-על",
    cert_color: "from-violet-700 to-purple-900",
    cert_message_he: "השיג/ה את פסגת האתגרים — כתב/ה וניסח/ה מאמר מלא ב-100+ מילים. מדהים!",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getChallengesByCat(cat: ChallengeCat): WeeklyChallenge[] {
  return WEEKLY_CHALLENGES.filter((c) => c.cat === cat);
}

export function getChallengeById(id: string): WeeklyChallenge | undefined {
  return WEEKLY_CHALLENGES.find((c) => c.id === id);
}

export const CATS_ORDER: ChallengeCat[] = ["reading", "writing", "speaking", "vocab", "combined"];
