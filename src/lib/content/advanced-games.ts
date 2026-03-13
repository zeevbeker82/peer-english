/**
 * Advanced Games — B1 level content data
 * 6 games: Word Race · Grammar Ninja · Error Hunt · Speed Translation · Category Challenge · Idiom Match
 */

export type GameDifficulty = "easy" | "medium" | "hard";

// ─────────────────────────────────────────────────────────────────────────────
// 1. WORD ASSOCIATION RACE — seed words
// ─────────────────────────────────────────────────────────────────────────────

export const WAR_SEEDS: Record<GameDifficulty, string[]> = {
  easy: [
    "sun", "dog", "house", "book", "water",
    "food", "happy", "school", "blue", "family",
  ],
  medium: [
    "freedom", "adventure", "technology", "friendship", "success",
    "nature", "music", "travel", "health", "science",
  ],
  hard: [
    "ambition", "democracy", "innovation", "resilience", "consciousness",
    "sustainability", "empathy", "transformation", "perspective", "legacy",
  ],
};

// Advanced English vocab words (for bonus XP detection in Word Race)
export const ADVANCED_VOCAB_SET = new Set([
  "analyze","benefit","challenge","debate","describe","determine","evaluate",
  "explore","identify","illustrate","improve","indicate","investigate","justify",
  "maintain","organize","participate","predict","present","suggest","support",
  "achievement","advantage","approach","argument","concept","conclusion",
  "consequence","contribution","development","discussion","environment",
  "evidence","example","experience","factor","influence","knowledge",
  "opportunity","relationship","responsibility","situation","solution",
  "structure","technique","theory","tradition","variety","communication",
  "ambition","democracy","innovation","resilience","consciousness",
  "sustainability","empathy","transformation","perspective","legacy",
  "freedom","adventure","technology","friendship","success",
  "motivation","confidence","independence","creativity","discipline",
]);

// ─────────────────────────────────────────────────────────────────────────────
// 2. GRAMMAR NINJA — sentences with ONE error each
// ─────────────────────────────────────────────────────────────────────────────

export interface GNSentence {
  id: string;
  sentence: string;
  errorWord: string;        // exact string that appears in sentence
  errorWordIndex: number;   // 0-based index in sentence.split(" ")
  correctWord: string;      // replacement (empty = delete)
  explanation_he: string;
  difficulty: GameDifficulty;
}

