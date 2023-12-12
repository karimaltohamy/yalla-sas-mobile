import { IoMdArrowBack } from "react-icons/io";
import "./popupChangePackage.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const PopupChangePackage = ({ open, setOpen }) => {
  const [selectPackage, setSelectPackage] = useState("Le test 1");
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

        <div className="packages_boxs my-8 grid grid-cols-2 gap-4">
          <div
            className={`box ${selectPackage == "Le test 1" ? "active" : ""}`}
            onClick={() => setSelectPackage("Le test 1")}
          >
            <h4 className="package_name">Le test 1</h4>
            <span className="price">100EGP</span>
          </div>
          <div
            className={`box ${selectPackage == "Le test 2" ? "active" : ""}`}
            onClick={() => setSelectPackage("Le test 2")}
          >
            <h4 className="package_name">Le test 2</h4>
            <span className="price">100EGP</span>
          </div>
          <div
            className={`box ${selectPackage == "Le test 3" ? "active" : ""}`}
            onClick={() => setSelectPackage("Le test 3")}
          >
            <h4 className="package_name">Le test 3</h4>
            <span className="price">100EGP</span>
          </div>
          <div
            className={`box ${selectPackage == "Le test 4" ? "active" : ""}`}
            onClick={() => setSelectPackage("Le test 4")}
          >
            <h4 className="package_name">Le test 4</h4>
            <span className="price">100EGP</span>
          </div>
        </div>

        <div>
          <button className="btn_fill w-full rounded-full text-[17px] py-3">
            {t("Change Package")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupChangePackage;
