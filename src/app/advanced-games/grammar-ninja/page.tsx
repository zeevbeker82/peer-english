"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { GN_SENTENCES, GNSentence, GameDifficulty } from "@/lib/content/advanced-games";
import { saveScore, getScore } from "@/lib/storage/advanced-games";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";

const GAME_ID = "grammar-ninja";
const ROUND_SIZE = 10;
const XP_CORRECT = 10;
const XP_WRONG   = -3;

type Phase = "select" | "playing" | "results";
type WordState = "idle" | "correct" | "wrong";

interface RoundResult { sentence: GNSentence; clickedIndex: number; correct: boolean; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────────────────────────────────────────
// Difficulty select
// ─────────────────────────────────────────────────────────────────────────────
function SelectView({ onStart }: { onStart: (d: GameDifficulty) => void }) {
  const diffs: { d: GameDifficulty; label: string; desc: string; emoji: string }[] = [
    { d:"easy",   label:"קל",     desc:"פעלים, כינויים, רבים", emoji:"🥷" },
    { d:"medium", label:"בינוני", desc:"זמנים, מילות יחס, תארים", emoji:"⚔️" },
    { d:"hard",   label:"קשה",    desc:"תנאיים, פסיב, uncountable nouns", emoji:"🏯" },
  ];
  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      <div className="text-6xl mb-3">🥷</div>
      <h1 className="text-3xl font-bold mb-1">נינג'ה דקדוק</h1>
      <p className="text-gray-500 mb-8 text-sm">לחץ על המילה השגויה במשפט · {ROUND_SIZE} משפטים לסיבוב</p>
      <div className="space-y-3">
        {diffs.map(({ d, label, desc, emoji }) => {
          const s = getScore(GAME_ID, d);
          return (
            <button key={d} onClick={() => onStart(d)}
              className="w-full p-4 rounded-2xl border-2 border-red-200 bg-red-50 text-red-800 flex items-center justify-between hover:bg-red-100 transition">
              <div className="text-right">
                <p className="font-bold">{emoji} {label}</p>
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
      <Link href="/advanced-games" className="mt-6 inline-block text-sm text-gray-400 hover:text-gray-600">← חזרה</Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Playing view
// ─────────────────────────────────────────────────────────────────────────────
function PlayingView({ difficulty, onDone }: { difficulty: GameDifficulty; onDone: (results: RoundResult[], xp: number) => void }) {
  const sentences = shuffle(GN_SENTENCES.filter((s) => s.difficulty === difficulty)).slice(0, ROUND_SIZE);
  const [current, setCurrent] = useState(0);
  const [wordState, setWordState] = useState<WordState>("idle");
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [score, setScore] = useState(0);

  const sentence = sentences[current];
  const words = sentence.sentence.split(" ");

  const handleClick = useCallback((wordIdx: number) => {
    if (wordState !== "idle") return;
    const correct = wordIdx === sentence.errorWordIndex;
    setClickedIdx(wordIdx);
    setWordState(correct ? "correct" : "wrong");
    const xp = correct ? XP_CORRECT : XP_WRONG;
    setScore((s) => Math.max(0, s + xp));

    setTimeout(() => {
      const newResult: RoundResult = { sentence, clickedIndex: wordIdx, correct };
      const newResults = [...results, newResult];
      if (current + 1 >= ROUND_SIZE) {
        const total = newResults.filter((r) => r.correct).length * XP_CORRECT;
        onDone(newResults, Math.max(0, total + (newResults.filter((r) => r.correct).length === ROUND_SIZE ? 30 : 0)));
      } else {
        setResults(newResults);
        setCurrent((c) => c + 1);
        setWordState("idle");
        setClickedIdx(null);
      }
    }, 1400);
  }, [wordState, sentence, results, current, ROUND_SIZE, onDone]);

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Progress */}
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>{current + 1} / {ROUND_SIZE}</span>
        <span className="font-bold text-red-600">{score} XP</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-red-400 rounded-full transition-all" style={{ width: `${((current) / ROUND_SIZE) * 100}%` }} />
      </div>

      {/* Instruction */}
      <p className="text-center text-gray-500 text-sm mb-4">🥷 לחץ על המילה השגויה!</p>

      {/* Sentence card */}
      <div className={`bg-white rounded-3xl shadow-md border-2 p-6 mb-5 transition-colors ${
        wordState === "correct" ? "border-green-400 bg-green-50" :
        wordState === "wrong" ? "border-red-400 bg-red-50" : "border-gray-100"
      }`}>
        <div className="flex flex-wrap gap-x-2 gap-y-3 justify-center" dir="ltr">
          {words.map((word, i) => {
            let cls = "px-2 py-1 rounded-lg cursor-pointer font-medium text-lg transition-all select-none";
            if (wordState !== "idle") {
              if (i === sentence.errorWordIndex) {
                cls += " bg-green-200 text-green-800 ring-2 ring-green-400 scale-110";
              } else if (i === clickedIdx && !sentence.errorWordIndex) {
                cls += " bg-red-200 text-red-800";
              } else if (i === clickedIdx) {
                cls += " bg-red-200 text-red-800 ring-2 ring-red-400";
              } else {
                cls += " bg-gray-100 text-gray-500";
              }
            } else {
              cls += " bg-gray-100 text-gray-800 hover:bg-red-100 hover:text-red-700 hover:scale-105 active:scale-95";
            }
            return (
              <button key={i} className={cls} onClick={() => handleClick(i)}>
                {word}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {wordState !== "idle" && (
          <div className={`mt-4 rounded-xl p-3 text-sm text-center ${wordState === "correct" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {wordState === "correct" ? "✓ נכון! " : "✗ טעית — "}
            <span className="font-medium">{sentence.explanation_he}</span>
            {sentence.correctWord && (
              <span className="block mt-1 font-bold" dir="ltr">"{sentence.errorWord}" → "{sentence.correctWord}"</span>
            )}
          </div>
        )}
      </div>

      {/* Score hint */}
      <div className="text-center text-xs text-gray-400">
        ✓ +{XP_CORRECT} XP נכון &nbsp;|&nbsp; ✗ {XP_WRONG} XP טעות
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Results view
// ─────────────────────────────────────────────────────────────────────────────
function ResultsView({ results, totalXP, difficulty, onPlay }: {
  results: RoundResult[]; totalXP: number; difficulty: GameDifficulty; onPlay: () => void;
}) {
  const correct = results.filter((r) => r.correct).length;
  const pct = Math.round((correct / results.length) * 100);
  const perfect = correct === results.length;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className={`rounded-3xl p-6 text-white text-center mb-5 ${perfect ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-red-500 to-rose-600"}`}>
        <div className="text-5xl mb-2">{perfect ? "🥷" : "⚔️"}</div>
        <h2 className="text-2xl font-bold">{perfect ? "נינג'ה מושלם!" : "סיבוב הסתיים"}</h2>
        <div className="text-4xl font-bold mt-2">+{totalXP} XP</div>
        <p className="text-white/80 text-sm mt-1">{correct}/{ROUND_SIZE} נכון · {pct}% הצלחה</p>
        {perfect && <p className="text-yellow-300 font-bold mt-2">🌟 בונוס מושלם +30 XP!</p>}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 max-h-72 overflow-y-auto">
        {results.map((r, i) => (
          <div key={i} className={`flex items-start gap-2 py-2 border-b border-gray-50 last:border-0 text-sm ${r.correct ? "" : "bg-red-50 rounded-lg px-2"}`}>
            <span>{r.correct ? "✅" : "❌"}</span>
            <div dir="ltr" className="flex-1">
              <span className="text-gray-700">{r.sentence.sentence}</span>
              {!r.correct && (
                <span className="block text-xs text-red-600 mt-0.5">
                  ← {r.sentence.explanation_he}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={onPlay} className="w-full py-3 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition mb-3">שחק שוב 🔄</button>
      <Link href="/advanced-games" className="block text-center text-sm text-gray-400 hover:text-gray-600">← חזרה למשחקים</Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export default function GrammarNinjaPage() {
  const { addPoints } = useProgress();
  const { checkAndUnlock } = useAchievements();
  const [phase, setPhase] = useState<Phase>("select");
  const [difficulty, setDifficulty] = useState<GameDifficulty>("easy");
  const [results, setResults] = useState<{ results: RoundResult[]; totalXP: number } | null>(null);

  function handleDone(r: RoundResult[], xp: number) {
    saveScore(GAME_ID, difficulty, xp);
    const updated = addPoints(xp);
    if (updated) checkAndUnlock(updated);
    setResults({ results: r, totalXP: xp });
    setPhase("results");
  }

  return (
    <div className="min-h-screen bg-red-50" dir="rtl">
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link href="/advanced-games" className="text-gray-500 text-sm">← משחקים</Link>
        <h1 className="font-bold text-sm">🥷 נינג'ה דקדוק</h1>
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
