import { quizConstants } from './quiz.constants'

export const requestQuiz = (dispatch) => {
  dispatch({ type: quizConstants.REQUEST_QUIZ_PENDING});
  fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(res => res.json())
    .then(data => dispatch({ type: quizConstants.REQUEST_QUIZ_SUCCESS, payload: data}))
    .catch(error => dispatch({ type: quizConstants.REQUEST_QUIZ_FAILED, payload: error}))
}

export const onCorrectAnswer = {
  type: quizConstants.ON_CORRECT_ANSWER
}

export const onWrongAnswer = {
  type: quizConstants.ON_WRONG_ANSWER
}