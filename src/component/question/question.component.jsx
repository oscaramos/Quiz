import React from "react";

import { useQuiz } from "../../hooks/use-quiz";

import "./question.styles.scss";

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Question({
  question,
  correct_answer,
  incorrect_answers,
}) {
  const [, { onCorrectAnswer, onWrongAnswer }] = useQuiz();

  // shuffle answers
  const answers = shuffle([correct_answer].concat(incorrect_answers));

  const handleClick = (answer) => {
    if (answer === correct_answer) onCorrectAnswer();
    else onWrongAnswer();
  };

  return (
    <div className="question">
      <div className="question-text">{question}</div>
      <div className="question-answer-container">
        {answers.map((answer) => (
          <div
            className="question-answer"
            key={answer}
            onClick={() => handleClick(answer)}
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
}
