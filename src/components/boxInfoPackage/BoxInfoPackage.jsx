import { IoIosWifi } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./boxInfoPackage.scss";
import { useSelector } from "react-redux";
import { formateDate } from "../../utils/formatDate";

const BoxInfoPackage = ({ setOpen }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [percent, setPercent] = useState(userInfo.package_usage_percent);
  const { t } = useTranslation();

  const circleStyle = {
    "--value": Math.floor(percent), // Assuming you want to add the percentage sign
  };

  return (
    <>
      {userInfo ? (
        <div
          className="box_info_package p-3"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          <div className="top_box flex items-center justify-between">
            <div className="package flex items-center gap-2">
              <div className="icon w-[50px] h-[50px] rounded-full flex items-center justify-center">
                <IoIosWifi size={30} />
              </div>
              <div className="text">
                <h4 className="text-[20px] font-semibold">
                  {userInfo.package}
                </h4>
                <p className="text-[13px] flex items-center gap-1">
                  {t("Ending in")}:
                  <span className="time text-gray-400">
                    {formateDate(userInfo.end_date)}
                  </span>
                </p>
              </div>
            </div>

            <span className="status text-green-500 font-bold">
              {t("Active")}
            </span>
          </div>

          <div
            className="progressbar"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin="0"
            aria-valuemax="100"
            style={circleStyle}
          ></div>

          <div className="bottom_info flex items-center justify-between">
            <p className=" font-semibold text-[14px]">
              {t("You have")} {userInfo.total_rxtx} {t("out of")}{" "}
              {userInfo.traffic_limit}
            </p>
            <button
              className="flex items-center gap-1 btn_fill"
              onClick={() => setOpen(true)}
            >
              <IoSettings />
              <span>{t("Charge")}</span>
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default BoxInfoPackage;
