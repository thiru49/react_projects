import React from "react";
import Style from "./Button.module.css";

const Button = ({ children, type, onClick }) => {
  return (
    <button className={`${Style.btn} ${Style[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
