import React, { useState } from "react";

import MainPage from "./component/questions-page/questions-page";
import ResultsPages from "./component/results-page/results-page.component";

import { useQuiz } from "./hooks/use-quiz";
import "./App.css";

export default function App() {
  const [started, setStarted] = useState(false);
  const [
    state,
    { onResetQuiz, onRequestQuiz, onStartTime, onEndTime },
  ] = useQuiz();
  const { pending } = state;

  const startQuiz = () => {
    setStarted(true);
    onResetQuiz();
    onRequestQuiz();
    onStartTime();
  };

  const endQuiz = () => {
    if (pending === false) {
      setStarted(false);
      onEndTime();
    }
  };

  return (
    <div className="App">
      {started ? (
        <MainPage onEndQuiz={endQuiz} />
      ) : (
        <ResultsPages onStartQuiz={startQuiz} />
      )}
    </div>
  );
}
