import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import styles from "../../styles/style";
import "./whatsAppSupprt.scss";
import { useNavigate } from "react-router-dom";

const WhatsAppSupport = () => {
  const lang = localStorage.getItem("lang");
  const { userInfo } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="whatsapp_support">
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <span className="back" onClick={() => navigate(-1)}>
          <IoMdArrowBack size={25} />
        </span>

        <h4 className=" font-semibold">{t("WhatsApp Support")}</h4>
      </div>
      <div className={`${styles.custom_container}`}>
        <div className="content">
          <iframe
            width="560"
            height="315"
            src={userInfo.whatsapp_support_number}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSupport;
