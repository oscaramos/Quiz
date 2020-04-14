import { AllHtmlEntities as Entities } from 'html-entities';
const entities = new Entities();

export const decodeQuestions = results =>
  results.map(result => ({
    ...result,
    question: entities.decode(result.question),
    correct_answer: entities.decode(result.correct_answer),
    incorrect_answers: result.incorrect_answers.map(answer => entities.decode(answer))
  }))