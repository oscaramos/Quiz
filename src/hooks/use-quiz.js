// thanks to https://kentcdodds.com/blog/how-to-use-react-context-effectively

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { AllHtmlEntities as Entities } from "html-entities";

const entities = new Entities();

const QuizStateContext = createContext(undefined);
const QuizActionsContext = createContext(undefined);

const decodeQuestions = (questions) =>
  questions.map((result) => ({
    ...result,
    question: entities.decode(result.question),
    correct_answer: entities.decode(result.correct_answer),
    incorrect_answers: result.incorrect_answers.map((answer) =>
      entities.decode(answer)
    ),
  }));

export const actionsType = {
  resetQuiz: "RESET_QUIZ",
  startQuiz: "START_QUIZ",
  endQuiz: "END_QUIZ",

  setPending: "SET_PENDING",
  setQuestions: "SET_QUESTIONS",
};

export function quizReducer(state, action) {
  switch (action.type) {
    case actionsType.resetQuiz: {
      return {
        pending: true,
        questions: [],
      };
    }

    case actionsType.startQuiz: {
      return state;
    }
    case actionsType.endQuiz: {
      return state;
    }

    case actionsType.setPending: {
      return {
        ...state,
        pending: action.payload,
      };
    }
    case actionsType.setQuestions: {
      return {
        ...state,
        questions: action.payload,
      };
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export function QuizProvider({ children }) {
  const [actionsHistory, setActionsHistory] = useState([]);

  const [{ pending, questions }, dispatch] = useReducer(
    (state, action) => {
      setActionsHistory((prev) => [...prev, action]);
      return quizReducer(state, action);
    },
    {
      pending: false,
      questions: [],
    }
  );

  const onRequestQuiz = async () => {
    dispatch({ type: actionsType.setPending, payload: true });
    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      const data = await res.json();
      dispatch({
        type: actionsType.setQuestions,
        payload: decodeQuestions(data.results),
      });
    } catch (error) {
      throw new Error(error.message);
    } finally {
      dispatch({ type: actionsType.setPending, payload: false });
    }
  };

  const onStartQuiz = async () => {
    dispatch({ type: actionsType.resetQuiz });
    dispatch({ type: actionsType.startQuiz });
    onRequestQuiz();
  };

  const onEndQuiz = () => {
    dispatch({ type: actionsType.endQuiz });
  };

  return (
    <QuizStateContext.Provider value={{ pending, questions }}>
      <QuizActionsContext.Provider
        value={{ onStartQuiz, onEndQuiz, actionsHistory }}
      >
        {children}
      </QuizActionsContext.Provider>
    </QuizStateContext.Provider>
  );
}

function useQuizState() {
  const context = useContext(QuizStateContext);
  if (context === undefined) {
    throw new Error("useQuizState must be within a QuizProvider");
  }
  return context;
}

function useQuizActions(actionListener = {}) {
  const context = useContext(QuizActionsContext);
  if (context === undefined) {
    throw new Error("useQuizActions must be within a QuizProvider");
  }

  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (context.actionsHistory.length === cursor) return;

    switch (context.actionsHistory[cursor].type) {
      case actionsType.startQuiz:
        if (actionListener.onStartQuiz) actionListener.onStartQuiz();
        break;
      case actionsType.endQuiz:
        if (actionListener.onEndQuiz) actionListener.onEndQuiz();
        break;
      case actionsType.resetQuiz:
        if (actionListener.onResetQuiz) actionListener.onResetQuiz();
        break;
      default:
    }

    setCursor((prev) => prev + 1);
  }, [actionListener, context.actionsHistory, cursor]);
  return context;
}

export function useQuiz(actionListener) {
  return [useQuizState(), useQuizActions(actionListener)];
}
