/**
 * Advanced Grammar — B1 level (gifted 6th graders)
 * 6 topics × 15 exercises + 8 quiz questions each
 * Topics: Present Perfect · Past Continuous · Future Forms ·
 *         First Conditional · Second Conditional · Passive Voice
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AdvGrammarExType = "fillblank" | "choice" | "error" | "build";

export interface AdvGrammarRule {
  title_en: string;   // Short English rule
  title_he: string;   // Hebrew explanation
  examples: string[]; // 3–4 English example sentences
}

export interface AdvGrammarExercise {
  id: string;
  type: AdvGrammarExType;
  instruction_he: string;
  sentence?: string;      // fillblank: contains ___
  question?: string;      // choice / error / build
  options: string[];
  correctIndex: number;
  explanation_he: string;
}

export interface AdvGrammarTopic {
  id: string;
  title_he: string;
  title_en: string;
  icon: string;
  color: string;
  summary_he: string;
  rules: AdvGrammarRule[];
  exercises: AdvGrammarExercise[];  // 15
  quiz: AdvGrammarExercise[];       // 8
}

// ─────────────────────────────────────────────────────────────────────────────
// XP constants
// ─────────────────────────────────────────────────────────────────────────────

export const ADV_GRAMMAR_XP = {
  per_exercise:     10,
  per_quiz:         15,
  topic_complete:   50,
  perfect_quiz:     30,
} as const;

export const ADV_GRAMMAR_TOTAL_TOPICS = 6;

// ─────────────────────────────────────────────────────────────────────────────
// Helper: short alias for exercise objects
// ─────────────────────────────────────────────────────────────────────────────

type E = AdvGrammarExercise;
function fb(id: string, inst: string, sentence: string, opts: [string,string,string,string], ci: number, expl: string): E {
  return { id, type: "fillblank", instruction_he: inst, sentence, options: opts, correctIndex: ci, explanation_he: expl };
}
function ch(id: string, inst: string, question: string, opts: [string,string,string,string], ci: number, expl: string): E {
  return { id, type: "choice", instruction_he: inst, question, options: opts, correctIndex: ci, explanation_he: expl };
}
function er(id: string, inst: string, question: string, opts: [string,string,string,string], ci: number, expl: string): E {
  return { id, type: "error", instruction_he: inst, question, options: opts, correctIndex: ci, explanation_he: expl };
}
function bd(id: string, inst: string, question: string, opts: [string,string,string,string], ci: number, expl: string): E {
  return { id, type: "build", instruction_he: inst, question, options: opts, correctIndex: ci, explanation_he: expl };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PRESENT PERFECT
// ─────────────────────────────────────────────────────────────────────────────

const PP_RULES: AdvGrammarRule[] = [
  {
    title_en: "have / has + past participle",
    title_he: "מבנה: have/has + past participle",
    examples: ["I have visited Paris.", "She has eaten sushi.", "They have gone home.", "We have studied English for years."],
  },
  {
    title_en: "for vs. since",
    title_he: "for = משך זמן · since = נקודת זמן",
    examples: ["I have lived here for ten years.", "She has worked here since 2019.", "We've been friends for a long time.", "He hasn't slept since yesterday."],
  },
  {
    title_en: "already · yet · just",
    title_he: "already = כבר (חיובי) · yet = עדיין (שלילי/שאלה) · just = הרגע",
    examples: ["I have already done my homework.", "She hasn't arrived yet.", "Have you finished yet?", "He has just called — literally one minute ago."],
  },
  {
    title_en: "ever · never",
    title_he: "ever = אי פעם (שאלות) · never = מעולם לא",
    examples: ["Have you ever tried Japanese food?", "I have never seen snow.", "She has never been to London.", "Has he ever met a celebrity?"],
  },
  {
    title_en: "Present Perfect vs. Past Simple",
    title_he: "PP = חוויה/קשר להווה · Past Simple = עבר מוגמר עם זמן ספציפי",
    examples: ["I have seen that film. (experience — no specific time)", "I saw that film last Tuesday. (specific past)", "She has lost her keys. (still relevant now)", "She lost her keys yesterday. (specific past event)"],
  },
];

const PP_EX: E[] = [
  fb("pp-1", "השלם את הפועל הנכון:", "She ___ never been to Japan.",
    ["has","have","had","was"], 0, "עם She משתמשים ב-has"),
  fb("pp-2", "השלם עם for או since:", "We have lived here ___ ten years.",
    ["for","since","while","during"], 0, "for + משך זמן: ten years"),
  fb("pp-3", "השלם עם ever / never / yet / just:", "Have you ___ tried Japanese food?",
    ["ever","never","yet","just"], 0, "ever בשאלות הבנה"),
  fb("pp-4", "השלם את הפועל:", "He hasn't called me ___.",
    ["yet","already","ever","just"], 0, "yet בשלילי: hasn't... yet"),
  fb("pp-5", "השלם:", "I ___ just finished my homework — literally two minutes ago!",
    ["have","has","had","am"], 0, "I have + past participle"),
  ch("pp-6", "איזה משפט נכון?",
    "Which sentence uses Present Perfect correctly?",
    ["I have seen that film.", "I have saw that film.", "I has seen that film.", "I seen that film."], 0,
    "have + past participle (seen, not saw)"),
  ch("pp-7", "בחר את הצורה הנכונה:",
    "She ___ worked here since 2019.",
    ["have","has","had","is"], 1,
    "She → has (כי זו גוף שלישי יחיד)"),
  ch("pp-8", "for או since?",
    `"I have known him ___ we were children."`,
    ["for","since","while","during"], 1,
    "since + נקודת זמן (we were children = נקודת זמן בעבר)"),
  ch("pp-9", "בחר את המשפט הנכון:",
    "Which sentence uses Present Perfect correctly?",
    ["I have seen him yesterday.","Did you ever been to Spain?","She has already eaten.","They have went last week."], 2,
    "She has already eaten — have/has + past participle"),
  ch("pp-10", "מה הנכון?",
    `"___ you ever climbed a mountain?"`,
    ["Have","Has","Did","Do"], 0,
    "שאלה עם you: Have you ever...?"),
  er("pp-11", "מצא את השגיאה ותקן:",
    `"He has already went home."`,
    ["He has already gone home.","He already went home.","He have already gone home.","He has already go home."], 0,
    "went הוא Past Simple; בPresent Perfect צריך gone"),
  er("pp-12", "מצא את השגיאה ותקן:",
    `"I have lived here since three years."`,
    ["I have lived here for three years.","I lived here since three years.","I live here for three years.","I has lived here for three years."], 0,
    "since + נקודת זמן; for + משך זמן → for three years"),
  er("pp-13", "מצא את השגיאה ותקן:",
    `"Have you ever went to Paris?"`,
    ["Have you ever been to Paris?","Have you ever go to Paris?","Did you ever been to Paris?","Have you been ever to Paris?"], 0,
    "went = Past Simple; בPresent Perfect: gone / been"),
  er("pp-14", "מצא את השגיאה ותקן:",
    `"She haven't called me yet."`,
    ["She hasn't called me yet.","She haven't called yet.","She didn't called me yet.","She hasn't call me yet."], 0,
    "She → hasn't (לא haven't)"),
  er("pp-15", "מצא את השגיאה ותקן:",
    `"I have saw this movie three times."`,
    ["I have seen this movie three times.","I saw this movie three times already.","I has seen this movie three times.","I have see this movie three times."], 0,
    "saw = Past Simple; בPresent Perfect צריך: seen"),
];

const PP_QUIZ: E[] = [
  ch("ppq-1", "בחר את הצורה הנכונה:",
    `"They ___ each other for twenty years."`,
    ["know","knew","have known","has known"], 2,
    "have known — PP לביטוי משך זמן עד עכשיו"),
  fb("ppq-2", "השלם עם just / already / yet / never:",
    "She has ___ arrived — she's still putting her coat on.",
    ["just","already","yet","never"], 0,
    "just = הרגע — פעולה שהסתיימה זה עתה"),
  ch("ppq-3", "בחר את ההבדל הנכון בין PP ל-Past Simple:",
    "Which sentence pair shows the CORRECT difference?",
    ["I have eaten pizza. / I ate pizza last Friday.","I ate pizza. / I have ate pizza.","She left. / She has leave.","He slept. / He has slept yesterday."], 0,
    "PP = חוויה כללית; Past Simple = זמן ספציפי (last Friday)"),
  fb("ppq-4", "השלם את השאלה:",
    "___ you finished your project yet?",
    ["Have","Has","Did","Do"], 0,
    "Have you...? (לא Has you)"),
  er("ppq-5", "מצא את השגיאה ותקן:",
    `"I have seen him last Monday."`,
    ["I saw him last Monday.","I have saw him last Monday.","I seen him last Monday.","I has seen him last Monday."], 0,
    "last Monday = זמן ספציפי בעבר → Past Simple"),
  ch("ppq-6", "בחר את הצורה הנכונה:",
    `"She ___ never tried sushi, so she's nervous about it."`,
    ["have","has","had","is"], 1,
    "She → has never tried"),
  fb("ppq-7", "השלם עם yet / already / just / ever:",
    "We haven't decided ___.",
    ["yet","already","just","ever"], 0,
    "haven't... yet = עדיין לא"),
  ch("ppq-8", "איזה משפט הוא Present Perfect?",
    "Which sentence is in the Present Perfect?",
    ["She reads every day.","She was reading.","She has read that book.","She read that book."], 2,
    "She has read = have/has + past participle"),
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. PAST CONTINUOUS
// ─────────────────────────────────────────────────────────────────────────────

const PC_RULES: AdvGrammarRule[] = [
  {
    title_en: "was / were + verb-ing",
    title_he: "מבנה: was/were + פועל+-ing",
    examples: ["I was sleeping.", "She was reading.", "They were playing.","We were having dinner."],
  },
  {
    title_en: "Interrupted action: was doing WHEN event happened",
    title_he: "פעולה שנקטעה: הייתי עושה X כאשר Y קרה",
    examples: ["I was walking home when it started to rain.", "She was studying when the phone rang.","He was cooking when I arrived.", "They were sleeping when the alarm went off."],
  },
  {
    title_en: "Simultaneous actions: while + two past continuous",
    title_he: "שתי פעולות מקבילות: while... was doing... was doing",
    examples: ["While I was studying, she was cooking.", "He was reading while the children were playing.","They were talking while we were eating.", "I was writing while you were sleeping."],
  },
  {
    title_en: "was = I / he / she / it    were = you / we / they",
    title_he: "was עם גוף ראשון ושלישי יחיד · were עם שאר הגופים",
    examples: ["I was working.", "She was running.", "You were talking.", "They were laughing."],
  },
];

const PC_EX: E[] = [
  fb("pc-1", "השלם בצורה הנכונה:", "I ___ reading when the phone rang.",
    ["was","were","am","had"], 0, "I → was"),
  fb("pc-2", "השלם:", "They ___ playing chess when we arrived.",
    ["were","was","are","had"], 0, "They → were"),
  fb("pc-3", "השלם:", "While she was sleeping, he ___ the dinner.",
    ["was making","made","is making","made have"], 0, "שתי פעולות מקבילות → was making"),
  fb("pc-4", "השלם:", "At 9pm last night, I ___ my homework.",
    ["was doing","did","have done","do"], 0, "תיאור פעולה בשעה ספציפית בעבר → was doing"),
  fb("pc-5", "השלם את השאלה:", "___ you working when your boss called?",
    ["Were","Was","Did","Had"], 0, "שאלה עם you: Were you...?"),
  ch("pc-6", "איזה משפט נכון?",
    "Which sentence uses Past Continuous CORRECTLY?",
    ["I was eat dinner at 7pm.","She were reading a book when he called.","We were talking when the lights went out.","They was playing football."], 2,
    "We were talking — were + verb-ing"),
  ch("pc-7", "when או while?",
    `"She was talking on the phone ___ I knocked on the door."`,
    ["while","when","during","since"], 1,
    "when = בשעה שבה; for interrupted actions"),
  ch("pc-8", "בחר את הצורה הנכונה:",
    `"It ___ raining, so we decided to stay inside."`,
    ["was","were","is","had"], 0,
    "It (weather) → was"),
  ch("pc-9", "איזה משפט מתאר שתי פעולות בו-זמנית?",
    "Which sentence describes two actions happening at the SAME TIME?",
    ["I was reading when she arrived.","While I was reading, she was cooking.","I read and she cooked.","When she arrived, I had read."], 1,
    "while + Past Continuous + Past Continuous = בו-זמנית"),
  ch("pc-10", "השלם את השאלה:",
    `"What ___ you doing at midnight last night?"`,
    ["were","was","did","had"], 0,
    "שאלה עם you: What were you doing?"),
  bd("pc-11", "בחר את המשפט הנכון:",
    "Which sentence is grammatically CORRECT?",
    ["While I was walked to school, I saw my friend.","While I was walking to school, I see my friend.","While I was walking to school, I saw my friend.","While I walking to school, I saw my friend."], 2,
    "while I was walking (Continuous) + I saw (Simple Past — interrupt)"),
  bd("pc-12", "בחר את הצורה הנכונה:",
    `"She ___ when her mum called her name."`,
    ["was studying","is studying","studied","has studied"], 0,
    "Past Continuous = was studying (פעולה שנמשכה כשנקטעה)"),
  bd("pc-13", "איזה משפט מתאר רקע לסיפור?",
    "Which sentence gives the best background description for a story?",
    ["The sun shone and birds singed.","The sun was shining and birds were singing.","The sun shines and birds sing.","The sun is shining and birds are singing."], 1,
    "Past Continuous = background / atmosphere בסיפור"),
  bd("pc-14", "בחר את הצורה הנכונה:",
    `"I ___ TV when you sent me that message."`,
    ["was watching","watched","am watching","have watched"], 0,
    "Past Continuous = פעולה שנמשכה כשהודעה הגיעה"),
  bd("pc-15", "בחר את המשפט הנכון:",
    "Which sentence is CORRECT?",
    ["He was fall asleep during the lesson.","He were falling asleep during the lesson.","He was falling asleep during the lesson.","He fallen asleep during the lesson."], 2,
    "He was falling asleep = was + -ing form"),
];

const PC_QUIZ: E[] = [
  fb("pcq-1", "השלם:", "We ___ having dinner when the electricity went off.",
    ["were","was","had","are"], 0, "We → were"),
  ch("pcq-2", "בחר את הצורה הנכונה:",
    `"The baby ___ sleeping when I came in, so I was very quiet."`,
    ["was","were","is","had"], 0, "The baby (= it) → was"),
  fb("pcq-3", "השלם את השאלה:", "___ she crying when you found her?",
    ["Was","Were","Did","Had"], 0, "She → Was (גוף שלישי יחיד)"),
  ch("pcq-4", "מצא את המשפט השגוי:",
    "Which sentence is INCORRECT?",
    ["I was running when I fell.","He were working all night.","They were laughing loudly.","She was singing in the shower."], 1,
    "He were → שגוי! He → was working"),
  bd("pcq-5", "השלם את המשפט:",
    `"While ___ cooking, he was setting the table."`,
    ["she","she was","she is","she had"], 1,
    "While she was cooking — צריך subject + was"),
  fb("pcq-6", "השלם:", "It ___ snowing when I woke up this morning.",
    ["was","were","is","had"], 0, "It → was"),
  ch("pcq-7", "מה מתאר המשפט 'While I was reading, she was sleeping'?",
    "What does 'while I was reading, she was sleeping' describe?",
    ["One action happened before the other.","One action interrupted the other.","Both actions happened at the same time.","Neither action was completed."], 2,
    "while + Past Continuous + Past Continuous = בו-זמנית"),
  bd("pcq-8", "בחר את הצורה הנכונה:",
    `"The cat ___ on the sofa when I got home."`,
    ["slept","was sleeping","is sleeping","sleeps"], 1,
    "Past Continuous = was sleeping (מה שקרה כשהגעתי)"),
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. FUTURE FORMS
// ─────────────────────────────────────────────────────────────────────────────

const FUT_RULES: AdvGrammarRule[] = [
  {
    title_en: "will — spontaneous decisions, promises, predictions (opinion)",
    title_he: "will = החלטה ספונטנית / הבטחה / תחזית (דעה)",
    examples: ["A: The phone's ringing! B: I'll get it! (spontaneous)","I'll help you, I promise. (promise)","I think it will rain tomorrow. (opinion prediction)","Don't worry — she'll be fine."],
  },
  {
    title_en: "going to — plans already decided, predictions with evidence",
    title_he: "going to = תוכניות שכבר הוחלטו / תחזית עם ראיות",
    examples: ["I'm going to study medicine. (already decided)","Look at those clouds — it's going to rain! (evidence)","She's going to visit her parents next weekend.","They're going to get married in June."],
  },
  {
    title_en: "Present Continuous — arranged future events",
    title_he: "Present Continuous לעתיד = אירוע מתוכנן ומוסכם",
    examples: ["We're meeting at 8pm. (arrangement — date in diary)","She's flying to London tomorrow morning.","I'm having lunch with my boss on Friday.","They're starting the project next Monday."],
  },
  {
    title_en: "Present Simple — fixed schedules / timetables",
    title_he: "Present Simple לעתיד = לוח זמנים קבוע",
    examples: ["The train leaves at 9am.","The concert starts at 8pm.","School finishes at 3pm on Fridays.","The shop opens at 9 tomorrow."],
  },
];

const FUT_EX: E[] = [
  fb("fut-1", "השלם — תחזית עם ראיות:", "Look at those dark clouds! It ___ rain!",
    ["is going to","will","would","might"], 0, "ראיות ברורות = going to"),
  fb("fut-2", "השלם — הצעה ספונטנית:", "Don't worry, I ___ help you.",
    ["will","am going to","am","would"], 0, "הצעה ספונטנית = will"),
  fb("fut-3", "השלם — הסדר תוכנן:", "We ___ meet at 7pm — I've already booked the table.",
    ["are going to","will","would","are"], 0, "תוכנית שכבר הוסדרה = going to"),
  fb("fut-4", "השלם — החלטה ספונטנית:", "A: Someone's at the door! B: I ___ get it!",
    ["will","am going to","am","shall"], 0, "ספונטני = will"),
  fb("fut-5", "השלם — תוכנית שהוחלטה:", "She's decided — she ___ become a doctor.",
    ["is going to","will","would","is"], 0, "החלטה שכבר התקבלה = going to"),
  ch("fut-6", "בחר את הצורה הנכונה — תחזית מדעה:",
    `"I think it ___ rain tomorrow." (no evidence — just opinion)`,
    ["will","is going to","is going","goes"], 0,
    "דעה ללא ראיות = will"),
  ch("fut-7", "מה הנכון?",
    "Which uses 'going to' CORRECTLY?",
    ["I going to travel next week.","I am going travel tomorrow.","I am going to travel tomorrow.","I going travel tomorrow."], 2,
    "I am going to + verb (infinitive)"),
  ch("fut-8", "מה עתיד לו\"ז קבוע?",
    `"The bus ___ at 6:30am." (fixed timetable)`,
    ["leaves","will leave","is going to leave","is leaving"], 0,
    "לוח זמנים קבוע = Present Simple"),
  ch("fut-9", "הסדר תוכנן מראש:",
    `"They ___ get married in June — they've sent all the invitations."`,
    ["will","are going to","are getting","would"], 2,
    "אירוע מוסכם ומסודר = Present Continuous (are getting)"),
  ch("fut-10", "מה מצריך 'will' ספונטני?",
    "Which situation requires a SPONTANEOUS will?",
    ["I decided last week to visit Rome.","I'm going to visit Rome next year.","A: The printer is broken! B: I'll fix it!","I'm visiting Rome next month."], 2,
    "תגובה מיידית לאירוע = will ספונטני"),
  er("fut-11", "מצא שגיאה ותקן:", `"I will to go to the party tonight."`,
    ["I will go to the party tonight.","I will going to the party.","I going to go to the party.","I am will go to the party."], 0,
    "אחרי will לא מוסיפים 'to' — will + bare infinitive"),
  er("fut-12", "מצא שגיאה ותקן:", `"She is go to study harder."`,
    ["She is going to study harder.","She goes to study harder.","She will to study harder.","She going to study harder."], 0,
    "is go to → is going to study"),
  er("fut-13", "מצא שגיאה ותקן:", `"They going to visit London next year."`,
    ["They are going to visit London next year.","They will to visit London next year.","They goes to visit London.","They going visit London."], 0,
    "חסר: are — They are going to visit"),
  er("fut-14", "מצא שגיאה ותקן:", `"We will meeting at 5pm."`,
    ["We will meet at 5pm.","We will to meet at 5pm.","We are will meet at 5pm.","We meeting at 5pm."], 0,
    "will + bare infinitive: will meet (לא meeting)"),
  er("fut-15", "החלטה ספונטנית — בחר את הצורה הנכונה:", `"I am going to help you!" (just decided this second)`,
    ["I will help you!","I am going to help you!","I help you!","I am helping you!"], 0,
    "החלטה ספונטנית = will (לא going to)"),
];

const FUT_QUIZ: E[] = [
  ch("futq-1", "לו\"ז קבוע — בחר:",
    `"The meeting ___ at 3pm tomorrow." (fixed timetable)`,
    ["starts","will start","is going to start","is starting"], 0,
    "לו\"ז קבוע = Present Simple"),
  fb("futq-2", "השלם — ראיות ברורות:", "Look! That child ___ fall off the bike!",
    ["is going to","will","is","would"], 0, "ראיות ברורות = going to"),
  ch("futq-3", "מצא את השגיאה:",
    "Which sentence uses 'will' INCORRECTLY?",
    ["I'll call you later, I promise.","It will probably snow.","I will to see you tomorrow.","She'll be here soon."], 2,
    "will to see → שגוי! will + bare infinitive: will see"),
  ch("futq-4", "תוכנית שכבר הוחלטה:",
    `"He ___ visit his parents next weekend — he's bought the train ticket."`,
    ["will","is going to","would","shall"], 1,
    "תוכנית שהוחלטה ויש הוכחה (ticket) = going to"),
  fb("futq-5", "השלם — ספונטני:", "A: I need some help! B: I ___ do it!",
    ["will","am going to","am","would"], 0, "תגובה ספונטנית = will"),
  ch("futq-6", "בחר את המשפט הנכון:",
    "Which sentence is CORRECT?",
    ["She going to travel next year.","She is going to travel next year.","She is go to travel next year.","She will to travel next year."], 1,
    "She is going to travel — am/is/are + going to + verb"),
  fb("futq-7", "השלם — אירוע מוסכם:", "We ___ buying our new car tomorrow — everything is arranged.",
    ["are","will be","have","would"], 0,
    "אירוע מסודר מראש = Present Continuous (are buying)"),
  ch("futq-8", "תחזית עם ראיות:",
    `"I've checked the weather app — 90% chance of rain!"`,
    ["It rains tomorrow.","It will rain tomorrow.","It's going to rain tomorrow.","It is raining tomorrow."], 2,
    "ראיות מוצקות = going to"),
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. FIRST CONDITIONAL
// ─────────────────────────────────────────────────────────────────────────────

const FC_RULES: AdvGrammarRule[] = [
  {
    title_en: "If + present simple, will + bare infinitive",
    title_he: "מבנה: If + הווה פשוט, will + infinitive",
    examples: ["If it rains, we will stay home.","If you study hard, you will pass.","If she calls, I'll tell her.","If they're late, we won't wait."],
  },
  {
    title_en: "Real/possible future situations",
    title_he: "מצבים אפשריים באמת — First Conditional לאפשרויות ריאליות",
    examples: ["If I find a good job, I'll move to Tel Aviv.","If the weather is nice, we'll have a picnic.","You'll feel better if you sleep.","Will you come if I invite you?"],
  },
  {
    title_en: "unless = if not",
    title_he: "unless = אם לא (שלילי): Unless you hurry = If you don't hurry",
    examples: ["Unless you hurry, we'll miss the bus.","She won't come unless you invite her.","Unless it stops raining, we won't go out.","He won't pass unless he studies."],
  },
  {
    title_en: "when (certain) vs. if (uncertain)",
    title_he: "when = כשבטוח שזה יקרה · if = אם (לא בטוח)",
    examples: ["When I finish school, I'll travel. (certain)","If I finish early, I'll call you. (uncertain)","When the teacher arrives, we'll start. (certain)","Call me if you need help. (uncertain)"],
  },
];

const FC_EX: E[] = [
  fb("fc-1", "השלם בהווה פשוט:", "If it ___ tomorrow, we'll cancel the picnic.",
    ["rains","rain","will rain","rained"], 0, "אחרי If → הווה פשוט (rains, לא will rain)"),
  fb("fc-2", "השלם:", "I will call you if I ___ free later.",
    ["am","will be","were","be"], 0, "אחרי If → הווה פשוט (am)"),
  fb("fc-3", "השלם:", "If you don't eat breakfast, you ___ be hungry by 10am.",
    ["will","would","shall","are"], 0, "תוצאה ריאלית → will"),
  fb("fc-4", "השלם את השאלה:", "___ you be upset if I don't come?",
    ["Will","Would","Shall","Do"], 0, "שאלה First Conditional: Will you...?"),
  fb("fc-5", "unless = if not. השלם:", "I won't lend him money ___ he pays me back.",
    ["unless","if","while","since"], 0, "unless he pays = if he doesn't pay"),
  ch("fc-6", "איזה משפט First Conditional נכון?",
    "Which first conditional is CORRECT?",
    ["If it will rain, I'll stay home.","If it rained, I'll stay home.","If it rains, I will stay home.","If it rain, I will stay home."], 2,
    "If + present simple (rains), will + infinitive"),
  ch("fc-7", "השלם:",
    `"If you ___ hard, you will succeed."`,
    ["work","works","worked","will work"], 0,
    "If + present simple → work (לא works/worked)"),
  ch("fc-8", "בחר את הקישוריות הנכונה:",
    `"___ the weather is good, we'll go to the beach."`,
    ["If","Unless","Although","Despite"], 0,
    "If = אם (First Conditional)"),
  ch("fc-9", "הכר: unless = if not",
    `"She won't pass the exam ___ she studies every night."`,
    ["unless","if","although","while"], 0,
    "unless = if not: unless she studies = if she doesn't study"),
  ch("fc-10", "בחר if or when:",
    `"___ I finish school (certain), I'll travel around the world."`,
    ["When","If","Unless","Although"], 0,
    "when = לאירועים בטוחים; כאן סיום הלימודים הוא ודאי"),
  bd("fc-11", "בנה את המשפט הנכון:",
    "Which first conditional is CORRECT?",
    ["If you will help me, I finish faster.","If you help me, I will finish faster.","If you helped me, I will finish faster.","I finish faster if you helped me."], 1,
    "If + present simple + will + infinitive"),
  bd("fc-12", "בחר:",
    `"What ___ you do if you miss the last bus?"`,
    ["will","would","shall","do"], 0,
    "First Conditional שאלה: What will you do if...?"),
  bd("fc-13", "בחר את הצורה הנכונה של השלילה:",
    "Which negative first conditional is CORRECT?",
    ["If it won't rain, we'll play outside.","If it doesn't rain, we'll play outside.","Unless it rains, we don't play.","If it isn't rained, we play."], 1,
    "If + doesn't (negative present simple) → will"),
  bd("fc-14", "השלם:",
    `"She ___ be disappointed if you don't go."`,
    ["will","would","shall","is"], 0,
    "First Conditional תוצאה = will"),
  bd("fc-15", "המר if → unless בצורה נכונה:",
    `"If you don't come, I'll be upset." → Using 'unless':`,
    ["Unless you come, I'll be upset.","Unless you don't come, I'll be upset.","Unless you come, I wouldn't be upset.","Unless you come, I was upset."], 0,
    "unless you come = if you don't come — אין double negative"),
];

const FC_QUIZ: E[] = [
  fb("fcq-1", "השלם:", "If she ___ here on time, we can start.",
    ["is","was","were","will be"], 0, "If + present simple (is)"),
  ch("fcq-2", "שאלה First Conditional:",
    `"___ you come tomorrow if the weather is good?"`,
    ["Will","Would","Shall","Do"], 0, "Will you...? — First Conditional"),
  fb("fcq-3", "השלם:", "You ___ feel better if you sleep.",
    ["will","would","shall","should"], 0, "תוצאה ריאלית = will"),
  ch("fcq-4", "unless נכון?",
    "Which uses 'unless' CORRECTLY?",
    ["Unless you study, you'll fail.","Unless you don't study, you'll fail.","Unless you study, you'd fail.","Unless you studied, you'll fail."], 0,
    "unless you study = if you don't study (ללא double negative)"),
  ch("fcq-5", "השלם:",
    `"If I ___ the answer, I'll let you know."`,
    ["find","found","will find","finding"], 0,
    "If + present simple (find)"),
  bd("fcq-6", `"She won't come if you don't invite her." — Change 'if...not' to 'unless':`,
    "Which is the correct 'unless' version?",
    ["She won't come unless you invite her.","She won't come unless you don't invite her.","She comes unless you invite her.","Unless she comes, you invite her."], 0,
    "unless = if not → ללא שלילה נוספת"),
  fb("fcq-7", "השלם:", "He will be angry if you ___ late again.",
    ["are","were","be","will be"], 0, "If + present simple (are)"),
  ch("fcq-8", "when ל-אירוע בטוח:",
    "Which uses 'when' CORRECTLY for a CERTAIN future event?",
    ["When it might rain, take an umbrella.","When I graduate, I'll have a big party. (certain)","When she comes or not, we'll start.","I'll call you when maybe you're free."], 1,
    "when = לאירועים בטוחים; I graduate is certain"),
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. SECOND CONDITIONAL
// ─────────────────────────────────────────────────────────────────────────────

const SC_RULES: AdvGrammarRule[] = [
  {
    title_en: "If + past simple, would + bare infinitive",
    title_he: "מבנה: If + עבר פשוט, would + infinitive",
    examples: ["If I had a million dollars, I would travel the world.","If she knew the answer, she would tell you.","They would be happier if they lived by the sea.","What would you do if you lost your keys?"],
  },
  {
    title_en: "Imaginary / unreal situations",
    title_he: "מצבים דמיוניים / בלתי ריאליים בהווה או עתיד",
    examples: ["If I were a bird, I would fly to warm countries. (impossible)","If he worked harder, he'd get promoted. (unlikely)","She would travel if she had more money. (currently doesn't)","If we lived closer, we'd meet more often."],
  },
  {
    title_en: "If I were you... (not 'was' — formal)",
    title_he: "If I were you = אם הייתי במקומך (were — לא was — בפורמלי)",
    examples: ["If I were you, I would apologise.","If I were taller, I could be a basketball player.","If she were here, she'd know what to do.","If he were more careful, this wouldn't have happened."],
  },
  {
    title_en: "1st vs. 2nd Conditional",
    title_he: "1st = אפשרי ריאלי · 2nd = דמיוני / לא סביר",
    examples: ["If it rains, I'll stay home. (1st — real possibility)","If I were a fish, I would live in the sea. (2nd — imaginary)","If she calls, I'll answer. (1st — realistic)","If she called every day, I'd get annoyed. (2nd — unlikely scenario)"],
  },
];

const SC_EX: E[] = [
  fb("sc-1", "השלם בעבר פשוט:", "If I ___ a dog, I would take it for walks every day.",
    ["had","have","would have","has"], 0, "If + past simple (had)"),
  fb("sc-2", "השלם עם would:", "I ___ be much happier if I lived near the beach.",
    ["would","will","should","could"], 0, "תוצאה = would"),
  fb("sc-3", "השלם:", "If she ___ more free time, she'd learn to paint.",
    ["had","have","has","would have"], 0, "If + past simple (had)"),
  fb("sc-4", "השלם:", "What ___ you do if you won a million dollars?",
    ["would","will","shall","did"], 0, "שאלה Second Conditional: would"),
  fb("sc-5", "If I ___ you (formal):", "If I ___ you, I would apologise immediately.",
    ["were","was","am","be"], 0, "If I were you = ביטוי קבוע (were, לא was)"),
  ch("sc-6", "איזה Second Conditional נכון?",
    "Which second conditional is CORRECT?",
    ["If I was rich, I buy a yacht.","If I am rich, I would buy a yacht.","If I were rich, I would buy a yacht.","If I would be rich, I buy a yacht."], 2,
    "If + past simple (were) + would + infinitive"),
  ch("sc-7", "השלם:",
    `"If she ___ the answer, she would tell you."`,
    ["knows","knew","has known","know"], 1,
    "If + past simple (knew) — לא הווה"),
  ch("sc-8", "זהה Second Conditional (דמיוני):",
    "Which sentence is the SECOND CONDITIONAL (imaginary)?",
    ["If it rains, I'll stay home.","If you call me, I'll answer.","If I had wings, I would fly.","If it's hot, we'll swim."], 2,
    "If I had wings = בלתי אפשרי — Second Conditional"),
  ch("sc-9", "השלם:",
    `"They would visit more often if they ___ closer."`,
    ["live","lived","would live","living"], 1,
    "If + past simple (lived)"),
  ch("sc-10", "בחר את הצמד הנכון:",
    `"If I ___ a teacher, I ___ give less homework."`,
    ["were / would","was / will","am / would","were / will"], 0,
    "If I were... I would... — Second Conditional מלא"),
  bd("sc-11", "משאלה (wish) בצורה נכונה:",
    "Which expresses a WISH correctly?",
    ["I wish I would have a dog.","I wish I had a dog.","I wish I have a dog.","I wish I will have a dog."], 1,
    "wish + past simple = משאלה: I wish I had..."),
  bd("sc-12", "were או was? (פורמלי):",
    "Which is MORE CORRECT in formal English?",
    ["If I was you, I'd study more.","If I were you, I'd study more.","If I am you, I would study more.","If I would be you, I study more."], 1,
    "If I were you = פורמלי ומקובל יותר"),
  bd("sc-13", "השלם:",
    `"She wouldn't be so tired if she ___ to bed earlier."`,
    ["goes","went","had gone","would go"], 1,
    "If + past simple (went) — לא הווה"),
  bd("sc-14", "שאלה Second Conditional:",
    `"If you could live anywhere in the world, where ___ you go?"`,
    ["will","would","shall","do"], 1,
    "Second Conditional שאלה = would"),
  bd("sc-15", "זהה Second Conditional:",
    "Which sentence is a SECOND CONDITIONAL (imaginary)?",
    ["If I study, I will pass.","If I don't eat, I'll be hungry.","If I were a superhero, I would save the world.","If it rains, we'll cancel."], 2,
    "If I were a superhero = בלתי אפשרי — Second Conditional"),
];

const SC_QUIZ: E[] = [
  fb("scq-1", "השלם בעבר פשוט:", "If he ___ harder, he would get better grades.",
    ["worked","works","will work","would work"], 0, "If + past simple (worked)"),
  ch("scq-2", "השלם:",
    `"What would you do if you ___ invisible for a day?"`,
    ["were","was","are","would be"], 0,
    "If + past simple: were (פורמלי), were preferred"),
  fb("scq-3", "השלם:", "She ___ move to Paris if she could.",
    ["would","will","should","could"], 0, "תוצאה Second Conditional = would"),
  ch("scq-4", "זהה First Conditional (אפשרי):",
    "Which is FIRST conditional (real possibility)?",
    ["If I had a car, I would drive to work.","If I have a car, I will drive to work.","If I were a car, I would drive.","If I had been a car, I would drive."], 1,
    "If I have (present simple) + will = First Conditional"),
  fb("scq-5", "If I were you:", "If I ___ you, I wouldn't worry about it.",
    ["were","was","am","be"], 0, "If I were you = ביטוי פורמלי קבוע"),
  ch("scq-6", "השלם:",
    `"She would be happier if she ___ a new job."`,
    ["finds","found","has found","find"], 1,
    "If + past simple (found)"),
  bd("scq-7", "בחר את המשפט הנכון:",
    "Which is grammatically CORRECT?",
    ["If I had million dollars, I would travel world.","If I had a million dollars, I would travel the world.","If I have a million dollars, I would travel the world.","If I had million dollars, I would travel the world."], 1,
    "If I had a million dollars, I would travel the world — עם articles"),
  ch("scq-8", "השלם:",
    `"If she ___ taller, she could reach the top shelf."`,
    ["is","was","were","would be"], 2,
    "Second Conditional: were (פורמלי) או was"),
];

// ─────────────────────────────────────────────────────────────────────────────
// 6. PASSIVE VOICE
// ─────────────────────────────────────────────────────────────────────────────

const PV_RULES: AdvGrammarRule[] = [
  {
    title_en: "Present Passive: am/is/are + past participle",
    title_he: "Present Passive: am/is/are + past participle",
    examples: ["English is spoken all over the world.","The windows are cleaned every week.","These cars are made in Japan.","The match is broadcast live on TV."],
  },
  {
    title_en: "Past Passive: was/were + past participle",
    title_he: "Past Passive: was/were + past participle",
    examples: ["The Eiffel Tower was built in 1889.","My bike was stolen last night.","The cake was eaten before we arrived.","The letters were written by hand."],
  },
  {
    title_en: "Future Passive: will be + past participle",
    title_he: "Future Passive: will be + past participle",
    examples: ["The new bridge will be built next year.","The results will be announced tomorrow.","The packages will be delivered by Friday.","The meeting will be cancelled if it rains."],
  },
  {
    title_en: "by + agent (who did it)",
    title_he: "by + subject = מי עשה את הפעולה (לעתים מושמט)",
    examples: ["Romeo and Juliet was written by Shakespeare.","The photo was taken by a professional photographer.","The news was reported by the BBC.","The song was sung by a famous choir."],
  },
  {
    title_en: "Active → Passive: Object becomes subject",
    title_he: "המרה: האובייקט הופך לנושא; הנושא עם 'by' (אופציונלי)",
    examples: ["Active: They built the bridge. → Passive: The bridge was built.","Active: She writes the reports. → Passive: The reports are written.","Active: He will fix the car. → Passive: The car will be fixed.","Active: People speak French here. → Passive: French is spoken here."],
  },
];

const PV_EX: E[] = [
  fb("pv-1", "השלם — Past Passive:", "The letter ___ written in 1850.",
    ["was","is","were","been"], 0, "Past Passive = was + past participle"),
  fb("pv-2", "השלם — Present Passive:", "English ___ spoken all around the world.",
    ["is","are","was","were"], 0, "Present Passive — English (it) = is"),
  fb("pv-3", "השלם — Present Passive רבים:", "The windows ___ cleaned every week.",
    ["are","is","was","were"], 0, "The windows (רבים) → are"),
  fb("pv-4", "השלם — Future Passive:", "The new school ___ built next year.",
    ["will be","is","was","be"], 0, "Future Passive = will be + past participle"),
  fb("pv-5", "השלם — Past Passive:", "My mobile phone ___ stolen yesterday.",
    ["was","is","were","has"], 0, "Past Passive — My phone (יחיד) = was"),
  ch("pv-6", "המר ל-Passive: 'Someone stole my bike.'",
    "Change to passive: 'Someone stole my bike.'",
    ["My bike stole.","My bike was stolen.","My bike is stolen.","My bike had stolen."], 1,
    "was stolen = Past Passive (stolen = past participle of steal)"),
  ch("pv-7", "השלם:",
    `"The letter ___ by a famous poet."`,
    ["written","was written","wrote","is writing"], 1,
    "was written = Past Passive"),
  ch("pv-8", "איזה Passive נכון?",
    "Which passive sentence is CORRECT?",
    ["The dinner was cook by my mum.","The dinner cooked by my mum.","The dinner is cooked by my mum.","The dinner was cooking by my mum."], 2,
    "The dinner is cooked = Present Passive (is + past participle)"),
  ch("pv-9", "השלם — Present Passive רבים:",
    `"Millions of copies ___ sold every year."`,
    ["is","are","was","were"], 1,
    "Millions (רבים) → are sold"),
  ch("pv-10", "השלם:",
    `"The film ___ directed by Spielberg."`,
    ["was","were","has","directing"], 0,
    "was directed = Past Passive"),
  bd("pv-11", "המר ל-Passive: 'Shakespeare wrote Hamlet.'",
    "Which passive is CORRECT?",
    ["Hamlet was written by Shakespeare.","Hamlet is written by Shakespeare.","Hamlet were written by Shakespeare.","Hamlet written by Shakespeare."], 0,
    "was written by Shakespeare — Past Passive"),
  bd("pv-12", "המר ל-Passive: 'They build new houses every year.'",
    "Which passive is CORRECT?",
    ["New houses are build every year.","New houses are built every year.","New houses were built every year.","New houses is built every year."], 1,
    "are built = Present Passive (built = past participle of build)"),
  bd("pv-13", "המר ל-Passive: 'The police caught the thief.'",
    "Which passive is CORRECT?",
    ["The thief is caught by the police.","The thief caught by the police.","The thief was caught by the police.","The thief were caught by the police."], 2,
    "was caught = Past Passive"),
  bd("pv-14", "המר ל-Passive: 'Someone will fix the computer.'",
    "Which future passive is CORRECT?",
    ["The computer will be fixed.","The computer is fixed.","The computer was fixed.","The computer be fixed."], 0,
    "will be fixed = Future Passive"),
  bd("pv-15", "זהה Passive:",
    "Which sentence is in the PASSIVE VOICE?",
    ["The cat chased the mouse.","My mum baked the cake.","The window was broken by the ball.","She is reading a book."], 2,
    "was broken = Passive; subject (window) received the action"),
];

const PV_QUIZ: E[] = [
  fb("pvq-1", "השלם:", "The Eiffel Tower ___ built in 1889.",
    ["was","is","were","be"], 0, "Past Passive — was built"),
  ch("pvq-2", "המר ל-Passive: 'People speak French in Quebec.'",
    "Which is the CORRECT passive?",
    ["French is spoke in Quebec.","French speaks in Quebec.","French is spoken in Quebec.","French was spoken in Quebec."], 2,
    "is spoken = Present Passive (spoken = past participle)"),
  fb("pvq-3", "השלם:", "The cake ___ eaten before we arrived!",
    ["was","is","were","has"], 0, "Past Passive — was eaten"),
  ch("pvq-4", "Future Passive:",
    `"The new hospital ___ opened next month."`,
    ["will be","is","was","be"], 0,
    "Future Passive = will be + past participle"),
  bd("pvq-5", "המר ל-Passive: 'They make cars in that factory.'",
    "Which passive is CORRECT?",
    ["Cars made in that factory.","Cars are made in that factory.","Cars is made in that factory.","Cars were made in that factory."], 1,
    "are made = Present Passive (subject: Cars — רבים)"),
  fb("pvq-6", "השלם — Past Passive:", "Yesterday, the homework ___ corrected by the teacher.",
    ["was","is","were","are"], 0, "Past Passive — was corrected"),
  ch("pvq-7", "by + agent נכון?",
    "Which uses 'by' CORRECTLY in passive?",
    ["The letter was written from Shakespeare.","The letter was written of Shakespeare.","The letter was written by Shakespeare.","The letter was written with Shakespeare."], 2,
    "by + agent = ביצירת Passive"),
  ch("pvq-8", "מצא את המשפט השגוי:",
    "Which sentence is WRONG?",
    ["The museum was visited by thousands.","The cake was eating by the children.","The road will be repaired next week.","English is taught in most schools."], 1,
    "was eating → שגוי! צריך: was eaten (past participle)"),
];

// ─────────────────────────────────────────────────────────────────────────────
// Combined topics export
// ─────────────────────────────────────────────────────────────────────────────

export const ADV_GRAMMAR_TOPICS: AdvGrammarTopic[] = [
  {
    id: "adv-pp",
    title_he: "Present Perfect",
    title_en: "have / has + past participle",
    icon: "✅",
    color: "from-blue-500 to-indigo-600",
    summary_he: "מדברים על חוויות, פעולות קרובות, ומצבים שנמשכים עד עכשיו",
    rules: PP_RULES,
    exercises: PP_EX,
    quiz: PP_QUIZ,
  },
  {
    id: "adv-pc",
    title_he: "Past Continuous",
    title_en: "was / were + verb-ing",
    icon: "⏳",
    color: "from-purple-500 to-violet-600",
    summary_he: "מתאר פעולה שנמשכה בעבר, נקטעה, או התרחשה במקביל לפעולה אחרת",
    rules: PC_RULES,
    exercises: PC_EX,
    quiz: PC_QUIZ,
  },
  {
    id: "adv-fut",
    title_he: "Future Forms",
    title_en: "will / going to / Present Continuous",
    icon: "🚀",
    color: "from-emerald-500 to-teal-600",
    summary_he: "שלוש דרכים לדבר על העתיד — כל אחת לשימוש שונה",
    rules: FUT_RULES,
    exercises: FUT_EX,
    quiz: FUT_QUIZ,
  },
  {
    id: "adv-fc",
    title_he: "First Conditional",
    title_en: "If + present simple, will + infinitive",
    icon: "1️⃣",
    color: "from-amber-500 to-orange-500",
    summary_he: "מצבים אפשריים ותוצאותיהם — If it rains, we will stay home",
    rules: FC_RULES,
    exercises: FC_EX,
    quiz: FC_QUIZ,
  },
  {
    id: "adv-sc",
    title_he: "Second Conditional",
    title_en: "If + past simple, would + infinitive",
    icon: "💭",
    color: "from-rose-500 to-pink-600",
    summary_he: "מצבים דמיוניים / לא ריאליים — If I had wings, I would fly",
    rules: SC_RULES,
    exercises: SC_EX,
    quiz: SC_QUIZ,
  },
  {
    id: "adv-pv",
    title_he: "Passive Voice",
    title_en: "be + past participle",
    icon: "🔄",
    color: "from-cyan-500 to-sky-600",
    summary_he: "כאשר מה שקרה חשוב יותר ממי עשה — The book was written by...",
    rules: PV_RULES,
    exercises: PV_EX,
    quiz: PV_QUIZ,
  },
];

export function getTopicById(id: string): AdvGrammarTopic | undefined {
  return ADV_GRAMMAR_TOPICS.find((t) => t.id === id);
}
