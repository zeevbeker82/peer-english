/**
 * Advanced Reading — B1 level (gifted 6th graders)
 * 15 texts × 5 categories: opinion, story, science, biography, culture
 * Each text: 150-200 words · 8 comprehension questions · 8 vocab words · writing prompt
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AdvReadingCat =
  | "opinion"
  | "story"
  | "science"
  | "biography"
  | "culture";

export interface AdvReadingVocab {
  word: string;
  he: string;
}

export type QuestionType = "fact" | "inference" | "critical";

export interface AdvReadingQuestion {
  q: string;
  type: QuestionType;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
}

export interface AdvReadingText {
  id: string;
  cat: AdvReadingCat;
  icon: string;
  title: string;
  body: string;
  vocab: AdvReadingVocab[];
  questions: AdvReadingQuestion[];
  writing_prompt: string;
}

export const ADV_READING_CAT_META: Record<AdvReadingCat, {
  label_he: string; icon: string; color: string;
}> = {
  opinion:   { label_he: "מאמרי דעה",           icon: "💬", color: "from-blue-500 to-indigo-600" },
  story:     { label_he: "סיפורים עם מסר",       icon: "📖", color: "from-rose-500 to-pink-600" },
  science:   { label_he: "מדע פופולרי",          icon: "🔬", color: "from-teal-500 to-cyan-600" },
  biography: { label_he: "ביוגרפיות",            icon: "⭐", color: "from-amber-500 to-orange-500" },
  culture:   { label_he: "השוואה בין תרבויות",   icon: "🌍", color: "from-emerald-500 to-green-600" },
};

export const ADV_READING_XP = {
  per_correct: 8,
  complete: 20,
  perfect: 30,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────────────────────────

type V = [string, string];
type Q = [string, QuestionType, [string, string, string, string], 0 | 1 | 2 | 3];

function mk(
  id: string, cat: AdvReadingCat, icon: string, title: string, body: string,
  vocab: V[], questions: Q[], writing_prompt: string
): AdvReadingText {
  return {
    id, cat, icon, title, body,
    vocab: vocab.map(([word, he]) => ({ word, he })),
    questions: questions.map(([q, type, options, answer]) => ({ q, type, options, answer })),
    writing_prompt,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// TEXTS
// ─────────────────────────────────────────────────────────────────────────────

export const ADV_READING_TEXTS: AdvReadingText[] = [

  // ── OPINION ─────────────────────────────────────────────────────────────────

  mk("op-01", "opinion", "📚", "Should Homework Be Banned?",
    `Every evening, millions of students around the world sit at their desks, struggling with piles of homework. Some people believe homework is essential for learning. Others argue that it causes unnecessary stress and takes time away from family, hobbies, and rest.\n\nSupporters of homework claim it helps students review what they learned in school, develop responsibility, and prepare for exams. They say that practising at home reinforces skills and builds strong study habits.\n\nHowever, critics point out that research shows homework does not always improve academic performance, especially for younger students. Too much homework can lead to exhaustion, anxiety, and even a dislike of learning. Finland, one of the world's top-performing countries in education, assigns very little homework — yet its students achieve outstanding results.\n\nPerhaps the solution lies somewhere in between. Homework should be meaningful, short, and connected to real life. Quality matters more than quantity. Students learn best when they are rested, curious, and motivated — not overwhelmed and exhausted.\n\nWhat do you think — should homework be reduced, eliminated, or kept as it is?`,
    [
      ["essential",    "חיוני"],
      ["reinforce",    "לחזק"],
      ["exhaustion",   "תשישות"],
      ["anxiety",      "חרדה"],
      ["performance",  "ביצועים"],
      ["eliminate",    "לבטל / להסיר"],
      ["meaningful",   "בעל משמעות"],
      ["motivated",    "בעל מוטיבציה"],
    ],
    [
      ["What do supporters of homework claim?",                      "fact",      ["It wastes time and causes stress","It helps students review and prepare for exams","It should be banned immediately","It hurts family relationships"],                         1],
      ["Which country assigns very little homework yet performs well?","fact",     ["Japan","Germany","Finland","Australia"],                                                                                                                                      2],
      ["What can too much homework lead to?",                        "fact",      ["Better grades and confidence","Stronger family bonds","Exhaustion, anxiety and a dislike of learning","Extra free time"],                                                   2],
      ["What does the author most likely believe?",                  "critical",  ["All homework should be banned","More homework means better results","Short, meaningful homework is better than lots of homework","Students should decide on homework"],       2],
      ["What does 'quality matters more than quantity' mean?",       "critical",  ["Good homework is more important than lots of homework","More homework always leads to better learning","Food quality is important","Longer homework is always better"],        0],
      ["When do students learn best, according to the author?",      "fact",      ["When they are overwhelmed and challenged","When they are rested, curious, and motivated","When they have three hours of homework","When teachers give many exercises"],       1],
      ["Why does the author mention Finland?",                       "inference", ["To prove Finland is the best country","To show less homework can still lead to excellent results","To argue Finnish teachers are better","To suggest travel to Finland"],     1],
      ["Which would the author most likely support?",                "critical",  ["Three hours of homework every night","Short and meaningful homework assignments","No homework at all, ever","Only math homework"],                                           1],
    ],
    "Do you think homework helps you learn? Write 3–5 sentences sharing your opinion and explaining why."
  ),

  mk("op-02", "opinion", "📱", "Are Smartphones Making Us Smarter or Dumber?",
    `Smartphones have become an essential part of modern life. With just a few taps, we can find information, communicate with friends, and learn new skills. But are these powerful devices actually making us smarter — or are they harming our ability to think deeply?\n\nThose who believe smartphones make us smarter argue that instant access to information is a great advantage. We can look up any fact, translate languages, solve maths problems, and watch educational videos. These tools help us learn faster and more efficiently than ever before.\n\nOn the other hand, critics warn that constant phone use weakens our memory, shortens our attention span, and reduces our ability to focus. When we always rely on Google for answers, we stop exercising our own brains. Some studies suggest that heavy social media use is linked to increased anxiety and reduced concentration.\n\nThe key might be balance. Smartphones can be powerful tools for learning — but only if we use them wisely. Technology should serve us, not control us.\n\nSo, are you in control of your phone, or is your phone in control of you?`,
    [
      ["essential",      "חיוני / בסיסי"],
      ["efficiently",    "ביעילות"],
      ["concentration",  "ריכוז"],
      ["attention span", "טווח קשב"],
      ["rely",           "להסתמך"],
      ["linked",         "קשור"],
      ["wisely",         "בחוכמה"],
      ["balance",        "איזון"],
    ],
    [
      ["What can you do with a smartphone according to the text?",         "fact",      ["Only make phone calls","Find information, communicate, and learn new skills","Only play games","Only listen to music"],                                                    1],
      ["What do critics say about constant phone use?",                   "fact",      ["It improves our memory","It helps us sleep better","It weakens memory and shortens attention span","It makes us more creative"],                                          2],
      ["What does 'exercising our brains' mean in this context?",         "inference", ["Going to the gym","Thinking and solving problems ourselves","Sleeping more","Watching more videos"],                                                                       1],
      ["What is the author's main message?",                              "critical",  ["Smartphones should be banned from schools","Smartphones are perfect learning tools","Balance and wise use of smartphones is what matters","Social media has no dangers"], 2],
      ["What does 'instant access to information' mean?",                 "inference", ["Information is hard to find","You can get information immediately","Books are better","You need a library card"],                                                         1],
      ["Why does the author end with a question about control?",          "critical",  ["To sell smartphones","To make readers think about their own phone habits","Because phones can feel pain","To prove phones are dangerous"],                                 1],
      ["Which phrase means 'using technology sensibly and thoughtfully'?", "inference", ["Instant access","Attention span","Using them wisely","Linked to"],                                                                                                        2],
      ["What does heavy social media use lead to, according to the text?","fact",      ["Better concentration","Improved memory","Increased anxiety and reduced concentration","Greater creativity"],                                                               2],
    ],
    "Do you think smartphones help or hurt students? Write 3–5 sentences with your opinion and at least one example."
  ),

  mk("op-03", "opinion", "👨‍👩‍👧", "Should Kids Have a Say in Family Decisions?",
    `Every family makes many decisions together — where to go on holiday, what food to buy, and how to spend weekends. But how much influence should children actually have? Should kids have a real say in family decisions, or should parents always have the final word?\n\nMany psychologists believe that including children in family discussions has important benefits. It helps them develop critical thinking skills, teaches them responsibility, and makes them feel respected and valued. When children feel heard, they are more likely to cooperate and less likely to misbehave.\n\nHowever, some parents argue that adults have more experience and wisdom, and that too much child input can lead to confusion and conflict. Young children, in particular, might not fully understand the consequences of certain decisions.\n\nA balanced approach seems to work best. Children can and should share their opinions, but parents should make the final decisions — especially on serious matters. The goal is to raise confident, independent thinkers while maintaining a safe and stable family environment.\n\nWhat types of decisions do you think children should be involved in?`,
    [
      ["influence",         "השפעה"],
      ["psychologist",      "פסיכולוג"],
      ["critical thinking", "חשיבה ביקורתית"],
      ["responsibility",    "אחריות"],
      ["cooperate",         "לשתף פעולה"],
      ["consequences",      "תוצאות / השלכות"],
      ["stable",            "יציב"],
      ["balanced",          "מאוזן"],
    ],
    [
      ["What do psychologists say about including children in decisions?",      "fact",      ["It confuses children","It has important benefits for development","It harms family relationships","It wastes time"],                                             1],
      ["According to the text, what happens when children feel heard?",         "fact",      ["They make bad decisions","They argue more","They cooperate more and misbehave less","They become too independent"],                                              2],
      ["What does 'misbehave' most likely mean?",                               "inference", ["Behave perfectly","Behave well at all times","Act badly or cause trouble","Listen carefully"],                                                                   2],
      ["What balanced approach does the author suggest?",                       "critical",  ["Only parents decide everything","Only children decide","Children share opinions but parents make final decisions on serious matters","Families vote equally"],    2],
      ["Why do some parents say children shouldn't always decide?",             "fact",      ["Children are not intelligent","Adults have more experience and wisdom","Children don't care about decisions","Family decisions are unimportant"],                1],
      ["What is a family decision mentioned in the text?",                      "fact",      ["Which school to attend","How to save money","Where to go on holiday","Which job to take"],                                                                      2],
      ["What does 'raise confident, independent thinkers' mean?",               "critical",  ["Train children to compete","Help children learn to think for themselves","Make children always obey","Ignore children's ideas"],                                 1],
      ["Which word best describes the author's suggested approach?",            "critical",  ["Strict","Balanced","Extreme","Confused"],                                                                                                                        1],
    ],
    "Name two family decisions where you think kids should have a say. Why are these decisions important to you?"
  ),

  // ── STORIES ─────────────────────────────────────────────────────────────────

  mk("st-01", "story", "💛", "The Gift of Kindness",
    `Maya was a quiet girl who never drew attention to herself. Every day at school, she sat alone at lunch, reading her book while other kids laughed and talked around her.\n\nOne cold Tuesday, the new student arrived — a boy named Daniel. He looked nervous and lost, clutching his bag tightly as he entered the noisy cafeteria. Every table seemed full. No one invited him to sit.\n\nMaya noticed. Without hesitation, she closed her book, smiled, and waved him over.\n\n"There's room here," she said simply.\n\nDaniel's face changed immediately — relief, gratitude, and the beginning of a smile. They talked all through lunch. He told her about his old city; she told him about her favourite books. By the time the bell rang, they had discovered they both loved astronomy and mystery stories.\n\nThat Tuesday, Maya gave Daniel something that cost her nothing but meant everything to him: the gift of belonging.\n\nAnd something unexpected happened too — Maya never sat alone at lunch again.`,
    [
      ["hesitation",  "היסוס"],
      ["clutching",   "אוחז בחוזקה"],
      ["gratitude",   "הכרת תודה"],
      ["relief",      "הקלה"],
      ["astronomy",   "אסטרונומיה"],
      ["belonging",   "שייכות"],
      ["noticed",     "שם לב"],
      ["unexpected",  "בלתי צפוי"],
    ],
    [
      ["Where did Maya usually eat her lunch?",                                      "fact",      ["With a large group of friends","Alone, reading a book","At the teacher's table","In the library"],                                                            1],
      ["What was Daniel doing when he arrived at the cafeteria?",                   "fact",      ["Laughing with classmates","Clutching his bag nervously and looking lost","Looking for the teacher","Reading a book"],                                         1],
      ["Why did Daniel look 'nervous and lost'?",                                   "inference", ["He was ill","He was new and didn't know anyone","He forgot his lunch","He was tired"],                                                                        1],
      ["What did Maya and Daniel discover they had in common?",                     "fact",      ["The same favourite teacher","The same hometown","Love of astronomy and mystery stories","The same lunch"],                                                    2],
      ["What does 'the gift of belonging' mean?",                                   "inference", ["An expensive birthday present","The feeling of being welcomed and accepted","A book about stars","A gift from a teacher"],                                    1],
      ["What is the main message of this story?",                                   "critical",  ["Reading books alone is the best hobby","Small acts of kindness can change someone's day","New students should stay quiet","Lunchtime is not important"],      1],
      ["What happened to Maya after that Tuesday?",                                 "inference", ["She started sitting alone again","She moved to another school","She made a friend and was no longer alone at lunch","She gave up reading"],                  2],
      ["'It cost her nothing but meant everything to him' — what does this tell us?","critical",  ["The gift was very expensive","A small effort by Maya was hugely important to Daniel","Daniel didn't appreciate Maya","They shared the cost"],                1],
    ],
    "Write about a time when someone was kind to you, or when you were kind to someone. How did it feel?"
  ),

  mk("st-02", "story", "🎹", "The Day I Learned to Fail",
    `I practised for weeks. Every evening after dinner, I would sit at the piano and play the same piece again and again, convinced I was ready.\n\nThe day of the school recital arrived. I walked onto the stage, sat at the shining black piano, and placed my fingers on the keys. The hall was silent. I took a deep breath.\n\nAnd then — my mind went completely blank.\n\nI fumbled through the first line, lost my place, stopped, started again, and finally played a broken, embarrassing version of what should have been my best performance. When I finished, there was polite applause. I walked off stage, my face burning and my eyes filled with tears.\n\nMy music teacher found me backstage. I expected her to be disappointed. Instead, she said something I have never forgotten:\n\n"Failure is not the end of the road — it is the beginning of real learning."\n\nThat evening, I practised harder than ever before. And three months later, I performed flawlessly at the spring concert.\n\nFailing that day was the best thing that ever happened to my music.`,
    [
      ["recital",       "הופעה מוסיקלית"],
      ["convinced",     "משוכנע"],
      ["fumbled",       "גמגם / נבלבל"],
      ["embarrassing",  "מביך"],
      ["backstage",     "מאחורי הקלעים"],
      ["applause",      "מחיאות כפיים"],
      ["flawlessly",    "ללא פגמים / בצורה מושלמת"],
      ["failure",       "כישלון"],
    ],
    [
      ["What did the narrator do every evening to prepare?",                     "fact",      ["Read music books","Practised the piano","Slept early","Watched music videos"],                                                                                 1],
      ["What happened when the narrator began playing at the recital?",          "fact",      ["They played the piece perfectly","They forgot the music and made mistakes","The piano broke","The audience walked out"],                                        1],
      ["What does 'my mind went blank' mean?",                                  "inference", ["The stage lights went off","Everything was suddenly forgotten","The narrator became happy","The narrator fell asleep"],                                          1],
      ["What did the music teacher say to the narrator?",                        "fact",      ["'You should give up music'","'Failure is the beginning of real learning'","'You played beautifully'","'You need a new teacher'"],                              1],
      ["What is the main message of this story?",                                "critical",  ["Never perform in public","Failure is shameful","Failure can be a stepping stone to success","Music is too difficult for most people"],                          2],
      ["Why were the narrator's eyes filled with tears?",                        "inference", ["The lights were too bright","They felt embarrassed and very disappointed","They were happy","They were bored"],                                                 1],
      ["What happened three months after the failed recital?",                   "fact",      ["The narrator quit music","The narrator performed flawlessly at the spring concert","The teacher was replaced","The narrator forgot the piece again"],          1],
      ["Why does the narrator call the failure 'the best thing that ever happened'?","critical",["Failing was enjoyable","The failure pushed them to work harder and ultimately succeed","The audience loved it","The teacher was kind afterwards"],             1],
    ],
    "Describe a time when you failed at something. What did you learn from that experience?"
  ),

  mk("st-03", "story", "🤝", "True Friends",
    `"I don't need anyone," Lucas always said. He was the fastest runner in his year, the best at maths, and he preferred to work alone. Friendships, he believed, were just distractions.\n\nThen one October morning, Lucas fell during football practice and broke his ankle. The doctor said six weeks — no running, no sports, just rest.\n\nFor the first time in his life, Lucas was completely still.\n\nOn his first day back at school, he expected everyone to ignore him. But Amir saved him a seat in every lesson. Sofia brought him the notes he had missed. Even Tom, whom Lucas had always brushed aside, came to his house after school with homework and video games.\n\nAs his ankle slowly healed, Lucas realised something that had been invisible to him before: his classmates had been trying to be his friends all along — and he had been too busy to notice.\n\nWhen his cast finally came off, Lucas ran back to class — not to be the fastest, but because he couldn't wait to be with them.`,
    [
      ["distraction",  "הסחת דעת"],
      ["ankle",        "קרסול"],
      ["heal",         "להחלים"],
      ["brushed aside","התעלם מ-"],
      ["invisible",    "בלתי נראה"],
      ["prefer",       "להעדיף"],
      ["realise",      "להבין / לגלות"],
      ["cast",         "גבס"],
    ],
    [
      ["What was Lucas known for being good at?",                                 "fact",      ["Singing and art","Running and maths","Swimming and cooking","Drawing and writing"],                                                                            1],
      ["Why couldn't Lucas do sport for six weeks?",                              "fact",      ["He was ill with flu","He broke his ankle in football practice","He moved school","He lost his trainers"],                                                       1],
      ["Who brought Lucas the class notes he had missed?",                        "fact",      ["Tom","Amir","Sofia","The teacher"],                                                                                                                             2],
      ["What does 'brushed aside' most likely mean?",                             "inference", ["Cleaned with a brush","Ignored or treated as unimportant","Pushed physically","Disagreed with angrily"],                                                       1],
      ["What important lesson does Lucas learn?",                                 "critical",  ["Running is more important than friends","Sport should always come first","True friendship had been around him all along","Broken ankles are very common"],       2],
      ["Why does Lucas say he 'couldn't wait to be with them' at the end?",       "inference", ["He wanted to race them again","He had learned to truly value his friends","He was bored at home","He needed to collect homework"],                             1],
      ["What does the story suggest about being too focused on yourself?",        "critical",  ["It is always a good quality","You may miss the people around you who care","Sport builds strong character","Making friends wastes time"],                      1],
      ["At the end of the story, why does Lucas run back to class?",              "fact",      ["To show off his speed","To be with his friends","Because the teacher called him","To collect his bag"],                                                         1],
    ],
    "What do you think makes someone a true friend? Write 3–5 sentences with examples from your own life."
  ),

  mk("st-04", "story", "🌟", "When Being Different Is a Superpower",
    `Jada always felt out of place. While her classmates discussed football and popular TV shows, she loved ancient history, built elaborate LEGO cities, and could name every country in Africa.\n\n"You're so weird," some kids would say. Jada would smile and say nothing.\n\nOne morning, her geography teacher announced a school quiz competition — a test on world capitals and flags. The prize was a trip to a real history museum.\n\nJada's hand shot up before the teacher finished speaking.\n\nShe spent a week preparing — not just memorising answers, but drawing maps, building timelines on her bedroom wall, and creating colour-coded flashcards. On competition day, Jada answered every question correctly. When the teacher announced her name as the winner, her classmates cheered.\n\nAfterwards, the same kids who had called her weird came to ask how she knew so much. Jada explained patiently, and soon she was running small study sessions during lunch breaks.\n\nWhat had felt like her biggest weakness had become her greatest strength.\n\nDifferent isn't wrong. Different is extraordinary.`,
    [
      ["elaborate",      "מורכב / מפורט"],
      ["announce",       "להודיע"],
      ["memorise",       "לשנן / לזכור בעל פה"],
      ["competition",    "תחרות"],
      ["extraordinary",  "יוצא מן הכלל"],
      ["weakness",       "חולשה"],
      ["timeline",       "ציר זמן"],
      ["geography",      "גאוגרפיה"],
    ],
    [
      ["What were Jada's special interests?",                                     "fact",      ["Football and popular TV shows","Ancient history, LEGO, and world capitals","Music and fashion","Cooking and science"],                                         1],
      ["What was the prize for the school quiz competition?",                     "fact",      ["A new LEGO set","A trip to a real history museum","Extra time off school","A certificate"],                                                                   1],
      ["Why did Jada's hand 'shoot up' before the teacher finished?",             "inference", ["She was nervous","She was extremely excited and eager to enter","She didn't understand the question","She wanted to leave"],                                   1],
      ["How did Jada prepare for the competition?",                               "fact",      ["She read one textbook","She drew maps, built timelines, and created colour-coded flashcards","She asked her teacher for the answers","She watched TV"],        1],
      ["What is the main message of this story?",                                 "critical",  ["Being popular is more important than knowledge","Being different can become your greatest strength","Geography is the most important subject","Competition is unfair"],1],
      ["What changed after Jada won the competition?",                            "inference", ["She became lonely","The classmates who mocked her now wanted to learn from her","She moved to a new school","She gave up her hobbies"],                        1],
      ["'Her biggest weakness became her greatest strength' — what does this mean?","critical", ["A weakness disappeared magically","The quality others mocked turned out to be her best quality","She became physically strong","Strength is always visible"],  1],
      ["What does the final line 'Different is extraordinary' express?",          "critical",  ["Everyone should be the same","Being unique is something to be proud of","Being different is always wrong","Weird people are rare"],                           1],
    ],
    "Describe something you love or are good at that makes you different from others. Why do you consider it special?"
  ),

  // ── SCIENCE ─────────────────────────────────────────────────────────────────

  mk("sc-01", "science", "🐝", "How Do Animals Communicate?",
    `When we think of communication, we usually think of words and sentences. But animals have developed fascinating ways to share information — without using a single word.\n\nBees perform an elaborate dance called the "waggle dance" to tell other bees exactly where to find flowers. The direction and duration of the dance indicate the location and distance of food. It is a precise, efficient language built entirely from movement.\n\nDolphins communicate using a complex system of clicks, whistles, and body movements. Each dolphin has a unique "signature whistle" — similar to a name — that it uses to identify itself to others in the group.\n\nElephants can communicate over long distances using low-frequency sounds called infrasound. These sounds travel through the ground and can be felt, not just heard, by other elephants far away.\n\nEven plants communicate — by releasing chemicals into the air when they are attacked by insects, warning nearby plants to strengthen their defences.\n\nCommunication in nature is everywhere. The more we study it, the more we realise how much we still have to learn.`,
    [
      ["fascinating",   "מרתק"],
      ["waggle dance",  "ריקוד הנדנדה (של דבורים)"],
      ["precise",       "מדויק"],
      ["infrasound",    "קול תת-קולי"],
      ["signature",     "ייחודי / חתימה"],
      ["duration",      "משך זמן"],
      ["defence",       "הגנה"],
      ["frequency",     "תדר"],
    ],
    [
      ["How do bees communicate where to find flowers?",                          "fact",      ["By making loud buzzing sounds","By performing a waggle dance","By using different colours","By leaving a trail of pollen"],                                    1],
      ["What is a dolphin's 'signature whistle'?",                               "fact",      ["A type of dance","A unique sound that works like a name","A type of food call","A warning signal"],                                                            1],
      ["How do elephants communicate over very long distances?",                  "fact",      ["By calling very loudly","Using low-frequency infrasound that travels through the ground","By sending scouts","By using colour signals"],                       1],
      ["What does 'without using a single word' emphasise?",                     "inference", ["Animals cannot communicate","Animals have their own complex communication systems","Words are the only real communication","Animals are silent creatures"],      1],
      ["What does the author mean by 'how much we still have to learn'?",        "critical",  ["Scientists are bad at their work","Nature is so complex that we keep discovering new things","Animals know more than us","We should stop studying nature"],    1],
      ["How do plants warn each other when under attack?",                        "fact",      ["By moving their leaves","By releasing chemicals into the air","By making sounds","By changing colour"],                                                        1],
      ["Why does each dolphin have a unique 'signature whistle'?",               "inference", ["Because they like music","To identify itself to others, like having a name","To scare predators away","To find food more easily"],                             1],
      ["Which title best describes this article?",                               "critical",  ["Why Animals Are Smarter Than Humans","Amazing Ways Animals and Plants Communicate","The Problem with Animal Language","Why Bees Are Special"],                 1],
    ],
    "Which animal communication system did you find most interesting? Explain why in 3–5 sentences."
  ),

  mk("sc-02", "science", "💤", "Why Do We Dream?",
    `Every night, as you sleep, your brain comes alive with images, emotions, and stories — dreams. But why do we dream? Scientists have been studying this question for centuries, and while we still do not have a definitive answer, there are several fascinating theories.\n\nOne popular theory suggests that dreams help us process emotions and memories. When we experience something stressful during the day, our brains may use dream-time to work through those feelings, helping us feel calmer the next morning.\n\nAnother theory suggests that dreaming is a kind of rehearsal. The brain practises difficult or frightening situations — such as falling, being chased, or sitting an exam — so that we are better prepared to handle them in real life.\n\nSome scientists believe dreams are simply the result of the brain sorting through information from the day, deciding what to remember and what to forget.\n\nMost people dream for about two hours every night, even if they remember nothing in the morning.\n\nOne thing is certain: dreams are a window into the mysterious and fascinating world of the sleeping mind.`,
    [
      ["definitive",   "מוחלט / סופי"],
      ["theory",       "תיאוריה"],
      ["process",      "לעבד"],
      ["rehearsal",    "חזרה / תרגול"],
      ["memories",     "זיכרונות"],
      ["stressful",    "מלחיץ"],
      ["mysterious",   "מסתורי"],
      ["certain",      "ודאי / בטוח"],
    ],
    [
      ["How long do most people dream each night, according to the text?",        "fact",      ["About 30 minutes","About two hours","Almost all night","Only a few minutes"],                                                                                  1],
      ["According to one theory, what do dreams help us do?",                    "fact",      ["Sleep for longer","Process our emotions and memories","Improve our physical health","Learn new languages"],                                                     1],
      ["What does the 'rehearsal theory' of dreams suggest?",                    "inference", ["Dreams are just entertainment","The brain practises difficult situations while we sleep","Rehearsals are boring","Dreams are random and meaningless"],          1],
      ["According to a third theory, what is the brain doing while we dream?",   "fact",      ["Completely resting","Sorting information and deciding what to remember","Creating brand new memories","Preparing to wake up"],                                 1],
      ["Why do scientists say there is no 'definitive answer' yet?",              "critical",  ["They haven't studied dreams","Dreams are too complex to fully explain","Scientists don't care about sleep","Dreams do not exist"],                             1],
      ["What does 'a window into the sleeping mind' mean?",                      "inference", ["There is a real window in your bedroom","Dreams show us how the brain works during sleep","Sleep is dangerous","Looking through windows helps sleep"],         1],
      ["Why might people remember nothing from their dreams?",                   "inference", ["Because they sleep too little","Because we naturally forget dreams after waking","Because they never dream","Because dreams are uninteresting"],               1],
      ["Which of these best matches the author's view of dreams?",               "critical",  ["Dreams are useless and random","Dreams serve important purposes, though we don't fully understand them yet","Only sick people dream","Dreams are always scary"],1],
    ],
    "Describe a dream you have had. What do you think it might have meant?"
  ),

  mk("sc-03", "science", "💻", "How Technology Is Changing Our Lives",
    `Twenty years ago, most people used paper maps to navigate, took photos on film cameras, and wrote letters that took days to arrive. Today, technology has transformed nearly every aspect of daily life — and continues to change at a breathtaking pace.\n\nSmartphones have put the world's knowledge into our pockets. We can learn anything, communicate with anyone, and access entertainment anywhere. Medical technology has allowed doctors to detect and treat diseases that were once considered incurable. Transportation has become faster, safer, and more comfortable than ever.\n\nIn education, digital tools have opened remarkable new possibilities. Students can attend virtual classrooms, access interactive lessons, and collaborate with peers across the globe. Children today learn coding and programming alongside reading and writing.\n\nYet technology brings serious challenges too. Privacy concerns, screen addiction, and the spread of false information are real problems of the digital age.\n\nThe key is to use technology as a tool — not a master. Those who think critically, adapt to change, and use technology wisely will thrive in the world of tomorrow.`,
    [
      ["transform",    "לשנות באופן מהותי"],
      ["breathtaking", "מרהיב / עוצר נשימה"],
      ["incurable",    "שאין לו תרופה"],
      ["virtual",      "וירטואלי"],
      ["collaborate",  "לשתף פעולה"],
      ["privacy",      "פרטיות"],
      ["addiction",    "התמכרות"],
      ["thrive",       "לשגשג / לפרוח"],
    ],
    [
      ["Name one way technology has changed daily life according to the text.",   "fact",      ["We write more letters than before","Smartphones give us access to knowledge anywhere","We use more film cameras","We travel less than before"],               1],
      ["What has medical technology helped doctors to do?",                      "fact",      ["Avoid working in hospitals","Detect and treat once-incurable diseases","Replace nurses with robots","Build faster cars"],                                       1],
      ["What do children learn today alongside reading and writing?",             "fact",      ["Ancient languages","Coding and programming","Cooking","History only"],                                                                                         1],
      ["What does 'put the world's knowledge into our pockets' mean?",           "inference", ["Carrying many heavy books","Smartphones give instant access to information","Pockets are bigger now","We know everything"],                                    1],
      ["What does 'technology should be a tool, not a master' mean?",            "critical",  ["Technology should control us","We should decide how and when we use technology","Tools are dangerous","Technology is too powerful to control"],                1],
      ["What three challenges of technology does the author mention?",            "fact",      ["Cost, size, and weight","Privacy concerns, screen addiction, and false information","Speed, memory, and battery","Schools, teachers, and textbooks"],         1],
      ["Why does the author say technology changes 'at a breathtaking pace'?",   "inference", ["Technology never changes","It changes incredibly fast","It only changed 20 years ago","It changes very slowly"],                                              1],
      ["Who does the author suggest will 'thrive in the world of tomorrow'?",    "critical",  ["Those who avoid all technology","Those who think critically and use technology wisely","Those who use the most apps","Those who ignore digital problems"],     1],
    ],
    "What do you think is the most important technology invented in the last 20 years? Why?"
  ),

  // ── BIOGRAPHIES ─────────────────────────────────────────────────────────────

  mk("bi-01", "biography", "🧪", "Albert Einstein: The Kid Who Asked Questions",
    `Albert Einstein was born in Germany in 1879. As a young boy, he was curious, quiet, and often lost in thought. He was fascinated by a compass his father gave him — he couldn't understand why the needle always pointed north. That mystery set him on a lifetime of asking "why."\n\nEinstein was not a typical genius child. He was slow to speak, struggled in some school subjects, and failed his university entrance exam on the first attempt. But he never gave up.\n\nAt 26, while working in a patent office, Einstein published four groundbreaking scientific papers in a single year. One contained his famous equation: E = mc². He had discovered how matter and energy are connected — changing physics forever.\n\nEinstein later said, "Imagination is more important than knowledge." He believed that asking the right questions was more valuable than memorising facts.\n\nEinstein proved that intelligence is not about being perfect. It is about staying curious, working persistently, and never stopping to wonder.\n\nHe changed the way we understand the universe — and he started with a simple childhood compass.`,
    [
      ["fascinated",    "מוקסם / מרותק"],
      ["compass",       "מצפן"],
      ["groundbreaking","פורץ דרך"],
      ["equation",      "משוואה"],
      ["matter",        "חומר (פיזיקה)"],
      ["persistently",  "בהתמדה"],
      ["patent office", "לשכת פטנטים"],
      ["universe",      "יקום"],
    ],
    [
      ["What object made young Einstein curious about science?",                  "fact",      ["A telescope his uncle gave him","A compass his father gave him","A book about stars","A clock on the wall"],                                                  1],
      ["How old was Einstein when he published his four groundbreaking papers?",  "fact",      ["16","26","46","36"],                                                                                                                                           1],
      ["What famous equation did Einstein develop?",                              "fact",      ["A + B = C","E = mc²","F = ma","π ≈ 3.14"],                                                                                                                     1],
      ["What does 'lost in thought' most likely mean?",                          "inference", ["He couldn't find his way home","He was deeply thinking about something","He was falling asleep","He was bored in class"],                                     1],
      ["Where was Einstein working when he published his famous papers?",         "fact",      ["A university laboratory","A patent office","His own school","A hospital"],                                                                                    1],
      ["What do you think Einstein meant by 'Imagination is more important than knowledge'?","critical",["Learning facts is pointless","Thinking creatively and asking new questions is more valuable than memorising","Schools are not needed","Science is unimportant"],1],
      ["Why does the author mention that Einstein failed his university entrance exam?","inference",["To show he wasn't intelligent","To prove early failure doesn't prevent future success","To criticise universities","To show exams don't matter"],             1],
      ["What can we learn from Einstein's story?",                               "critical",  ["You must be a perfect student from the start","Curiosity, persistence, and imagination matter more than perfection","Physics is the only important subject","Working in an office is a waste of talent"],1],
    ],
    "Einstein said, 'Imagination is more important than knowledge.' Do you agree? Explain your view in 3–5 sentences."
  ),

  mk("bi-02", "biography", "📚", "Malala Yousafzai: Fighting for Education",
    `Malala Yousafzai was born in 1997 in the Swat Valley of Pakistan, in a region where girls were eventually forbidden from attending school. Her father, a passionate teacher himself, encouraged her to speak out. From a young age, Malala wrote a blog for the BBC describing life under the Taliban — the extremist group that had banned girls' education.\n\nIn October 2012, when Malala was 15, a gunman boarded her school bus and shot her in the head. The attack shocked the world. After months of surgery and recovery in the United Kingdom, Malala did not give up. She returned to school, continued her advocacy, and founded the Malala Fund — an organisation dedicated to giving every girl twelve years of quality education.\n\nIn 2014, at just 17 years old, Malala became the youngest person ever to receive the Nobel Peace Prize.\n\nHer message is simple and powerful: "One child, one teacher, one book, one pen can change the world."\n\nMalala proved that even one brave voice can stand against injustice — and win.`,
    [
      ["forbidden",          "אסור"],
      ["extremist",          "קיצוני"],
      ["advocacy",           "סנגור / פעולה למען"],
      ["dedicated",          "מוקדש"],
      ["injustice",          "עוול / אי-צדק"],
      ["passionate",         "נלהב"],
      ["recovery",           "החלמה"],
      ["Nobel Peace Prize",  "פרס נובל לשלום"],
    ],
    [
      ["Where was Malala born?",                                                  "fact",      ["India","Pakistan","Afghanistan","Iraq"],                                                                                                                        1],
      ["What did Malala do as a young girl?",                                    "fact",      ["She ran a school for girls","She wrote a blog about life under the Taliban","She became a doctor","She moved to London"],                                      1],
      ["How old was Malala when she was shot?",                                  "fact",      ["12","15","17","20"],                                                                                                                                            1],
      ["What did Malala found after her recovery?",                              "fact",      ["A hospital","The Malala Fund for girls' education","A newspaper","A political party"],                                                                        1],
      ["Why does the text describe Malala's father as 'passionate'?",            "inference", ["He was angry about politics","He deeply cared about education","He was a quiet man","He was already famous"],                                                 1],
      ["At what age did Malala receive the Nobel Peace Prize?",                  "fact",      ["15","17","20","25"],                                                                                                                                            1],
      ["What does Malala's quote mean — 'One child... can change the world'?",   "critical",  ["One person is never enough to create real change","A single determined person with education can make a difference","Books are not very important","Teachers are powerless"],1],
      ["Why was Malala targeted by the Taliban?",                                "inference", ["Because she was already famous","Because she spoke out against the ban on girls' education","Because of her father's fame","Because of her blog's design"],    1],
    ],
    "Malala risked her life for education. Why do you think education is so important? Write 3–5 sentences with your reasons."
  ),

  mk("bi-03", "biography", "🌱", "Greta Thunberg: One Girl Changed the World",
    `In August 2018, a 15-year-old Swedish girl named Greta Thunberg did something simple but extraordinary. Instead of going to school, she sat outside the Swedish parliament building with a handmade sign that read: "School Strike for Climate."\n\nGreta had been deeply concerned about climate change since she was young. She could not understand why world leaders were ignoring such a serious, scientifically proven problem. So she decided to act herself.\n\nWhat began as a solo protest soon grew into a global movement. Millions of young people across the world were inspired to march, strike, and demand action on climate change. Greta spoke at the United Nations, addressed world leaders at international summits, and appeared on the covers of major magazines.\n\nShe was diagnosed with Asperger syndrome, a form of autism — and instead of seeing it as a limitation, she called it her "superpower." She said it allowed her to focus deeply on what truly mattered.\n\nGreta's message is urgent: "Our house is on fire. Act now."\n\nOne girl with a handmade sign sparked a revolution. Imagine what you could do.`,
    [
      ["parliament",      "פרלמנט"],
      ["climate change",  "שינויי אקלים"],
      ["protest",         "מחאה"],
      ["inspire",         "לעורר השראה"],
      ["summit",          "ועידת פסגה"],
      ["diagnosed",       "אובחן"],
      ["limitation",      "מגבלה"],
      ["revolution",      "מהפכה"],
    ],
    [
      ["What did Greta do instead of going to school in August 2018?",           "fact",      ["She wrote a book about climate","She sat outside parliament with a sign about climate","She gave a speech at the United Nations","She started a website"],    1],
      ["What did Greta's first protest sign say?",                               "fact",      ["'Save the Oceans'","'School Strike for Climate'","'Listen to Scientists'","'Act Now or Else'"],                                                              1],
      ["Where did Greta speak about climate change?",                            "fact",      ["Only in Sweden","At the United Nations and international summits","Only at her own school","Only on social media"],                                           1],
      ["Why did Greta begin her solo protest?",                                  "inference", ["Because she wanted to become famous","Because world leaders were ignoring a proven crisis","Because her teacher told her to","Because she hated school"],     1],
      ["What is Greta's medical diagnosis?",                                     "fact",      ["Dyslexia","Asperger syndrome","ADHD","Depression"],                                                                                                            1],
      ["Why did Greta call Asperger syndrome her 'superpower'?",                 "critical",  ["She ignored it completely","She used what made her different as a strength","She was ashamed of it","She pretended it didn't exist"],                         1],
      ["What does 'our house is on fire' mean?",                                 "inference", ["Greta's house burned down","The Earth is in a climate crisis that needs urgent action","We need better fire safety","Houses are dangerous places"],           1],
      ["What is the most important lesson from Greta's story?",                  "critical",  ["Teenagers should not go to school","One young person with conviction can inspire millions","Protests never work","Climate change is not a real problem"],     1],
    ],
    "Is there a global problem you feel strongly about? What could young people do to help solve it?"
  ),

  // ── CULTURE ─────────────────────────────────────────────────────────────────

  mk("cu-01", "culture", "🏫", "Schools Around the World",
    `School is a universal experience — but what it looks like varies enormously from country to country.\n\nIn Japan, students are responsible for cleaning their own school buildings. They sweep hallways, clean classrooms, and scrub toilets — learning respect for shared spaces and community responsibility from a young age.\n\nIn Finland, formal schooling begins at age seven — two years later than in many countries. Children spend more time playing outdoors and exploring. Yet Finnish students consistently rank among the world's highest achievers in reading and mathematics.\n\nIn some parts of Kenya, children walk for hours each day just to reach a classroom. Even without electricity or modern textbooks, these students attend school with remarkable dedication, knowing that education is a privilege.\n\nIn South Korea, the school day can last until late at night, with students attending additional evening classes. Competition for university places is intense, and academic success is considered a matter of family honour.\n\nEach school system reflects the values of its culture. There is no single "perfect" system — but there is much we can learn from each other.`,
    [
      ["universal",     "אוניברסלי / שייך לכולם"],
      ["vary",          "להשתנות"],
      ["responsibility","אחריות"],
      ["consistently",  "באופן עקבי / תמיד"],
      ["privilege",     "זכות יתר"],
      ["competition",   "תחרות"],
      ["dedication",    "מסירות"],
      ["reflect",       "לשקף"],
    ],
    [
      ["What do Japanese students do that is unusual in many other countries?",  "fact",      ["They study outdoors every day","They clean their own school building","They have no homework","They study only at weekends"],                               1],
      ["At what age does formal school begin in Finland?",                       "fact",      ["Age five","Age seven","Age six","Age eight"],                                                                                                                  1],
      ["What challenge do some Kenyan students face to attend school?",          "fact",      ["Too much homework","Walking for hours each day just to reach a classroom","Having no teachers","Very large class sizes"],                                     1],
      ["What does 'education is a privilege' suggest about how Kenyan students feel?","inference",["They dislike school","They deeply value and appreciate the chance to learn","They think school is easy","They have many resources"],                       1],
      ["Why is school so competitive in South Korea?",                           "fact",      ["Because it is fun and enjoyable","Because university places are limited and success is a family honour","Because lessons are easy","Because holidays are short"],1],
      ["What is the main message of the final paragraph?",                       "critical",  ["Japan has the perfect school system","Every country's school system is bad","Different systems reflect different values, and we can learn from each other","Finland is better than all others"],2],
      ["What does the word 'consistently' tell us about Finnish students?",      "inference", ["They sometimes do well by chance","They always perform at a high level","They improved only recently","They only do well in one subject"],                  1],
      ["Which value from the text do you think is most important for a good school?","critical",["Only competition","Only cleaning","Community responsibility, dedication to learning, and valuing education","Starting school at the youngest age"],         2],
    ],
    "Which of the four school systems described did you find most interesting? Would you like to study in that system? Why or why not?"
  ),

  mk("cu-02", "culture", "🎂", "How Kids Celebrate Birthdays in Different Countries",
    `A birthday is one of the most celebrated events in a child's life — but the way it is marked varies dramatically around the world.\n\nIn Mexico, children celebrate with a colourful piñata — a paper-mâché figure filled with sweets and small toys. Blindfolded children take turns hitting it with a stick until it breaks and the treats fall to the ground.\n\nIn Denmark, a birthday child wakes up to presents placed around them while they sleep. The Danish flag is often displayed outside the home to show that a child is celebrating that day.\n\nIn China, it is traditional to eat long noodles on your birthday. Long noodles symbolise a long life, so cutting them is considered bad luck.\n\nIn Ghana, a child wakes up to a special breakfast called "oto" — fried sweet potato patties — prepared by family members as a sign of love.\n\nIn parts of India, the birthday child visits a temple and gives food or gifts to those in need — putting others before oneself on their special day.\n\nBirthdays look different everywhere, but the feeling they create is universal: you are loved, you are special, and you matter.`,
    [
      ["celebrate",    "לחגוג"],
      ["piñata",       "פיניאטה (צעצוע נייר ממולא ממתקים)"],
      ["blindfolded",  "עם עיניים קשורות"],
      ["symbolise",    "לסמל"],
      ["dramatically", "באופן דרמטי"],
      ["traditional",  "מסורתי"],
      ["displayed",    "מוצג / נתלה"],
      ["universal",    "אוניברסלי / שייך לכולם"],
    ],
    [
      ["What is a piñata in Mexico?",                                            "fact",      ["A type of birthday cake","A paper-mâché figure filled with sweets that children hit","A birthday song","A special flag"],                                   1],
      ["What does a birthday child in Denmark wake up to?",                      "fact",      ["Presents placed around them while they slept","A special breakfast","Fireworks","A birthday cake in the kitchen"],                                          0],
      ["Why shouldn't you cut noodles on a birthday in China?",                 "fact",      ["They are too expensive","Long noodles symbolise long life — cutting them is bad luck","They taste better when long","It is too difficult"],                  1],
      ["What is 'oto' in Ghana?",                                               "fact",      ["A birthday song","Fried sweet potato patties made by family","A type of birthday cake","A game"],                                                            1],
      ["What does the Indian birthday tradition teach us?",                      "inference", ["Birthdays are not important","Thinking of others is a value worth celebrating even on your own special day","Temples are more important than parties","Gifts are unnecessary"],1],
      ["What do all these birthday traditions have in common?",                  "critical",  ["They all involve cake","They all celebrate the birthday child with love and a sense of community","They are all identical","They all involve music"],         1],
      ["What feeling does the author say is universal on birthdays?",            "inference", ["Sadness and longing","Being loved, celebrated, and important","Competition with others","Responsibility"],                                                    1],
      ["In which country is a flag displayed outside the house on a birthday?",  "fact",      ["Germany","Denmark","France","Sweden"],                                                                                                                        1],
    ],
    "How do you celebrate your birthday? Which birthday tradition from the text would you like to try? Why?"
  ),
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const ADV_READING_TOTAL = ADV_READING_TEXTS.length; // 15

export function getTextsByCategory(cat: AdvReadingCat): AdvReadingText[] {
  return ADV_READING_TEXTS.filter((t) => t.cat === cat);
}

export function getTextById(id: string): AdvReadingText | undefined {
  return ADV_READING_TEXTS.find((t) => t.id === id);
}
