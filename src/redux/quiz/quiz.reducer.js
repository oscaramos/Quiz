import { quizConstants } from './quiz.constants'
import { decodeQuestions } from "./quiz.utils";

const INITIAL_STATE = {
  pending: true,
  currentQuestion: 0,
  correctAnswers: 0,
  time: 0,
  results: []
}

// eslint-disable-next-line
const exampleResult = {
  "category": "History",
  "type": "multiple",
  "difficulty": "medium",
  "question": " What Russian automatic gas-operated assault rifle was developed in the Soviet Union in 1947, and is still popularly used today?",
  "correct_answer": "AK-47",
  "incorrect_answers": [
    "RPK",
    "M16",
    "MG 42"
  ]
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
      return {...state,currentQuestion: state.currentQuestion+1, correct_answer: state.correct_answer+1}
    case quizConstants.ON_WRONG_ANSWER:
      return {...state,currentQuestion: state.currentQuestion+1}
    default:
      return state;
  }
}

export default quizReducer;