"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { WAR_SEEDS, ADVANCED_VOCAB_SET, GameDifficulty } from "@/lib/content/advanced-games";
import { saveScore, getScore } from "@/lib/storage/advanced-games";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";

const GAME_ID = "word-race";
const WORDS_PER_ROUND = 10;
const TIME_PER_WORD = 5; // seconds

type Phase = "select" | "playing" | "results";

interface WordEntry { seed: string; answer: string; xp: number; ms: number; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function calcWordXP(word: string, ms: number): number {
  if (!word.trim()) return 0;
  const base = ADVANCED_VOCAB_SET.has(word.toLowerCase()) ? 8 : 5;
  const speed = ms < 2000 ? 3 : ms < 4000 ? 1 : 0;
  return base + speed;
}

// ─────────────────────────────────────────────────────────────────────────────
// Timer bar
// ─────────────────────────────────────────────────────────────────────────────
function TimerBar({ remaining, total }: { remaining: number; total: number }) {
  const pct = (remaining / total) * 100;
  const color = pct > 50 ? "bg-green-400" : pct > 25 ? "bg-amber-400" : "bg-red-500";
  return (
    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-none`}
        style={{ width: `${pct}%`, transition: "width 0.1s linear" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Difficulty select
// ─────────────────────────────────────────────────────────────────────────────
function SelectView({ onStart }: { onStart: (d: GameDifficulty) => void }) {
  const diffs: { d: GameDifficulty; label: string; desc: string; color: string }[] = [
    { d:"easy",   label:"קל",     desc:"מילים יומיומיות בסיסיות",   color:"bg-green-100 border-green-300 text-green-800" },
    { d:"medium", label:"בינוני", desc:"מילות B1 ורעיונות מופשטים", color:"bg-amber-100 border-amber-300 text-amber-800" },
    { d:"hard",   label:"קשה",    desc:"מילים אקדמיות מתקדמות",     color:"bg-red-100 border-red-300 text-red-800" },
  ];
  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      <div className="text-6xl mb-3">⚡</div>
      <h1 className="text-3xl font-bold mb-1">מרוץ אסוציאציות</h1>
      <p className="text-gray-500 mb-8 text-sm">
        ראה מילה → כתוב מילה קשורה תוך {TIME_PER_WORD} שניות! {WORDS_PER_ROUND} מילות שרשרת.
      </p>
      <div className="space-y-3">
        {diffs.map(({ d, label, desc, color }) => {
          const s = getScore(GAME_ID, d);
          return (
            <button
              key={d}
              onClick={() => onStart(d)}
              className={`w-full p-4 rounded-2xl border-2 ${color} flex items-center justify-between hover:scale-[1.02] transition-transform`}
            >
              <div className="text-right">
                <p className="font-bold">{label}</p>
                <p className="text-xs opacity-70">{desc}</p>
              </div>
              {s.highScore > 0 && (
                <div className="text-right text-xs opacity-70">
                  <div className="font-bold">🏆 {s.highScore} XP</div>
                  <div>{s.gamesPlayed}× שוחק</div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <Link href="/advanced-games" className="mt-6 inline-block text-sm text-gray-400 hover:text-gray-600">
        ← חזרה למשחקים
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Playing view
// ─────────────────────────────────────────────────────────────────────────────
function PlayingView({
  difficulty,
  onDone,
}: {
  difficulty: GameDifficulty;
  onDone: (entries: WordEntry[], totalXP: number) => void;
}) {
  const seeds = shuffle(WAR_SEEDS[difficulty]).slice(0, WORDS_PER_ROUND);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIME_PER_WORD);
  const [entries, setEntries] = useState<WordEntry[]>([]);
  const [flash, setFlash] = useState<"ok" | "skip" | null>(null);
  const startRef = useRef(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = useCallback(
    (forced = false) => {
      const ms = Date.now() - startRef.current;
      const word = forced ? "" : input.trim().toLowerCase();
      const xp = calcWordXP(word, ms);
      const newEntry: WordEntry = { seed: seeds[current], answer: word, xp, ms };
      const next = current + 1;
      setFlash(word ? "ok" : "skip");
      setTimeout(() => {
        setFlash(null);
        if (next >= WORDS_PER_ROUND) {
          const all = [...entries, newEntry];
          onDone(all, all.reduce((s, e) => s + e.xp, 0));
        } else {
          setEntries((e) => [...e, newEntry]);
          setCurrent(next);
          setInput("");
          setTimeLeft(TIME_PER_WORD);
          startRef.current = Date.now();
          inputRef.current?.focus();
        }
      }, 300);
    },
    [current, entries, input, seeds, onDone]
  );

  // Countdown
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) { submit(true); return TIME_PER_WORD; }
        return t - 0.1;
      });
    }, 100);
    return () => clearInterval(id);
  }, [submit]);

  useEffect(() => { inputRef.current?.focus(); }, [current]);

  const isAdvanced = input.trim() && ADVANCED_VOCAB_SET.has(input.trim().toLowerCase());

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Progress */}
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>{current + 1} / {WORDS_PER_ROUND}</span>
        <span className="font-bold text-amber-600">
          {entries.reduce((s, e) => s + e.xp, 0)} XP
        </span>
      </div>
      <TimerBar remaining={timeLeft} total={TIME_PER_WORD} />

      {/* Seed word */}
      <div
        className={`mt-6 mb-4 rounded-3xl p-8 text-center transition-colors ${
          flash === "ok" ? "bg-green-100" : flash === "skip" ? "bg-red-100" : "bg-amber-50 border-2 border-amber-200"
        }`}
      >
        <p className="text-sm text-gray-400 mb-1">מילה נתונה:</p>
        <p className="text-5xl font-bold text-amber-700" dir="ltr">{seeds[current]}</p>
      </div>

      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && input.trim() && submit()}
          placeholder="כתוב מילה קשורה ולחץ Enter..."
          dir="ltr"
          className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 text-xl focus:border-amber-400 focus:outline-none text-center"
        />
        {isAdvanced && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">
            +8 XP 🌟
          </span>
        )}
      </div>

      <button
        onClick={() => input.trim() && submit()}
        disabled={!input.trim()}
        className="mt-3 w-full py-3 rounded-2xl bg-amber-500 text-white font-bold disabled:opacity-40 hover:bg-amber-600 transition"
      >
        שלח →
      </button>

      {/* Previous entries */}
      {entries.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {entries.map((e, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                e.answer ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-400"
              }`}
            >
              {e.answer || "—"} {e.xp > 0 ? `+${e.xp}` : ""}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Results view
// ─────────────────────────────────────────────────────────────────────────────
function ResultsView({
  entries,
  totalXP,
  difficulty,
  onPlay,
}: {
  entries: WordEntry[];
  totalXP: number;
  difficulty: GameDifficulty;
  onPlay: () => void;
}) {
  const answered = entries.filter((e) => e.answer).length;
  const advanced = entries.filter((e) => ADVANCED_VOCAB_SET.has(e.answer)).length;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-3xl p-6 text-white text-center mb-5">
        <div className="text-5xl mb-2">⚡</div>
        <h2 className="text-2xl font-bold">סיום!</h2>
        <div className="text-4xl font-bold mt-2">+{totalXP} XP</div>
        <p className="text-white/80 text-sm mt-1">
          {answered}/{WORDS_PER_ROUND} מילות ענית · {advanced} מילות מתקדמות
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <h3 className="font-bold text-gray-700 mb-3">השרשרת שלך:</h3>
        <div className="space-y-2">
          {entries.map((e, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <span className="text-gray-500">{e.seed}</span>
                <span className="text-gray-300">→</span>
                <span className={`font-medium ${e.answer ? "text-gray-800" : "text-gray-300"}`} dir="ltr">
                  {e.answer || "דילגת"}
                </span>
                {ADVANCED_VOCAB_SET.has(e.answer) && <span className="text-purple-500 text-xs">🌟</span>}
              </div>
              <span className="text-amber-600 font-bold">+{e.xp}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onPlay} className="w-full py-3 rounded-2xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition mb-3">
        שחק שוב 🔄
      </button>
      <Link href="/advanced-games" className="block text-center text-sm text-gray-400 hover:text-gray-600">
        ← חזרה למשחקים
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export default function WordRacePage() {
  const { addPoints } = useProgress();
  const { checkAndUnlock } = useAchievements();
  const [phase, setPhase] = useState<Phase>("select");
  const [difficulty, setDifficulty] = useState<GameDifficulty>("easy");
  const [results, setResults] = useState<{ entries: WordEntry[]; totalXP: number } | null>(null);

  function handleStart(d: GameDifficulty) { setDifficulty(d); setPhase("playing"); }

  function handleDone(entries: WordEntry[], totalXP: number) {
    saveScore(GAME_ID, difficulty, totalXP);
    const updated = addPoints(totalXP);
    if (updated) checkAndUnlock(updated);
    setResults({ entries, totalXP });
    setPhase("results");
  }

  return (
    <div className="min-h-screen bg-amber-50" dir="rtl">
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link href="/advanced-games" className="text-gray-500 text-sm">← משחקים</Link>
        <h1 className="font-bold text-sm">⚡ מרוץ אסוציאציות</h1>
        <span />
      </nav>
      {phase === "select" && <SelectView onStart={handleStart} />}
      {phase === "playing" && (
        <PlayingView key={Math.random()} difficulty={difficulty} onDone={handleDone} />
      )}
      {phase === "results" && results && (
        <ResultsView
          entries={results.entries}
          totalXP={results.totalXP}
          difficulty={difficulty}
          onPlay={() => setPhase("playing")}
        />
      )}
    </div>
  );
}
