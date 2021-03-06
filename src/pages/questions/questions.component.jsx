import React, { useState } from "react";
import Question from "./components/question/question.component";
import { useQuiz } from "../../hooks/use-quiz";
import { useStats } from "../../hooks/use-stats";
import "./questions.styles.scss";

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function getCurrentQuestion(questions, index) {
  const {
    question: questionContent,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  } = questions[index];

  const allAnswers = shuffle([correctAnswer].concat(incorrectAnswers));

  return {
    questionContent,
    allAnswers,
    correctAnswer,
    incorrectAnswers,
  };
}

export default function Questions() {
  const [{ questions }, { onEndQuiz }] = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { questionContent, allAnswers, correctAnswer } = getCurrentQuestion(
    questions,
    currentQuestionIndex
  );

  const [, { onCorrectAnswer }] = useStats();

  const handleClickAnswer = (answer) => {
    if (answer === correctAnswer) {
      onCorrectAnswer();
    }

    if (currentQuestionIndex === questions.length - 1) {
      onEndQuiz();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="question-page">
      <div className="header">
        {currentQuestionIndex + "/" + questions.length}
      </div>

      <Question
        text={questionContent}
        answers={allAnswers}
        onClickAnswer={handleClickAnswer}
      />
    </div>
  );
}
