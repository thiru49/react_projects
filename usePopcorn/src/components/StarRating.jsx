import React from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};
const StarContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
};
const textStyle = { lineHeight: "1", margin: "0" };

const StarRating = ({ maxRates = 5 }) => {
  return (
    <div style={containerStyle}>
      <div style={StarContainerStyle}>
        {Array.from({ length: maxRates }, (_, i) => (
          <span>S{i + 1}</span>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
};

export default StarRating;
