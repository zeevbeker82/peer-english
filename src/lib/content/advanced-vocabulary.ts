/**
 * Advanced Vocabulary — B1 level (gifted 6th graders)
 * 100 words × 5 categories — each word has definition, Hebrew, 2 examples, fill-in exercise
 */

export type AdvCat =
  | "academic"
  | "emotions_adv"
  | "phrasal_verbs"
  | "connectors"
  | "adjectives_adv";

export interface AdvancedWord {
  id: string;
  en: string;
  he: string;
  def: string;               // Simple English definition
  stars: 1 | 2 | 3;         // Difficulty
  cat: AdvCat;
  examples: [string, string]; // Two example sentences
  exercise: {
    sentence: string;         // Sentence with ___ for the blank
    answer: string;           // Expected answer (case-insensitive check)
  };
}

export const ADV_CAT_META: Record<AdvCat, {
  label_he: string; label_en: string; icon: string; color: string; count: number;
}> = {
  academic:       { label_he: "מילים אקדמיות",    label_en: "Academic Words",      icon: "🎓", color: "from-blue-500 to-indigo-600",    count: 20 },
  emotions_adv:   { label_he: "רגשות מתקדמים",    label_en: "Advanced Emotions",   icon: "💙", color: "from-pink-500 to-rose-600",      count: 20 },
  phrasal_verbs:  { label_he: "פעלים מורכבים",    label_en: "Phrasal Verbs",       icon: "🔗", color: "from-violet-500 to-purple-600",  count: 20 },
  connectors:     { label_he: "מילות קישור",      label_en: "Connectors",          icon: "🧩", color: "from-teal-500 to-cyan-600",      count: 20 },
  adjectives_adv: { label_he: "תיאורים מתקדמים", label_en: "Advanced Adjectives", icon: "✨", color: "from-emerald-500 to-green-600",  count: 20 },
};

export const ADV_XP = { flashcard: 5, quiz_correct: 10, category_complete: 30 } as const;

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

