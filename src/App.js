import React from "react";

import MainPage from "./component/questions-page/questions-page";
import ResultsPages from "./component/results-page/results-page.component";

import { useQuiz } from "./hooks/use-quiz";
import "./App.css";

export default function App() {
  const [{ started }] = useQuiz();

  return <div className="App">{started ? <MainPage /> : <ResultsPages />}</div>;
}
