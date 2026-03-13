/** Achievement definitions and unlock logic */

export interface Achievement {
  id: string;
  title_he: string;
  description_he: string;
  icon: string;
  category: "learning" | "streak" | "skills" | "points";
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-10",
    title_he: "צעד ראשון",
    description_he: "ענה נכון על 10 שאלות",
    icon: "🎯",
    category: "learning",
  },
  {
    id: "first-50",
    title_he: "לומד נלהב",
    description_he: "ענה נכון על 50 שאלות",
    icon: "📝",
    category: "learning",
  },
  {
    id: "streak-5",
    title_he: "על גלגלים",
    description_he: "5 תשובות נכונות ברצף",
    icon: "⚡",
    category: "streak",
  },
  {
    id: "streak-10",
    title_he: "בלתי ניתן לעצירה",
    description_he: "10 תשובות נכונות ברצף",
    icon: "🔥",
    category: "streak",
  },
  {
    id: "reading-5",
    title_he: "קורא מתחיל",
    description_he: "סיים 5 תרגילי קריאה",
    icon: "📚",
    category: "skills",
  },
  {
    id: "writing-5",
    title_he: "סופר צעיר",
    description_he: "סיים 5 תרגילי כתיבה",
    icon: "✍️",
    category: "skills",
  },
  {
    id: "listening-5",
    title_he: "אוזן מוזיקלית",
    description_he: "סיים 5 תרגילי האזנה",
    icon: "🎧",
    category: "skills",
  },
  {
    id: "words-50",
    title_he: "חובב מילים",
    description_he: "חזר על 50 מילים בכרטיסיות",
    icon: "💬",
    category: "learning",
  },
  {
    id: "words-100",
    title_he: "מילון מהלך",
    description_he: "חזר על 100 מילים בכרטיסיות",
    icon: "📖",
    category: "learning",
  },
  {
    id: "streak-3days",
    title_he: "3 ימים ברצף",
    description_he: "תרגל 3 ימים ברצף",
    icon: "🌟",
    category: "streak",
  },
  {
    id: "streak-7days",
    title_he: "שבוע מושלם",
    description_he: "תרגל 7 ימים ברצף",
    icon: "🏅",
    category: "streak",
  },
  {
    id: "grammar-10",
    title_he: "חוקים בראש",
    description_he: "סיים 10 תרגילי דקדוק",
    icon: "📐",
    category: "skills",
  },
  {
    id: "grammar-50",
    title_he: "מלך הדקדוק",
    description_he: "סיים 50 תרגילי דקדוק",
    icon: "👑",
    category: "skills",
  },
  {
    id: "points-200",
    title_he: "מתחיל מוצלח",
    description_he: "הגיע ל-200 נקודות",
    icon: "🌱",
    category: "points",
  },
  {
    id: "points-500",
    title_he: "לומד אמיתי",
    description_he: "הגיע ל-500 נקודות",
    icon: "🌿",
    category: "points",
  },
  {
    id: "points-1000",
    title_he: "אלוף הכיתה",
    description_he: "הגיע ל-1000 נקודות",
    icon: "🏆",
    category: "points",
  },
  {
    id: "points-2000",
    title_he: "אלוף האנגלית",
    description_he: "הגיע ל-2000 נקודות",
    icon: "⭐",
    category: "points",
  },
  {
    id: "lessons-all",
    title_he: "סיים את הכל",
    description_he: "סיים את כל השיעורים",
    icon: "🎓",
    category: "learning",
  },
  {
    id: "perfect-lesson",
    title_he: "מושלם!",
    description_he: "קבל 100% בשיעור",
    icon: "💎",
    category: "learning",
  },
  // 11 new achievements
  {
    id: "words-200",
    title_he: "אוצר מילים עשיר",
    description_he: "חזר על 200 מילים בכרטיסיות",
    icon: "🏛️",
    category: "learning",
  },
  {
    id: "words-500",
    title_he: "אוסף מילים עולמי",
    description_he: "חזר על 500 מילים בכרטיסיות",
    icon: "🌍",
    category: "learning",
  },
  {
    id: "streak-14days",
    title_he: "שבועיים ברצף",
    description_he: "תרגל 14 ימים ברצף",
    icon: "🌊",
    category: "streak",
  },
  {
    id: "streak-30days",
    title_he: "חודש ברצף",
    description_he: "תרגל 30 ימים ברצף",
    icon: "🏔️",
    category: "streak",
  },
  {
    id: "reading-10",
    title_he: "קורא בקי",
    description_he: "סיים 10 תרגילי קריאה",
    icon: "📖",
    category: "skills",
  },
  {
    id: "reading-25",
    title_he: "ספרן",
    description_he: "סיים 25 תרגילי קריאה",
    icon: "📚",
    category: "skills",
  },
  {
    id: "grammar-100",
    title_he: "גאון הדקדוק",
    description_he: "סיים 100 תרגילי דקדוק",
    icon: "🏗️",
    category: "skills",
  },
  {
    id: "speaking-5",
    title_he: "מדבר ראשון",
    description_he: "סיים 5 פעילויות דיבור",
    icon: "🎤",
    category: "skills",
  },
  {
    id: "speaking-20",
    title_he: "נואם מצטיין",
    description_he: "סיים 20 פעילויות דיבור",
    icon: "🗣️",
    category: "skills",
  },
  {
    id: "points-3000",
    title_he: "מטפס לפסגה",
    description_he: "הגיע ל-3000 נקודות",
    icon: "💫",
    category: "points",
  },
  {
    id: "points-5000",
    title_he: "גיבור האנגלית",
    description_he: "הגיע ל-5000 נקודות",
    icon: "🔥",
    category: "points",
  },
];

