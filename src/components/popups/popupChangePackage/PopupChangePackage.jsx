import { IoMdArrowBack } from "react-icons/io";
import "./popupChangePackage.scss";
import { useTranslation } from "react-i18next";

const PopupChangePackage = ({ open, setOpen }) => {
  const lang = localStorage.getItem("lang");
  const { t } = useTranslation();
  return (
    <div className={`popup_change_package ${open ? "active" : ""}`}>
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <div className="back" onClick={() => setOpen(false)}>
          <IoMdArrowBack size={25} />
        </div>

        <h4 className=" font-semibold">{t("Change Package")}</h4>
      </div>
      <div className="content mt-10 px-3">
        <div className="current_package flex items-center gap-1 justify-between">
          <h5>{t("Current Package")}:</h5>
          <span className="text-gray-500">Le test 5</span>
        </div>
      </div>
    </div>
  );
};

export default PopupChangePackage;
