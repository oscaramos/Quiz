import React, { useState } from "react";
import Question from "./components/question/question.component";
import { useQuiz } from "../../hooks/use-quiz";
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

  const { questionContent, allAnswers } = getCurrentQuestion(
    questions,
    currentQuestionIndex
  );

  const handleClickAnswer = () => {
    if (currentQuestionIndex === questions.length - 1) {
      onEndQuiz();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="main-page">
      <div className="page-header">
        {currentQuestionIndex + "/" + questions.length}
      </div>

      <div className="page-body">
        <Question
          text={questionContent}
          answers={allAnswers}
          onClickAnswer={handleClickAnswer}
        />
      </div>
    </div>
  );
}
