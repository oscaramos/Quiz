import React from "react";

import './question.styles.scss';

const shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};


const Question = ({ question, correct_answer, incorrect_answers }) => {
  const answers = shuffle([correct_answer].concat(incorrect_answers));

  return (
    <div className="question">
      <div className="question-text">{question}</div>
      <div className="question-answer-container">
        {
          answers.map((answer, idx) => (<div className="question-answer" key={idx}>{answer}</div>))
        }
      </div>
    </div>
  );
};

export default Question;