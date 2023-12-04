import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./consumptionCalculation.scss";
import styles from "../../styles/style";
import { MdOutlineDownloading } from "react-icons/md";
import { GrUploadOption } from "react-icons/gr";
import { TbArrowsTransferDown } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const ConsumptionCalculation = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");

  const handleConsumotionCalculation = (e) => {
    e.preventDefault();
    console.log({ dateFrom, dateTo });
  };

  const navigate = useNavigate();
  return (
    <div className="consumption_calculation">
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <span className="back" onClick={() => navigate(-1)}>
          <IoMdArrowBack size={25} />
        </span>

        <h4 className=" font-semibold">{t("Sessions")}</h4>
      </div>
      <div className={`${styles.custom_container} h-full`}>
        <div className="content mt-5">
          <form className="date" onSubmit={handleConsumotionCalculation}>
            <div className="input_item">
              <label htmlFor="from">{t("From")}:</label>
              <input
                type="date"
                id="from"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="input_item">
              <label htmlFor="to">{t("To")}:</label>
              <input
                type="date"
                id="to"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <button className="btn_search">بحث</button>
          </form>
          <div className="result_calculation mt-10">
            <div className="items">
              <div className="item">
                <h4 className={lang == "en" ? "en" : "ar"}>
                  <MdOutlineDownloading size={25} />
                  {t("Total download")}
                </h4>
                <span>0 MB</span>
              </div>
              <div className="item">
                <h4 className={lang == "en" ? "en" : "ar"}>
                  <GrUploadOption size={25} />
                  {t("Total Upload")}
                </h4>
                <span>0 MB</span>
              </div>
              <div className="item">
                <h4 className={lang == "en" ? "en" : "ar"}>
                  <TbArrowsTransferDown size={25} />
                  {t("Consumption")}
                </h4>
                <span>0 MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionCalculation;
