import { t } from "i18next";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cardsSubscriptionOptions.scss";
import { IoMdArrowBack } from "react-icons/io";

const CardsSubscriptionOptions = () => {
  const navigate = useNavigate();
  const lang = localStorage.getItem("lang");

  return (
    <div className="cards_subscription_options">
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <div className={`back `} onClick={() => navigate(-1)}>
          <IoMdArrowBack size={25} />
        </div>
        <h4 className=" font-semibold">{t("Options")}</h4>
      </div>
      <div className="container_btns px-3">
        <div className="btns">
          <Link to={"/my-cards"} className="btn btn_fill">
            {t("Purchased cards")}
          </Link>
          <Link to={"/available-cards"} className="btn btn_fill">
            {t("Buy card")}
          </Link>
        </div>
        <Link
          to={"/login"}
          className="link btn_fill mb-3 w-full text-center rounded-full"
        >
          {"Exit"}
        </Link>
      </div>
    </div>
  );
};

export default CardsSubscriptionOptions;
