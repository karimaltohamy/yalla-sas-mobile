import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./consumptionCalculation.scss";
import styles from "../../styles/style";
import { MdOutlineDownloading } from "react-icons/md";
import { GrUploadOption } from "react-icons/gr";
import { TbArrowsTransferDown } from "react-icons/tb";

const ConsumptionCalculation = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleConsumotionCalculation = (e) => {
    e.preventDefault();
    console.log({ dateFrom, dateTo });
  };

  const navigate = useNavigate();
  return (
    <div className="consumption_calculation">
      <div className="top flex items-center justify-between">
        <span className="back" onClick={() => navigate(-1)}>
          <IoMdArrowBack size={25} />
        </span>

        <h4 className=" font-semibold">Sessions</h4>
      </div>
      <div className={`${styles.custom_container} h-full`}>
        <div className="content mt-5">
          <form className="date" onSubmit={handleConsumotionCalculation}>
            <div className="input_item">
              <label htmlFor="from">From:</label>
              <input
                type="date"
                id="from"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="input_item">
              <label htmlFor="to">To:</label>
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
                <h4>
                  <MdOutlineDownloading size={25} />
                  Total download
                </h4>
                <span>0 MB</span>
              </div>
              <div className="item">
                <h4>
                  <GrUploadOption size={25} />
                  Total Upload
                </h4>
                <span>0 MB</span>
              </div>
              <div className="item">
                <h4>
                  <TbArrowsTransferDown size={25} />
                  Consumption
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
