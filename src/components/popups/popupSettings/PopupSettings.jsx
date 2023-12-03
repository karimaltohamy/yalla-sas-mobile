import React from "react";
import "./popupSettings.scss";
import { IoMdArrowBack } from "react-icons/io";
import { LuLanguages } from "react-icons/lu";
import { IoInvertMode } from "react-icons/io5";

const PopupSettings = ({ open, setOpen }) => {
  return (
    <div className={`popup_settings ${open && "active"}`}>
      <div className="top flex items-center justify-between">
        <div className="back" onClick={() => setOpen(false)}>
          <IoMdArrowBack size={25} />
        </div>

        <h4 className=" font-semibold">Settings</h4>
      </div>
      <div className="content mt-10 px-3">
        <div className="select_lang ">
          <LuLanguages size={25} />
          <select>
            <option value="">English</option>
            <option value="">Arabic</option>
          </select>
        </div>
        <div className="select_theme">
          <IoInvertMode size={25} />
          <select>
            <option value="">Dark</option>
            <option value="">Light</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PopupSettings;
