import React, { useState } from "react";
import { useQuiz } from "../../hooks/use-quiz";
import { useStats } from "../../hooks/use-stats";
import "./results.styles.scss";

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export default function ResultsPage() {
  const [completedTimes, setCompletedTimes] = useState(0);

  const [{ questions }, { onStartQuiz }] = useQuiz({
    onEndQuiz: () => {
      setCompletedTimes((prev) => prev + 1);
    },
  });

  const [{ correctAnswers, time }] = useStats();

  const showStats = completedTimes > 0;

  return (
    <div className="results-page">
      {showStats && (
        <>
          <div className="stat">
            Correct answers: {`${correctAnswers}/${questions.length}`}
          </div>
          <div className="stat">
            Time: {`${millisToMinutesAndSeconds(time)}`}
          </div>
        </>
      )}

      <button className="start-button" onClick={onStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
}
