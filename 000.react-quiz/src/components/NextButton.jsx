import React from "react";
import { useQuiz } from "../context/QuizContext";

const NextButton = () => {
  const { answer, index, numQuestions, dispatch } = useQuiz();
  if (answer === null) return null;
  const state = index < numQuestions - 1;
  return (
    <>
      {state ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finished
        </button>
      )}
    </>
  );
};

export default NextButton;
