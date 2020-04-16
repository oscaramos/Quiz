import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import {
  selectQuizCorrectAnswers,
  selectQuizCurrentQuestion,
  selectQuizResults,
  selectQuizResultsLength
} from '../../redux/quiz/quiz.selectors'

import Question from '../question/question.component';

import './questions-page.scss'

const QuestionsPage = props => {
  const { currentQuestion, resultsLength, onEndQuiz, correctAnswers, results} = props;

  if (currentQuestion === resultsLength)
    onEndQuiz();

  return (
    <div className='main-page'>
      <div className='page-header'>
        {correctAnswers + '/' + resultsLength}
      </div>

      <div className='page-body'>
        {<Question {...results[currentQuestion]} />}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  results: selectQuizResults,
  currentQuestion: selectQuizCurrentQuestion,
  correctAnswers: selectQuizCorrectAnswers,
  resultsLength: selectQuizResultsLength
})


export default connect(mapStateToProps, null)(QuestionsPage);