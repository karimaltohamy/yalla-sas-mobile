import React from "react";
import "./loader.scss";
import { useTranslation } from "react-i18next";

const Loader = ({ fixed }) => {
  const { t } = useTranslation();
  return (
    <div className={`loader-container ${fixed && "fixed"}`}>
      <div className="loader"></div>
      <div className="loader-text">{t("Loading...")}</div>
    </div>
  );
};

export default Loader;
