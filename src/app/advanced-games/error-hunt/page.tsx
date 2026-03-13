"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { EH_PASSAGES, EHPassage, EHWord, GameDifficulty } from "@/lib/content/advanced-games";
import { saveScore, getScore } from "@/lib/storage/advanced-games";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";

const GAME_ID = "error-hunt";
const TOTAL_SECONDS = 120; // 2 minutes
const XP_PER_FOUND = 15;
const XP_MISS_PENALTY = 5;
const XP_TIME_BONUS_DIVISOR = 10; // remaining_seconds / 10

type Phase = "select" | "playing" | "results";

interface HuntResult {
  passage: EHPassage;
  found: number[];      // indices of correctly found errors
  wrongClicks: number;
  timeLeft: number;
  totalXP: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Select view
// ─────────────────────────────────────────────────────────────────────────────
function SelectView({ onStart }: { onStart: (d: GameDifficulty) => void }) {
  const diffs: { d: GameDifficulty; label: string; desc: string; count: number }[] = [
    { d:"easy",   label:"קל",     desc:"5 שגיאות — שגיאות בסיסיות",         count: 5 },
    { d:"medium", label:"בינוני", desc:"6 שגיאות — זמנים ושמות עצם",         count: 6 },
    { d:"hard",   label:"קשה",    desc:"8 שגיאות — דקדוק מתקדם",             count: 8 },
  ];
  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      <div className="text-6xl mb-3">🔍</div>
      <h1 className="text-3xl font-bold mb-1">ציד שגיאות</h1>
      <p className="text-gray-500 mb-2 text-sm">מצא את כל השגיאות בטקסט תוך 2 דקות!</p>
      <p className="text-xs text-gray-400 mb-8">+{XP_PER_FOUND} XP לכל שגיאה · -{XP_MISS_PENALTY} על שגיאה שפספסת</p>
      <div className="space-y-3">
        {diffs.map(({ d, label, desc, count }) => {
          const s = getScore(GAME_ID, d);
          return (
            <button key={d} onClick={() => onStart(d)}
              className="w-full p-4 rounded-2xl border-2 border-purple-200 bg-purple-50 text-purple-800 flex items-center justify-between hover:bg-purple-100 transition">
              <div className="text-right">
                <p className="font-bold">{label}</p>
                <p className="text-xs opacity-70">{desc} ({count} שגיאות)</p>
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
function PlayingView({ difficulty, onDone }: { difficulty: GameDifficulty; onDone: (r: HuntResult) => void }) {
  const passage = EH_PASSAGES.find((p) => p.difficulty === difficulty)!;
  const [found, setFound] = useState<Set<number>>(new Set());
  const [wrongClicks, setWrongClicks] = useState(0);
  const [flashIdx, setFlashIdx] = useState<number | null>(null);
  const [flashType, setFlashType] = useState<"good" | "bad" | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);

  // Finish function
  const finish = (fl: number, wc: number, tl: number) => {
    if (doneRef.current) return;
    doneRef.current = true;
    setDone(true);
    const missed = passage.errorCount - fl;
    const xp = Math.max(0,
      fl * XP_PER_FOUND
      - missed * XP_MISS_PENALTY
      + Math.floor(tl / XP_TIME_BONUS_DIVISOR)
    );
    onDone({ passage, found: Array.from({ length: passage.words.length }, (_, i) => i).filter((i) => passage.words[i].isError && found.has(i)), wrongClicks: wc, timeLeft: tl, totalXP: xp });
  };

  // Timer
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(id); finish(found.size, wrongClicks, 0); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []); // intentional: runs once

  // All found?
  useEffect(() => {
    if (found.size === passage.errorCount && !done) {
      finish(found.size, wrongClicks, timeLeft);
    }
  }, [found]);

  function handleWordClick(word: EHWord, idx: number) {
    if (done || found.has(idx)) return;
    if (word.isError) {
      setFound((prev) => new Set([...prev, idx]));
      setFlashIdx(idx); setFlashType("good");
    } else {
      setWrongClicks((n) => n + 1);
      setFlashIdx(idx); setFlashType("bad");
    }
    setTimeout(() => { setFlashIdx(null); setFlashType(null); }, 600);
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerColor = timeLeft > 60 ? "text-green-600" : timeLeft > 30 ? "text-amber-600" : "text-red-600";

  return (
    <div className="max-w-xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-white rounded-xl px-3 py-2 shadow-sm">
          <span className="text-xs text-gray-500">שגיאות שנמצאו</span>
          <div className="font-bold text-purple-700">{found.size} / {passage.errorCount}</div>
        </div>
        <div className={`font-mono text-2xl font-bold ${timerColor}`}>
          {mins}:{secs.toString().padStart(2, "0")}
        </div>
        <div className="bg-white rounded-xl px-3 py-2 shadow-sm text-right">
          <span className="text-xs text-gray-500">לחיצות שגויות</span>
          <div className="font-bold text-red-500">×{wrongClicks}</div>
        </div>
      </div>

      {/* Passage title */}
      <h2 className="font-bold text-gray-700 mb-3 text-center">{passage.title}</h2>

      {/* Passage text */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-5 mb-4 leading-relaxed">
        <div className="flex flex-wrap gap-x-1 gap-y-1" dir="ltr">
          {passage.words.map((word, i) => {
            const isFound = found.has(i);
            const isFlashing = flashIdx === i;
            let cls = "inline cursor-pointer rounded px-0.5 py-0.5 text-base transition-all select-none ";
            if (isFound) {
              cls += "bg-green-200 text-green-800 line-through";
            } else if (isFlashing && flashType === "good") {
              cls += "bg-green-400 text-white scale-110";
            } else if (isFlashing && flashType === "bad") {
              cls += "bg-red-300 text-red-800";
            } else {
              cls += "hover:bg-purple-100 hover:text-purple-800 text-gray-800";
            }
            return (
              <span key={i} className={cls} onClick={() => handleWordClick(word, i)}>
                {word.word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Found errors list */}
      {found.size > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-3 mb-4">
          <p className="text-xs font-bold text-green-700 mb-2">✓ שגיאות שמצאת:</p>
          <div className="space-y-1">
            {passage.words.map((word, i) =>
              found.has(i) ? (
                <div key={i} className="text-sm flex gap-2">
                  <span className="text-red-500 line-through" dir="ltr">{word.word}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-green-700 font-medium" dir="ltr">{word.correct}</span>
                  <span className="text-gray-500 text-xs">{word.explanation_he}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-gray-400">לחץ על כל מילה חשודה · שגיאות מסומנות בירוק</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Results view
// ─────────────────────────────────────────────────────────────────────────────
function ResultsView({ result, onPlay }: { result: HuntResult; onPlay: () => void }) {
  const { passage, found, wrongClicks, timeLeft, totalXP } = result;
  const foundCount = passage.words.filter((w, i) => w.isError && found.includes(i)).length;
  // Actually recalculate properly
  const allErrors = passage.words.reduce<number[]>((acc, w, i) => w.isError ? [...acc, i] : acc, []);
  const foundSet = new Set(found);
  const foundCorrect = allErrors.filter((i) => foundSet.has(i)).length;
  const missed = allErrors.filter((i) => !foundSet.has(i));
  const perfect = missed.length === 0;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className={`rounded-3xl p-6 text-white text-center mb-5 ${perfect ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-purple-500 to-violet-600"}`}>
        <div className="text-5xl mb-2">{perfect ? "🏆" : "🔍"}</div>
        <h2 className="text-2xl font-bold">{perfect ? "מצוין! מצאת הכל!" : "ציד הסתיים"}</h2>
        <div className="text-4xl font-bold mt-2">+{totalXP} XP</div>
        <div className="flex justify-center gap-4 mt-3 text-sm text-white/80">
          <span>✓ {foundCorrect}/{passage.errorCount} שגיאות</span>
          <span>⏱ {timeLeft}s נשאר</span>
          <span>✗ {wrongClicks} שגויות</span>
        </div>
      </div>

      {/* Missed errors */}
      {missed.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
          <p className="font-bold text-red-700 mb-2 text-sm">שגיאות שפספסת:</p>
          {missed.map((idx) => {
            const w = passage.words[idx];
            return (
              <div key={idx} className="text-sm flex gap-2 mb-1">
                <span className="text-red-500" dir="ltr">{w.word}</span>
                <span className="text-gray-400">→</span>
                <span className="text-green-700 font-medium" dir="ltr">{w.correct}</span>
                <span className="text-gray-500 text-xs">{w.explanation_he}</span>
              </div>
            );
          })}
        </div>
      )}

      <button onClick={onPlay} className="w-full py-3 rounded-2xl bg-purple-500 text-white font-bold hover:bg-purple-600 transition mb-3">שחק שוב 🔄</button>
      <Link href="/advanced-games" className="block text-center text-sm text-gray-400 hover:text-gray-600">← חזרה למשחקים</Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export default function ErrorHuntPage() {
  const { addPoints } = useProgress();
  const { checkAndUnlock } = useAchievements();
  const [phase, setPhase] = useState<Phase>("select");
  const [difficulty, setDifficulty] = useState<GameDifficulty>("easy");
  const [result, setResult] = useState<HuntResult | null>(null);

  function handleDone(r: HuntResult) {
    saveScore(GAME_ID, difficulty, r.totalXP);
    addPoints(r.totalXP);
    checkAndUnlock();
    setResult(r);
    setPhase("results");
  }

  return (
    <div className="min-h-screen bg-purple-50" dir="rtl">
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link href="/advanced-games" className="text-gray-500 text-sm">← משחקים</Link>
        <h1 className="font-bold text-sm">🔍 ציד שגיאות</h1>
        <span />
      </nav>
      {phase === "select" && <SelectView onStart={(d) => { setDifficulty(d); setPhase("playing"); }} />}
      {phase === "playing" && <PlayingView key={Date.now()} difficulty={difficulty} onDone={handleDone} />}
      {phase === "results" && result && <ResultsView result={result} onPlay={() => setPhase("playing")} />}
    </div>
  );
}
