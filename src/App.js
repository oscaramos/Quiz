import React, { useState } from "react";

import Questions from "./pages/questions/questions.component";
import Results from "./pages/results/results.component";

import { useQuiz } from "./hooks/use-quiz";
import "./App.css";

export default function App() {
  const [started, setStarted] = useState(false);

  const [{ pending }] = useQuiz({
    onStartQuiz: () => {
      setStarted(true);
    },
    onEndQuiz: () => {
      console.log("ending");
      setStarted(false);
    },
  });

  if (pending) {
    return "loading";
  }

  return <div className="App">{started ? <Questions /> : <Results />}</div>;
}
