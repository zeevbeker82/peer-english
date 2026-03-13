import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import type { MultipleChoiceExercise } from "@/lib/exercises/types";

const exercise: MultipleChoiceExercise = {
  id: "test-mc",
  type: "multiple-choice",
  instruction_he: "מה פירוש המילה?",
  question: "teacher",
  questionType: "word",
  options: ["מורה", "מחברת", "עיפרון", "שולחן"],
  correctIndex: 0,
  difficulty: "A1",
};

describe("MultipleChoice component", () => {
  it("renders instruction and question", () => {
    render(<MultipleChoice exercise={exercise} onAnswer={vi.fn()} />);
    expect(screen.getByText("מה פירוש המילה?")).toBeInTheDocument();
    expect(screen.getByText("teacher")).toBeInTheDocument();
  });

  it("renders all 4 options", () => {
    render(<MultipleChoice exercise={exercise} onAnswer={vi.fn()} />);
    expect(screen.getByText("מורה")).toBeInTheDocument();
    expect(screen.getByText("מחברת")).toBeInTheDocument();
    expect(screen.getByText("עיפרון")).toBeInTheDocument();
    expect(screen.getByText("שולחן")).toBeInTheDocument();
  });

  it("calls onAnswer with correct index when option clicked", () => {
    const onAnswer = vi.fn();
    render(<MultipleChoice exercise={exercise} onAnswer={onAnswer} />);
    fireEvent.click(screen.getByText("מורה"));
    expect(onAnswer).toHaveBeenCalledWith(0);
  });

  it("calls onAnswer with wrong index when wrong option clicked", () => {
    const onAnswer = vi.fn();
    render(<MultipleChoice exercise={exercise} onAnswer={onAnswer} />);
    fireEvent.click(screen.getByText("עיפרון"));
    expect(onAnswer).toHaveBeenCalledWith(2);
  });

  it("does not call onAnswer when disabled", () => {
    const onAnswer = vi.fn();
    render(<MultipleChoice exercise={exercise} onAnswer={onAnswer} disabled />);
    fireEvent.click(screen.getByText("מורה"));
    expect(onAnswer).not.toHaveBeenCalled();
  });

  it("shows speak button when onSpeak provided", () => {
    const onSpeak = vi.fn();
    render(<MultipleChoice exercise={exercise} onAnswer={vi.fn()} onSpeak={onSpeak} />);
    const speakBtn = screen.getByRole("button", { name: /הקשב/ });
    expect(speakBtn).toBeInTheDocument();
    fireEvent.click(speakBtn);
    expect(onSpeak).toHaveBeenCalled();
  });
});
