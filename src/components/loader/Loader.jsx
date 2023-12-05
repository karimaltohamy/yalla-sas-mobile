import React from "react";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <div className="loader-text">Loading...</div>
    </div>
  );
};

export default Loader;
