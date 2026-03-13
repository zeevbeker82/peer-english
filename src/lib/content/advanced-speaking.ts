/**
 * Advanced Speaking Lab — B1 level (gifted 6th graders)
 * 20 speaking activities × 3 categories
 * A: Express Your Opinion — 8 debate topics (3 turns each)
 * B: Would You Rather     — 6 choice questions (3 turns each)
 * C: Tell Me About        — 6 description topics (3 turns each)
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AdvSpeakingCat = "opinion" | "wyr" | "describe";

export interface ConvTurn {
  buddy_says: string;       // What Buddy says (displayed + TTS)
  buddy_he: string;         // Hebrew: what is Buddy asking?
  user_hint_he: string;     // Hebrew: what should the user say?
  phrases: string[];        // 3–4 helpful English phrases
}

export interface AdvSpeakingActivity {
  id: string;
  cat: AdvSpeakingCat;
  icon: string;
  title: string;            // English title / main prompt
  title_he: string;         // Hebrew title
  desc_he: string;          // Short Hebrew description
  wyr_a?: string;           // WYR only: Option A
  wyr_b?: string;           // WYR only: Option B
  intro: string;            // Buddy's opening message (TTS + display)
  turns: ConvTurn[];        // 2–3 conversation turns
  outro: string;            // Buddy's closing encouragement
  xp: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// XP + meta
// ─────────────────────────────────────────────────────────────────────────────

export const ADV_SPEAKING_XP = {
  opinion:  25,
  wyr:      20,
  describe: 30,
} as const;

export const ADV_SPEAKING_CAT_META: Record<AdvSpeakingCat, {
  label_he: string; icon: string; color: string; desc_he: string; count: number;
}> = {
  opinion:  { label_he: "Express Your Opinion", icon: "💬", color: "from-blue-500 to-indigo-600",   desc_he: "הבע את דעתך בנושאים אמיתיים", count: 8 },
  wyr:      { label_he: "Would You Rather",     icon: "🤔", color: "from-purple-500 to-violet-600", desc_he: "בחר ונמק את הבחירה שלך",        count: 6 },
  describe: { label_he: "Tell Me About",        icon: "🗣️", color: "from-teal-500 to-emerald-600", desc_he: "תאר בפירוט — 45-60 שניות",     count: 6 },
};

export const ADV_SPEAKING_TOTAL = 20;

export const ADV_SPEAKING_ENCOURAGEMENTS = [
  "Brilliant answer! 🌟",
  "I love how you explained that! 💬",
  "Great reasoning! Keep going! 🔥",
  "That's a really mature way to think! 👏",
  "You're speaking like a native! ⭐",
  "Excellent point! 💡",
  "I couldn't have said it better! 🎉",
  "Your English is amazing! 💪",
  "What a thoughtful answer! 🌈",
  "Keep it up — you're doing great! 😊",
];

// ─────────────────────────────────────────────────────────────────────────────
// A. EXPRESS YOUR OPINION — 8 activities
// ─────────────────────────────────────────────────────────────────────────────

const OPINION_ACTIVITIES: AdvSpeakingActivity[] = [
  {
    id: "op-01", cat: "opinion", icon: "📱", xp: ADV_SPEAKING_XP.opinion,
    title: "Should kids have smartphones before age 12?",
    title_he: "האם לילדים צריכים להיות סמארטפונים?",
    desc_he: "דון ביתרונות וחסרונות של סמארטפונים לילדים",
    intro: "Let's have a real debate! I want to hear YOUR opinion. Should kids under 12 have smartphones? There's no right answer — just tell me what you honestly think!",
    turns: [
      {
        buddy_says: "So — should kids under 12 have smartphones, or not? What do YOU think?",
        buddy_he: "בבדי שואל את דעתך על סמארטפונים לילדים",
        user_hint_he: "אמור מה דעתך: I think kids should / shouldn't have smartphones because...",
        phrases: ["I think that kids should/shouldn't...", "In my opinion,", "I strongly believe that...", "It depends on..."],
      },
      {
        buddy_says: "Interesting! But WHY do you think so? Give me your single strongest reason!",
        buddy_he: "בבדי רוצה לשמוע את הנימוק החזק ביותר שלך",
        user_hint_he: "תן נימוק חזק ואחד: The main reason is... / For example,...",
        phrases: ["The main reason is...", "For example,", "This is important because...", "Evidence shows that..."],
      },
      {
        buddy_says: "But some people say that smartphones help children learn, navigate safely, and stay connected with family. What do you think about THAT argument?",
        buddy_he: "בבדי מציג טיעון נגדי — ילדים עם סמארטפון יכולים להישאר בקשר עם המשפחה וללמוד",
        user_hint_he: "הגב לטיעון הנגדי: That's true, but... / I disagree because...",
        phrases: ["That's true, but...", "I understand, however...", "Even though...", "The problem with that is..."],
      },
    ],
    outro: "Wow, you argued your point really well! I loved hearing your opinion! You should be a lawyer! 🌟",
  },

  {
    id: "op-02", cat: "opinion", icon: "📚", xp: ADV_SPEAKING_XP.opinion,
    title: "Is homework helpful or harmful?",
    title_he: "האם שיעורי בית עוזרים או מזיקים?",
    desc_he: "שיחה על שיעורי בית — עוזרים ללמוד או גוזלים זמן?",
    intro: "Hot topic alert! Is homework helpful for learning, or does it actually harm students? Time to share your expert opinion!",
    turns: [
      {
        buddy_says: "Is homework helpful or harmful for students? Share your honest opinion!",
        buddy_he: "בבדי שואל: שיעורי בית — עוזרים או מזיקים?",
        user_hint_he: "אמור את דעתך: I think homework is helpful/harmful because...",
        phrases: ["I think homework is...", "In my opinion,", "Homework can be...", "From my experience,"],
      },
      {
        buddy_says: "Good point! Can you give me a specific example from YOUR OWN life to support your view?",
        buddy_he: "בבדי רוצה דוגמה ספציפית מחייך",
        user_hint_he: "תן דוגמה אישית: For example, when I...",
        phrases: ["For example,", "In my experience,", "I've noticed that...", "Once, I had to..."],
      },
      {
        buddy_says: "Here's a challenge: some teachers say that homework is the only real way to practise and remember things — without it, students forget everything. How do you respond to that?",
        buddy_he: "בבדי מביא טיעון: ללא שיעורי בית, תלמידים שוכחים הכל",
        user_hint_he: "הגב: There are other ways to practise... / That's only true if...",
        phrases: ["That's only true if...", "There are other ways to...", "Research shows that...", "However,"],
      },
    ],
    outro: "Excellent reasoning! You gave such strong examples from real life! 🎓",
  },

  {
    id: "op-03", cat: "opinion", icon: "🎮", xp: ADV_SPEAKING_XP.opinion,
    title: "Are video games a waste of time?",
    title_he: "האם משחקי וידאו הם בזבוז זמן?",
    desc_he: "דיון על משחקי וידאו — האם הם שווים משהו?",
    intro: "Gamers versus critics! Are video games a total waste of time, or is there something genuinely valuable about them? What do YOU say?",
    turns: [
      {
        buddy_says: "Are video games a waste of time — good, bad, or somewhere in between? I want YOUR view!",
        buddy_he: "בבדי שואל: משחקי וידאו — בזבוז זמן או לא?",
        user_hint_he: "אמור דעתך: I think video games are... / It depends because...",
        phrases: ["I think video games are...", "In my view,", "It depends because...", "Not all games are..."],
      },
      {
        buddy_says: "Tell me more — what makes you say that? Use a specific example, maybe from a game you know!",
        buddy_he: "בבדי רוצה דוגמה ספציפית ממשחק שאתה מכיר",
        user_hint_he: "תן דוגמה: For example, in the game [name]... / I've noticed that...",
        phrases: ["For example,", "Studies show that...", "When I play...", "I've noticed that..."],
      },
      {
        buddy_says: "Here's something surprising: some experts say gaming improves problem-solving, teamwork, creativity, and even reading. Does that change your opinion at all?",
        buddy_he: "בבדי מציג: מחקרים אומרים שמשחקים משפרים חשיבה ועבודת צוות",
        user_hint_he: "הגב לממצאי המחקר: That's interesting, and... / Even so, I still think...",
        phrases: ["That's interesting, and...", "I hadn't thought about...", "Even so, I still think...", "You make a good point, but..."],
      },
    ],
    outro: "Brilliant! You thought about this from all angles! A real critical thinker! 💪",
  },

  {
    id: "op-04", cat: "opinion", icon: "🦁", xp: ADV_SPEAKING_XP.opinion,
    title: "Should animals be kept in zoos?",
    title_he: "האם בעלי חיים צריכים להיות בגנות חיות?",
    desc_he: "דיון על גן החיות — חיות זקוקות לחופש או להגנה?",
    intro: "Should wild animals live in zoos or only in the wild? Some people love zoos, others think they're cruel. What do YOU believe?",
    turns: [
      {
        buddy_says: "Should animals live in zoos or only in the wild? What's your position?",
        buddy_he: "בבדי שואל: האם גן החיות טוב לבעלי חיים?",
        user_hint_he: "אמור דעתך: I think zoos are... / Animals should... / In my opinion,",
        phrases: ["I think zoos are...", "Animals should...", "In my opinion,", "I believe that..."],
      },
      {
        buddy_says: "Why? What's the most important reason for your position — is it about the animals' happiness, their survival, or something else?",
        buddy_he: "בבדי שואל: מה הסיבה החשובה ביותר — אושר, הישרדות, או משהו אחר?",
        user_hint_he: "הסבר: The most important thing is... / Animals deserve...",
        phrases: ["The most important thing is...", "Animals deserve...", "This matters because...", "In the wild, animals..."],
      },
      {
        buddy_says: "But consider this: many modern zoos protect endangered species from extinction and do vital scientific research. Without zoos, some animals might not exist today. Does that justify keeping them?",
        buddy_he: "בבדי מציג: גנות חיות מצילות חיות נכחדות ועושות מחקר מדעי",
        user_hint_he: "הגב: That's a valid point, but... / Perhaps there's a better way...",
        phrases: ["That's a valid point, but...", "Even so,", "There's a difference between...", "Perhaps we could instead..."],
      },
    ],
    outro: "You showed real empathy and critical thinking! I'm impressed! 🦁",
  },

  {
    id: "op-05", cat: "opinion", icon: "🤍", xp: ADV_SPEAKING_XP.opinion,
    title: "Is it okay to lie to protect someone's feelings?",
    title_he: "האם בסדר לשקר כדי לא לפגוע?",
    desc_he: "שאלה פילוסופית עמוקה על כנות וחמלה",
    intro: "Here's a philosophical question! Is it ever okay to tell a 'white lie' to protect someone from hurt feelings? Or should we ALWAYS tell the truth? Think deeply!",
    turns: [
      {
        buddy_says: "Is it okay to lie to protect someone's feelings, or should we always be honest? What do you believe?",
        buddy_he: "בבדי שואל: האם שקר לבן מוצדק כשרוצים לא לפגוע?",
        user_hint_he: "אמור עמדתך: I think honesty is... / In some situations, it's okay to...",
        phrases: ["I think honesty is...", "In some situations,", "I believe we should...", "It depends on..."],
      },
      {
        buddy_says: "Give me a real example — when might it be okay to lie? And when would lying definitely be wrong?",
        buddy_he: "בבדי רוצה דוגמה: מתי מותר ומתי אסור לשקר?",
        user_hint_he: "תן דוגמה: For example, if a friend asks... / I think the line is...",
        phrases: ["For example,", "Imagine if...", "If a friend asks...", "I think the line is..."],
      },
      {
        buddy_says: "Some philosophers argue that lying — even with good intentions — always causes harm in the long run because it destroys trust. Do you agree with that?",
        buddy_he: "בבדי מציג: גם שקר טוב בסופו של דבר פוגע מפני שהוא הורס אמון",
        user_hint_he: "הגב: I agree/disagree because... / Trust is important, however...",
        phrases: ["I agree/disagree because...", "Trust is important, however...", "In the long run,", "I think it depends on..."],
      },
    ],
    outro: "What deep philosophical thinking! You really explored the complexity of this question! 🌟",
  },

  {
    id: "op-06", cat: "opinion", icon: "💰", xp: ADV_SPEAKING_XP.opinion,
    title: "Should kids get paid for good grades?",
    title_he: "האם ילדים צריכים לקבל כסף על ציונים טובים?",
    desc_he: "דיון על מוטיבציה, כסף וחינוך",
    intro: "Imagine getting paid real money for every A you get at school! Is that a brilliant idea, or a terrible one? Let's debate!",
    turns: [
      {
        buddy_says: "Should parents pay kids for getting good grades at school? Yes or no — and why?",
        buddy_he: "בבדי שואל: האם להעניק ילדים כסף על ציונים טובים?",
        user_hint_he: "אמור דעתך: I think paying kids for grades is... / I believe that...",
        phrases: ["I think paying kids is...", "In my opinion,", "I believe that...", "This would..."],
      },
      {
        buddy_says: "Interesting! What's the main benefit — OR the main problem — with this idea? Focus on ONE strong point.",
        buddy_he: "בבדי רוצה יתרון אחד חזק או חיסרון אחד חזק",
        user_hint_he: "התמקד בנקודה אחת: The main benefit is... / The problem is...",
        phrases: ["The main benefit is...", "The problem is...", "This could lead to...", "One important issue is..."],
      },
      {
        buddy_says: "Here's a surprising fact: some research actually shows that paying for grades WORKS and improves results, especially for students who are less motivated. Does that change your view at all?",
        buddy_he: "בבדי מביא מחקר: תגמול כספי כן משפר ציונים, לפחות לטווח קצר",
        user_hint_he: "הגב: That's surprising, but... / Even if it works, I still think...",
        phrases: ["That's surprising, but...", "Even if it works,", "I think the bigger issue is...", "Results aren't everything because..."],
      },
    ],
    outro: "Fantastic thinking about motivation and values! You're thinking like an economist! 💰📚",
  },

  {
    id: "op-07", cat: "opinion", icon: "📲", xp: ADV_SPEAKING_XP.opinion,
    title: "Is social media good for friendships?",
    title_he: "האם רשתות חברתיות טובות לחברות?",
    desc_he: "דיון על רשתות חברתיות והשפעתן על קשרי חברות",
    intro: "Social media: does it strengthen friendships or destroy them? This affects millions of young people — what do you think?",
    turns: [
      {
        buddy_says: "Is social media good or bad for friendships between young people? What's your honest opinion?",
        buddy_he: "בבדי שואל: האם רשתות חברתיות טובות לחברות?",
        user_hint_he: "אמור דעתך: I think social media... / In my experience...",
        phrases: ["I think social media...", "In my experience,", "Social media can...", "I believe that..."],
      },
      {
        buddy_says: "What's your strongest reason? Think about real examples — things you've seen with friends in real life.",
        buddy_he: "בבדי רוצה דוגמאות אמיתיות מחייך",
        user_hint_he: "תן דוגמה: For example, I've noticed that... / Real friendships need...",
        phrases: ["For example,", "I've noticed that...", "Real friendships need...", "The problem is that..."],
      },
      {
        buddy_says: "Many teenagers say social media helps them keep in touch with friends who moved away, and helped lonely kids find communities where they belong. What about those real benefits?",
        buddy_he: "בבדי מציג: סושיאל מדיה עוזרת לשמור קשר עם חברים שעברו מקום",
        user_hint_he: "הגב: That's true, and... / I agree that..., however...",
        phrases: ["That's true, and...", "I agree that..., however...", "Online connection can be...", "But face-to-face is..."],
      },
    ],
    outro: "Excellent! You balanced the positives and negatives like a real analyst! 📱🤝",
  },

  {
    id: "op-08", cat: "opinion", icon: "📅", xp: ADV_SPEAKING_XP.opinion,
    title: "Should there be homework on weekends?",
    title_he: "האם צריכים להיות שיעורי בית בסוף השבוע?",
    desc_he: "דיון על מנוחה, לימוד ואיזון בחיי ילדים",
    intro: "Weekend homework — every student's nightmare! But is it actually necessary? Or do students deserve completely free weekends? Let's settle this!",
    turns: [
      {
        buddy_says: "Should students have homework on weekends, or should weekends be completely free? What do you say?",
        buddy_he: "בבדי שואל: שיעורי בית בסוף שבוע — כן או לא?",
        user_hint_he: "אמור עמדה ברורה: I strongly believe that weekends should...",
        phrases: ["I strongly believe that...", "In my opinion, weekends should...", "Homework on weekends is...", "Students need..."],
      },
      {
        buddy_says: "Tell me WHY — what's the most important reason for your position? Think about students' mental health, family time, or learning quality.",
        buddy_he: "בבדי רוצה: בריאות נפשית, זמן משפחה, או איכות למידה — מה הכי חשוב?",
        user_hint_he: "הסבר את הסיבה: Students need time to... / Research shows that...",
        phrases: ["Students need time to...", "Research shows that...", "Without rest,", "Learning is better when..."],
      },
      {
        buddy_says: "But some teachers argue that without weekend homework, students forget everything they learned during the week — especially in maths. How would you respond to that?",
        buddy_he: "בבדי מביא: בלי שיעורי בית, ילדים שוכחים מה שלמדו",
        user_hint_he: "הצע פתרון חלופי: There are other ways to... / Students could instead...",
        phrases: ["There are other ways to...", "I understand, but...", "Students could instead...", "The solution is not..."],
      },
    ],
    outro: "You made such strong, logical arguments! I'd vote for you in any debate! 🏆",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// B. WOULD YOU RATHER — 6 activities
// ─────────────────────────────────────────────────────────────────────────────

const WYR_ACTIVITIES: AdvSpeakingActivity[] = [
  {
    id: "wyr-01", cat: "wyr", icon: "🦸", xp: ADV_SPEAKING_XP.wyr,
    title: "Would you rather be invisible or fly?",
    title_he: "אינוויזיבל או לעוף?",
    desc_he: "כוח-על קלאסי — בחר ונמק!",
    wyr_a: "Be INVISIBLE",
    wyr_b: "Be able to FLY",
    intro: "Here comes a classic superpower question! Think carefully before you decide — both options have amazing possibilities!",
    turns: [
      {
        buddy_says: "Would you rather be completely INVISIBLE, or be able to FLY like a superhero? Choose one and tell me why!",
        buddy_he: "בבדי שואל: אינוויזיבל או לעוף?",
        user_hint_he: "בחר ואמור: I would rather... because... / I choose... because it would let me...",
        phrases: ["I would rather...", "I choose... because...", "For me, ... is better because...", "I've always wanted to..."],
      },
      {
        buddy_says: "Great choice! Now give me THREE strong reasons why your superpower is better. Go for it!",
        buddy_he: "בבדי רוצה 3 סיבות חזקות לבחירה שלך",
        user_hint_he: "תן 3 סיבות: First,... Second,... And third,...",
        phrases: ["First of all,", "Secondly,", "And the third reason is...", "Most importantly,"],
      },
      {
        buddy_says: "Last question — be creative! In what situation would the OTHER superpower actually be more useful than yours?",
        buddy_he: "בבדי שואל: מתי הכוח השני היה שימושי יותר מהשלך?",
        user_hint_he: "חשוב בצורה יצירתית: The other option would be better if... / For example, if I needed to...",
        phrases: ["The other option would be better if...", "If I needed to...", "In an emergency,", "For example, if..."],
      },
    ],
    outro: "Brilliant reasoning! You really thought that through — great imagination! ✈️👻",
  },

  {
    id: "wyr-02", cat: "wyr", icon: "🐕", xp: ADV_SPEAKING_XP.wyr,
    title: "Would you rather talk to animals or speak all languages?",
    title_he: "לדבר עם חיות או לדבר כל שפה?",
    desc_he: "בחירה מפתיעה — מה יתן לך יותר בחיים?",
    wyr_a: "Talk to ANIMALS",
    wyr_b: "Speak EVERY language in the world",
    intro: "Amazing choice coming up! Would you rather understand what animals are thinking, or be able to speak every human language? Deep question!",
    turns: [
      {
        buddy_says: "Would you rather be able to talk to ANIMALS, or speak EVERY language in the world? Choose and explain!",
        buddy_he: "בבדי שואל: לדבר עם חיות או לדבר כל שפה בעולם?",
        user_hint_he: "בחר ונמק: I would rather... because it would mean that...",
        phrases: ["I would rather...", "I choose... because...", "This is better because...", "I'd use it to..."],
      },
      {
        buddy_says: "Excellent! Give me three incredible things you could DO with your ability. Be as creative as possible!",
        buddy_he: "בבדי רוצה 3 דברים מדהימים שהיית יכול לעשות עם היכולת שלך",
        user_hint_he: "תן 3 דוגמאות: First, I could... Second,... And third,...",
        phrases: ["First, I could...", "Secondly,", "And the third thing is...", "I imagine that..."],
      },
      {
        buddy_says: "Now — what would be the BIGGEST limitation or problem with your choice? Every superpower has a downside!",
        buddy_he: "בבדי רוצה: מה החיסרון הגדול ביותר של הבחירה שלך?",
        user_hint_he: "חשוב על חיסרון: The main problem would be... / I would miss... / But at least...",
        phrases: ["The main problem would be...", "One limitation is...", "I would miss...", "But at least..."],
      },
    ],
    outro: "What an imaginative choice! You explained your reasoning so well! 🐕🌍",
  },

  {
    id: "wyr-03", cat: "wyr", icon: "⏳", xp: ADV_SPEAKING_XP.wyr,
    title: "Would you rather live in the past or the future?",
    title_he: "לחיות בעבר או בעתיד?",
    desc_he: "מסע בזמן — עבר לפני 100 שנה או עתיד בעוד 100 שנה?",
    wyr_a: "Live in the PAST (100 years ago)",
    wyr_b: "Live in the FUTURE (100 years from now)",
    intro: "Time travel question! Would you explore history or jump to the future? This one is really deep — think about what you'd gain AND lose!",
    turns: [
      {
        buddy_says: "Would you rather live in the PAST — about 100 years ago — or in the FUTURE — 100 years from now? Choose!",
        buddy_he: "בבדי שואל: עבר (100 שנה לאחור) או עתיד (100 שנה קדימה)?",
        user_hint_he: "בחר ונמק: I would choose to live in the [past/future] because...",
        phrases: ["I would choose to live in the...", "I choose [past/future] because...", "I've always been fascinated by...", "I imagine that..."],
      },
      {
        buddy_says: "Great choice! Tell me — what are THREE things you're most excited about in that time period?",
        buddy_he: "בבדי רוצה 3 דברים שמרגשים אותך בתקופה שבחרת",
        user_hint_he: "ספר 3 דברים: I'm most excited about... / I can't wait to... / I'd love to experience...",
        phrases: ["I'm most excited about...", "I can't wait to...", "I'd love to experience...", "The best thing would be..."],
      },
      {
        buddy_says: "Now — what would you miss most about TODAY'S world if you went to your chosen time period? What modern thing would be hardest to live without?",
        buddy_he: "בבדי שואל: מה מהעולם של היום הכי היית מתגעגע?",
        user_hint_he: "ספר מה תחסר לך: I would miss... / The hardest thing would be living without...",
        phrases: ["I would miss...", "The hardest thing would be without...", "I couldn't imagine life without...", "Modern life has..."],
      },
    ],
    outro: "Wow, you really thought about what matters in life! You're a true time traveller at heart! ⏳🚀",
  },

  {
    id: "wyr-04", cat: "wyr", icon: "⭐", xp: ADV_SPEAKING_XP.wyr,
    title: "Would you rather be famous or rich?",
    title_he: "להיות מפורסם או עשיר?",
    desc_he: "שאלה על ערכים — מה חשוב יותר בחיים?",
    wyr_a: "Be WORLD FAMOUS",
    wyr_b: "Be EXTREMELY RICH",
    intro: "Fame versus fortune! This classic question reveals a lot about your values. Think carefully — you can only choose one!",
    turns: [
      {
        buddy_says: "Would you rather be completely WORLD FAMOUS, or EXTREMELY RICH? You can only choose one — which and why?",
        buddy_he: "בבדי שואל: פרסום עולמי או עושר קיצוני?",
        user_hint_he: "בחר ונמק: I would rather be... because...",
        phrases: ["I would rather be...", "I choose... because...", "Money/fame is important to me because...", "With..., I could..."],
      },
      {
        buddy_says: "Love it! Now tell me — what would you DO with your fame or money? Describe THREE specific things!",
        buddy_he: "בבדי רוצה לדעת: מה תעשה עם הפרסום/הכסף שלך?",
        user_hint_he: "ספר 3 דברים: With my fame/money, I would... / First, I'd... / I'd use it to...",
        phrases: ["With my fame/money, I would...", "First,", "I'd use it to...", "Most importantly,"],
      },
      {
        buddy_says: "And now — what's the hardest part or biggest DISADVANTAGE of your choice? Fame and wealth both have serious downsides!",
        buddy_he: "בבדי שואל: מה החיסרון הגדול ביותר של הבחירה שלך?",
        user_hint_he: "חשוב על חיסרון: The hardest part would be... / I'd have to deal with...",
        phrases: ["The hardest part would be...", "One big downside is...", "I'd have to deal with...", "But I think it's worth it because..."],
      },
    ],
    outro: "Fascinating! Your choice reveals what you really value in life! 💰⭐",
  },

  {
    id: "wyr-05", cat: "wyr", icon: "📝", xp: ADV_SPEAKING_XP.wyr,
    title: "Would you rather have no homework or no tests?",
    title_he: "בלי שיעורי בית או בלי מבחנים?",
    desc_he: "בחירת חלומות! אבל חשוב על ההשלכות...",
    wyr_a: "NO HOMEWORK ever again",
    wyr_b: "NO TESTS or exams ever again",
    intro: "Every student's dream choice! But think carefully — each option has BIG consequences for how school works. Which would you choose?",
    turns: [
      {
        buddy_says: "Would you rather have NO HOMEWORK EVER, or NO TESTS OR EXAMS EVER? Think about the real consequences!",
        buddy_he: "בבדי שואל: בלי שיעורי בית לעולם, או בלי מבחנים לעולם?",
        user_hint_he: "בחר ונמק: I would choose no... because...",
        phrases: ["I would choose no...", "Getting rid of... would be better because...", "Without..., school would...", "I think..."],
      },
      {
        buddy_says: "Smart choice! Give me three reasons why removing your option would actually make school BETTER — not just easier!",
        buddy_he: "בבדי רוצה 3 סיבות למה בית הספר יהיה טוב יותר — לא רק קל יותר",
        user_hint_he: "תן 3 סיבות: School would be better because... / Students could... / Learning would...",
        phrases: ["School would be better because...", "Students could...", "Learning would...", "Instead, we could..."],
      },
      {
        buddy_says: "Here's the tricky part: without [homework/tests], how would teachers know what students have actually learned? Suggest a creative alternative system!",
        buddy_he: "בבדי שואל: איך המורה ידע שלמדת? הצע מערכת חלופית!",
        user_hint_he: "הצע פתרון: Teachers could instead... / Students could show their learning by...",
        phrases: ["Teachers could instead...", "Students could show learning by...", "A better way would be...", "For example, students could..."],
      },
    ],
    outro: "You're already thinking like an education reformer! Brilliant creative thinking! 📚✏️",
  },

  {
    id: "wyr-06", cat: "wyr", icon: "🚀", xp: ADV_SPEAKING_XP.wyr,
    title: "Would you rather explore space or the deep ocean?",
    title_he: "לחקור את החלל או את הים העמוק?",
    desc_he: "הגבולות של הידיעה האנושית — מה מחכה לך שם?",
    wyr_a: "Explore OUTER SPACE",
    wyr_b: "Explore THE DEEP OCEAN",
    intro: "Two final frontiers! The mysteries above us, or the mysteries below? Both are incredibly dangerous and exciting. Which is calling your name?",
    turns: [
      {
        buddy_says: "Would you rather explore the vast mysteries of OUTER SPACE, or the dark secrets of THE DEEP OCEAN? Choose your adventure!",
        buddy_he: "בבדי שואל: החלל החיצוני או עומק האוקיינוס?",
        user_hint_he: "בחר ונמק: I would rather explore... because...",
        phrases: ["I would rather explore...", "I choose... because...", "I've always been fascinated by...", "I imagine there are..."],
      },
      {
        buddy_says: "Explorer! Tell me THREE incredible things you hope to discover in your chosen environment. Dream big!",
        buddy_he: "בבדי רוצה 3 דברים שאתה מקווה לגלות",
        user_hint_he: "חשוב בגדול: I hope to discover... / I'm excited to find... / Maybe there are...",
        phrases: ["I hope to discover...", "I'm excited to find...", "I want to explore...", "Maybe there are..."],
      },
      {
        buddy_says: "Now the scary part — what makes YOUR choice more DANGEROUS than the other option? And are you still willing to go?",
        buddy_he: "בבדי שואל: מה עושה את הבחירה שלך מסוכנת יותר? אתה עדיין רוצה לנסות?",
        user_hint_he: "תאר את הסכנות: My choice is dangerous because... / The risks include... / But despite the danger,...",
        phrases: ["My choice is dangerous because...", "The risks include...", "But despite the danger,", "I'd be prepared by..."],
      },
    ],
    outro: "A true explorer! Your curiosity is out of this world — or deep below it! 🚀🌊",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// C. TELL ME ABOUT — 6 activities
// ─────────────────────────────────────────────────────────────────────────────

const DESCRIBE_ACTIVITIES: AdvSpeakingActivity[] = [
  {
    id: "desc-01", cat: "describe", icon: "☀️", xp: ADV_SPEAKING_XP.describe,
    title: "Tell me about your perfect day",
    title_he: "תאר את יומך המושלם",
    desc_he: "תאר יום מושלם מהבוקר עד הלילה — מי, מה, איפה",
    intro: "Close your eyes and imagine it... your absolutely PERFECT day! Everything goes exactly how you want it. Tell me every detail!",
    turns: [
      {
        buddy_says: "Tell me everything about your perfect day! What would you do from morning to night? Try to speak for at least 45 seconds — go!",
        buddy_he: "בבדי רוצה לשמוע על היום המושלם שלך — מהבוקר עד הלילה",
        user_hint_he: "תאר מהבוקר עד הלילה: I would wake up... / In the morning,... / After that,... / To end the day,...",
        phrases: ["I would wake up...", "In the morning, I'd...", "After that,", "To end the perfect day,"],
      },
      {
        buddy_says: "That sounds wonderful! WHO would you spend your perfect day with — and why those specific people?",
        buddy_he: "בבדי שואל: עם מי תבלה ביום המושלם ולמה דווקא הם?",
        user_hint_he: "ספר עם מי: I would spend it with... / I chose them because... / Together we'd...",
        phrases: ["I would spend it with...", "I chose them because...", "Together, we'd...", "Having them there would..."],
      },
      {
        buddy_says: "One last question: Which single MOMENT of your perfect day would you want to photograph and remember forever — and why that moment?",
        buddy_he: "בבדי שואל: איזה רגע אחד מהיום הזה תרצה לזכור לנצח?",
        user_hint_he: "בחר רגע ספציפי: The moment I'd want to remember is... / It would be special because...",
        phrases: ["The moment I'd remember is...", "I would never forget...", "That memory would be special because...", "It would feel like..."],
      },
    ],
    outro: "I want to have YOUR perfect day! You painted such a vivid and beautiful picture! 🌟",
  },

  {
    id: "desc-02", cat: "describe", icon: "💙", xp: ADV_SPEAKING_XP.describe,
    title: "Describe someone you admire",
    title_he: "תאר אדם שאתה מעריץ",
    desc_he: "תאר אדם מיוחד — מראה, אישיות, ורגע ספציפי איתו",
    intro: "Think of someone you truly admire — a person who inspires you every time you see them. Get ready to paint a detailed picture of who they are!",
    turns: [
      {
        buddy_says: "Describe someone you admire! Tell me about their appearance, personality, and what makes them truly special. Take your time!",
        buddy_he: "בבדי רוצה: מראה, אישיות, ומה שמיוחד באדם שאתה מעריץ",
        user_hint_he: "תאר: The person I admire is... / What makes them special is... / Their personality is...",
        phrases: ["The person I admire is...", "What makes them special is...", "They have...", "Their personality is..."],
      },
      {
        buddy_says: "Wonderful! Tell me about a SPECIFIC time when this person really impressed you, helped you, or inspired you.",
        buddy_he: "בבדי רוצה פעם ספציפית שהאדם הזה רשם אותך או השפיע עליך",
        user_hint_he: "ספר על רגע ספציפי: I remember when... / Once, they... / That moment showed me...",
        phrases: ["I remember when...", "Once, they...", "That moment showed me that...", "I was so inspired when..."],
      },
      {
        buddy_says: "And what's the most important thing you've LEARNED from this person? How has knowing them changed who you are?",
        buddy_he: "בבדי שואל: מה למדת מהאדם הזה? איך הוא שינה אותך?",
        user_hint_he: "חשוב בעומק: The most important lesson is... / They taught me that... / Because of them, I now...",
        phrases: ["The most important lesson is...", "They taught me that...", "Because of them, I now...", "I try to be like them by..."],
      },
    ],
    outro: "That person sounds absolutely incredible! And you described them so beautifully! 💙",
  },

  {
    id: "desc-03", cat: "describe", icon: "✨", xp: ADV_SPEAKING_XP.describe,
    title: "Tell me about your best memory",
    title_he: "תאר את הזיכרון הטוב ביותר שלך",
    desc_he: "שתף רגע מיוחד מחייך שתרצה לזכור לנצח",
    intro: "Reach into your memory and find your absolute BEST one — a moment you treasure forever. Close your eyes... and share it with me!",
    turns: [
      {
        buddy_says: "Tell me about your best memory! Describe exactly where you were, what happened, who was there, and how you felt. Paint me a picture!",
        buddy_he: "בבדי רוצה: איפה היית, מה קרה, מי היה שם, ואיך הרגשת",
        user_hint_he: "תאר בפירוט: My best memory is... / This happened when... / I was feeling...",
        phrases: ["My best memory is...", "This happened when...", "I was feeling...", "I remember exactly..."],
      },
      {
        buddy_says: "That sounds amazing! What made that moment so perfect — if ONE thing had been different, how would it have changed the memory?",
        buddy_he: "בבדי שואל: מה עשה את הרגע הזה מושלם? ואם משהו אחד היה שונה?",
        user_hint_he: "חשוב: What made it perfect was... / If it had been different... / The most special part was...",
        phrases: ["What made it perfect was...", "If it had been different...", "The most special part was...", "What mattered most was..."],
      },
      {
        buddy_says: "How does thinking about that memory make you feel RIGHT NOW — this very moment? Does it still make you smile?",
        buddy_he: "בבדי שואל: איך הזיכרון הזה גורם לך להרגיש עכשיו ממש?",
        user_hint_he: "תאר את ההרגשה עכשיו: When I think about it, I feel... / It still makes me...",
        phrases: ["When I think about it, I feel...", "It still makes me...", "That memory gives me...", "Even now,"],
      },
    ],
    outro: "What a beautiful memory. Thank you for sharing something so personal and special with me! 💛",
  },

  {
    id: "desc-04", cat: "describe", icon: "🏡", xp: ADV_SPEAKING_XP.describe,
    title: "Describe your dream house",
    title_he: "תאר את בית חלומותיך",
    desc_he: "תאר את הבית המושלם — מיקום, חדרים, ואורח חיים",
    intro: "You have unlimited money and can build ANYWHERE in the world! Design your ultimate dream house — no limits, no budget restrictions!",
    turns: [
      {
        buddy_says: "Tell me ALL about your dream house! Where is it located? What does it look like? What amazing features does it have inside and out?",
        buddy_he: "בבדי רוצה: מיקום, מראה חיצוני, ומה יש בתוך הבית",
        user_hint_he: "תאר: My dream house is located... / It looks like... / The best feature is...",
        phrases: ["My dream house is located...", "It looks like...", "The best feature is...", "Inside, there would be..."],
      },
      {
        buddy_says: "Amazing! Now describe your FAVOURITE ROOM in the house in detail — what's in it, how it feels, and why it's special to you.",
        buddy_he: "בבדי רוצה לשמוע על החדר האהוב עליך בבית",
        user_hint_he: "תאר את החדר: My favourite room would be... / It would have... / The atmosphere is...",
        phrases: ["My favourite room would be...", "It would have...", "The atmosphere is...", "When I'm in that room, I feel..."],
      },
      {
        buddy_says: "Last question: WHO would live in this dream house with you, and what would a typical happy day there look like?",
        buddy_he: "בבדי שואל: מי יגור איתך ואיך נראה יום טיפוסי שמח בבית?",
        user_hint_he: "ספר: I would live with... / Every morning we would... / Life there would be...",
        phrases: ["I would live with...", "Every morning we'd...", "The house would be full of...", "Life there would be..."],
      },
    ],
    outro: "I'm booking a room at your dream house right now! It sounds absolutely incredible! 🏡✨",
  },

  {
    id: "desc-05", cat: "describe", icon: "🎨", xp: ADV_SPEAKING_XP.describe,
    title: "Tell me about your hobbies",
    title_he: "ספר לי על התחביבים שלך",
    desc_he: "תאר מה אתה אוהב לעשות ולמה זה חשוב לך",
    intro: "What are YOU passionate about? What makes you excited to wake up in the morning? Tell me everything about your hobbies and interests!",
    turns: [
      {
        buddy_says: "Describe your hobbies and interests! What do you love doing most in your free time, and why does it matter to you so much?",
        buddy_he: "בבדי רוצה לדעת: מה אתה אוהב לעשות ולמה זה חשוב לך?",
        user_hint_he: "תאר: My favourite hobby is... / I spend a lot of time... / I got into it because...",
        phrases: ["My favourite hobby is...", "I spend a lot of time...", "I got into it because...", "What I love about it is..."],
      },
      {
        buddy_says: "Tell me about the LAST TIME you did your favourite hobby. Exactly what happened? How did you feel before, during, and after?",
        buddy_he: "בבדי רוצה שתספר על הפעם האחרונה — לפני, במהלך, ואחרי",
        user_hint_he: "ספר ספציפית: Last time I... / I spent... hours... / I felt... / The best part was...",
        phrases: ["Last time I...", "I spent... hours...", "Before, I felt...", "The best part was..."],
      },
      {
        buddy_says: "And what about the future — is there a completely NEW hobby you've always wanted to try but haven't started yet? Tell me all about it!",
        buddy_he: "בבדי שואל: יש תחביב חדש שרוצה להתחיל? ספר לי עליו!",
        user_hint_he: "ספר על תחביב עתידי: I've always wanted to try... / I think I'd enjoy it because...",
        phrases: ["I've always wanted to try...", "I think I'd enjoy it because...", "One day I want to...", "I'd need to..."],
      },
    ],
    outro: "You're clearly a passionate and curious person! Your hobbies reveal so much about who you are! 🎨🎮⚽",
  },

  {
    id: "desc-06", cat: "describe", icon: "🌍", xp: ADV_SPEAKING_XP.describe,
    title: "Describe a place you want to visit",
    title_he: "תאר מקום שאתה רוצה לבקר בו",
    desc_he: "חלום מסע — לאן תרצה ללכת ולמה?",
    intro: "Close your eyes and dream of somewhere incredible! Is there a place in the world you've ALWAYS wanted to visit? Where is it, and why does it call to you?",
    turns: [
      {
        buddy_says: "Describe a place you dream of visiting! Where is it? Why do you want to go? Paint me a picture of what it looks and feels like!",
        buddy_he: "בבדי רוצה: איפה המקום, למה רוצה ללכת, ואיך הוא נראה ומרגיש",
        user_hint_he: "תאר: The place I most want to visit is... / I've always dreamed of... / I imagine it looks...",
        phrases: ["The place I most want to visit is...", "I've always dreamed of...", "When I imagine it, I picture...", "I would love to..."],
      },
      {
        buddy_says: "Tell me — what ONE specific thing are you MOST excited to try there? One food, one sight, one experience that you absolutely must do!",
        buddy_he: "בבדי שואל: מה הדבר האחד שאתה הכי רוצה לנסות שם?",
        user_hint_he: "בחר דבר אחד ספציפי: I'm most excited to... / More than anything, I want to... / I've heard that...",
        phrases: ["I'm most excited to...", "More than anything, I want to...", "I've heard that...", "I imagine that..."],
      },
      {
        buddy_says: "And what would you bring HOME from that trip — not just souvenirs, but what memories, experiences, or life lessons would you carry back?",
        buddy_he: "בבדי שואל: מה תחזיר מהמסע — זיכרונות, חוויות, לקחים?",
        user_hint_he: "חשוב בעומק: I would bring back... / The most important thing I'd learn is... / I'd come home with...",
        phrases: ["I would bring back...", "The most important thing I'd learn is...", "I'd come home with...", "This trip would teach me..."],
      },
    ],
    outro: "Pack your bags — you made me want to go there too! The way you described it was wonderful! 🌍✈️",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Combined export
// ─────────────────────────────────────────────────────────────────────────────

export const ADV_SPEAKING_ACTIVITIES: AdvSpeakingActivity[] = [
  ...OPINION_ACTIVITIES,
  ...WYR_ACTIVITIES,
  ...DESCRIBE_ACTIVITIES,
];

export function getActivitiesByCat(cat: AdvSpeakingCat): AdvSpeakingActivity[] {
  return ADV_SPEAKING_ACTIVITIES.filter((a) => a.cat === cat);
}
