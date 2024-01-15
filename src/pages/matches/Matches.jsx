import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import styles from "../../styles/style";
import "./matches.scss";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Matches = () => {
  const lang = localStorage.getItem("lang");
  const { userInfo } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="matches_page">
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <span className="back" onClick={() => navigate(-1)}>
          <IoClose size={25} />
        </span>
      </div>
      <div className="content">
        <iframe
          src={userInfo.whatsapp_support_number}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Matches;
