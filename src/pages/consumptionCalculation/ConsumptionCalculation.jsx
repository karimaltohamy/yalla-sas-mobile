import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./consumptionCalculation.scss";
import styles from "../../styles/style";
import { MdOutlineDownloading } from "react-icons/md";
import { GrUploadOption } from "react-icons/gr";
import { TbArrowsTransferDown } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import apiAxios from "../../utils/apiAxios";
import Loader from "../../components/loader/Loader";

const ConsumptionCalculation = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [trafficDate, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");

  // handle filter traffic data
  const handleConsumotionCalculation = async (e) => {
    e.preventDefault();
    const DateFrom = new Date(dateFrom);
    const DateTo = new Date(dateTo);

    if (DateFrom.getMonth() !== DateTo.getMonth()) {
      return toast.error(
        lang == "en" ? "You must select 1 month" : "يجب عليك اختيار شهر 1"
      );
    } else if (DateFrom.getFullYear() !== DateTo.getFullYear()) {
      return toast.error(
        lang == "en" ? "You must select 1 year" : "يجب عليك اختيار سنه 1"
      );
    }

    let body = {
      year: DateFrom.getFullYear(),
      month: DateFrom.getMonth(),
      day_from: DateFrom.getDate(),
      day_to: DateTo.getDate(),
    };

    setLoading(true);
    try {
      const { data } = await apiAxios.post("mob/traffic/filter", body);
      setLoading(false);
      setTrafficData(data.data);
      toast.success(lang == "en" ? "successful filtered" : "تمت التصفية بنجاح");
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message.year[0]);
      toast.error(error.response.data.message.month[0]);
      toast.error(error.response.data.message.day_to[0]);
      toast.error(error.response.data.message.day_from[0]);
      setLoading(false);
    }
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
            {trafficDate && (
              <div className="items">
                <div className="item">
                  <h4 className={lang == "en" ? "en" : "ar"}>
                    <MdOutlineDownloading size={25} />
                    {t("Total download")}
                  </h4>
                  <span>{trafficDate.download}</span>
                </div>
                <div className="item">
                  <h4 className={lang == "en" ? "en" : "ar"}>
                    <GrUploadOption size={25} />
                    {t("Total Upload")}
                  </h4>
                  <span>{trafficDate.upload}</span>
                </div>
                <div className="item">
                  <h4 className={lang == "en" ? "en" : "ar"}>
                    <TbArrowsTransferDown size={25} />
                    {t("Consumption")}
                  </h4>
                  <span>{trafficDate.total}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <Loader fixed={true} />}
    </div>
  );
};

export default ConsumptionCalculation;
