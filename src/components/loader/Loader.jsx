import React from "react";
import "./loader.scss";

const Loader = ({ fixed }) => {
  return (
    <div className={`loader-container ${fixed && "fixed"}`}>
      <div className="loader"></div>
      <div className="loader-text">Loading...</div>
    </div>
  );
};

export default Loader;
