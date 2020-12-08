import React from "react";
import { useQuiz } from "../../hooks/use-quiz";
import "./results.styles.scss";

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export default function ResultsPage() {
  const [{ correctAnswers, results, time }, { onStartQuiz }] = useQuiz();

  return (
    <div className="results-page">
      <div className="result">
        Correct answers: {`${correctAnswers}/${results.length}`}
      </div>
      <div className="result">Time: {`${millisToMinutesAndSeconds(time)}`}</div>
      <button className="start-button" onClick={onStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
}
