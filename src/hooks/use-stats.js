import React, { createContext, useContext, useState } from "react";
import { useQuiz } from "./use-quiz";

const StatsContext = createContext(undefined);

export function StatsProvider({ children }) {
  const [time, setTime] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useQuiz({
    onStartQuiz: () => {
      setTime(performance.now());
    },
    onEndQuiz: () => {
      setTime((startTime) => performance.now() - startTime);
    },
    onResetQuiz: () => {
      setTime(0);
      setCorrectAnswers(0);
    },
  });

  const onCorrectAnswer = () => {
    setCorrectAnswers(correctAnswers + 1);
  };

  return (
    <StatsContext.Provider
      value={[{ time, correctAnswers }, { onCorrectAnswer }]}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error("useStats must be within a StatsProvider");
  }
  return context;
}
