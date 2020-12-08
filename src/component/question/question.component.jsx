import React from "react";
import { connect } from "react-redux";

import { onCorrectAnswer, onWrongAnswer } from "../../redux/quiz/quiz.actions";

import "./question.styles.scss";

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function Question({
  question,
  correct_answer,
  incorrect_answers,
  onCorrectAnswer,
  onWrongAnswer,
}) {
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

const mapDispatchToProps = (dispatch) => ({
  onCorrectAnswer: () => dispatch(onCorrectAnswer),
  onWrongAnswer: () => dispatch(onWrongAnswer),
});

export default connect(null, mapDispatchToProps)(Question);
