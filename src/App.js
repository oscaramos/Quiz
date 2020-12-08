import React from "react";

import Questions from "./pages/questions/questions.component";
import Results from "./pages/results/results.component";

import { useQuiz } from "./hooks/use-quiz";
import "./App.css";

export default function App() {
  const [{ started }] = useQuiz();

  return <div className="App">{started ? <Questions /> : <Results />}</div>;
}
