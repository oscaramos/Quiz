import { quizConstants } from './quiz.constants'
import { decodeQuestions, nextQuestion, incrementCorrectAnswers } from "./quiz.utils";

const INITIAL_STATE = {
  pending: true,
  currentQuestion: 0,
  correctAnswers: 0,
  time: 0,
  results: []
}

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case quizConstants.REQUEST_QUIZ_PENDING:
      return { ...state, pending: true }
    case quizConstants.REQUEST_QUIZ_SUCCESS:
      return { ...state, pending: false, results: decodeQuestions(action.payload.results) }
    case quizConstants.REQUEST_QUIZ_FAILED:
      return { ...state, pending: false, error: action.payload }
    case quizConstants.ON_CORRECT_ANSWER:
      return {...state,currentQuestion: nextQuestion(state), correctAnswers: incrementCorrectAnswers(state)}
    case quizConstants.ON_WRONG_ANSWER:
      return {...state,currentQuestion: nextQuestion(state)}
    default:
      return state;
  }
}

export default quizReducer;