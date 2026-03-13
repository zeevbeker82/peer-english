/**
 * Creative Writing Lab — B1 level (gifted 6th graders)
 * 20 activities × 4 categories
 * Each: Hebrew instructions · structure · 10 expressions · starters · example · checklist
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type WritingCat =
  | "story_starter"
  | "opinion"
  | "letter"
  | "descriptive";

export interface WritingActivity {
  id: string;
  cat: WritingCat;
  icon: string;
  title: string;
  title_he: string;
  prompt: string;            // Main writing prompt / starter
  instructions_he: string;  // Hebrew instructions
  structure: string[];      // Recommended steps (4–6)
  expressions: string[];    // 10 useful expressions
  starters: string[];       // 5–6 sentence starters
  example: string;          // Sample paragraph (60–80 words)
  checklist: string[];      // 5–6 self-check items
}

export const WRITING_CAT_META: Record<WritingCat, {
  label_he: string; icon: string; color: string; desc_he: string;
}> = {
  story_starter: { label_he: "Story Starters",      icon: "✨", color: "from-rose-500 to-pink-600",     desc_he: "המשך את הסיפור!" },
  opinion:       { label_he: "Opinion Writing",     icon: "💬", color: "from-blue-500 to-indigo-600",   desc_he: "הבע את דעתך" },
  letter:        { label_he: "Letter Writing",      icon: "✉️", color: "from-emerald-500 to-teal-600",  desc_he: "כתוב מכתב" },
  descriptive:   { label_he: "Descriptive Writing", icon: "🎨", color: "from-amber-500 to-orange-500",  desc_he: "תאר בפירוט" },
};

export const WRITING_XP = { short: 15, medium: 30, long: 50 } as const;
// short < 50 words · medium 50–99 · long 100+

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

export const WRITING_ACTIVITIES: WritingActivity[] = [

  // ── A. STORY STARTERS ────────────────────────────────────────────────────────

  {
    id: "ss-01", cat: "story_starter", icon: "🚪",
    title: "The Door Opens...",
    title_he: "הדלת נפתחת...",
    prompt: `"The door opened slowly, and I couldn't believe what I saw..."`,
    instructions_he: "המשך את הסיפור! מה ראית מאחורי הדלת? צור סיפור עם התחלה, אמצע וסוף. תן לדמויות שלך רגשות ותאר מה קורה בפירוט. כתוב לפחות 100 מילים.",
    structure: [
      "Set the scene — where are you? What led you to this door?",
      "Describe what you see (use all your senses!)",
      "Your reaction — how do you feel?",
      "What do you do next?",
      "How does the story end?",
    ],
    expressions: [
      "I couldn't believe my eyes",
      "My heart was pounding",
      "I took a deep breath and stepped forward",
      "Without thinking twice, I...",
      "Suddenly everything changed",
      "My jaw dropped open",
      "I froze in disbelief",
      "It was as if time stood still",
      "I had never seen anything like it",
      "Before I could react...",
    ],
    starters: [
      "The room was filled with...",
      "Standing there was...",
      "I stepped inside carefully and noticed...",
      "Before I could speak...",
      "My hands were trembling as I...",
    ],
    example: `The door opened slowly, and I couldn't believe what I saw. The small storage room had transformed into a glittering library stretching in every direction. Thousands of books lined golden shelves that disappeared into the clouds above. A friendly old man sat reading by a crackling fireplace. "I've been waiting for you," he said, smiling warmly. My heart pounded as I stepped inside, knowing that my life was about to change in ways I couldn't yet imagine.`,
    checklist: [
      "Did you describe what you saw in vivid detail?",
      "Did you include your character's feelings?",
      "Did you use past tense throughout?",
      "Does your story have a beginning, middle, and end?",
      "Did you use at least 3 descriptive adjectives?",
      "Did you check your spelling and punctuation?",
    ],
  },

  {
    id: "ss-02", cat: "story_starter", icon: "✉️",
    title: "The Strange Letter",
    title_he: "המכתב המסתורי",
    prompt: `"I found a strange letter in my locker. It said..."`,
    instructions_he: "מי כתב את המכתב? מה הוא אמר בדיוק? מה קרה אחר כך? צור סיפור מסתורי ומרתק עם עלילה מפתיעה.",
    structure: [
      "Describe finding the letter — where, when, how you felt",
      "Quote exactly what the letter says (use speech marks!)",
      "Your reaction — shock, curiosity, fear?",
      "What do you decide to do?",
      "The outcome — what happens at the end?",
    ],
    expressions: [
      "The handwriting was unusual",
      "A chill ran down my spine",
      "My curiosity got the better of me",
      "I read the words twice to make sure",
      "Something felt wrong",
      "I had no idea who had sent it",
      "The message was urgent",
      "I decided I had to find out the truth",
      "Against my better judgment",
      "Everything pointed to one person",
    ],
    starters: [
      "The handwriting was unfamiliar because...",
      "According to the letter...",
      "Without telling anyone, I decided to...",
      "My best guess was that...",
      "I decided to follow the instructions and...",
    ],
    example: `The letter was short but strange: "Meet me at the old oak tree at 4pm. Come alone. Don't be late." My heart raced. Who could have written this? I looked around the crowded hallway nervously — no one seemed suspicious. The ink was purple and the paper smelled faintly of cinnamon. Against my better judgment, I folded the note carefully and slipped it into my pocket. I had to find out who sent it and why.`,
    checklist: [
      "Did you include exactly what the letter said?",
      "Did you use speech marks for quoted text?",
      "Did you show your character's feelings clearly?",
      "Did you build mystery and suspense?",
      "Did you explain what happens next?",
      "Is the ending satisfying or intriguing?",
    ],
  },

  {
    id: "ss-03", cat: "story_starter", icon: "🌅",
    title: "Everything Was Different",
    title_he: "הכל היה שונה",
    prompt: `"When I woke up that morning, everything was different..."`,
    instructions_he: "מה השתנה? האם הפכת לאחר? האם העולם השתנה? האם יש לך כוח חדש? תן לדמיון שלך לעוף! כתוב סיפור עם הפתעות.",
    structure: [
      "The moment of realisation — what's different?",
      "Your investigation — how do you discover the change?",
      "How the change affects your daily life",
      "A challenge or problem you face because of it",
      "How you deal with it — the resolution",
    ],
    expressions: [
      "At first I didn't notice anything",
      "Something was definitely different",
      "I stared at my reflection in disbelief",
      "It was impossible to explain",
      "I had to figure out what had happened",
      "The world looked completely unfamiliar",
      "I pinched myself to see if I was dreaming",
      "As the day went on, I slowly began to understand",
      "I realised with a shock that",
      "Nothing would ever be the same again",
    ],
    starters: [
      "When I looked in the mirror, I saw...",
      "The first thing I noticed was...",
      "My room looked the same, but I could suddenly...",
      "By the time I got to school...",
      "I didn't know whether to tell anyone because...",
    ],
    example: `When I woke up that morning, everything was different. My room was the same, the sun was shining — but I could understand every language I heard. The news on the radio, my neighbour's phone call, even the pigeons on the windowsill — I understood them all. Amazing and terrifying at the same time. I didn't know whether to tell my parents or keep it secret. Then someone knocked on my door, and everything changed again.`,
    checklist: [
      "Did you clearly explain what changed?",
      "Did you show how you felt about the change?",
      "Did you include at least one challenge?",
      "Did you use interesting and varied vocabulary?",
      "Did you keep the story moving forward?",
      "Does the ending leave the reader curious?",
    ],
  },

  {
    id: "ss-04", cat: "story_starter", icon: "🐕",
    title: "My Dog Started Talking",
    title_he: "הכלב שלי התחיל לדבר",
    prompt: `"My dog started talking to me one Tuesday afternoon..."`,
    instructions_he: "מה אמר הכלב? מה הוא חשב על חיי היומיום שלו? האם הדבר הזה יכול לשנות את חייך? כתוב סיפור מצחיק, מפתיע ומעניין עם דיאלוג.",
    structure: [
      "The shocking moment your dog speaks (include dialogue!)",
      "Your disbelief and reaction",
      "Your conversation — what does your dog say?",
      "A surprising secret or revelation your dog shares",
      "How your relationship changes",
    ],
    expressions: [
      "I nearly fell off my chair",
      "I rubbed my eyes in disbelief",
      "He spoke in a completely calm, matter-of-fact voice",
      "I had about a million questions",
      "It turned out that",
      "My dog had been keeping secrets for years",
      "He explained everything very patiently",
      "I couldn't stop laughing",
      "As it turns out",
      "Looking back now, I should have guessed",
    ],
    starters: [
      "'I need to tell you something important,' he said calmly...",
      "The first thing he said was...",
      "I nearly dropped my sandwich when...",
      "His exact words were...",
      "After the initial shock, I managed to ask...",
    ],
    example: `"We need to talk," said Max, sitting down very seriously in front of me. I stared at him open-mouthed. My golden retriever was speaking perfect English. "I've been trying to tell you this for years," he continued, "but you never listen properly." I laughed nervously. He didn't laugh. "Also," he added, "the biscuits you buy me are absolutely terrible. I prefer the ones with cheese." I didn't know whether to be amazed or offended.`,
    checklist: [
      "Did you include dialogue between you and your dog?",
      "Did you describe your surprise and feelings?",
      "Did you give your dog a distinct personality?",
      "Did you use humour effectively?",
      "Did you use speech marks correctly throughout?",
      "Is the story entertaining and original?",
    ],
  },

  {
    id: "ss-05", cat: "story_starter", icon: "🦸",
    title: "A Useless Superpower",
    title_he: "כוח-על חסר תועלת",
    prompt: `"I discovered I had a superpower — but it was completely useless..."`,
    instructions_he: "איזה כוח גרוע גילית? (לדוגמה: לדבר עם ירקות, לזכור כל ארוחה שאכלת...) כתוב סיפור מצחיק על ניסיון הפיכת כוח מגוחך למשהו שימושי.",
    structure: [
      "How you discovered your power (and your disappointment!)",
      "Why it seems completely useless at first",
      "A funny or embarrassing moment when it goes wrong",
      "You find a creative and unexpected use for it",
      "The surprising helpful outcome",
    ],
    expressions: [
      "Of all the superpowers in the world",
      "I would have preferred something more impressive",
      "My so-called 'superpower'",
      "At first it seemed completely pointless",
      "To my great embarrassment",
      "As ridiculous as it sounds",
      "I quickly realised that",
      "It turned out to be surprisingly useful",
      "Against all odds",
      "In the end, I wouldn't change it",
    ],
    starters: [
      "My 'amazing' power was the ability to...",
      "The first time I used it accidentally was...",
      "My friends couldn't stop laughing when...",
      "I spent weeks trying to find a use for...",
      "Then one day, something unexpected happened...",
    ],
    example: `My superpower was the ability to make any food taste like broccoli. Yes, really. Pizza? Broccoli. Chocolate cake? Broccoli flavoured. I sobbed quietly into my ice cream bowl. Then one day, my school canteen had a crisis — they'd run out of everything except actual broccoli. Thirty children refused to eat. I stepped forward. "Leave it to me," I said quietly. I touched every plate. Suddenly the broccoli tasted like everyone's favourite meal. For one day, I was a hero.`,
    checklist: [
      "Did you clearly describe the useless superpower?",
      "Did you show why it was a problem?",
      "Did you include a funny or embarrassing situation?",
      "Did you show a creative solution?",
      "Did you use humour and descriptive language effectively?",
      "Does the story have a satisfying ending?",
    ],
  },

  // ── B. OPINION WRITING ────────────────────────────────────────────────────────

  {
    id: "op-01", cat: "opinion", icon: "📱",
    title: "Smartphones Before Age 12?",
    title_he: "סמארטפון לפני גיל 12?",
    prompt: "Should kids have smartphones before age 12?",
    instructions_he: "כתוב מאמר דעה ברור ומנומק. הצג את עמדתך בתחילת המאמר, תן שני נימוקים טובים, התייחס לדעה ההפוכה, וסיים עם מסקנה חזקה.",
    structure: [
      "Introduction: State your clear opinion in 1–2 sentences",
      "Argument 1: Your strongest reason + example or evidence",
      "Argument 2: Second reason + example",
      "Counter-argument: What the other side says — and why you disagree",
      "Conclusion: Restate your view powerfully",
    ],
    expressions: [
      "In my opinion,",
      "I strongly believe that",
      "On the other hand,",
      "However, it is important to consider",
      "The evidence suggests that",
      "Research shows that",
      "Furthermore,",
      "As a result,",
      "In conclusion,",
      "For these reasons, I firmly believe",
    ],
    starters: [
      "In my opinion, children should / should not have smartphones because...",
      "First and most importantly...",
      "Another strong reason is...",
      "Although some people argue that...",
      "In conclusion, I firmly believe that...",
    ],
    example: `In my opinion, children under 12 should not have smartphones. First and most importantly, smartphones can be addictive and reduce children's ability to focus on schoolwork. Furthermore, social media exposes young children to content they are not mature enough to handle. Although some people argue that phones help children stay safe, a basic phone without internet access is enough for that purpose. In conclusion, smartphones should wait until teenagers are ready to use them responsibly.`,
    checklist: [
      "Did you state your opinion clearly in the first sentence?",
      "Did you give at least two well-explained reasons?",
      "Did you mention the other side's view?",
      "Did you use linking words (furthermore, however, therefore)?",
      "Did you write a strong conclusion?",
      "Is your writing at least 80 words?",
    ],
  },

  {
    id: "op-02", cat: "opinion", icon: "👫",
    title: "One Best Friend or Many?",
    title_he: "חבר אחד טוב או הרבה חברים?",
    prompt: "Is it better to have one best friend or many friends?",
    instructions_he: "כתוב מאמר דעה על חברות. מה אתה מאמין? תן דוגמאות מחיי היומיום. השתמש במבנה: מבוא → נימוקים → התייחסות לדעה אחרת → מסקנה.",
    structure: [
      "Introduction: Your opinion + brief reason",
      "Argument 1: Main advantage of your choice",
      "Argument 2: Second reason with a personal example",
      "Counter-argument: What's good about the opposite choice?",
      "Conclusion: Restate and summarise",
    ],
    expressions: [
      "In my view,",
      "I personally believe that",
      "When it comes to friendship,",
      "A true best friend will always...",
      "On the other hand, having many friends...",
      "From my own experience,",
      "It is worth noting that",
      "This is because",
      "To be honest,",
      "Ultimately,",
    ],
    starters: [
      "In my view, having ___ friends is better because...",
      "A true best friend will always...",
      "Having many friends means...",
      "From my personal experience...",
      "Ultimately, I believe that...",
    ],
    example: `In my view, having one true best friend is more valuable than having many acquaintances. A best friend truly knows you — your fears, your jokes, your secrets. They will support you when you are struggling and celebrate your successes. Having many 'friends' can feel shallow and exhausting. However, I understand that a wide circle of friends brings fun and variety too. Ultimately, quality matters far more than quantity when it comes to real friendship.`,
    checklist: [
      "Did you clearly state your preference at the start?",
      "Did you explain why with two specific reasons?",
      "Did you mention what's good about the other option?",
      "Did you use opinion phrases (in my view, I believe)?",
      "Did you end with a strong conclusion?",
      "Is your writing at least 80 words?",
    ],
  },

  {
    id: "op-03", cat: "opinion", icon: "🎮",
    title: "Video Games: Good or Bad?",
    title_he: "משחקי וידאו: טוב או רע?",
    prompt: "Are video games good or bad for you?",
    instructions_he: "כתוב מאמר מאוזן. הצג את שני הצדדים אך הבע את דעתך האישית בסוף. השתמש בשפת דיון (supporters argue, critics claim).",
    structure: [
      "Introduction: Introduce the debate",
      "The positive side: Benefits of gaming",
      "The negative side: Potential problems",
      "Your balanced conclusion: What is the key?",
    ],
    expressions: [
      "There is much debate about",
      "Supporters argue that",
      "Critics claim that",
      "On one hand,",
      "On the other hand,",
      "It is undeniable that",
      "However, it is also true that",
      "The key is balance",
      "Used in moderation,",
      "In conclusion,",
    ],
    starters: [
      "There is much debate about whether video games are...",
      "Supporters of gaming argue that...",
      "However, critics point out that...",
      "The key issue is not whether... but how...",
      "In conclusion, I believe that...",
    ],
    example: `There is much debate about whether video games are good or bad for young people. Supporters argue that games improve problem-solving skills, teamwork, and reaction time. Some educational games even teach languages and history. However, critics point out that too much gaming can lead to addiction, poor sleep, and less physical activity. In conclusion, I believe that video games, like most things, can be beneficial or harmful — it all depends on how much time you spend on them. Balance is everything.`,
    checklist: [
      "Did you present both sides of the argument fairly?",
      "Did you give specific examples for each side?",
      "Did you use debate language (supporters argue, critics claim)?",
      "Did you give your own clear opinion?",
      "Did you use transition words between paragraphs?",
      "Is your writing at least 100 words?",
    ],
  },

  {
    id: "op-04", cat: "opinion", icon: "⏰",
    title: "Should School Start Later?",
    title_he: "האם הלימודים צריכים להתחיל מאוחר יותר?",
    prompt: "Should school start later in the morning?",
    instructions_he: "כתוב מאמר דעה עם ביסוס מדעי. השתמש בעובדות על שינה ובנימוקים מעשיים. זה נושא שיש בו מחקר מדעי אמיתי!",
    structure: [
      "Introduction: State your position clearly",
      "Scientific argument: What research says about teenagers and sleep",
      "Practical argument: Real benefits for students",
      "Counter-argument: A practical problem — and your response",
      "Conclusion: Your clear recommendation",
    ],
    expressions: [
      "According to research,",
      "Studies have shown that",
      "As a result,",
      "The evidence suggests",
      "From a scientific perspective,",
      "It is well known that",
      "In contrast,",
      "Despite this,",
      "Taking everything into account,",
      "I would therefore recommend",
    ],
    starters: [
      "According to research, teenagers need...",
      "If school started later...",
      "Studies show that students who sleep more...",
      "Some people worry that...",
      "Taking everything into account, I would recommend...",
    ],
    example: `According to research, teenagers need between eight and ten hours of sleep each night to function well. However, most schools start before 8am, forcing students to wake up too early. Studies show that tired students concentrate less, make more mistakes, and even have weaker immune systems. If school started just one hour later, students would arrive more alert, happier, and ready to learn. Some worry about transport difficulties, but these problems are solvable. I would therefore strongly recommend later school start times.`,
    checklist: [
      "Did you include a scientific fact or research finding?",
      "Did you explain the benefits clearly?",
      "Did you mention a possible problem with your idea?",
      "Did you use academic language?",
      "Is your writing at least 100 words?",
      "Did you end with a clear recommendation?",
    ],
  },

  {
    id: "op-05", cat: "opinion", icon: "🏆",
    title: "Is Winning Everything?",
    title_he: "האם הניצחון הוא הכל?",
    prompt: "Is winning everything?",
    instructions_he: "כתוב מאמר פילוסופי ועמוק על ניצחון, הפסד ומה שחשוב באמת בחיים. אל תכתוב תשובה פשוטה — חשוב בעומק!",
    structure: [
      "Introduction: What does 'winning' really mean?",
      "The case for winning: Why it matters",
      "The case for losing: What failure teaches us",
      "Your deeper view: A broader definition of success",
      "Conclusion: Redefine what it means to 'win'",
    ],
    expressions: [
      "Winning is often seen as",
      "However, it is also important to recognise",
      "Losing can teach us",
      "True success means",
      "In the long run,",
      "What really matters is",
      "People who only focus on winning",
      "I believe that",
      "A broader definition of success",
      "In conclusion,",
    ],
    starters: [
      "Winning is often seen as the only goal, but...",
      "Losing has taught me that...",
      "In my opinion, true success is...",
      "People who only care about winning...",
      "In the end, what really matters is...",
    ],
    example: `Winning is often seen as the ultimate goal. But is it really everything? I believe that the process — the effort, the learning, and the growth — matters far more than the final result. Losing teaches us resilience, humility, and how to improve. People who only focus on winning often miss the joy of participating. True success, in my view, is giving your best effort, learning from every mistake, and becoming a better person — whatever the scoreboard says.`,
    checklist: [
      "Did you explore the idea of 'winning' thoughtfully?",
      "Did you explain what losing can teach us?",
      "Did you give your own personal view?",
      "Did you avoid a simple yes/no answer?",
      "Is your writing reflective and mature?",
      "Did you end with a powerful, memorable conclusion?",
    ],
  },

  // ── C. LETTER WRITING ─────────────────────────────────────────────────────────

  {
    id: "lt-01", cat: "letter", icon: "🌍",
    title: "Letter to a Friend Abroad",
    title_he: "מכתב לחבר בחו\"ל",
    prompt: "Write a letter to a friend who lives in another country.",
    instructions_he: "כתוב מכתב לחבר שגר בחו\"ל. שתף אותו בחדשות מחייך, שאל אותו שאלות ושמור על טון חברותי וחמים. השתמש בפורמט נכון של מכתב.",
    structure: [
      "Date (top right) + Greeting: Dear [Name],",
      "Opening: Hope you're well + reference to last letter/conversation",
      "News paragraph 1: What's new in your life?",
      "News paragraph 2: Something interesting / funny / exciting",
      "Questions for your friend (at least 2 questions)",
      "Closing: When you'll write next + warm sign-off",
    ],
    expressions: [
      "I hope this letter finds you well.",
      "It feels like ages since we last spoke.",
      "You won't believe what happened...",
      "On another note,",
      "I've been meaning to tell you...",
      "How are things over there?",
      "I miss hanging out with you.",
      "Give my regards to your family.",
      "Write back soon!",
      "Looking forward to hearing from you.",
    ],
    starters: [
      "Dear [Name],",
      "I hope this letter finds you well!",
      "It feels like ages since we last wrote.",
      "You won't believe what happened last week...",
      "I have so much to tell you!",
    ],
    example: `Dear Sarah,\n\nI hope this letter finds you well! It feels like ages since we last spoke. Things here have been busy but exciting. Last week, my school held a science fair and my experiment on plant growth won second place — I was so surprised!\n\nI've been thinking about you a lot. How is your new school? Have you made any good friends? I really miss our afternoon walks and long conversations.\n\nWrite back soon — I can't wait to hear all your news!\n\nYour friend,\nYael`,
    checklist: [
      "Did you use the correct letter format (date, greeting, sign-off)?",
      "Did you share at least two pieces of news?",
      "Did you ask your friend at least two questions?",
      "Did you use a warm and friendly tone?",
      "Did you use informal English naturally?",
      "Did you sign off correctly?",
    ],
  },

  {
    id: "lt-02", cat: "letter", icon: "⭐",
    title: "Letter to a Favourite Artist",
    title_he: "מכתב לאמן/סופר אהוב",
    prompt: "Write a letter to your favourite singer, author, or artist.",
    instructions_he: "כתוב מכתב לאמן, זמר או סופר שאתה אוהב. הסבר מה השפעתם עליך, אזכיר יצירה ספציפית שהשפיעה עליך, ובקש ממנו משהו.",
    structure: [
      "Greeting + Who you are: Brief self-introduction",
      "Why you admire them: A specific work (song/book/artwork)",
      "How their work influenced you personally",
      "A question or request (advice, inspiration, meeting)",
      "Enthusiastic and polite closing",
    ],
    expressions: [
      "I am writing to express my deep admiration for",
      "Your work has had a profound impact on me.",
      "Ever since I first heard / read...",
      "Your music / writing inspired me to...",
      "If I could ask you one thing, it would be...",
      "I would be honoured if",
      "Thank you for sharing your talent with the world.",
      "I truly believe that",
      "Your biggest fan,",
      "I hope this letter reaches you.",
    ],
    starters: [
      "I am writing to express my deep admiration for your work...",
      "Ever since I first read / heard...",
      "Your work has changed the way I think about...",
      "If I could meet you, I would ask...",
      "Thank you so much for...",
    ],
    example: `Dear J.K. Rowling,\n\nI am writing to express my deep admiration for the Harry Potter series. Ever since I first read The Philosopher's Stone at age seven, I have been captivated by your magical world. Your books taught me that bravery isn't about being fearless — it's about acting despite your fears.\n\nIf I could ask you one question, it would be: which character do you feel most similar to, and why?\n\nThank you for sharing your extraordinary imagination with the world.\n\nYour biggest fan,\nNoam`,
    checklist: [
      "Did you introduce yourself briefly?",
      "Did you mention a specific work you love?",
      "Did you explain how it influenced you personally?",
      "Did you ask a thoughtful question or make a request?",
      "Did you use enthusiastic but polite language?",
      "Did you sign off correctly?",
    ],
  },

  {
    id: "lt-03", cat: "letter", icon: "💛",
    title: "Thank You Letter",
    title_he: "מכתב תודה",
    prompt: "Write a heartfelt thank you letter to someone who helped you.",
    instructions_he: "כתוב מכתב תודה מעומק הלב לאדם שעשה עבורך משהו מיוחד. הסבר מה הוא עשה, איך הרגשת ואיך זה השפיע עליך.",
    structure: [
      "Greeting + Purpose: Thank you for...",
      "Specific detail: What exactly they did",
      "Your feelings: How you felt at the time",
      "Impact: How it helped or changed things for you",
      "Return: What you will do / how you'll repay their kindness",
      "Warm closing",
    ],
    expressions: [
      "I am writing to express my sincere gratitude",
      "I wanted to take this opportunity to thank you",
      "Your kindness truly meant a great deal to me.",
      "I don't know how to fully express my thanks.",
      "Because of you,",
      "I will never forget your kindness.",
      "You didn't have to do that, but you did.",
      "It made such a difference to me.",
      "Please know how much I appreciate...",
      "With heartfelt thanks,",
    ],
    starters: [
      "I am writing to express my sincere thanks for...",
      "What you did really meant a lot to me because...",
      "Because of your help, I was able to...",
      "I will always remember...",
      "From the bottom of my heart, thank you for...",
    ],
    example: `Dear Mrs. Cohen,\n\nI am writing to express my sincere gratitude for all your support during the science project competition. When I was about to give up, you stayed late to help me fix my experiment and encouraged me to keep going. Because of your patience and belief in me, I not only completed the project but won second place!\n\nI will never forget your kindness. You made me believe in myself when I had stopped believing. I hope to make you proud.\n\nWith heartfelt thanks,\nDaniel`,
    checklist: [
      "Did you clearly state what you are grateful for?",
      "Did you describe specifically what the person did?",
      "Did you express how you felt?",
      "Did you explain the impact it had on you?",
      "Did you use sincere and warm language?",
      "Did you close the letter correctly?",
    ],
  },

  {
    id: "lt-04", cat: "letter", icon: "🔮",
    title: "Letter to Your Future Self",
    title_he: "מכתב לעצמך בעתיד",
    prompt: "Write a letter to yourself — to be opened in 10 years.",
    instructions_he: "כתוב מכתב לעצמך בעתיד. מה תספר לך? מה תזכיר לעצמך? מה תאחל לך? השתמש בדמיון ובכנות.",
    structure: [
      "Opening: Who you are right now (age, what's happening)",
      "Your dreams and hopes for the future",
      "Something important to remember from today",
      "Advice you want to give your future self",
      "A question you hope you have answered by then",
      "Warm, personal closing",
    ],
    expressions: [
      "By the time you read this,",
      "I hope you remember...",
      "Whatever happens,",
      "Don't forget that",
      "You were once the kind of person who...",
      "I wonder if you still...",
      "Back when I was your age,",
      "I hope you haven't forgotten...",
      "Promise yourself that you'll always...",
      "With love from your younger self,",
    ],
    starters: [
      "By the time you read this, you will be...",
      "Right now, I am...",
      "My biggest dream at this moment is...",
      "Whatever happens, please remember...",
      "I hope you are happy, because...",
    ],
    example: `Dear Future Me,\n\nBy the time you read this, you will be 26 years old — that's impossible to imagine right now! I am 12, and life is full of school, football, and reading. My biggest dream is to become a marine biologist. I hope you followed that dream.\n\nWhatever happens, please remember to be kind — especially when it's difficult. Are you happy? I truly hope so.\n\nWith love from your younger self,\nEli (age 12)`,
    checklist: [
      "Did you describe yourself as you are right now?",
      "Did you mention your current dreams and goals?",
      "Did you include advice for your future self?",
      "Did you ask yourself at least one question?",
      "Did you use an imaginative and personal tone?",
      "Did you sign it 'from your younger self'?",
    ],
  },

  {
    id: "lt-05", cat: "letter", icon: "📮",
    title: "Polite Complaint Letter",
    title_he: "מכתב תלונה מנומס",
    prompt: "Write a polite but firm complaint letter about a product or service.",
    instructions_he: "כתוב מכתב תלונה מנומס לחברה או גוף ציבורי. תאר את הבעיה בבירור, הסבר מה ציפית לקבל ומה אתה מבקש. שמור על לשון מנומסת אך נחרצת.",
    structure: [
      "Formal greeting: Dear Sir/Madam or specific manager",
      "Purpose: Why you are writing",
      "The problem: Describe clearly and factually (what/when/where)",
      "How it affected you",
      "What you would like them to do",
      "Polite but firm closing",
    ],
    expressions: [
      "I am writing to bring to your attention",
      "I was disappointed to find that",
      "I would like to draw your attention to",
      "I expected..., however...",
      "As a regular customer,",
      "I would appreciate it if you could",
      "I trust this matter will be resolved swiftly.",
      "I look forward to your prompt response.",
      "I would be grateful if",
      "Yours faithfully,",
    ],
    starters: [
      "I am writing to complain about...",
      "I was very disappointed when...",
      "I purchased / visited... and found that...",
      "I would appreciate it if you could...",
      "I trust you will resolve this matter promptly.",
    ],
    example: `Dear Manager,\n\nI am writing to bring to your attention a problem I experienced at your store on Monday 10th March. I purchased a set of coloured pencils; however, when I arrived home I found that the box contained only seven pencils instead of the twelve advertised on the packaging.\n\nAs a regular customer, I was disappointed by this experience. I would appreciate it if you could either replace the missing pencils or offer a full refund.\n\nI trust this matter will be resolved swiftly.\n\nYours faithfully,\nA. Student`,
    checklist: [
      "Did you describe the problem clearly and specifically?",
      "Did you include specific details (date, item, what went wrong)?",
      "Did you state what you would like them to do?",
      "Did you stay polite throughout — no rude language?",
      "Did you use formal English throughout?",
      "Did you use the correct formal closing (Yours faithfully)?",
    ],
  },

  // ── D. DESCRIPTIVE WRITING ────────────────────────────────────────────────────

  {
    id: "dw-01", cat: "descriptive", icon: "🏠",
    title: "My Perfect Room",
    title_he: "החדר המושלם שלי",
    prompt: "Describe your perfect room in vivid, sensory detail.",
    instructions_he: "תאר את החדר המושלם שלך בפירוט מרהיב! השתמש בחמשת החושים — מה רואים? שומעים? מריחים? מרגישים? גרום לקורא להרגיש שהוא נמצא שם.",
    structure: [
      "Overall impression: What feeling does the room give?",
      "The walls, ceiling, floor: colours and textures",
      "Furniture and objects: the most important items",
      "Light and atmosphere: natural light? Cosy lamps?",
      "What makes it uniquely yours: personal touches",
      "How you feel the moment you step inside",
    ],
    expressions: [
      "The walls are painted in",
      "Sunlight streams through the windows",
      "The air smells of",
      "The overall atmosphere is",
      "Tucked into the corner is",
      "In the centre of the room stands",
      "The soft glow of",
      "Every surface is covered with",
      "It feels like a world of its own",
      "The moment I step inside,",
    ],
    starters: [
      "The moment I step inside my perfect room...",
      "The walls are painted in a deep shade of...",
      "Soft light fills the room from...",
      "My favourite corner of the room is...",
      "This room is special because it feels...",
    ],
    example: `The moment I step inside my perfect room, I feel completely at peace. The walls are painted deep midnight blue, dotted with tiny silver stars that glow softly in the dark. Golden light streams from a moon-shaped lamp in the corner. One entire wall is lined with bookshelves, packed with adventure stories and nature encyclopedias. The room smells faintly of cinnamon and old books — the most comforting smell in the world. Here, I am completely myself.`,
    checklist: [
      "Did you use at least 3 sensory details (sight, sound, smell, touch)?",
      "Did you describe specific objects in detail?",
      "Did you use vivid and varied adjectives?",
      "Did you convey a mood or atmosphere?",
      "Did you write at least 80 words?",
      "Does the reader feel they are in the room?",
    ],
  },

  {
    id: "dw-02", cat: "descriptive", icon: "💙",
    title: "A Person I Admire",
    title_he: "אדם שאני מעריץ",
    prompt: "Describe a person you admire — their appearance and personality.",
    instructions_he: "תאר אדם שאתה מעריץ. כתוב גם על מראה חיצוני וגם על אופי ואישיות. שתף זיכרון ספציפי עמו.",
    structure: [
      "Introduction: Who is this person? Your relationship to them",
      "Physical description: How they look (distinctive features)",
      "Character and personality: Who they really are inside",
      "A specific memory or moment with this person",
      "Why they inspire you",
      "What you have learned from them",
    ],
    expressions: [
      "What makes [name] so special is",
      "Their eyes light up when",
      "More than anything else,",
      "I will always remember the time when",
      "They taught me that",
      "Whenever I spend time with them,",
      "There is something about them that",
      "They have the kind of smile that",
      "I hope to be like them one day because",
      "In many ways, they have shaped who I am.",
    ],
    starters: [
      "Of all the people I know, [name] stands out because...",
      "From the moment you meet them, you can tell that...",
      "I will always remember the time when...",
      "What makes them truly special is...",
      "I hope one day to be even half as...",
    ],
    example: `Of all the people I know, my grandmother stands out as the person I admire most. She has warm brown eyes that crinkle when she laughs and silver hair she always wears in a neat braid. But it is her spirit that is most remarkable. She grew up with very little, yet she never stops giving to others. I will always remember her saying: "Kindness costs nothing, but it means everything." Those words have stayed with me ever since.`,
    checklist: [
      "Did you describe how the person looks — specific details?",
      "Did you describe their personality with concrete examples?",
      "Did you share a personal memory involving this person?",
      "Did you explain what you have learned from them?",
      "Did you use descriptive and emotional language?",
      "Does the reader understand why you admire this person?",
    ],
  },

  {
    id: "dw-03", cat: "descriptive", icon: "🌿",
    title: "My Favourite Place",
    title_he: "המקום האהוב עלי",
    prompt: "Describe your favourite place — anywhere in the world.",
    instructions_he: "תאר מקום שאתה אוהב מאוד. לא חייב להיות מרהיב — גם פינה קטנה בגינה יכולה להיות מיוחדת. השתמש בתיאורים עשירים וחושיים.",
    structure: [
      "Where it is — and how you discovered it",
      "What it looks like: visual description",
      "Sounds, smells, textures you notice there",
      "What you do there / how you feel there",
      "A specific memory associated with this place",
      "Why it is so special to you",
    ],
    expressions: [
      "There is a place I return to",
      "Every time I come here,",
      "The moment I arrive,",
      "The air is filled with the scent of",
      "The sound of ... is always in the background",
      "Time seems to slow down here",
      "This is the place where I go to",
      "Something about this place makes me feel",
      "I have spent hours here",
      "This place is my secret",
    ],
    starters: [
      "There is a place I return to whenever I need to...",
      "The moment I arrive, I feel...",
      "What I love most about this place is...",
      "I discovered this place by accident when...",
      "Whenever I am here, I...",
    ],
    example: `There is a place I return to whenever I need to think: a small garden behind my grandparents' house. It is nothing special to look at — just a few fruit trees, an old wooden bench, and a patch of wild flowers. But the moment I arrive, the rest of the world fades. The air smells of earth and orange blossoms. Bees hum quietly. Time slows down here in the best possible way. This is where I have made my best decisions.`,
    checklist: [
      "Did you describe where the place is?",
      "Did you use sensory details (sounds, smells, textures)?",
      "Did you share a specific memory or feeling there?",
      "Did you explain why it is personally special to you?",
      "Did you create a clear mood or atmosphere?",
      "Would the reader want to visit this place?",
    ],
  },

  {
    id: "dw-04", cat: "descriptive", icon: "📸",
    title: "A Day I'll Never Forget",
    title_he: "יום שלא אשכח",
    prompt: "Describe a day that was truly unforgettable.",
    instructions_he: "ספר על יום בלתי נשכח מחייך. השתמש בסדר כרונולוגי ותאר איך הרגשת בכל שלב. גרום לקורא לחיות את הרגעים האלה.",
    structure: [
      "The setting: When and where?",
      "How the day started (before you knew it would be special)",
      "The key moment: What happened that made it unforgettable?",
      "Your feelings and reactions during the event",
      "The aftermath: What happened next?",
      "Why you will never forget this day",
    ],
    expressions: [
      "I had no idea that this day would...",
      "Everything changed the moment",
      "I will never forget the feeling of",
      "Even now, I can still picture it clearly",
      "Looking back,",
      "At the time, I didn't fully understand",
      "It was one of those rare moments when",
      "I remember every detail:",
      "That day taught me that",
      "Nothing was quite the same after that",
    ],
    starters: [
      "I had no idea that ordinary day would become...",
      "It started like any normal morning...",
      "Everything changed the moment...",
      "I will never forget the feeling of...",
      "Looking back now, I understand that...",
    ],
    example: `I had no idea that cold February morning would become one of the most important days of my life. It started like any ordinary Tuesday — breakfast, backpack, bus. But at school, the headteacher announced that my drawing had been selected to represent our country at an international children's art exhibition. I stood perfectly still, my heart racing, while everyone around me clapped. That moment — when I realised I had created something that truly moved people — changed how I saw myself forever.`,
    checklist: [
      "Did you describe the setting clearly at the start?",
      "Did you build up to the key moment gradually?",
      "Did you include your feelings and reactions?",
      "Did you explain why this day was so important?",
      "Did you use past tense throughout?",
      "Does the reader feel the emotion of the day?",
    ],
  },

  {
    id: "dw-05", cat: "descriptive", icon: "✈️",
    title: "My Dream Vacation",
    title_he: "חופשת החלומות שלי",
    prompt: "Describe your perfect dream vacation in vivid detail.",
    instructions_he: "תאר את חופשת החלומות שלך בפירוט עשיר. לאן תלך? עם מי? מה תעשה שם? מה תאכל? השתמש בזמן עתיד (I would, I will, I imagine).",
    structure: [
      "Destination: Where and why you chose it",
      "Getting there: The journey (exciting anticipation!)",
      "The place itself: What it looks like",
      "Activities: What you plan to do",
      "Food and culture: What you will experience",
      "The memory you will bring home",
    ],
    expressions: [
      "My dream destination is",
      "I have always wanted to visit",
      "I imagine that",
      "The first thing I would do is",
      "I picture myself",
      "Exploring every corner of",
      "I would spend my days",
      "I can almost taste",
      "The highlight of the trip would be",
      "I would return home feeling",
    ],
    starters: [
      "My dream destination has always been...",
      "I have always wanted to visit... because...",
      "I imagine that the first thing I would do is...",
      "By day I would...",
      "I would return home feeling...",
    ],
    example: `My dream destination has always been Japan. I have been fascinated by its blend of ancient temples and futuristic technology since I first saw a documentary at age eight. I imagine arriving in Tokyo on a crisp autumn morning, the streets already buzzing with energy. By day I would explore ancient Kyoto temples; by night I would stand beneath the neon lights of Shibuya. I would return home with a thousand memories and a deep respect for a culture wonderfully different from my own.`,
    checklist: [
      "Did you describe where you want to go and why?",
      "Did you use future tense (I would, I will, I imagine)?",
      "Did you include specific activities and experiences?",
      "Did you mention food or cultural details?",
      "Did you use vivid and imaginative language?",
      "Does the writing make the reader want to go there too?",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const WRITING_TOTAL = WRITING_ACTIVITIES.length; // 20

export function getActivitiesByCategory(cat: WritingCat): WritingActivity[] {
  return WRITING_ACTIVITIES.filter((a) => a.cat === cat);
}

export function getWritingXP(wordCount: number): number {
  if (wordCount >= 100) return WRITING_XP.long;
  if (wordCount >= 50)  return WRITING_XP.medium;
  return WRITING_XP.short;
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
