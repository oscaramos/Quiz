import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestQuiz } from '../../redux/quiz/quiz.actions';
import { createStructuredSelector } from "reselect";

import { selectQuizCurrentQuestion, selectQuizResults } from '../../redux/quiz/quiz.selectors'
import Question from '../question/question.component';

import './main-page.scss'



class MainPage extends Component {
  componentDidMount() {
    this.props.onRequestQuiz();
  }

  render() {
    const { results } = this.props;
    const { currentQuestion } = this.props;
    return (
      <div className="main-page">
          <Question {...results[currentQuestion]}/>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  results: selectQuizResults,
  currentQuestion: selectQuizCurrentQuestion
})

const mapDispatchToProps = dispatch => ({
  onRequestQuiz: () => dispatch(requestQuiz)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);