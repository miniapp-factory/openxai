"use client";

import { useState, useEffect } from "react";
import { words } from "@/data/words";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const COLORS = {
  correct: "bg-green-500 text-white",
  present: "bg-yellow-500 text-white",
  absent: "bg-gray-500 text-white",
};

export default function WordGuess() {
  const [todayIndex, setTodayIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [input, setInput] = useState("");

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    const idx = day % 365;
    setTodayIndex(idx);
    setAnswer(words[idx].toUpperCase());
  }, []);

  const handleSubmit = () => {
    const guess = input.trim().toUpperCase();
    if (guess.length !== 5 || !/^[A-Z]+$/.test(guess)) return;
    setGuesses((prev) => [...prev, guess]);
    if (guess === answer) {
      setStatus("won");
    } else if (guesses.length + 1 >= 6) {
      setStatus("lost");
    }
    setInput("");
  };

  const getLetterClass = (letter: string, idx: number, guess: string) => {
    if (letter === answer[idx]) return COLORS.correct;
    if (answer.includes(letter)) return COLORS.present;
    return COLORS.absent;
  };

  return (
    <div className="w-full max-w-md">
      {guesses.map((g, i) => (
        <div key={i} className="flex gap-1 mb-1">
          {g.split("").map((l, idx) => (
            <span
              key={idx}
              className={`w-10 h-10 flex items-center justify-center rounded-md font-bold ${getLetterClass(l, idx, g)}`}
            >
              {l}
            </span>
          ))}
        </div>
      ))}
      {status === "playing" && (
        <div className="flex gap-2">
          <input
            type="text"
            maxLength={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Enter guess"
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      )}
      {(status === "won" || status === "lost") && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <img
            src={status === "won" ? "/success.png" : "/failure.png"}
            alt={status === "won" ? "Success" : "Failure"}
            width={200}
            height={200}
          />
          <Share
            text={`I ${status === "won" ? "solved" : "failed"} today's OpenxAI Word: ${answer}. ${url}`}
          />
        </div>
      )}
    </div>
  );
}
