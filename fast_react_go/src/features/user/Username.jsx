import React from "react";
import { useSelector } from "react-redux";

function Username() {
  const userName = useSelector((state) => state.user.username);

  return <div className="text-xs font-semibold">{userName}</div>;
}

export default Username;
