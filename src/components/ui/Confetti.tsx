"use client";
import { useState } from "react";

const COLORS = [
  "#ffd700", "#ff6b6b", "#4ecdc4", "#45b7d1",
  "#96e6a1", "#f9ca24", "#ff9ff3", "#a29bfe",
  "#fd79a8", "#55efc4",
];
const SHAPES = ["●", "■", "▲", "★", "◆"];

interface Piece {
  id: number;
  color: string;
  shape: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export function Confetti() {
  const [pieces] = useState<Piece[]>(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      shape: SHAPES[i % SHAPES.length],
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 1.5 + Math.random() * 1.5,
      size: 10 + Math.random() * 16,
      rotation: Math.random() * 360,
    }))
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 9999,
      }}
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-30px",
            color: p.color,
            fontSize: `${p.size}px`,
            animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
            transform: `rotate(${p.rotation}deg)`,
            display: "inline-block",
          }}
        >
          {p.shape}
        </span>
      ))}
    </div>
  );
}
