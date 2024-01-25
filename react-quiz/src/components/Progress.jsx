import React from "react";

const Progress = ({
  numQuestions,
  maxPossiblePoints,
  index,
  points,
  answer,
}) => {
  if (answer !== null) index += 1;
  return (
    <div className="progress">
      <progress max={numQuestions} value={index} />
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
