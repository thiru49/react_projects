import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-stone-300/20 backdrop-blur-sm">
      <div className="loader"></div>;
    </div>
  );
};

export default Loader;
