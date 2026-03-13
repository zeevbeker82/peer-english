"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CC_CATEGORIES, CCCategory, GameDifficulty } from "@/lib/content/advanced-games";
import { saveScore, getScore } from "@/lib/storage/advanced-games";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";

const GAME_ID = "category-challenge";
const TOTAL_SECONDS = 60;
const XP_BASIC    = 5;
const XP_ADVANCED = 10;

type Phase = "select" | "playing" | "results";

interface CatResult {
  category: CCCategory;
  wordsTyped: string[];
  basicCount: number;
  advancedCount: number;
  totalXP: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
}

// ─────────────────────────────────────────────────────────────────────────────
// Select view
// ─────────────────────────────────────────────────────────────────────────────
function SelectView({ onStart }: { onStart: (d: GameDifficulty) => void }) {
  const diffs: { d: GameDifficulty; label: string; desc: string; cats: string }[] = [
    { d:"easy",   label:"קל",     desc:"קטגוריות יומיומיות",        cats:"בעלי חיים · אוכל · צבעים" },
    { d:"medium", label:"בינוני", desc:"קטגוריות ברמת B1",           cats:"ספורט · טכנולוגיה · טבע" },
    { d:"hard",   label:"קשה",    desc:"קטגוריות מופשטות ומתקדמות", cats:"רגשות · מקצועות · נסיעות" },
  ];
  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      <div className="text-6xl mb-3">📂</div>
      <h1 className="text-3xl font-bold mb-1">אתגר קטגוריות</h1>
      <p className="text-gray-500 mb-2 text-sm">כתוב כמה שיותר מילות קטגוריה תוך {TOTAL_SECONDS} שניות!</p>
      <div className="flex justify-center gap-4 text-xs text-gray-400 mb-8">
        <span className="bg-gray-100 px-2 py-1 rounded-full">מילה רגילה = +{XP_BASIC} XP</span>
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">מילה מתקדמת = +{XP_ADVANCED} XP 🌟</span>
      </div>
      <div className="space-y-3">
        {diffs.map(({ d, label, desc, cats }) => {
          const s = getScore(GAME_ID, d);
          return (
            <button key={d} onClick={() => onStart(d)}
              className="w-full p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-800 flex items-center justify-between hover:bg-emerald-100 transition">
              <div className="text-right">
                <p className="font-bold">📂 {label}</p>
                <p className="text-xs opacity-70">{desc}</p>
                <p className="text-xs opacity-50 mt-0.5">{cats}</p>
              </div>
              {s.highScore > 0 && (
                <div className="text-xs text-right opacity-70">
                  <div className="font-bold">🏆 {s.highScore} XP</div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <Link href="/advanced-games" className="mt-6 inline-block text-sm text-gray-400">← חזרה</Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Playing view
// ─────────────────────────────────────────────────────────────────────────────
function PlayingView({ difficulty, onDone }: {
  difficulty: GameDifficulty;
  onDone: (result: CatResult) => void;
}) {
  const cats = CC_CATEGORIES.filter((c) => c.difficulty === difficulty);
  const category = shuffle(cats)[0];

  const basicSet    = new Set(category.basic.map((w) => w.toLowerCase()));
  const advancedSet = new Set(category.advanced.map((w) => w.toLowerCase()));

  const [input, setInput] = useState("");
  const [words, setWords] = useState<{ word: string; type: "basic" | "advanced" | "invalid" }[]>([]);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [flash, setFlash] = useState<"ok" | "adv" | "dup" | "inv" | null>(null);
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef(false);

  const finish = (finalWords: typeof words, finalScore: number) => {
    if (doneRef.current) return;
    doneRef.current = true;
    const basicCount    = finalWords.filter((w) => w.type === "basic").length;
    const advancedCount = finalWords.filter((w) => w.type === "advanced").length;
    onDone({ category, wordsTyped: finalWords.map((w) => w.word), basicCount, advancedCount, totalXP: finalScore });
  };

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(id); finish(words, score); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function handleSubmit() {
    const w = input.trim().toLowerCase();
    if (!w) return;
    setInput("");

    // Already used?
    if (words.some((e) => e.word === w)) { setFlash("dup"); setTimeout(() => setFlash(null), 600); return; }

    if (advancedSet.has(w)) {
      const newWords = [...words, { word: w, type: "advanced" as const }];
      const newScore = score + XP_ADVANCED;
      setWords(newWords); setScore(newScore);
      setFlash("adv"); setTimeout(() => setFlash(null), 800);
    } else if (basicSet.has(w)) {
      const newWords = [...words, { word: w, type: "basic" as const }];
      const newScore = score + XP_BASIC;
      setWords(newWords); setScore(newScore);
      setFlash("ok"); setTimeout(() => setFlash(null), 600);
    } else {
      setWords([...words, { word: w, type: "invalid" as const }]);
      setFlash("inv"); setTimeout(() => setFlash(null), 600);
    }
  }

  const timerColor = timeLeft > 30 ? "text-green-600" : timeLeft > 15 ? "text-amber-600" : "text-red-600";
  const flashBg = flash === "adv" ? "bg-purple-100" : flash === "ok" ? "bg-green-100" : flash === "dup" ? "bg-yellow-100" : flash === "inv" ? "bg-red-100" : "bg-emerald-50";

  return (
    <div className="max-w-md mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className={`font-mono text-3xl font-bold ${timerColor}`}>{timeLeft}s</div>
        <div className="text-center">
          <div className="text-4xl">{category.icon}</div>
          <div className="font-bold text-gray-800">{category.name_he}</div>
          <div className="text-xs text-gray-400">{category.name_en}</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-emerald-600 text-xl">{score} XP</div>
          <div className="text-xs text-gray-400">{words.filter((w) => w.type !== "invalid").length} מילים</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div className={`h-full rounded-full transition-none ${timerColor.replace("text", "bg")}`}
          style={{ width: `${(timeLeft / TOTAL_SECONDS) * 100}%`, transition: "width 1s linear" }} />
      </div>

      {/* Input */}
      <div className={`flex gap-2 mb-4 transition-colors p-1 rounded-2xl ${flashBg}`}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Type a word and press Enter..."
          dir="ltr"
          className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-3 text-base focus:border-emerald-400 focus:outline-none bg-white"
        />
        <button onClick={handleSubmit} className="px-4 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition">→</button>
      </div>

      {/* Flash message */}
      {flash && (
        <div className={`text-center text-sm font-bold mb-3 ${
          flash === "adv" ? "text-purple-700" :
          flash === "ok"  ? "text-green-700"  :
          flash === "dup" ? "text-amber-700"  : "text-red-600"
        }`}>
          {flash === "adv" ? `🌟 מילה מתקדמת! +${XP_ADVANCED} XP` :
           flash === "ok"  ? `✓ נכון! +${XP_BASIC} XP` :
           flash === "dup" ? "כבר כתבת מילה זו!" :
           "✗ המילה לא בקטגוריה"}
        </div>
      )}

      {/* Words collected */}
      <div className="flex flex-wrap gap-2 justify-center">
        {words.map((entry, i) => (
          <span key={i} className={`px-3 py-1 rounded-full text-sm font-medium ${
            entry.type === "advanced" ? "bg-purple-100 text-purple-800 ring-1 ring-purple-300" :
            entry.type === "basic"    ? "bg-green-100 text-green-800" :
                                        "bg-red-50 text-red-400 line-through"
          }`} dir="ltr">
            {entry.word}
            {entry.type === "advanced" && " 🌟"}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Results view
// ─────────────────────────────────────────────────────────────────────────────
function ResultsView({ result, onPlay }: { result: CatResult; onPlay: () => void }) {
  const { category, basicCount, advancedCount, totalXP } = result;
  const missed = [...category.basic.filter((w) => !result.wordsTyped.includes(w)).slice(0, 5),
                  ...category.advanced.filter((w) => !result.wordsTyped.includes(w)).slice(0, 3)];

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white text-center mb-5">
        <div className="text-5xl mb-2">{category.icon}</div>
        <h2 className="text-2xl font-bold">{category.name_he}</h2>
        <div className="text-4xl font-bold mt-2">+{totalXP} XP</div>
        <div className="flex justify-center gap-4 mt-3 text-sm text-white/80">
          <span>📗 {basicCount} רגילות</span>
          <span>🌟 {advancedCount} מתקדמות</span>
        </div>
      </div>

      {missed.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <p className="font-bold text-gray-700 mb-2 text-sm">💡 מילים שיכולת לכתוב:</p>
          <div className="flex flex-wrap gap-2">
            {missed.map((w) => (
              <span key={w} className={`px-2 py-1 rounded-full text-xs ${
                category.advanced.includes(w) ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
              }`} dir="ltr">{w}{category.advanced.includes(w) ? " 🌟" : ""}</span>
            ))}
          </div>
        </div>
      )}

      <button onClick={onPlay} className="w-full py-3 rounded-2xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition mb-3">שחק שוב 🔄</button>
      <Link href="/advanced-games" className="block text-center text-sm text-gray-400 hover:text-gray-600">← חזרה למשחקים</Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export default function CategoryChallengePage() {
  const { addPoints } = useProgress();
  const { checkAndUnlock } = useAchievements();
  const [phase, setPhase] = useState<Phase>("select");
  const [difficulty, setDifficulty] = useState<GameDifficulty>("easy");
  const [result, setResult] = useState<CatResult | null>(null);

  function handleDone(r: CatResult) {
    saveScore(GAME_ID, difficulty, r.totalXP);
    const updated = addPoints(r.totalXP);
    if (updated) checkAndUnlock(updated);
    setResult(r);
    setPhase("results");
  }

  return (
    <div className="min-h-screen bg-emerald-50" dir="rtl">
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link href="/advanced-games" className="text-gray-500 text-sm">← משחקים</Link>
        <h1 className="font-bold text-sm">📂 אתגר קטגוריות</h1>
        <span />
      </nav>
      {phase === "select" && <SelectView onStart={(d) => { setDifficulty(d); setPhase("playing"); }} />}
      {phase === "playing" && <PlayingView key={Date.now()} difficulty={difficulty} onDone={handleDone} />}
      {phase === "results" && result && <ResultsView result={result} onPlay={() => setPhase("playing")} />}
    </div>
  );
}
