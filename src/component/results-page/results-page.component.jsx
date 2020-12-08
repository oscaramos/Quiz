import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectQuizCorrectAnswers,
  selectQuizResultsLength,
  selectQuizTime,
} from "../../redux/quiz/quiz.selectors";

import "./results-page.styles.scss";

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const ResultsPage = ({ onStartQuiz, correctAnswers, totalAnswers, time }) => (
  <div className="results-page">
    <div className="result">
      Correct answers: {`${correctAnswers}/${totalAnswers}`}
    </div>
    <div className="result">Time: {`${millisToMinutesAndSeconds(time)}`}</div>
    <button className="start-button" onClick={onStartQuiz}>
      Start Quiz
    </button>
  </div>
);

const mapStateToProps = createStructuredSelector({
  correctAnswers: selectQuizCorrectAnswers,
  totalAnswers: selectQuizResultsLength,
  time: selectQuizTime,
});

export default connect(mapStateToProps)(ResultsPage);
