import React from "react";

const NextButton = ({ answer, dispatch }) => {
  if (answer === null) return;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
};

export default NextButton;
