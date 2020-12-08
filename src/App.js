import React, { useState } from "react";
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

function App({ onResetQuiz, onRequestQuiz, onStartTime, onEndTime, pending }) {
  const [started, setStarted] = useState(false);

  const startQuiz = () => {
    setStarted(true);
    onResetQuiz();
    onRequestQuiz();
    onStartTime();
  };

  const endQuiz = () => {
    if (pending === false) {
      setStarted(false);
      onEndTime();
    }
  };

  return (
    <div className="App">
      {started ? (
        <MainPage onEndQuiz={endQuiz} />
      ) : (
        <ResultsPages onStartQuiz={startQuiz} />
      )}
    </div>
  );
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
