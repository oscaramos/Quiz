import { AllHtmlEntities as Entities } from 'html-entities';
const entities = new Entities();

export const decodeQuestions = results =>
  results.map(result => ({
    ...result,
    question: entities.decode(result.question)
  }))