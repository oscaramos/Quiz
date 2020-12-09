import React from "react";
import "./question.styles.scss";

export default function Question({ text, answers, onClickAnswer }) {
  return (
    <div className="question">
      <div className="question-text">{text}</div>
      <div className="question-answer-container">
        {answers.map((answer) => (
          <div
            className="question-answer"
            key={answer}
            onClick={() => onClickAnswer(answer)}
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
}
