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
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid var(--border-color)",
    backgroundColor: "transparent",
    color: "var(--text-color)",
  }),
  option: (provided, state) => ({
    color: "black",
    backgroundColor: state.isFocused && "#238a5e",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "var(--text-color)",
  }),
};

const ConsumptionCalculation = () => {
  const [dayFrom, setDayFrom] = useState("");
  const [dayTo, setDayTo] = useState("");
  const [month, setMonth] = useState("");
  const [fullDays, setFullDays] = useState([]);
  const [trafficDate, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");

  const months = [
    { value: "", label: t("select month") },
    { value: "1", label: "1" + t("January") },
    { value: "2", label: "2" + t("February") },
    { value: "3", label: "3" + t("March") },
    { value: "4", label: "4" + t("April") },
    { value: "5", label: "5" + t("May") },
    { value: "6", label: "6" + t("June") },
    { value: "7", label: "7" + t("July") },
    { value: "8", label: "8" + t("August") },
    { value: "9", label: "9" + t("September") },
    { value: "10", label: "10" + t("October") },
    { value: "11", label: "11" + t("November") },
    { value: "12", label: "12" + t("December") },
  ];

  function getDaysInMonth(month) {
    setMonth(month.value);
    const date = new Date();
    const year = date.getFullYear();
    let daysArray = [];

    const lastDay = new Date(year, month.value, 0).getDate();

    for (let i = 1; i <= lastDay; i++) {
      daysArray.push(i);
    }

    const optionsDays = daysArray.map((day) => {
      return { value: day, label: day };
    });

    setFullDays([{ value: "", label: t("select day") }, ...optionsDays]);
  }

  // handle filter traffic data
  const handleConsumotionCalculation = async (e) => {
    e.preventDefault();
    const date = new Date();

    let body = {
      year: date.getFullYear(),
      month: Number(month),
      day_from: Number(dayFrom),
      day_to: Number(dayTo),
    };

    if (dayFrom > dayTo) {
      return toast.error(t("Day to must be greater than Day from"));
    }

    setLoading(true);
    try {
      const { data } = await apiAxios.post("mob/traffic/filter", body);
      setLoading(false);
      setTrafficData(data.data);
      toast.success(lang == "en" ? "successful filtered" : "تمت التصفية بنجاح");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message.year[0]);
      toast.error(error.response.data.message.month[0]);
      toast.error(error.response.data.message.day_to[0]);
      toast.error(error.response.data.message.day_from[0]);
    }
    setLoading(false);
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

        <h4 className=" font-semibold">{t("Consumption calculation")}</h4>
      </div>
      <div className={`${styles.custom_container} h-full`}>
        <div className="content mt-5">
          <form className="date" onSubmit={handleConsumotionCalculation}>
            <div className="input_item">
              <label htmlFor="">{t("Month")}</label>
              <Select
                defaultValue={month}
                onChange={getDaysInMonth}
                options={months}
                styles={customStyles}
              />
            </div>
            {month && (
              <div className="flex items-center gap-3 w-full mb-3">
                <div className="input_item flex-1">
                  <label htmlFor="from">{t("From")}:</label>
                  <Select
                    defaultValue={dayFrom}
                    onChange={(newValue) => setDayFrom(newValue.value)}
                    options={fullDays}
                    styles={customStyles}
                  />
                </div>
                <div className="input_item flex-1">
                  <label htmlFor="to">{t("To")}:</label>
                  <Select
                    defaultValue={dayTo}
                    onChange={(newValue) => setDayTo(newValue.value)}
                    options={fullDays}
                    styles={customStyles}
                  />
                </div>
              </div>
            )}

            {month && <button className="btn_search">بحث</button>}
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
                    {t("Mass consumption")}
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
