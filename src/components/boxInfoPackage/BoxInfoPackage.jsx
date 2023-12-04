import { IoIosWifi } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import "./boxInfoPackage.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const BoxInfoPackage = ({ setOpen }) => {
  const [percent, setPercent] = useState(60);
  const { t } = useTranslation();

  return (
    <div className="box_info_package p-3">
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

      <div className="card_progress">
        <div className="percent">
          <svg>
            <circle cx="105" cy="105" r="100"></circle>
            <circle
              cx="105"
              cy="105"
              r="100"
              strokeDashoffset={`calc(625px - (625px * ${percent} / 100)`}
            ></circle>
          </svg>
          <div className="number">
            <h3>
              {percent}
              <span>%</span>
            </h3>
          </div>
        </div>
      </div>
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
