import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import styles from "../../styles/style";
import "./library.scss";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const lang = localStorage.getItem("lang");
  const { userInfo } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="library">
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <span className="back" onClick={() => navigate(-1)}>
          <IoMdArrowBack size={25} />
        </span>

        <h4 className=" font-semibold">{t("Books Library")}</h4>
      </div>
      <div className={`${styles.custom_container}`}>
        <div className="content">
          <iframe
            src={userInfo.library_link}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Library;
