import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  //'loading,'error','ready','active','finished'
  status: "loading",
  index: 0, //accessing the question
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 10,
};

const SEC_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecevied":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: state.points > state.highScore ? state.points : highScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining === 0 ? 10 : state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    default:
      throw new Error("action unknown");
  }
}
const QuizProvider = ({ children }) => {

  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecevied", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context)
    throw new Error("QuizContext placed outside the component tree");
  return context;
};

export { QuizProvider, useQuiz };
