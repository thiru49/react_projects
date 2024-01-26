import React, { useEffect } from "react";

const Timer = ({ secondsRemaining, dispatch }) => {
  const min = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 ? `0${min}` : min}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;
