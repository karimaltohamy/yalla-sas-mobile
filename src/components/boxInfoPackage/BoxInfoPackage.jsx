import { IoIosWifi } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import "./boxInfoPackage.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const BoxInfoPackage = ({ setOpen }) => {
  const [percent, setPercent] = useState(50);
  const { t } = useTranslation();

  const circleStyle = {
    "--value": percent, // Assuming you want to add the percentage sign
  };

  return (
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
            <h4 className="text-[20px] font-semibold">Le Test 5</h4>
            <p className="text-[13px] flex items-center gap-1">
              {t("Ending in")}:
              <span className="time text-gray-400">30-12-2023</span>
            </p>
          </div>
        </div>

        <span className="status text-green-500 font-bold">{t("Active")}</span>
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
          {t("You have")} 0 MB {t("out of")} 0 MB
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
  );
};

export default BoxInfoPackage;
