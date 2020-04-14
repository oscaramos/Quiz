import React from "react";
import { connect } from "react-redux";

import { onCorrectAnswer, onWrongAnswer } from "../../redux/quiz/quiz.actions";
import { shuffleAnswers } from './question.utils'

import './question.styles.scss';

const handleAnswerClick = (answer, {correct_answer, onCorrectAnswer, onWrongAnswer}) => () => {
  if(answer === correct_answer)
    onCorrectAnswer();
  else
    onWrongAnswer();
}

const Question = (props) => {
  const { question, correct_answer, incorrect_answers } = props;
  const answers = shuffleAnswers(correct_answer, incorrect_answers);

  return (
    <div className="question">
      <div className="question-text">{question}</div>
      <div className="question-answer-container">
        {
          answers.map((answer, idx) =>
          (<div className="question-answer" key={idx} onClick={handleAnswerClick(answer, props)}>
            {answer}
          </div>))
        }
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onCorrectAnswer: () => dispatch(onCorrectAnswer),
  onWrongAnswer: () => dispatch(onWrongAnswer),
})

export default connect(null, mapDispatchToProps)(Question);