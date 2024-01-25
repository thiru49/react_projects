import React from "react";
import Options from "./Options";

const Questions = ({ questions }) => {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options questions={questions} />
    </div>
  );
};

export default Questions;