/** Progress fields needed for achievement checks */
export interface AchievementProgress {
  totalXP: number;
  streak: number;
  correctAnswers: number;
  bestStreak: number;
  readingDone: number;
  listeningDone: number;
  writingDone: number;
  wordsLearned: number;
  grammarDone: number;
  speakingDone: number;
  completedLessons: string[];
  lessonScores: Record<string, number>;
  totalLessons: number; // pass LESSONS.length
}

export function checkNewAchievements(
  progress: AchievementProgress,
  alreadyUnlocked: string[]
): Achievement[] {
  const unlockedSet = new Set(alreadyUnlocked);
  return ACHIEVEMENTS.filter((a) => !unlockedSet.has(a.id) && meetsCondition(a.id, progress));
}

function meetsCondition(id: string, p: AchievementProgress): boolean {
  switch (id) {
    case "first-10":       return p.correctAnswers >= 10;
    case "first-50":       return p.correctAnswers >= 50;
    case "streak-5":       return p.bestStreak >= 5;
    case "streak-10":      return p.bestStreak >= 10;
    case "reading-5":      return p.readingDone >= 5;
    case "writing-5":      return p.writingDone >= 5;
    case "listening-5":    return p.listeningDone >= 5;
    case "words-50":       return p.wordsLearned >= 50;
    case "words-100":      return p.wordsLearned >= 100;
    case "streak-3days":   return p.streak >= 3;
    case "streak-7days":   return p.streak >= 7;
    case "grammar-10":     return p.grammarDone >= 10;
    case "grammar-50":     return p.grammarDone >= 50;
    case "points-200":     return p.totalXP >= 200;
    case "points-500":     return p.totalXP >= 500;
    case "points-1000":    return p.totalXP >= 1000;
    case "points-2000":    return p.totalXP >= 2000;
    case "lessons-all":    return p.completedLessons.length >= p.totalLessons && p.totalLessons > 0;
    case "perfect-lesson": return Object.values(p.lessonScores).some((s) => s >= 100);
    case "words-200":      return p.wordsLearned >= 200;
    case "words-500":      return p.wordsLearned >= 500;
    case "streak-14days":  return p.streak >= 14;
    case "streak-30days":  return p.streak >= 30;
    case "reading-10":     return p.readingDone >= 10;
    case "reading-25":     return p.readingDone >= 25;
    case "grammar-100":    return p.grammarDone >= 100;
    case "speaking-5":     return p.speakingDone >= 5;
    case "speaking-20":    return p.speakingDone >= 20;
    case "points-3000":    return p.totalXP >= 3000;
    case "points-5000":    return p.totalXP >= 5000;
    default:               return false;
  }
}