export const ADVANCED_WORDS: AdvancedWord[] = [

  // ── 1. ACADEMIC ─────────────────────────────────────────────────────────────
  { id:"ac-01", cat:"academic", stars:2, en:"analyze",
    he:"לנתח", def:"to study something carefully to understand it",
    examples:["We will analyze the results of the experiment.", "She analyzed the poem to find its deeper meaning."],
    exercise:{ sentence:"Scientists ___ data to find patterns.", answer:"analyze" } },

  { id:"ac-02", cat:"academic", stars:2, en:"evaluate",
    he:"להעריך", def:"to judge how good or important something is",
    examples:["The teacher will evaluate our projects next week.", "We need to evaluate all the options before deciding."],
    exercise:{ sentence:"Please ___ the quality of this essay.", answer:"evaluate" } },

  { id:"ac-03", cat:"academic", stars:1, en:"compare",
    he:"להשוות", def:"to look at how things are similar or different",
    examples:["Compare these two pictures — what is different?", "Students compare their answers with a partner."],
    exercise:{ sentence:"Let's ___ the two books we read.", answer:"compare" } },

  { id:"ac-04", cat:"academic", stars:2, en:"contrast",
    he:"להנגיד", def:"to show how things are clearly different",
    examples:["Contrast summer and winter weather in your essay.", "The painting contrasts bright and dark colors beautifully."],
    exercise:{ sentence:"Please ___ city life and country life.", answer:"contrast" } },

  { id:"ac-05", cat:"academic", stars:2, en:"evidence",
    he:"ראיה / עדות", def:"facts that prove something is true",
    examples:["The scientist showed evidence that the theory was correct.", "There is clear evidence that exercise improves health."],
    exercise:{ sentence:"We need ___ before we can reach a conclusion.", answer:"evidence" } },

  { id:"ac-06", cat:"academic", stars:2, en:"conclusion",
    he:"מסקנה", def:"the decision or opinion you reach after thinking",
    examples:["What conclusion can we draw from this experiment?", "In conclusion, regular sleep improves memory and focus."],
    exercise:{ sentence:"After studying the data, we reached a ___.", answer:"conclusion" } },

  { id:"ac-07", cat:"academic", stars:2, en:"significant",
    he:"משמעותי", def:"important and large enough to be noticed",
    examples:["This discovery was significant for medical science.", "There has been a significant improvement in her grades."],
    exercise:{ sentence:"The results show a ___ change.", answer:"significant" } },

  { id:"ac-08", cat:"academic", stars:2, en:"approximately",
    he:"בערך / כמעט", def:"close to a number but not exactly",
    examples:["The trip takes approximately two hours.", "There were approximately 300 people at the event."],
    exercise:{ sentence:"The project takes ___ three weeks to complete.", answer:"approximately" } },

  { id:"ac-09", cat:"academic", stars:2, en:"therefore",
    he:"לפיכך / לכן", def:"for that reason; because of that",
    examples:["It was raining; therefore, we stayed inside.", "She studied hard and therefore passed the test."],
    exercise:{ sentence:"He was tired and ___ went to bed early.", answer:"therefore" } },

  { id:"ac-10", cat:"academic", stars:1, en:"however",
    he:"אולם / אבל", def:"used to show a contrast with what was just said",
    examples:["The book was long; however, it was very interesting.", "I wanted to go; however, I was too tired."],
    exercise:{ sentence:"I like swimming. ___, I can't swim in winter.", answer:"However" } },

  { id:"ac-11", cat:"academic", stars:3, en:"furthermore",
    he:"יתרה מכך", def:"an extra important point that adds to what was said",
    examples:["The phone is cheap; furthermore, it has a great camera.", "She is smart; furthermore, she works extremely hard."],
    exercise:{ sentence:"The food was delicious. ___, it was very affordable.", answer:"Furthermore" } },

  { id:"ac-12", cat:"academic", stars:2, en:"establish",
    he:"לבסס / להקים", def:"to start or create something in an official way",
    examples:["The school was established in 1950.", "We need to establish clear rules for the group."],
    exercise:{ sentence:"The company was ___ ten years ago.", answer:"established" } },

  { id:"ac-13", cat:"academic", stars:2, en:"identify",
    he:"לזהות", def:"to recognize who or what something is",
    examples:["Can you identify the bird in this picture?", "Scientists identified the new virus very quickly."],
    exercise:{ sentence:"Please ___ the main characters in the story.", answer:"identify" } },

  { id:"ac-14", cat:"academic", stars:2, en:"indicate",
    he:"להצביע על / לרמז", def:"to show or suggest that something is true",
    examples:["The signs indicate that spring is coming.", "Research indicates that music helps concentration."],
    exercise:{ sentence:"The dark clouds ___ that it will rain soon.", answer:"indicate" } },

  { id:"ac-15", cat:"academic", stars:2, en:"obtain",
    he:"להשיג", def:"to get or receive something, especially with effort",
    examples:["You must obtain permission before entering the lab.", "She obtained a high score on the final test."],
    exercise:{ sentence:"He worked hard to ___ the swimming certificate.", answer:"obtain" } },

  { id:"ac-16", cat:"academic", stars:2, en:"occur",
    he:"להתרחש", def:"to happen, especially unexpectedly",
    examples:["Earthquakes occur along fault lines in the earth.", "The accident occurred yesterday morning on the highway."],
    exercise:{ sentence:"When did the important event ___?", answer:"occur" } },

  { id:"ac-17", cat:"academic", stars:2, en:"participate",
    he:"להשתתף", def:"to take part in an activity or event",
    examples:["All students must participate in the class discussion.", "She participated in the national science competition."],
    exercise:{ sentence:"Everyone is encouraged to ___ in the activity.", answer:"participate" } },

  { id:"ac-18", cat:"academic", stars:3, en:"perceive",
    he:"לתפוס / להבחין", def:"to notice or understand something using your senses or mind",
    examples:["Different people perceive colors in different ways.", "He perceived that something was wrong right away."],
    exercise:{ sentence:"How do you ___ the main problem?", answer:"perceive" } },

  { id:"ac-19", cat:"academic", stars:2, en:"predict",
    he:"לנבא", def:"to say what you think will happen in the future",
    examples:["Meteorologists predict the weather using satellites.", "Can you predict what will happen next in the story?"],
    exercise:{ sentence:"Scientists can ___ when an eclipse will occur.", answer:"predict" } },

  { id:"ac-20", cat:"academic", stars:1, en:"require",
    he:"לדרוש", def:"to need something or make it necessary",
    examples:["This exercise requires a lot of concentration.", "The course will require two hours of homework each day."],
    exercise:{ sentence:"This recipe ___ three eggs and some flour.", answer:"requires" } },

  // ── 2. EMOTIONS ─────────────────────────────────────────────────────────────
  { id:"em-01", cat:"emotions_adv", stars:1, en:"frustrated",
    he:"מתוסכל", def:"upset because you cannot do or achieve something",
    examples:["She felt frustrated when she couldn't solve the puzzle.", "I get frustrated when people don't listen."],
    exercise:{ sentence:"He was ___ because he kept making the same mistake.", answer:"frustrated" } },

  { id:"em-02", cat:"emotions_adv", stars:2, en:"anxious",
    he:"חרד / מודאג", def:"worried and nervous about what might happen",
    examples:["She felt anxious before the big test.", "He was anxious about the doctor's appointment."],
    exercise:{ sentence:"I always feel ___ before speaking in public.", answer:"anxious" } },

  { id:"em-03", cat:"emotions_adv", stars:2, en:"relieved",
    he:"מוקל / שמח שנגמר", def:"happy because a worry or problem is gone",
    examples:["She was relieved when she passed the difficult exam.", "We were relieved to find the lost cat safe."],
    exercise:{ sentence:"I was so ___ when the long storm finally ended.", answer:"relieved" } },

  { id:"em-04", cat:"emotions_adv", stars:2, en:"determined",
    he:"נחוש", def:"having decided to do something and refusing to give up",
    examples:["She was determined to finish the race despite the pain.", "He is determined to learn English fluently."],
    exercise:{ sentence:"Despite the difficulties, she was ___ to succeed.", answer:"determined" } },

  { id:"em-05", cat:"emotions_adv", stars:1, en:"curious",
    he:"סקרן", def:"wanting very much to know or learn about something",
    examples:["The curious child asked many interesting questions.", "I am curious about how planes manage to fly."],
    exercise:{ sentence:"She is very ___ about how the universe began.", answer:"curious" } },

  { id:"em-06", cat:"emotions_adv", stars:2, en:"overwhelmed",
    he:"מוצף / המום", def:"feeling like you have too much to deal with at once",
    examples:["He felt overwhelmed by the huge amount of homework.", "She was overwhelmed by the crowd's loud cheering."],
    exercise:{ sentence:"I felt ___ with so many important decisions to make.", answer:"overwhelmed" } },

  { id:"em-07", cat:"emotions_adv", stars:1, en:"confident",
    he:"בטוח בעצמו", def:"feeling sure and positive about your own abilities",
    examples:["She gave a confident speech in front of the whole class.", "Be confident — you studied hard and know the answers!"],
    exercise:{ sentence:"After much practice, he felt ___ about the presentation.", answer:"confident" } },

  { id:"em-08", cat:"emotions_adv", stars:2, en:"hesitant",
    he:"מהסס", def:"unsure or slow to do something because you are uncertain",
    examples:["She was hesitant to raise her hand in class.", "He seemed hesitant about accepting the difficult job offer."],
    exercise:{ sentence:"She was ___ to try the unusual new food.", answer:"hesitant" } },

  { id:"em-09", cat:"emotions_adv", stars:2, en:"enthusiastic",
    he:"נלהב", def:"very excited and eager about something",
    examples:["The students were enthusiastic about the science field trip.", "She is an enthusiastic and passionate reader."],
    exercise:{ sentence:"He was ___ about joining the robotics club.", answer:"enthusiastic" } },

  { id:"em-10", cat:"emotions_adv", stars:1, en:"disappointed",
    he:"מאוכזב", def:"sad because something was not as good as you expected",
    examples:["He was disappointed that his team lost the final match.", "She felt disappointed with her test result."],
    exercise:{ sentence:"They were ___ when the outdoor concert was canceled.", answer:"disappointed" } },

  { id:"em-11", cat:"emotions_adv", stars:2, en:"grateful",
    he:"אסיר תודה / מכיר טובה", def:"feeling deeply thankful for something kind",
    examples:["She was grateful for her teacher's extra help.", "I am grateful for my family's love and support."],
    exercise:{ sentence:"We are truly ___ for your kindness and generosity.", answer:"grateful" } },

  { id:"em-12", cat:"emotions_adv", stars:1, en:"jealous",
    he:"קנאי", def:"unhappy because someone else has what you want",
    examples:["He was jealous of his friend's shiny new bicycle.", "Try not to feel jealous of other people's success."],
    exercise:{ sentence:"She felt ___ when her little sister got a special prize.", answer:"jealous" } },

  { id:"em-13", cat:"emotions_adv", stars:2, en:"ashamed",
    he:"מתבייש", def:"feeling bad and embarrassed about something wrong you did",
    examples:["He was ashamed of his rude behavior towards his friend.", "She felt deeply ashamed after telling a lie."],
    exercise:{ sentence:"He was ___ when he forgot his best friend's birthday.", answer:"ashamed" } },

  { id:"em-14", cat:"emotions_adv", stars:1, en:"proud",
    he:"גאה", def:"very pleased about something you or others have achieved",
    examples:["She was proud of her excellent science project.", "His parents were extremely proud when he won the award."],
    exercise:{ sentence:"I am so ___ of everything you have achieved this year.", answer:"proud" } },

  { id:"em-15", cat:"emotions_adv", stars:1, en:"guilty",
    he:"אשם", def:"feeling bad inside because you did something wrong",
    examples:["She felt guilty for not telling her friend the truth.", "He looked guilty when asked about the broken window."],
    exercise:{ sentence:"He felt very ___ about taking his friend's pencil.", answer:"guilty" } },

  { id:"em-16", cat:"emotions_adv", stars:1, en:"hopeful",
    he:"מקווה / תקוותי", def:"believing and expecting that good things will happen",
    examples:["She remained hopeful despite all the difficulties.", "We are hopeful that things will improve very soon."],
    exercise:{ sentence:"Despite the clouds, we were ___ the picnic would happen.", answer:"hopeful" } },

  { id:"em-17", cat:"emotions_adv", stars:2, en:"desperate",
    he:"נואש", def:"willing to do anything because you are in a very bad situation",
    examples:["He was desperate for water after the exhausting long hike.", "She made a desperate attempt to finish the project on time."],
    exercise:{ sentence:"The team was ___ to score a goal in the last minute.", answer:"desperate" } },

  { id:"em-18", cat:"emotions_adv", stars:2, en:"content",
    he:"מרוצה / שבע רצון", def:"happy and satisfied with your life or situation",
    examples:["She was content with a simple, peaceful country life.", "After a big delicious meal, he felt completely content."],
    exercise:{ sentence:"I am ___ with the progress I have made this year.", answer:"content" } },

  { id:"em-19", cat:"emotions_adv", stars:2, en:"thrilled",
    he:"נרגש מאוד", def:"extremely excited and very happy about something",
    examples:["She was thrilled to meet her favorite author in person.", "The children were absolutely thrilled by the magic show."],
    exercise:{ sentence:"We were absolutely ___ to hear the wonderful news.", answer:"thrilled" } },

  { id:"em-20", cat:"emotions_adv", stars:3, en:"devastated",
    he:"הרוס / שבור", def:"extremely upset, shocked, and deeply hurt",
    examples:["He was devastated when his beloved dog passed away.", "The whole team was devastated by their sudden unexpected defeat."],
    exercise:{ sentence:"She was completely ___ when she heard the terrible news.", answer:"devastated" } },

  // ── 3. PHRASAL VERBS ────────────────────────────────────────────────────────
  { id:"pv-01", cat:"phrasal_verbs", stars:1, en:"figure out",
    he:"להבין / לפתור", def:"to find the answer or solution to a problem",
    examples:["Can you figure out this tricky math puzzle?", "I finally figured out how to use the new app."],
    exercise:{ sentence:"I can't ___ what this difficult word means.", answer:"figure out" } },

  { id:"pv-02", cat:"phrasal_verbs", stars:2, en:"come up with",
    he:"להמציא / לחשוב על", def:"to think of a new idea, plan, or solution",
    examples:["She came up with a brilliant creative plan.", "Can you come up with a better title for the story?"],
    exercise:{ sentence:"We need to ___ a good answer quickly.", answer:"come up with" } },

  { id:"pv-03", cat:"phrasal_verbs", stars:1, en:"look forward to",
    he:"לצפות בשמחה ל-", def:"to feel excited about something that will happen",
    examples:["I really look forward to the summer holiday every year.", "She looks forward to meeting her old friends."],
    exercise:{ sentence:"We ___ the exciting school trip next month.", answer:"look forward to" } },

  { id:"pv-04", cat:"phrasal_verbs", stars:1, en:"get along with",
    he:"להסתדר עם", def:"to have a friendly and positive relationship with someone",
    examples:["She gets along with all of her classmates.", "Do you get along with your new neighbors?"],
    exercise:{ sentence:"He ___ his new teacher very well.", answer:"gets along with" } },

  { id:"pv-05", cat:"phrasal_verbs", stars:1, en:"run out of",
    he:"נגמר לי / אזל", def:"to use all of something so that none is left",
    examples:["We ran out of milk, so we need to buy more.", "She ran out of time during the important test."],
    exercise:{ sentence:"I can't write more because I ___ paper.", answer:"ran out of" } },

  { id:"pv-06", cat:"phrasal_verbs", stars:2, en:"put up with",
    he:"לסבול / להתמודד עם", def:"to accept something unpleasant without complaining",
    examples:["I can't put up with this loud noise anymore.", "She puts up with a lot of difficulties every day."],
    exercise:{ sentence:"He refuses to ___ rude and disrespectful behavior.", answer:"put up with" } },

  { id:"pv-07", cat:"phrasal_verbs", stars:2, en:"make up for",
    he:"לפצות על", def:"to do something good to repair or fix something bad",
    examples:["He brought flowers to make up for being late.", "She worked extra hours to make up for her mistake."],
    exercise:{ sentence:"I'll buy you ice cream to ___ the canceled trip.", answer:"make up for" } },

  { id:"pv-08", cat:"phrasal_verbs", stars:2, en:"break down",
    he:"להישבר / להתמוטט", def:"to stop working; to cry or collapse suddenly",
    examples:["The old car broke down on the way to school.", "She broke down in tears when she heard the sad news."],
    exercise:{ sentence:"The machine ___ and we had to call a technician.", answer:"broke down" } },

  { id:"pv-09", cat:"phrasal_verbs", stars:1, en:"give up",
    he:"לוותר", def:"to stop trying to do something difficult",
    examples:["Don't give up — you can do it if you keep trying!", "He gave up learning the guitar after only one lesson."],
    exercise:{ sentence:"Never ___ on your important dreams.", answer:"give up" } },

  { id:"pv-10", cat:"phrasal_verbs", stars:2, en:"turn out",
    he:"להתברר", def:"to happen in a particular way; to have a certain result",
    examples:["The party turned out to be absolutely amazing!", "It turned out that the answer to the problem was simple."],
    exercise:{ sentence:"Everything ___ much better than we had expected.", answer:"turned out" } },

  { id:"pv-11", cat:"phrasal_verbs", stars:1, en:"find out",
    he:"לגלות / לברר", def:"to discover a piece of information or a fact",
    examples:["She found out that the big test was postponed.", "How did you find out about the special concert?"],
    exercise:{ sentence:"Did you ___ when the new movie starts?", answer:"find out" } },

  { id:"pv-12", cat:"phrasal_verbs", stars:2, en:"work out",
    he:"לפתור / להתאמן", def:"to solve a problem; to exercise; to end well",
    examples:["I work out at the gym three times a week.", "Don't worry — everything will work out fine in the end."],
    exercise:{ sentence:"We need to ___ a good plan for the project.", answer:"work out" } },

  { id:"pv-13", cat:"phrasal_verbs", stars:1, en:"set up",
    he:"להגדיר / לסדר", def:"to arrange or prepare something ready for use",
    examples:["We set up the tent before it got dark outside.", "She set up a new account on the school website."],
    exercise:{ sentence:"Can you help me ___ the new laptop?", answer:"set up" } },

  { id:"pv-14", cat:"phrasal_verbs", stars:1, en:"take off",
    he:"להמריא / להסיר", def:"to leave the ground (for planes); to remove clothing",
    examples:["The plane took off exactly at 9 o'clock.", "Please take off your muddy shoes at the door."],
    exercise:{ sentence:"The rocket will ___ in exactly five seconds.", answer:"take off" } },

  { id:"pv-15", cat:"phrasal_verbs", stars:1, en:"pick up",
    he:"לאסוף / ללמוד בדרך", def:"to collect a person; to learn something informally",
    examples:["Mom will pick me up from school at three o'clock.", "I picked up a few useful Spanish words on my vacation."],
    exercise:{ sentence:"Can you ___ some fresh bread from the store?", answer:"pick up" } },

  { id:"pv-16", cat:"phrasal_verbs", stars:1, en:"drop off",
    he:"להוריד נוסע / לסיים", def:"to take someone to a place and leave them there",
    examples:["He dropped off his daughter at school every morning.", "Please drop off the important package at the office."],
    exercise:{ sentence:"I'll ___ you right at the train station.", answer:"drop off" } },

  { id:"pv-17", cat:"phrasal_verbs", stars:1, en:"look after",
    he:"לטפל ב-", def:"to take care of a person, animal, or thing",
    examples:["She looks after her little brother every day after school.", "Who will look after the plants while we are away?"],
    exercise:{ sentence:"Please ___ the dog while I'm on my vacation.", answer:"look after" } },

  { id:"pv-18", cat:"phrasal_verbs", stars:1, en:"look up",
    he:"לחפש במילון / ברשת", def:"to search for information in a book or online",
    examples:["Always look up a new word in the dictionary.", "She looked up the answer to her question online."],
    exercise:{ sentence:"I don't know this word — let me ___ it.", answer:"look up" } },

  { id:"pv-19", cat:"phrasal_verbs", stars:2, en:"look into",
    he:"לחקור / לבדוק", def:"to investigate or examine something carefully",
    examples:["The police are looking into the mysterious matter.", "We should look into cheaper and better options."],
    exercise:{ sentence:"The manager will ___ the serious problem.", answer:"look into" } },

  { id:"pv-20", cat:"phrasal_verbs", stars:1, en:"carry on",
    he:"להמשיך", def:"to continue doing something without stopping",
    examples:["Carry on with your work while I'm gone.", "She carried on singing even when it started to rain."],
    exercise:{ sentence:"Please ___ with the interesting lesson.", answer:"carry on" } },

  // ── 4. CONNECTORS ────────────────────────────────────────────────────────────
  { id:"cn-01", cat:"connectors", stars:1, en:"although",
    he:"למרות שֶׁ", def:"even though something is the case or true",
    examples:["Although it was cold outside, we went swimming.", "She smiled although she was feeling very sad inside."],
    exercise:{ sentence:"___ he was tired, he finished all of his homework.", answer:"Although" } },

  { id:"cn-02", cat:"connectors", stars:2, en:"whereas",
    he:"בעוד שֶׁ / לעומת", def:"used to compare two very different things",
    examples:["Cats are quiet animals, whereas dogs bark a lot.", "She likes pop music, whereas her brother prefers rock."],
    exercise:{ sentence:"English uses Latin letters, ___ Hebrew uses a different script.", answer:"whereas" } },

  { id:"cn-03", cat:"connectors", stars:2, en:"meanwhile",
    he:"בינתיים", def:"during the same period of time; at the same time",
    examples:["She read her book; meanwhile, he cooked a delicious dinner.", "Wait here; meanwhile, I'll go and get your bag."],
    exercise:{ sentence:"The students waited; ___, the teacher prepared the test.", answer:"meanwhile" } },

  { id:"cn-04", cat:"connectors", stars:2, en:"otherwise",
    he:"אחרת / אם לא כן", def:"if not; used to show what will happen if you don't do something",
    examples:["Study hard, otherwise you will fail the exam.", "Put on a coat, otherwise you'll catch a cold."],
    exercise:{ sentence:"Hurry up, ___ we'll miss the last bus.", answer:"otherwise" } },

  { id:"cn-05", cat:"connectors", stars:2, en:"unless",
    he:"אלא אם כן", def:"except if; only if something does not happen",
    examples:["I won't go to the party unless you come with me.", "You cannot enter the lab unless you have a ticket."],
    exercise:{ sentence:"She won't know about the surprise ___ you tell her.", answer:"unless" } },

  { id:"cn-06", cat:"connectors", stars:2, en:"whether",
    he:"האם", def:"used when there are two choices or possibilities",
    examples:["I don't know whether to bring an umbrella today.", "She can't decide whether to stay home or go out."],
    exercise:{ sentence:"We still don't know ___ the match will be canceled.", answer:"whether" } },

  { id:"cn-07", cat:"connectors", stars:1, en:"in addition",
    he:"בנוסף לכך", def:"used to introduce another important fact or point",
    examples:["In addition to math, she also studies science.", "The hotel has a swimming pool; in addition, there is a gym."],
    exercise:{ sentence:"___ to English, he speaks fluent French.", answer:"In addition" } },

  { id:"cn-08", cat:"connectors", stars:3, en:"moreover",
    he:"יתרה מכך / זאת ואף זאת", def:"used to add an even more important extra point",
    examples:["The new phone is fast; moreover, the battery lasts all day.", "She is very talented; moreover, she works incredibly hard."],
    exercise:{ sentence:"The plan saves a lot of money. ___, it saves time.", answer:"Moreover" } },

  { id:"cn-09", cat:"connectors", stars:2, en:"besides",
    he:"מלבד / בנוסף", def:"in addition to something; apart from that fact",
    examples:["Besides English, I also study French and Arabic.", "I don't want to go; besides, it is far too cold outside."],
    exercise:{ sentence:"___ studying hard, she also plays basketball twice a week.", answer:"Besides" } },

  { id:"cn-10", cat:"connectors", stars:2, en:"similarly",
    he:"באופן דומה / כמו כן", def:"in the same or a very similar way",
    examples:["Dogs need daily exercise; similarly, cats need regular playtime.", "He spoke kindly; similarly, she responded with great warmth."],
    exercise:{ sentence:"Elephants are very intelligent. ___, dolphins show complex social behavior.", answer:"Similarly" } },

  { id:"cn-11", cat:"connectors", stars:2, en:"in contrast",
    he:"לעומת זאת", def:"used to emphasize a strong difference between two things",
    examples:["He is very loud and energetic; in contrast, his sister is quiet.", "Summer is hot and dry; in contrast, winter here can be very cold."],
    exercise:{ sentence:"Vegetables are very healthy. ___, junk food is not.", answer:"In contrast" } },

  { id:"cn-12", cat:"connectors", stars:1, en:"instead",
    he:"במקום", def:"in place of someone or something; as an alternative",
    examples:["I'll have water instead of sugary juice.", "Instead of watching TV, she read an interesting book."],
    exercise:{ sentence:"Let's walk ___ of taking the crowded bus.", answer:"instead" } },

  { id:"cn-13", cat:"connectors", stars:2, en:"due to",
    he:"בגלל / עקב", def:"because of a particular reason or cause",
    examples:["The flight was delayed due to very bad weather conditions.", "She was absent from school due to illness."],
    exercise:{ sentence:"The outdoor game was canceled ___ the heavy rain.", answer:"due to" } },

  { id:"cn-14", cat:"connectors", stars:2, en:"as a result",
    he:"כתוצאה מכך", def:"because of what happened; for that reason",
    examples:["She practiced every day; as a result, she improved greatly.", "It snowed very heavily; as a result, school was canceled."],
    exercise:{ sentence:"He forgot to set his alarm; ___, he was very late.", answer:"as a result" } },

  { id:"cn-15", cat:"connectors", stars:2, en:"in conclusion",
    he:"לסיכום", def:"used to introduce the final summary of ideas",
    examples:["In conclusion, regular exercise is very important for health.", "In conclusion, I strongly believe we should help our community."],
    exercise:{ sentence:"___, reading every day improves your vocabulary greatly.", answer:"In conclusion" } },

  { id:"cn-16", cat:"connectors", stars:1, en:"for example",
    he:"לדוגמה", def:"used to give a specific example to support a point",
    examples:["Many fruits are very healthy; for example, apples and oranges.", "There are many interesting languages, for example, English and Arabic."],
    exercise:{ sentence:"There are many exciting sports, ___, football and basketball.", answer:"for example" } },

  { id:"cn-17", cat:"connectors", stars:1, en:"especially",
    he:"במיוחד / בפרט", def:"more than others; used to single out one thing",
    examples:["I love all animals, especially dogs and dolphins.", "The meal was delicious, especially the wonderful dessert."],
    exercise:{ sentence:"I enjoy all outdoor activities, ___ hiking in the mountains.", answer:"especially" } },

  { id:"cn-18", cat:"connectors", stars:1, en:"generally",
    he:"בדרך כלל / בכלליות", def:"usually; in most situations or cases",
    examples:["I generally wake up at seven o'clock in the morning.", "Cats are generally quite independent and solitary animals."],
    exercise:{ sentence:"___, homework should be finished before watching any television.", answer:"Generally" } },

  { id:"cn-19", cat:"connectors", stars:2, en:"therefore",
    he:"לפיכך / לכן", def:"for that reason; used to show a logical consequence",
    examples:["He was very sick; therefore, he stayed home from school.", "I studied very hard; therefore, I passed the test easily."],
    exercise:{ sentence:"She prepared very well; ___, she felt completely ready.", answer:"therefore" } },

  { id:"cn-20", cat:"connectors", stars:1, en:"however",
    he:"אבל / עם זאת", def:"despite that; used to introduce a surprising contrast",
    examples:["I enjoy coffee very much; however, I drink too much of it.", "It was a very difficult task; however, we finished it successfully."],
    exercise:{ sentence:"The math test was very hard. ___, most students passed it.", answer:"However" } },

  // ── 5. ADVANCED ADJECTIVES ───────────────────────────────────────────────────
  { id:"aj-01", cat:"adjectives_adv", stars:1, en:"enormous",
    he:"עצום / ענק", def:"extremely large in size or amount",
    examples:["The blue whale is an enormous and magnificent animal.", "They live in an enormous house with ten large rooms."],
    exercise:{ sentence:"The ancient whale skeleton on display is truly ___.", answer:"enormous" } },

  { id:"aj-02", cat:"adjectives_adv", stars:1, en:"tiny",
    he:"קטנטן / זעיר", def:"very small in size",
    examples:["A newborn baby's fingers are incredibly tiny.", "She lives in a tiny but cozy apartment in the busy city."],
    exercise:{ sentence:"The little ant is a ___ but very strong insect.", answer:"tiny" } },

  { id:"aj-03", cat:"adjectives_adv", stars:2, en:"ancient",
    he:"עתיק / קדום", def:"very old, from thousands of years ago",
    examples:["The ancient Egyptian pyramids were built thousands of years ago.", "She collected ancient gold coins from the interesting market."],
    exercise:{ sentence:"Jerusalem is a beautiful and ___ historic city.", answer:"ancient" } },

  { id:"aj-04", cat:"adjectives_adv", stars:1, en:"modern",
    he:"מודרני", def:"new and belonging to the present or recent time",
    examples:["Modern smartphones can do almost everything you need.", "The city has a very fast and modern transportation system."],
    exercise:{ sentence:"The school just opened a brand new ___ computer lab.", answer:"modern" } },

  { id:"aj-05", cat:"adjectives_adv", stars:2, en:"extraordinary",
    he:"יוצא מן הכלל", def:"very unusual, surprising, or impressively great",
    examples:["She has a truly extraordinary natural talent for painting.", "The breathtaking view from the mountain top was extraordinary."],
    exercise:{ sentence:"His incredible memory for long numbers is truly ___.", answer:"extraordinary" } },

  { id:"aj-06", cat:"adjectives_adv", stars:1, en:"obvious",
    he:"ברור / מובן מאליו", def:"easy for anyone to see, understand, or notice",
    examples:["It's obvious that he didn't sleep — just look at his tired eyes.", "The answer seems completely obvious once you think about it."],
    exercise:{ sentence:"It is ___ that she loves music — she sings everywhere.", answer:"obvious" } },

  { id:"aj-07", cat:"adjectives_adv", stars:2, en:"frequent",
    he:"תכוף / שכיח", def:"happening or occurring many times; common",
    examples:["She is a very frequent and loyal visitor to the public library.", "Frequent handwashing is essential to help prevent the spread of illness."],
    exercise:{ sentence:"I make very ___ visits to my grandparents every week.", answer:"frequent" } },

  { id:"aj-08", cat:"adjectives_adv", stars:2, en:"rare",
    he:"נדיר", def:"not happening often; not common or easily found",
    examples:["Seeing a brilliant shooting star is a very rare experience.", "That beautiful type of butterfly is extremely rare in this country."],
    exercise:{ sentence:"Finding a lucky four-leaf clover is very ___.", answer:"rare" } },

  { id:"aj-09", cat:"adjectives_adv", stars:2, en:"temporary",
    he:"זמני", def:"lasting or existing for only a short time",
    examples:["This messy situation is only a temporary solution.", "She found an interesting temporary job during the summer break."],
    exercise:{ sentence:"The discomfort was ___ and went away after just one day.", answer:"temporary" } },

  { id:"aj-10", cat:"adjectives_adv", stars:2, en:"permanent",
    he:"קבוע / תמידי", def:"lasting forever or for a very long time",
    examples:["A tattoo is permanent — it simply won't wash off your skin.", "After many months, he finally got a permanent job at the company."],
    exercise:{ sentence:"Moving to a completely new country is a ___ life change.", answer:"permanent" } },

  { id:"aj-11", cat:"adjectives_adv", stars:2, en:"essential",
    he:"חיוני / הכרחי", def:"completely necessary and extremely important",
    examples:["Clean water is absolutely essential for all forms of life.", "Getting enough good sleep is essential for concentration at school."],
    exercise:{ sentence:"Fresh fruits and vegetables are ___ for a healthy balanced diet.", answer:"essential" } },

  { id:"aj-12", cat:"adjectives_adv", stars:2, en:"optional",
    he:"אופציונלי / רשות", def:"not required; you can choose to do it or not",
    examples:["The extra reading homework is optional, but highly recommended.", "Attending the afternoon ceremony is completely optional."],
    exercise:{ sentence:"The advanced bonus project is ___; you don't have to do it.", answer:"optional" } },

  { id:"aj-13", cat:"adjectives_adv", stars:2, en:"complex",
    he:"מורכב", def:"having many different and connected parts; not simple",
    examples:["That challenging math problem was extremely complex.", "Human emotions and feelings can be very complex to understand."],
    exercise:{ sentence:"This interesting machine has a very ___ design with many parts.", answer:"complex" } },

  { id:"aj-14", cat:"adjectives_adv", stars:1, en:"positive",
    he:"חיובי", def:"good, hopeful, or constructive; not negative",
    examples:["Always try your best to have a positive attitude towards learning.", "The doctor said the test results were positive news."],
    exercise:{ sentence:"Stay ___ and you will definitely find a good solution.", answer:"positive" } },

  { id:"aj-15", cat:"adjectives_adv", stars:1, en:"negative",
    he:"שלילי", def:"bad or harmful; the opposite of positive",
    examples:["Too much daily screen time can have negative health effects.", "Negative thinking over time can seriously affect your well-being."],
    exercise:{ sentence:"Air pollution has a very ___ effect on our environment.", answer:"negative" } },

  { id:"aj-16", cat:"adjectives_adv", stars:2, en:"physical",
    he:"פיזי / גופני", def:"relating to the body rather than the mind",
    examples:["Regular physical exercise keeps both your body and mind healthy.", "The library has books in physical form as well as digital form."],
    exercise:{ sentence:"She does daily ___ therapy to help recover from her injury.", answer:"physical" } },

  { id:"aj-17", cat:"adjectives_adv", stars:2, en:"mental",
    he:"נפשי / שכלי", def:"relating to the mind and thinking processes",
    examples:["Reading books every day is great for your mental health.", "Solving challenging puzzles regularly improves your mental skills."],
    exercise:{ sentence:"Getting enough regular sleep greatly improves your ___ focus.", answer:"mental" } },

  { id:"aj-18", cat:"adjectives_adv", stars:1, en:"social",
    he:"חברתי", def:"relating to society or to spending time with other people",
    examples:["Social media can connect people all around the wide world.", "Human beings are naturally social creatures who need interaction."],
    exercise:{ sentence:"School is a very important ___ environment for young children.", answer:"social" } },

  { id:"aj-19", cat:"adjectives_adv", stars:2, en:"traditional",
    he:"מסורתי", def:"following customs and ways that have existed for a long time",
    examples:["We had a wonderful traditional Passover seder with our family.", "The colorful traditional clothing of the festival was beautiful."],
    exercise:{ sentence:"Our family always eats ___ foods on important holidays.", answer:"traditional" } },

  { id:"aj-20", cat:"adjectives_adv", stars:3, en:"contemporary",
    he:"עכשווי / בן-זמננו", def:"existing or happening in the present time; modern",
    examples:["I prefer contemporary music to classical music from the past.", "The gallery showcases contemporary art by talented local artists."],
    exercise:{ sentence:"The new building has a sleek ___ design with lots of glass.", answer:"contemporary" } },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const ADVANCED_TOTAL = ADVANCED_WORDS.length; // 100

export function getWordsByCategory(cat: AdvCat): AdvancedWord[] {
  return ADVANCED_WORDS.filter((w) => w.cat === cat);
}
