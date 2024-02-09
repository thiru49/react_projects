import React from "react";
import { useQuiz } from "../context/QuizContext";

const FinishScreen = () => {
  const { points, maxPossiblePoints, dispatch, highScore } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        {emoji} You scored{" "}
        <strong>
          <span>{points}</span>
        </strong>{" "}
        out of <span>{maxPossiblePoints}</span>{" "}
        <span>{`(${Math.ceil(percentage)}%)`}</span>
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
};

export default FinishScreen;
