import React from "react";
import Options from "./Options";
import { useQuiz } from "../context/QuizContext";

const Questions = () => {
  const { questions, index } = useQuiz();
  const question = questions.at(index);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options questions={question} />
    </div>
  );
};

export default Questions;
