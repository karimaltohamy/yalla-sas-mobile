import { IoMdArrowBack } from "react-icons/io";
import "./popupActivatePackage.scss";
import { IoWarningOutline } from "react-icons/io5";
import { GiElectric } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const PopupActivatePackage = ({ open, setOpen }) => {
  const lang = localStorage.getItem("lang");
  const { t } = useTranslation();

  return (
    <div className={`popup_activate_package ${open ? "active" : ""}`}>
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <div className="back" onClick={() => setOpen(false)}>
          <IoMdArrowBack size={25} />
        </div>
        <h4 className=" font-semibold">{t("Activate Package")}</h4>
      </div>
      <div className="content mt-10 px-3">
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-3"
          role="alert"
        >
          <p className="font-bold flex gap-2">
            {" "}
            <IoWarningOutline size={20} />
            {t("Be Warned")}
          </p>
          <p className=" text-[13px]">
            {" "}
            {t("Be careful . Your current package is still active.")}
          </p>
        </div>
        <div className="items_info my-5">
          <div className="item">
            <h5 className="font-semibold">{t("Current Package")}</h5>
            <span className="text-gray-400">Le test 5</span>
          </div>
          <div className="item">
            <h5 className="font-semibold">{t("Package details")}</h5>
            <span className="text-gray-400">amad Mega 2</span>
          </div>
          <div className="item">
            <h5 className="font-semibold">{t("Package condition")}</h5>
            <span className="text-gray-400">active package</span>
          </div>
          <div className="item">
            <h5 className="font-semibold">{t("Expiry date")}</h5>
            <span className="text-gray-400">20-10-2023</span>
          </div>
          <div className="item">
            <h5 className="font-semibold">{t("Package price")}</h5>
            <span className="text-gray-400">20EGP</span>
          </div>
          <div className="item">
            <h5 className="font-semibold">{t("Account balance")}</h5>
            <span className="text-gray-400">0.0EGP</span>
          </div>
        </div>
        <button className="flex items-center gap-1 btn_fill mx-auto">
          <GiElectric size={20} />
          <span>{t("Active Now")}</span>
        </button>
      </div>
    </div>
  );
};

export default PopupActivatePackage;
