import { IoMdArrowBack } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import "./popupCharge.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const PopupCharge = ({ setOpen, open }) => {
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");

  const [amount, setAmount] = useState("");
  const [radioCharge, setRadioCharge] = useState("renewPackage");

  const handleRadioChange = (event) => {
    setRadioCharge(event.target.value);
  };

  return (
    <div className={`PopupCharge ${open ? "active" : ""}`}>
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <div className="back" onClick={() => setOpen(false)}>
          <IoMdArrowBack size={25} />
        </div>
      </div>
      <div className="content mt-[60px] px-5 h-[100vh] flex items-center justify-center">
        <form>
          <div className="inputs_radio mb-10">
            <div className="input_radio">
              <input
                type="radio"
                id="renew"
                name="redio-charge"
                onChange={handleRadioChange}
                value={"renewPackage"}
                checked={radioCharge === "renewPackage"}
              />
              <label htmlFor="renew">{t("Renew package")}</label>
            </div>
            <div className="input_radio">
              <input
                type="radio"
                id="deposit"
                name="redio-charge"
                onChange={handleRadioChange}
                value={"depositBalance"}
                checked={radioCharge === "depositBalance"}
              />
              <label htmlFor="deposit">{t("Deposit balance")}</label>
            </div>
            <div className="input_radio">
              <input
                type="radio"
                id="offer"
                name="redio-charge"
                onChange={handleRadioChange}
                value={"useOffer"}
                checked={radioCharge === "useOffer"}
              />
              <label htmlFor="offer">{t("Use offer")}</label>
            </div>
            <div className="input_radio">
              <input
                type="radio"
                id="extending"
                name="redio-charge"
                onChange={handleRadioChange}
                value={"extendingPackage"}
                checked={radioCharge === "extendingPackage"}
              />
              <label htmlFor="extending">{t("Extending package")}</label>
            </div>
            <div className="input_radio">
              <input
                type="radio"
                id="change"
                name="redio-charge"
                onChange={handleRadioChange}
                value={"changePackage"}
                checked={radioCharge === "changePackage"}
              />
              <label htmlFor="change">{t("Change package")}</label>
            </div>
          </div>
          <div className="input_item">
            <FaRegCreditCard size={25} />
            <input
              type="text"
              placeholder={t("amount")}
              value={setAmount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="btns flex items-center justify-center gap-5">
            <button className="flex items-center justify-center gap-[6px] btn_fill w-full">
              <GiElectric size={20} />
              {t("Charge")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupCharge;
