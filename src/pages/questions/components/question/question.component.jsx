import React from "react";
import "./question.styles.scss";

export default function Question({ text, answers, onClickAnswer }) {
  return (
    <div className="question">
      <div className="description">{text}</div>
      <div className="answers-container">
        {answers.map((answer) => (
          <div
            className="answer"
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
