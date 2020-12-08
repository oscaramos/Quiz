import React from "react";
import "./results-page.styles.scss";
import { useQuiz } from "../../hooks/use-quiz";

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export default function ResultsPage({ onStartQuiz }) {
  const [state] = useQuiz();
  const { correctAnswers, results, time } = state;
  const resultsLength = results.length;

  return (
    <div className="results-page">
      <div className="result">
        Correct answers: {`${correctAnswers}/${resultsLength}`}
      </div>
      <div className="result">Time: {`${millisToMinutesAndSeconds(time)}`}</div>
      <button className="start-button" onClick={onStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
}
