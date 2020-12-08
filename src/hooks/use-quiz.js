import React, { createContext, useContext, useReducer } from "react";
import { AllHtmlEntities as Entities } from "html-entities";

const entities = new Entities();

const QuizContext = createContext(undefined);

const quizActions = {
  REQUEST_QUIZ_PENDING: "REQUEST_QUIZ_PENDING",
  REQUEST_QUIZ_SUCCESS: "REQUEST_QUIZ_SUCCESS",
  REQUEST_QUIZ_FAILED: "REQUEST_QUIZ_FAILED",

  CORRECT_ANSWER: "CORRECT_ANSWER",
  WRONG_ANSWER: "WRONG_ANSWER",

  RESET_QUIZ: "RESET_QUIZ",
  START_TIME: "START_TIME",
  END_TIME: "END_TIME",
  START_QUIZ: "START_QUIZ",
  END_QUIZ: "END_QUIZ",
};

const decodeQuestions = (results) =>
  results.map((result) => ({
    ...result,
    question: entities.decode(result.question),
    correct_answer: entities.decode(result.correct_answer),
    incorrect_answers: result.incorrect_answers.map((answer) =>
      entities.decode(answer)
    ),
  }));

const quizReducer = (state, action) => {
  switch (action.type) {
    case quizActions.REQUEST_QUIZ_PENDING:
      return { ...state, pending: true };
    case quizActions.REQUEST_QUIZ_SUCCESS:
      return {
        ...state,
        pending: false,
        results: decodeQuestions(action.payload.results),
      };
    case quizActions.REQUEST_QUIZ_FAILED:
      return { ...state, pending: false, error: action.payload };
    case quizActions.CORRECT_ANSWER:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        correctAnswers: state.correctAnswers + 1,
      };
    case quizActions.WRONG_ANSWER:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
    case quizActions.RESET_QUIZ:
      return INITIAL_STATE;
    case quizActions.START_TIME:
      return { ...state, time: performance.now() };
    case quizActions.END_TIME:
      return { ...state, time: performance.now() - state.time };
    case quizActions.START_QUIZ:
      return { ...state, started: true };
    case quizActions.END_QUIZ:
      return { ...state, started: false };
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
};

const INITIAL_STATE = {
  pending: true,
  currentQuestion: 0,
  correctAnswers: 0,
  time: 0,
  results: [],
  started: false,
};

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE);

  const onCorrectAnswer = () => {
    dispatch({ type: quizActions.CORRECT_ANSWER });
  };

  const onWrongAnswer = () => {
    dispatch({ type: quizActions.WRONG_ANSWER });
  };

  const onRequestQuiz = () => {
    dispatch({ type: quizActions.REQUEST_QUIZ_PENDING });
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: quizActions.REQUEST_QUIZ_SUCCESS, payload: data })
      )
      .catch((error) =>
        dispatch({ type: quizActions.REQUEST_QUIZ_FAILED, payload: error })
      );
  };

  const onResetQuiz = () => {
    dispatch({ type: quizActions.RESET_QUIZ });
  };

  const onStartTime = () => {
    dispatch({ type: quizActions.START_TIME });
  };

  const onEndQuiz = () => {
    dispatch({ type: quizActions.END_TIME });
    dispatch({ type: quizActions.END_QUIZ });
  };

  const onStartQuiz = () => {
    onResetQuiz();
    onRequestQuiz();
    onStartTime();
    dispatch({ type: quizActions.START_QUIZ });
  };

  return (
    <QuizContext.Provider
      value={[
        state,
        {
          onCorrectAnswer,
          onWrongAnswer,
          onResetQuiz,
          onStartTime,
          onEndQuiz,
          onRequestQuiz,
          onStartQuiz,
        },
      ]}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be within a QuizProvider");
  }
  return context;
}