export const GN_SENTENCES: GNSentence[] = [
  // ── EASY ──────────────────────────────────────────────────────────────────
  { id:"gn-e01", sentence:"She go to school every day.", errorWord:"go", errorWordIndex:1, correctWord:"goes", explanation_he:"פועל בגוף שלישי יחיד (she/he/it) מקבל s — goes", difficulty:"easy" },
  { id:"gn-e02", sentence:"I have a umbrella.", errorWord:"a", errorWordIndex:2, correctWord:"an", explanation_he:"לפני מילה שמתחילה בתנועה משתמשים ב-an (an umbrella)", difficulty:"easy" },
  { id:"gn-e03", sentence:"They was happy yesterday.", errorWord:"was", errorWordIndex:1, correctWord:"were", explanation_he:"עם they (רבים) משתמשים ב-were, לא was", difficulty:"easy" },
  { id:"gn-e04", sentence:"He don't like spiders.", errorWord:"don't", errorWordIndex:1, correctWord:"doesn't", explanation_he:"בגוף שלישי יחיד (he/she/it) משתמשים ב-doesn't", difficulty:"easy" },
  { id:"gn-e05", sentence:"We goed to the park.", errorWord:"goed", errorWordIndex:1, correctWord:"went", explanation_he:"go הוא פועל לא-סדיר — צורת העבר היא went", difficulty:"easy" },
  { id:"gn-e06", sentence:"There is many students here.", errorWord:"is", errorWordIndex:1, correctWord:"are", explanation_he:"עם שם עצם רבים (students) משתמשים ב-there are", difficulty:"easy" },
  { id:"gn-e07", sentence:"The childrens played outside.", errorWord:"childrens", errorWordIndex:1, correctWord:"children", explanation_he:"children הוא כבר רבים — אין להוסיף s", difficulty:"easy" },
  { id:"gn-e08", sentence:"She runned very fast.", errorWord:"runned", errorWordIndex:1, correctWord:"ran", explanation_he:"run הוא פועל לא-סדיר — עבר: ran", difficulty:"easy" },
  { id:"gn-e09", sentence:"My father have two cars.", errorWord:"have", errorWordIndex:2, correctWord:"has", explanation_he:"בגוף שלישי יחיד (my father) משתמשים ב-has", difficulty:"easy" },
  { id:"gn-e10", sentence:"I am more taller than him.", errorWord:"more", errorWordIndex:2, correctWord:"", explanation_he:"עם תואר קצר (tall) משתמשים ב-er בלבד — taller, לא more taller", difficulty:"easy" },

  // ── MEDIUM ────────────────────────────────────────────────────────────────
  { id:"gn-m01", sentence:"I have seen that film last week.", errorWord:"have", errorWordIndex:1, correctWord:"saw", explanation_he:"עם ציון זמן עבר ספציפי (last week) משתמשים ב-Past Simple", difficulty:"medium" },
  { id:"gn-m02", sentence:"She is more clever than her brother.", errorWord:"more", errorWordIndex:2, correctWord:"", explanation_he:"clever הוא תואר קצר — משתמשים ב-cleverer, לא more clever", difficulty:"medium" },
  { id:"gn-m03", sentence:"He speaks English very good.", errorWord:"good", errorWordIndex:4, correctWord:"well", explanation_he:"good הוא שם תואר; לתיאור פועל (speaks) צריך תואר פועל: well", difficulty:"medium" },
  { id:"gn-m04", sentence:"I am living here since 2018.", errorWord:"am", errorWordIndex:1, correctWord:"have been", explanation_he:"עם since (מאז) משתמשים ב-Present Perfect: have been living", difficulty:"medium" },
  { id:"gn-m05", sentence:"They arrived to London yesterday.", errorWord:"to", errorWordIndex:2, correctWord:"in", explanation_he:"arrive in + עיר/מדינה (לא arrive to)", difficulty:"medium" },
  { id:"gn-m06", sentence:"She suggested to go to the cinema.", errorWord:"to", errorWordIndex:2, correctWord:"going", explanation_he:"suggest + V-ing, לא suggest + to-infinitive", difficulty:"medium" },
  { id:"gn-m07", sentence:"He is used to wake up early.", errorWord:"wake", errorWordIndex:4, correctWord:"waking", explanation_he:"be used to + V-ing (לא be used to + base verb)", difficulty:"medium" },
  { id:"gn-m08", sentence:"I look forward to see you.", errorWord:"see", errorWordIndex:4, correctWord:"seeing", explanation_he:"look forward to + V-ing (to הוא מילת יחס כאן)", difficulty:"medium" },
  { id:"gn-m09", sentence:"She made me to feel better.", errorWord:"to", errorWordIndex:3, correctWord:"", explanation_he:"make + object + base verb (בלי to)", difficulty:"medium" },
  { id:"gn-m10", sentence:"I wish I will have more time.", errorWord:"will", errorWordIndex:3, correctWord:"had", explanation_he:"wish + Past Simple (had) לביטוי משאלה על ההווה", difficulty:"medium" },

  // ── HARD ──────────────────────────────────────────────────────────────────
  { id:"gn-h01", sentence:"If I would have money, I could buy it.", errorWord:"would", errorWordIndex:2, correctWord:"had", explanation_he:"תנאי שני (Second Conditional): If + Past Simple, would + base", difficulty:"hard" },
  { id:"gn-h02", sentence:"The informations are incorrect.", errorWord:"informations", errorWordIndex:1, correctWord:"information", explanation_he:"information הוא שם עצם שאין לו רבים (uncountable noun)", difficulty:"hard" },
  { id:"gn-h03", sentence:"By the time he arrived, she has left.", errorWord:"has", errorWordIndex:6, correctWord:"had", explanation_he:"Past Perfect (had left) לפעולה שהושלמה לפני פעולה אחרת בעבר", difficulty:"hard" },
  { id:"gn-h04", sentence:"The news are very surprising today.", errorWord:"are", errorWordIndex:2, correctWord:"is", explanation_he:"news הוא שם עצם בגוף יחיד — the news is", difficulty:"hard" },
  { id:"gn-h05", sentence:"He denied to steal the money.", errorWord:"to", errorWordIndex:2, correctWord:"stealing", explanation_he:"deny + V-ing (לא deny + to-infinitive)", difficulty:"hard" },
  { id:"gn-h06", sentence:"The concert was cancelled due to bad weathers.", errorWord:"weathers", errorWordIndex:7, correctWord:"weather", explanation_he:"weather הוא uncountable noun — אין לו רבים", difficulty:"hard" },
  { id:"gn-h07", sentence:"I am boring in this class.", errorWord:"boring", errorWordIndex:2, correctWord:"bored", explanation_he:"bored = מרגיש שעמום; boring = משעמם (תכונה של הדבר)", difficulty:"hard" },
  { id:"gn-h08", sentence:"Neither the students nor the teacher were absent.", errorWord:"were", errorWordIndex:6, correctWord:"was", explanation_he:"neither...nor: הפועל מסכים עם הנושא הקרוב (teacher = יחיד → was)", difficulty:"hard" },
  { id:"gn-h09", sentence:"The book was wrote by a famous author.", errorWord:"wrote", errorWordIndex:3, correctWord:"written", explanation_he:"פסיב: was + Past Participle. write → written (לא wrote)", difficulty:"hard" },
  { id:"gn-h10", sentence:"She is the most unique designer I know.", errorWord:"most", errorWordIndex:3, correctWord:"", explanation_he:"unique הוא תואר מוחלט — אין more/most unique, רק unique", difficulty:"hard" },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. ERROR HUNT — passages with hidden errors
// ─────────────────────────────────────────────────────────────────────────────

export interface EHWord {
  word: string;            // display text (may include punctuation)
  isError: boolean;
  correct?: string;        // replacement word
  explanation_he?: string;
}

export interface EHPassage {
  id: string;
  title: string;
  difficulty: GameDifficulty;
  words: EHWord[];
  errorCount: number;
}

/** Helper: parse a sentence where errors are wrapped in {wrong:correct:explanation} */
function buildPassage(
  id: string,
  title: string,
  difficulty: GameDifficulty,
  raw: string,
): EHPassage {
  const words: EHWord[] = [];
  const tokens = raw.trim().split(/\s+/);
  for (const tok of tokens) {
    // Pattern: {wrong:correct:explanation_he}  or  {wrong:correct:explanation_he}.
    const m = tok.match(/^\{([^:}]+):([^:}]*):([^}]+)\}([.,!?]*)$/);
    if (m) {
      words.push({
        word: m[1] + m[4],
        isError: true,
        correct: m[2] || "(delete)",
        explanation_he: m[3],
      });
    } else {
      words.push({ word: tok, isError: false });
    }
  }
  const errorCount = words.filter((w) => w.isError).length;
  return { id, title, difficulty, words, errorCount };
}

