import { IoIosWifi } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./boxInfoPackage.scss";
import { useDispatch, useSelector } from "react-redux";
import { formateDate } from "../../utils/formatDate";
import { getRefrechData } from "../../redux/actions/refrechData";
import { Link } from "react-router-dom";

const BoxInfoPackage = ({ setOpen }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { refrechData } = useSelector((state) => state.refrechData);
  const [percent, setPercent] = useState(userInfo?.package_usage_percent);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const circleStyle = {
    "--value":
      userInfo?.package_usage_percent == "unlimited"
        ? 100
        : userInfo?.package_usage_percent == "suspended"
        ? 0
        : Math.floor(percent),
  };

  useEffect(() => {
    getRefrechData(dispatch);
  }, []);

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
              <div
                className={`icon w-[50px] h-[50px] rounded-full flex items-center justify-center ${
                  userInfo.user_status == "active"
                    ? "text-[#238a5e]"
                    : "text-red-500"
                }`}
              >
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

            {userInfo.user_status == "active" ? (
              <span className="status text-green-500 font-bold">
                {t("Active")}
              </span>
            ) : (
              <span className="status font-bold text-red-500">
                {t("Not Active")}
              </span>
            )}
          </div>

          <div
            className={`progressbar ${percent == 0 && "percent-0"}`}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin="0"
            aria-valuemax="100"
            style={circleStyle}
          ></div>

          {refrechData ? (
            <div className="bottom_info flex items-center justify-between">
              {refrechData.package_usage_percent == "unlimited" ? (
                <p className=" font-semibold text-[14px]">
                  {t("You have")} {refrechData.package_usage_percent}{" "}
                  {t("Package")}
                </p>
              ) : refrechData.package_usage_percent == "suspended" ? (
                <p className=" font-semibold text-[14px]">
                  {t("You have")} {refrechData.package_usage_percent}{" "}
                  {t("Package")}
                </p>
              ) : (
                <p className=" font-semibold text-[14px]">
                  {t("You have")} {refrechData.total_rxtx} {t("out of")}{" "}
                  {refrechData.traffic_limit}
                </p>
              )}

              <Link
                className="flex items-center gap-1 btn_fill"
                to={"/change-package"}
              >
                <IoSettings />
                <span>{t("Change Package")}</span>
              </Link>
            </div>
          ) : (
            <div className="bottom_info flex items-center justify-between">
              {userInfo.package_usage_percent == "unlimited" ? (
                <p className=" font-semibold text-[14px]">
                  {t("You have")} {userInfo.package_usage_percent}{" "}
                  {t("Package")}
                </p>
              ) : userInfo.package_usage_percent == "suspended" ? (
                <p className=" font-semibold text-[14px]">
                  {t("You have")} {userInfo.package_usage_percent}{" "}
                  {t("Package")}
                </p>
              ) : (
                <p className=" font-semibold text-[14px]">
                  {t("You have")} {userInfo.total_rxtx} {t("out of")}{" "}
                  {userInfo.traffic_limit}
                </p>
              )}

              <Link
                className="flex items-center gap-1 btn_fill"
                to={"/change-package"}
              >
                <IoSettings />
                <span>{t("Change Package")}</span>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default BoxInfoPackage;
