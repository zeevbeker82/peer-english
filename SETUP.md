# פאר לימוד אנגלית — הוראות הגדרה והרצה

## דרישות מקדימות

1. **Node.js 18+** — https://nodejs.org/en/download
2. **npm** (מגיע עם Node.js)

## הרצה ראשונית

```bash
# 1. התקנת חבילות
npm install

# 2. הרצת שרת פיתוח
npm run dev
# → פתח http://localhost:3000 בדפדפן
```

## פקודות נוספות

```bash
# בדיקות
npm test              # הרצת כל הטסטים
npm run test:watch    # Vitest במצב watch

# בדיקת טיפוסים
npm run type-check

# Lint
npm run lint

# פורמט קוד
npm run format

# בניה לייצור
npm run build
npm start
```

## מבנה הפרויקט

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # מסך בית
│   ├── lesson/[id]/        # מסך שיעור
│   ├── dictionary/         # מילון + כרטיסיות SRS
│   └── settings/           # הגדרות
├── components/
│   ├── ui/                 # Button, Card, ProgressBar, Badge
│   ├── exercises/          # MultipleChoice, Matching, FillInBlank, Listening, Reading
│   ├── LessonRunner.tsx    # מנוע השיעורים
│   ├── LessonComplete.tsx  # מסך סיום
│   └── FlashCard.tsx       # כרטיסיית SRS
├── lib/
│   ├── content/            # vocabulary.ts (111 מילים), lessons.ts (6 שיעורים), exercises.ts (30 תרגילים)
│   ├── exercises/          # types, validator, scorer
│   ├── srs/                # SM-2 algorithm + storage
│   ├── storage/            # progress.ts, settings.ts
│   └── audio/              # TTS + STT (Web Speech API)
├── hooks/                  # useSRS, useProgress, useSettings, useAudio
└── __tests__/              # Vitest tests
```

## Checklist — מה אמור לעבוד ידנית

- [ ] מסך בית טוען עם streak (0 ביום ראשון)
- [ ] לחיצה על שיעור → פותח LessonRunner
- [ ] כל 5 סוגי תרגיל פועלים (MC, Matching, FillInBlank, Listening, Reading)
- [ ] Feedback בעברית אחרי כל תרגיל
- [ ] מסך סיום עם כוכבים ו-XP
- [ ] XP מתעדכן במסך הבית אחרי חזרה
- [ ] Streak מתעדכן ביום השני
- [ ] מילון: דפדוף + פילטר לפי נושא
- [ ] כרטיסיות SRS: הפיכה + דירוג קושי
- [ ] כפתור 🔊 מפעיל TTS (Chrome/Edge)
- [ ] הגדרות: toggle שמע, מהירות, גודל טקסט, איפוס
- [ ] איפוס נתונים מנקה הכל ומחזיר למצב ראשוני
- [ ] RTL מלא בכל ממשק
- [ ] תוכן אנגלי ב-dir="ltr"

## הערות

- כל הנתונים ב-localStorage (אין backend, אין התחברות)
- TTS/STT דורשים Chrome/Edge עם הרשאות מיקרופון לSTT
- אין תלות ב-APIs חיצוניים — פועל offline