export const EH_PASSAGES: EHPassage[] = [
  buildPassage("eh-easy", "My Best Friend", "easy",
    `My best friend is {call:called:שם תואר אחרי is צריך past participle} Emma.
     She is twelve {year:years:אחרי מספר שם העצם צריך להיות ברבים} old
     and she {live:lives:גוף שלישי יחיד צריך s} in Tel Aviv.
     We meet every weekend and play together.
     She {have:has:גוף שלישי יחיד - has לא have} a dog
     named Max who is very friendly.
     Yesterday, we {goed:went:go הוא פועל לא-סדיר - עבר: went} to the beach
     and had a great time.`
  ),
  buildPassage("eh-medium", "Technology Today", "medium",
    `Technology has {change:changed:Present Perfect - has + past participle} our lives completely.
     People spend too much {times:time:time הוא uncountable noun} looking at their phones.
     Many of us {cannot:can} {imagining:imagine:can + base verb ללא -ing} life without the internet.
     Computers {has:have:computers הוא רבים - have לא has} become essential tools in schools.
     We should also take breaks and enjoy the real world {to:too:too = גם; to = אל}.
     After all, the best things in life are not found on a screen.`
  ),
  buildPassage("eh-hard", "Our Changing Planet", "hard",
    `Climate change is one of the most serious problems {what:that:relative pronoun אחרי problems = that} our planet faces today.
     The temperature of Earth has been {risen:rising:has been + V-ing (continuous)} significantly.
     This is mainly because of human activities such as burning fossil {fuel:fuels:fossil fuels - רבים} and cutting down forests.
     Scientists {says:say:scientists הוא רבים - say לא says} we must act now.
     Everyone must {taking:take:must + base verb} responsibility.
     We can all {making:make:can + base verb} a difference by {recycle:recycling:by + V-ing} more.
     The future of our planet {lays:lies:to lie somewhere = lies (לא lays)} in our hands.
     Together, we {is:are:we + are} stronger than any problem.`
  ),
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. SPEED TRANSLATION — Hebrew → English
// ─────────────────────────────────────────────────────────────────────────────

export interface STSentence {
  id: string;
  hebrew: string;
  english: string;   // model answer shown after self-assessment
  difficulty: GameDifficulty;
}

export const ST_SENTENCES: STSentence[] = [
  // ── EASY ──────────────────────────────────────────────────────────────────
  { id:"st-e01", hebrew:"הכלב שלי גדול וחברותי.", english:"My dog is big and friendly.", difficulty:"easy" },
  { id:"st-e02", hebrew:"אני אוהב לאכול פיצה.", english:"I love eating pizza.", difficulty:"easy" },
  { id:"st-e03", hebrew:"הספר נמצא על השולחן.", english:"The book is on the table.", difficulty:"easy" },
  { id:"st-e04", hebrew:"מה השעה עכשיו?", english:"What time is it now?", difficulty:"easy" },
  { id:"st-e05", hebrew:"יש לי שתי אחיות.", english:"I have two sisters.", difficulty:"easy" },
  { id:"st-e06", hebrew:"היא הולכת לבית הספר ברגל.", english:"She walks to school.", difficulty:"easy" },
  { id:"st-e07", hebrew:"האוכל היה טעים מאוד.", english:"The food was very tasty.", difficulty:"easy" },
  { id:"st-e08", hebrew:"הוא אוהב לשחק כדורגל.", english:"He likes playing football.", difficulty:"easy" },
  { id:"st-e09", hebrew:"אנחנו לומדים אנגלית.", english:"We are learning English.", difficulty:"easy" },
  { id:"st-e10", hebrew:"הם גרים בתל אביב.", english:"They live in Tel Aviv.", difficulty:"easy" },
  // ── MEDIUM ────────────────────────────────────────────────────────────────
  { id:"st-m01", hebrew:"אני לומד אנגלית כבר שלוש שנים.", english:"I have been studying English for three years.", difficulty:"medium" },
  { id:"st-m02", hebrew:"הוא ביקר בלונדון כשהיה ילד.", english:"He visited London when he was a child.", difficulty:"medium" },
  { id:"st-m03", hebrew:"אם מחר יהיה יפה, נלך לים.", english:"If the weather is nice tomorrow, we will go to the sea.", difficulty:"medium" },
  { id:"st-m04", hebrew:"היא הכי חכמה בכיתה שלה.", english:"She is the smartest in her class.", difficulty:"medium" },
  { id:"st-m05", hebrew:"כמה עולה כרטיס לקולנוע?", english:"How much does a cinema ticket cost?", difficulty:"medium" },
  { id:"st-m06", hebrew:"הסרט היה מעניין ומצחיק מאוד.", english:"The film was very interesting and funny.", difficulty:"medium" },
  { id:"st-m07", hebrew:"אתמול ירד גשם כל היום.", english:"It rained all day yesterday.", difficulty:"medium" },
  { id:"st-m08", hebrew:"היא רוצה ללמוד לנגן בגיטרה.", english:"She wants to learn to play the guitar.", difficulty:"medium" },
  { id:"st-m09", hebrew:"הם גרים בבניין גבוה מאוד.", english:"They live in a very tall building.", difficulty:"medium" },
  { id:"st-m10", hebrew:"בבקשה עזור לי עם השיעורים.", english:"Please help me with the homework.", difficulty:"medium" },
  // ── HARD ──────────────────────────────────────────────────────────────────
  { id:"st-h01", hebrew:"אילו היה לי יותר זמן, הייתי קורא יותר ספרים.", english:"If I had more time, I would read more books.", difficulty:"hard" },
  { id:"st-h02", hebrew:"עד שהגענו, הסרט כבר התחיל.", english:"By the time we arrived, the film had already started.", difficulty:"hard" },
  { id:"st-h03", hebrew:"הספר הזה נכתב על ידי סופר מפורסם.", english:"This book was written by a famous author.", difficulty:"hard" },
  { id:"st-h04", hebrew:"למרות שהיה קר, יצאנו לטייל.", english:"Although it was cold, we went for a walk.", difficulty:"hard" },
  { id:"st-h05", hebrew:"הוא מגדיר את עצמו כאדם עצמאי.", english:"He describes himself as an independent person.", difficulty:"hard" },
  { id:"st-h06", hebrew:"הממשלה הכריזה על תוכניות חדשות.", english:"The government announced new plans.", difficulty:"hard" },
  { id:"st-h07", hebrew:"היא הצליחה להשיג את מטרותיה.", english:"She managed to achieve her goals.", difficulty:"hard" },
  { id:"st-h08", hebrew:"לא ידעתי שהוא כבר הגיע.", english:"I didn't know he had already arrived.", difficulty:"hard" },
  { id:"st-h09", hebrew:"הסוד להצלחה הוא תרגול יומי.", english:"The secret to success is daily practice.", difficulty:"hard" },
  { id:"st-h10", hebrew:"זה הבניין הגבוה ביותר שראיתי אי פעם.", english:"This is the tallest building I have ever seen.", difficulty:"hard" },
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. CATEGORY CHALLENGE — word lists per category
// ─────────────────────────────────────────────────────────────────────────────

export interface CCCategory {
  id: string;
  name_he: string;
  name_en: string;
  icon: string;
  difficulty: GameDifficulty;
  basic: string[];      // 5 pts each
  advanced: string[];   // 10 pts each
}

export const CC_CATEGORIES: CCCategory[] = [
  // ── EASY ──────────────────────────────────────────────────────────────────
  {
    id:"cc-animals", name_he:"בעלי חיים", name_en:"Animals", icon:"🐾", difficulty:"easy",
    basic:["cat","dog","bird","fish","horse","cow","rabbit","elephant","tiger","lion","bear","snake","frog","bee","duck","monkey","sheep","pig","chicken","mouse","whale","dolphin","giraffe","zebra","penguin"],
    advanced:["predator","mammal","reptile","nocturnal","endangered","hibernate","carnivore","herbivore","amphibian","migration"],
  },
  {
    id:"cc-food", name_he:"אוכל ושתייה", name_en:"Food & Drinks", icon:"🍕", difficulty:"easy",
    basic:["bread","cake","rice","pasta","pizza","apple","banana","orange","milk","water","juice","salad","soup","sandwich","egg","cheese","chocolate","tomato","carrot","potato","coffee","tea","butter","yogurt","strawberry"],
    advanced:["nutritious","ingredient","cuisine","organic","protein","vitamin","calorie","seasoning","appetizer","beverage"],
  },
  {
    id:"cc-colors", name_he:"צבעים ואיכויות", name_en:"Colors & Qualities", icon:"🎨", difficulty:"easy",
    basic:["red","blue","green","yellow","pink","orange","purple","white","black","brown","grey","gold","silver","dark","light","bright","pale","shiny","thick","thin"],
    advanced:["crimson","turquoise","scarlet","violet","emerald","azure","maroon","beige","translucent","luminous"],
  },
  // ── MEDIUM ────────────────────────────────────────────────────────────────
  {
    id:"cc-sports", name_he:"ספורט", name_en:"Sports", icon:"⚽", difficulty:"medium",
    basic:["football","basketball","swimming","running","tennis","cycling","volleyball","boxing","skiing","gymnastics","golf","cricket","baseball","athletics","rowing","wrestling","surfing","hiking","climbing","yoga"],
    advanced:["tournament","championship","stamina","opponent","referee","spectator","tactics","endurance","qualification","sportsmanship"],
  },
  {
    id:"cc-technology", name_he:"טכנולוגיה", name_en:"Technology", icon:"💻", difficulty:"medium",
    basic:["computer","phone","internet","camera","keyboard","screen","robot","satellite","software","tablet","laptop","printer","battery","network","website","email","app","mouse","speaker","microphone"],
    advanced:["algorithm","processor","encryption","bandwidth","artificial","digital","cybersecurity","programming","interface","semiconductor"],
  },
  {
    id:"cc-nature", name_he:"טבע", name_en:"Nature", icon:"🌿", difficulty:"medium",
    basic:["tree","flower","mountain","river","ocean","cloud","rain","snow","wind","forest","desert","island","volcano","waterfall","lake","valley","cliff","beach","cave","earthquake"],
    advanced:["ecosystem","biodiversity","climate","atmosphere","erosion","sustainable","expedition","horizon","precipitation","geological"],
  },
  // ── HARD ──────────────────────────────────────────────────────────────────
  {
    id:"cc-emotions", name_he:"רגשות ומצבי רוח", name_en:"Emotions", icon:"💭", difficulty:"hard",
    basic:["happy","sad","angry","scared","excited","nervous","proud","surprised","confused","lonely","jealous","grateful","bored","calm","tired","worried","ashamed","hopeful","curious","disappointed"],
    advanced:["melancholy","euphoric","nostalgic","anxious","empathy","compassion","resilience","contentment","exhilarated","apprehensive"],
  },
  {
    id:"cc-professions", name_he:"מקצועות", name_en:"Professions", icon:"👔", difficulty:"hard",
    basic:["teacher","doctor","engineer","lawyer","chef","pilot","scientist","journalist","artist","programmer","nurse","architect","musician","police","firefighter","dentist","accountant","manager","designer","pharmacist"],
    advanced:["entrepreneur","psychiatrist","archaeologist","diplomat","veterinarian","neurologist","anthropologist","economist","statistician","microbiologist"],
  },
  {
    id:"cc-travel", name_he:"נסיעות ומקומות", name_en:"Travel", icon:"✈️", difficulty:"hard",
    basic:["hotel","airport","passport","ticket","map","suitcase","customs","tour","destination","guide","luggage","boarding","departure","arrival","reservation","currency","immigration","landmark","souvenir","adventure"],
    advanced:["itinerary","accommodation","excursion","expedition","expedition","hospitality","jurisdiction","hemisphere","intercontinental","multilingual"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 6. IDIOM MATCH — idiom ↔ Hebrew meaning pairs
// ─────────────────────────────────────────────────────────────────────────────

export interface IdiomPair {
  id: string;
  idiom: string;
  meaning_he: string;
  example: string;
  difficulty: GameDifficulty;
}

export const IDIOM_PAIRS: IdiomPair[] = [
  // ── EASY ──────────────────────────────────────────────────────────────────
  { id:"id-e1", idiom:"Break a leg!", meaning_he:"!בהצלחה", example:"You have a big test today? Break a leg!", difficulty:"easy" },
  { id:"id-e2", idiom:"It's raining cats and dogs.", meaning_he:"יורד גשם שוטף", example:"Don't go outside — it's raining cats and dogs!", difficulty:"easy" },
  { id:"id-e3", idiom:"Hit the nail on the head.", meaning_he:"לפגוע בדיוק בנקודה", example:"You hit the nail on the head — that's exactly the problem.", difficulty:"easy" },
  { id:"id-e4", idiom:"Cost an arm and a leg.", meaning_he:"לעלות הון תועפות", example:"That new phone costs an arm and a leg!", difficulty:"easy" },
  { id:"id-e5", idiom:"Under the weather.", meaning_he:"לא מרגיש טוב / חולה קצת", example:"I'm feeling a bit under the weather today.", difficulty:"easy" },
  // ── MEDIUM ────────────────────────────────────────────────────────────────
  { id:"id-m1", idiom:"Burn the midnight oil.", meaning_he:"לעבוד/ללמוד עד שעות הלילה", example:"She burned the midnight oil to finish her project.", difficulty:"medium" },
  { id:"id-m2", idiom:"Let the cat out of the bag.", meaning_he:"לגלות סוד בטעות", example:"He let the cat out of the bag about the surprise party.", difficulty:"medium" },
  { id:"id-m3", idiom:"Pull someone's leg.", meaning_he:"לצחוק על מישהו / לשקר בבדיחה", example:"Are you serious? Or are you pulling my leg?", difficulty:"medium" },
  { id:"id-m4", idiom:"The ball is in your court.", meaning_he:"ההחלטה בידיים שלך", example:"I've said what I think — the ball is in your court now.", difficulty:"medium" },
  { id:"id-m5", idiom:"Bite the bullet.", meaning_he:"להתמודד עם משהו קשה בצורה אמיצה", example:"It was painful but I bit the bullet and went to the dentist.", difficulty:"medium" },
  // ── HARD ──────────────────────────────────────────────────────────────────
  { id:"id-h1", idiom:"Bite off more than you can chew.", meaning_he:"לקחת על עצמך יותר ממה שאתה מסוגל להתמודד איתו", example:"Don't bite off more than you can chew with five projects at once.", difficulty:"hard" },
  { id:"id-h2", idiom:"Cut to the chase.", meaning_he:"להגיע לעניין ישירות ובלי הקדמות", example:"OK, let's cut to the chase — what do you really want?", difficulty:"hard" },
  { id:"id-h3", idiom:"Once in a blue moon.", meaning_he:"לעיתים נדירות מאוד", example:"He only calls once in a blue moon.", difficulty:"hard" },
  { id:"id-h4", idiom:"The best of both worlds.", meaning_he:"ליהנות משני העולמות", example:"Working from home gives her the best of both worlds.", difficulty:"hard" },
  { id:"id-h5", idiom:"A blessing in disguise.", meaning_he:"מזל בתחפושת — דבר רע שמתגלה כטוב", example:"Losing that job was a blessing in disguise — she found a better one.", difficulty:"hard" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Metadata for hub page
// ─────────────────────────────────────────────────────────────────────────────

export interface GameMeta {
  id: string;
  title_he: string;
  desc_he: string;
  icon: string;
  color: string;
  path: string;
  maxXP: number;
}

export const GAMES: GameMeta[] = [
  { id:"word-race",          title_he:"מרוץ אסוציאציות",  desc_he:"קשר 10 מילים תוך 5 שניות כל אחת",    icon:"⚡", color:"from-yellow-400 to-amber-500",   path:"/advanced-games/word-race",          maxXP:100 },
  { id:"grammar-ninja",      title_he:"נינג'ה דקדוק",      desc_he:"מצא ולחץ על השגיאה במשפט",           icon:"🥷", color:"from-red-500 to-rose-600",         path:"/advanced-games/grammar-ninja",      maxXP:120 },
  { id:"error-hunt",         title_he:"ציד שגיאות",         desc_he:"מצא את כל השגיאות בטקסט תוך 2 דקות", icon:"🔍", color:"from-purple-500 to-violet-600",   path:"/advanced-games/error-hunt",         maxXP:130 },
  { id:"speed-translation",  title_he:"תרגום מהיר",         desc_he:"תרגם 10 משפטים מעברית לאנגלית",      icon:"🚀", color:"from-blue-500 to-indigo-600",      path:"/advanced-games/speed-translation",  maxXP:120 },
  { id:"category-challenge", title_he:"אתגר קטגוריות",      desc_he:"כתוב 8 מילים מהקטגוריה תוך 60 שניות",icon:"📂", color:"from-emerald-500 to-teal-600",    path:"/advanced-games/category-challenge", maxXP:100 },
  { id:"idiom-match",        title_he:"התאמת ביטויים",       desc_he:"התאם ביטויים למשמעויות שלהם",         icon:"🎯", color:"from-pink-500 to-fuchsia-600",    path:"/advanced-games/idiom-match",        maxXP:110 },
];
