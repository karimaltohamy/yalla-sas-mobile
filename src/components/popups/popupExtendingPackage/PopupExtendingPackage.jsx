import { IoMdArrowBack } from "react-icons/io";
import "./popupExtendingPackage.scss";
import { useTranslation } from "react-i18next";

const PopupExtendingPackage = ({ open, setOpen }) => {
  const lang = localStorage.getItem("lang");
  const { t } = useTranslation();

  return (
    <div className={`popup_extending_package ${open ? "active" : ""}`}>
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <div className="back" onClick={() => setOpen(false)}>
          <IoMdArrowBack size={25} />
        </div>

        <h4 className=" font-semibold">{t("Extending Package")}</h4>
      </div>
      <div className="content mt-10 px-3">
        <form>
          <div className="input_item">
            <label className=" font-semibold mb-2 block">
              {t("Select extending package")}
            </label>
            <select>
              <option>{t("select extending package")}</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupExtendingPackage;
