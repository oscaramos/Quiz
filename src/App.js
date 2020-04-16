import React from 'react';
import { connect } from 'react-redux';
import { requestQuiz, resetQuiz } from './redux/quiz/quiz.actions';

import MainPage from "./component/questions-page/questions-page";
import ResultsPages from "./component/results-page/results.component";

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false
    };
  }

  startQuiz = () => {
    this.setState({started: true});
  }

  endQuiz = () => {
    this.setState({started: false});
    this.props.onResetQuiz();
    this.props.onRequestQuiz();
  }

  componentDidMount() {
    this.props.onRequestQuiz();
  }

  render() {
    return (
      <div className='App'>
        {this.state.started ? <MainPage onEndQuiz={this.endQuiz}/>
        : <ResultsPages onStartQuiz={this.startQuiz} />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onRequestQuiz: () => dispatch(requestQuiz),
  onResetQuiz: () => dispatch(resetQuiz)
})

export default connect(null, mapDispatchToProps)(App);
