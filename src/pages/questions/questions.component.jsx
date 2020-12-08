import React, { useEffect } from "react";
import Question from "./components/question/question.component";
import { useQuiz } from "../../hooks/use-quiz";
import "./questions.styles.scss";

export default function Questions() {
  const [
    { results, currentQuestion, correctAnswers, pending },
    { onEndQuiz },
  ] = useQuiz();
  const resultsLength = results.length;

  useEffect(() => {
    if (currentQuestion === resultsLength && pending === false) {
      onEndQuiz();
    }
  }, [currentQuestion, resultsLength, onEndQuiz, pending]);

  return (
    <div className="main-page">
      <div className="page-header">{correctAnswers + "/" + resultsLength}</div>

      <div className="page-body">
        <Question {...results[currentQuestion]} />
      </div>
    </div>
  );
}
