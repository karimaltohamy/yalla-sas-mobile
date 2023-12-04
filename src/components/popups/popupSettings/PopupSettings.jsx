import React, { useEffect, useState } from "react";
import "./popupSettings.scss";
import { IoMdArrowBack } from "react-icons/io";
import { LuLanguages } from "react-icons/lu";
import { IoInvertMode } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const PopupSettings = ({ open, setOpen }) => {
  const [mode, setMode] = useState("dark");
  const { i18n } = useTranslation();
  const lang = localStorage.getItem("lang");

  // change theme
  const handleModeTheme = (e) => {
    let value = e.target.value;
    if (value == "light") {
      setMode(value);
      localStorage.setItem("mode", value);
      document.body.classList.add("light");
    } else {
      setMode(value);
      localStorage.setItem("mode", value);
      document.body.classList.remove("light");
    }
  };

  const changeLanguage = (e) => {
    let lng = e.target.value;

    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);

    if (lng == "ar") {
      document.body.classList.add("ar");
      document.body.classList.remove("en");
    } else {
      document.body.classList.add("en");
      document.body.classList.remove("ar");
    }
  };

  return (
    <div className={`popup_settings ${open && "active"}`}>
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <div className="back" onClick={() => setOpen(false)}>
          <IoMdArrowBack size={25} />
        </div>

        <h4 className=" font-semibold">Settings</h4>
      </div>
      <div className="content mt-10 px-3">
        <div className="select_lang ">
          <LuLanguages size={25} />
          <select onChange={changeLanguage}>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
        <div className="select_theme">
          <IoInvertMode size={25} />
          <select value={mode} onChange={handleModeTheme}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PopupSettings;
