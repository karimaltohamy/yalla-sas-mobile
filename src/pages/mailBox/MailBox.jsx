import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdMarkEmailRead } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./mainBox.scss";
import styles from "../../styles/style";
import { useTranslation } from "react-i18next";

const MailBox = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");

  return (
    <div className="mail_box">
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <span className="back" onClick={() => navigate(-1)}>
          <IoMdArrowBack size={25} />
        </span>

        <h4 className="font-semibold">{t("Mail Box")}</h4>
      </div>

      <div className={`${styles.custom_container} h-full`}>
        <div className="content mt-5">
          <div className="notifications_items">
            <div className="notification">
              <div className="icon">
                <MdMarkEmailRead size={25} />
              </div>
              <div className="text">
                <h4 className="title font-semibold text-[19px] mb-2">
                  Bank account
                </h4>
                <p className="message">A new bank account has been added</p>
                <span className="date text-[13px] text-gray-400">
                  Sunday, December 3, 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailBox;
