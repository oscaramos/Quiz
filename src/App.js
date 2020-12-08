import React from "react";
import { connect } from "react-redux";
import {
  endTime,
  requestQuiz,
  resetQuiz,
  startTime,
} from "./redux/quiz/quiz.actions";

import MainPage from "./component/questions-page/questions-page";
import ResultsPages from "./component/results-page/results-page.component";

import "./App.css";
import { selectPending } from "./redux/quiz/quiz.selectors";
import { createStructuredSelector } from "reselect";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
    };
  }

  startQuiz = () => {
    const { onResetQuiz, onRequestQuiz, onStartTime } = this.props;
    this.setState({ started: true });
    onResetQuiz();
    onRequestQuiz();
    onStartTime();
  };

  endQuiz = () => {
    if (this.props.pending === false) {
      this.setState({ started: false });
      this.props.onEndTime();
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.started ? (
          <MainPage onEndQuiz={this.endQuiz} />
        ) : (
          <ResultsPages onStartQuiz={this.startQuiz} />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  pending: selectPending,
});

const mapDispatchToProps = (dispatch) => ({
  onResetQuiz: () => dispatch(resetQuiz),
  onRequestQuiz: () => dispatch(requestQuiz),
  onStartTime: () => dispatch(startTime),
  onEndTime: () => dispatch(endTime),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
