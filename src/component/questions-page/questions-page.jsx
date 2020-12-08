import React from "react";
import Question from "../question/question.component";
import { useQuiz } from "../../hooks/use-quiz";
import "./questions-page.scss";

export default function QuestionsPage({ onEndQuiz }) {
  const [state] = useQuiz();
  const { results, currentQuestion, correctAnswers } = state;
  const resultsLength = results.length;

  if (currentQuestion === resultsLength) onEndQuiz();

  return (
    <div className="main-page">
      <div className="page-header">{correctAnswers + "/" + resultsLength}</div>

      <div className="page-body">
        <Question {...results[currentQuestion]} />
      </div>
    </div>
  );
}
