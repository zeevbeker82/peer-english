"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ST_SENTENCES, STSentence, GameDifficulty } from "@/lib/content/advanced-games";
import { saveScore, getScore } from "@/lib/storage/advanced-games";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";

const GAME_ID = "speed-translation";
const SECONDS_PER_SENTENCE = 30;
const ROUND_SIZE = 10;
const XP_CORRECT = 10;
const XP_SPEED_FAST = 5;   // <8s
const XP_SPEED_MED  = 2;   // <15s

type Phase = "select" | "playing" | "results";
type SentPhase = "translating" | "reveal";

interface SentResult { sentence: STSentence; answer: string; correct: boolean; ms: number; xp: number; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────────────────────────────────────────
// Select view
// ─────────────────────────────────────────────────────────────────────────────
function SelectView({ onStart }: { onStart: (d: GameDifficulty) => void }) {
  const diffs: { d: GameDifficulty; label: string; desc: string }[] = [
    { d:"easy",   label:"קל",     desc:"משפטים פשוטים יומיומיים" },
    { d:"medium", label:"בינוני", desc:"משפטים מורכבים, B1" },
    { d:"hard",   label:"קשה",    desc:"משפטים עם תנאיים וזמנים מורכבים" },
  ];
  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      <div className="text-6xl mb-3">🚀</div>
      <h1 className="text-3xl font-bold mb-1">תרגום מהיר</h1>
      <p className="text-gray-500 mb-2 text-sm">תרגם {ROUND_SIZE} משפטים מעברית לאנגלית · {SECONDS_PER_SENTENCE} שניות למשפט</p>
      <p className="text-xs text-gray-400 mb-8">תדרג את עצמך ✓ נכון / ✗ לא נכון לאחר הצגת התשובה</p>
      <div className="space-y-3">
        {diffs.map(({ d, label, desc }) => {
          const s = getScore(GAME_ID, d);
          return (
            <button key={d} onClick={() => onStart(d)}
              className="w-full p-4 rounded-2xl border-2 border-blue-200 bg-blue-50 text-blue-800 flex items-center justify-between hover:bg-blue-100 transition">
              <div className="text-right">
                <p className="font-bold">🚀 {label}</p>
                <p className="text-xs opacity-70">{desc}</p>
              </div>
              {s.highScore > 0 && (
                <div className="text-xs text-right opacity-70">
                  <div className="font-bold">🏆 {s.highScore} XP</div>
                  <div>{s.gamesPlayed}× שוחק</div>
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
  onDone: (results: SentResult[], totalXP: number) => void;
}) {
  const sentences = shuffle(ST_SENTENCES.filter((s) => s.difficulty === difficulty)).slice(0, ROUND_SIZE);
  const [current, setCurrent] = useState(0);
  const [sentPhase, setSentPhase] = useState<SentPhase>("translating");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_SENTENCE);
  const [results, setResults] = useState<SentResult[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const startRef = useRef(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  const reveal = useCallback(() => {
    setSentPhase("reveal");
  }, []);

  // Countdown
  useEffect(() => {
    if (sentPhase !== "translating") return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(id); reveal(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [sentPhase, reveal]);

  useEffect(() => { inputRef.current?.focus(); }, [current, sentPhase]);

  function handleReveal() { reveal(); }

  function handleMark(correct: boolean) {
    const ms = Date.now() - startRef.current;
    let xp = 0;
    if (correct) {
      xp += XP_CORRECT;
      if (ms < 8000) xp += XP_SPEED_FAST;
      else if (ms < 15000) xp += XP_SPEED_MED;
    }
    const newResult: SentResult = { sentence: sentences[current], answer: input, correct, ms, xp };
    const newResults = [...results, newResult];
    const newTotal = totalXP + xp;

    if (current + 1 >= ROUND_SIZE) {
      onDone(newResults, newTotal);
    } else {
      setResults(newResults);
      setTotalXP(newTotal);
      setCurrent((c) => c + 1);
      setInput("");
      setTimeLeft(SECONDS_PER_SENTENCE);
      setSentPhase("translating");
      startRef.current = Date.now();
    }
  }

  const sentence = sentences[current];

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Progress */}
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>{current + 1} / {ROUND_SIZE}</span>
        <span className="font-bold text-blue-600">{totalXP} XP</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full mb-1 overflow-hidden">
        <div className="h-full bg-blue-400 rounded-full transition-all" style={{ width: `${(current / ROUND_SIZE) * 100}%` }} />
      </div>

      {/* Timer (only while translating) */}
      {sentPhase === "translating" && (
        <div className={`text-center font-mono font-bold text-lg mb-4 ${timeLeft <= 10 ? "text-red-500" : "text-blue-500"}`}>
          ⏱ {timeLeft}s
        </div>
      )}

      {/* Hebrew sentence */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white text-center mb-4">
        <p className="text-xs opacity-70 mb-2">תרגם לאנגלית:</p>
        <p className="text-2xl font-bold" dir="rtl">{sentence.hebrew}</p>
      </div>

      {/* Input (while translating) */}
      {sentPhase === "translating" && (
        <>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleReveal()}
            placeholder="Type your English translation..."
            dir="ltr"
            className="w-full border-2 border-blue-200 rounded-2xl px-4 py-3 text-base focus:border-blue-400 focus:outline-none mb-3"
          />
          <button
            onClick={handleReveal}
            className="w-full py-3 rounded-2xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
          >
            הצג תשובה →
          </button>
        </>
      )}

      {/* Reveal phase — self assessment */}
      {sentPhase === "reveal" && (
        <div className="space-y-3">
          {/* User answer */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-400 mb-1">התרגום שלך:</p>
            <p className="font-medium text-gray-800" dir="ltr">{input || "(לא ענית)"}</p>
          </div>
          {/* Correct answer */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <p className="text-xs text-green-600 mb-1">✓ תשובה מומלצת:</p>
            <p className="font-bold text-green-800" dir="ltr">{sentence.english}</p>
          </div>
          {/* Self-grade */}
          <p className="text-center text-sm text-gray-600 font-medium">האם התרגום שלך נכון?</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleMark(true)}
              className="py-4 rounded-2xl bg-green-500 text-white font-bold text-lg hover:bg-green-600 transition active:scale-95">
              ✓ נכון +{XP_CORRECT} XP
            </button>
            <button onClick={() => handleMark(false)}
              className="py-4 rounded-2xl bg-red-100 text-red-700 font-bold text-lg hover:bg-red-200 transition active:scale-95">
              ✗ לא נכון
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Results view
// ─────────────────────────────────────────────────────────────────────────────
function ResultsView({ results, totalXP, difficulty, onPlay }: {
  results: SentResult[]; totalXP: number; difficulty: GameDifficulty; onPlay: () => void;
}) {
  const correct = results.filter((r) => r.correct).length;
  const avgMs = Math.round(results.reduce((s, r) => s + r.ms, 0) / results.length / 1000);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white text-center mb-5">
        <div className="text-5xl mb-2">🚀</div>
        <h2 className="text-2xl font-bold">סיבוב הסתיים!</h2>
        <div className="text-4xl font-bold mt-2">+{totalXP} XP</div>
        <div className="flex justify-center gap-4 mt-3 text-sm text-white/80">
          <span>✓ {correct}/{ROUND_SIZE} נכון</span>
          <span>⚡ {avgMs}s ממוצע</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 max-h-64 overflow-y-auto">
        {results.map((r, i) => (
          <div key={i} className={`py-2 border-b border-gray-50 last:border-0 text-sm`}>
            <div className="flex gap-2 items-start">
              <span>{r.correct ? "✅" : "❌"}</span>
              <div className="flex-1">
                <div className="text-gray-500 text-xs mb-0.5">{r.sentence.hebrew}</div>
                <div className="font-medium" dir="ltr">{r.sentence.english}</div>
                {r.xp > 0 && <span className="text-xs text-amber-600 font-bold">+{r.xp} XP</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onPlay} className="w-full py-3 rounded-2xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition mb-3">שחק שוב 🔄</button>
      <Link href="/advanced-games" className="block text-center text-sm text-gray-400 hover:text-gray-600">← חזרה למשחקים</Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export default function SpeedTranslationPage() {
  const { addPoints } = useProgress();
  const { checkAndUnlock } = useAchievements();
  const [phase, setPhase] = useState<Phase>("select");
  const [difficulty, setDifficulty] = useState<GameDifficulty>("easy");
  const [results, setResults] = useState<{ results: SentResult[]; totalXP: number } | null>(null);

  function handleDone(r: SentResult[], xp: number) {
    saveScore(GAME_ID, difficulty, xp);
    addPoints(xp);
    checkAndUnlock();
    setResults({ results: r, totalXP: xp });
    setPhase("results");
  }

  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link href="/advanced-games" className="text-gray-500 text-sm">← משחקים</Link>
        <h1 className="font-bold text-sm">🚀 תרגום מהיר</h1>
        <span />
      </nav>
      {phase === "select" && <SelectView onStart={(d) => { setDifficulty(d); setPhase("playing"); }} />}
      {phase === "playing" && <PlayingView key={Date.now()} difficulty={difficulty} onDone={handleDone} />}
      {phase === "results" && results && (
        <ResultsView results={results.results} totalXP={results.totalXP} difficulty={difficulty} onPlay={() => setPhase("playing")} />
      )}
    </div>
  );
}
