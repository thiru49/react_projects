import React from "react";
import { useQuiz } from "../context/QuizContext";

const Progress = () => {
  const { answer, numQuestions, maxPossiblePoints, index, points } = useQuiz();

  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Questions: <strong>{index}</strong>/{numQuestions}
      </p>
      <p>
        Points: <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </div>
  );
};

export default Progress;
