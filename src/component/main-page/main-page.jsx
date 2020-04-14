import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestQuiz } from '../../redux/quiz/quiz.actions';
import { createStructuredSelector } from "reselect";

import { selectQuizCurrentQuestion, selectQuizResults } from '../../redux/quiz/quiz.selectors'
import Question from '../question/question.component';

import './main-page.scss'

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false
    };
  }
  startQuiz = () => {
    this.setState({started: true});
  }

  componentDidMount() {
    this.props.onRequestQuiz();
  }

  render() {
    const { results } = this.props;
    const { currentQuestion } = this.props;
    return (
      <div className="main-page">
        <div className="page-header">

        </div>

        <div className="page-body">
        {
          this.state.started? <Question {...results[currentQuestion]}/>
          : <div className="button-start" onClick={this.startQuiz}>Start Quiz</div>
        }
        </div>
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