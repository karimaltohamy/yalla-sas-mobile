import { IoMdArrowBack } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import "./popupCharge.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import apiAxios from "../../../utils/apiAxios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PopupCharge = ({ setOpen, open }) => {
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");
  const { userInfo } = useSelector((state) => state.user);

  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("fullCharge");
  const [openIframe, setOpenIframe] = useState(false);
  const [urlCharge, setUrlCharge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiAxios.get("mob/offers");
        setOffer(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleRadioChange = (event) => {
    setPaymentType(event.target.value);
  };

  // handle payment
  const handlePayment = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await apiAxios.post("mob/charge", {
        payment_type: paymentType,
        amount: paymentType == "fullCharge" ? userInfo.package_price : amount,
      });
      toast.success(data.success && "Successfull Charge");
      setLoading(false);
      setUrlCharge(data.data?.url && data.data.url);
      setOpenIframe(data.data?.url && true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
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
      {!openIframe && (
        <div className="content mt-[60px] px-5 h-[100vh] flex items-center justify-center">
          <form onSubmit={handlePayment}>
            <div className="inputs_radio mb-10">
              <div className="input_radio">
                <input
                  type="radio"
                  id="fullCharge"
                  name="redio-charge"
                  onChange={handleRadioChange}
                  value={"fullCharge"}
                  checked={paymentType === "fullCharge"}
                />
                <label htmlFor="fullCharge">{t("Renew package")}</label>
              </div>
              <div className="input_radio">
                <input
                  type="radio"
                  id="deposit"
                  name="redio-charge"
                  onChange={handleRadioChange}
                  value={"deposit"}
                  checked={paymentType === "deposit"}
                />
                <label htmlFor="deposit">{t("Deposit balance")}</label>
              </div>
              <div className="input_radio">
                <input
                  type="radio"
                  id="offer"
                  name="redio-charge"
                  onChange={handleRadioChange}
                  value={"offer"}
                  checked={paymentType === "offer"}
                />
                <label htmlFor="offer">{t("Use offer")}</label>
              </div>
              <div className="input_radio">
                <input
                  type="radio"
                  id="extend"
                  name="redio-charge"
                  onChange={handleRadioChange}
                  value={"extend"}
                  checked={paymentType === "extend"}
                />
                <label htmlFor="extend">{t("Extending package")}</label>
              </div>
            </div>
            <div className="input_item">
              <FaRegCreditCard size={25} />
              <input
                type="text"
                placeholder={t("amount")}
                value={
                  paymentType == "fullCharge" ? userInfo.package_price : amount
                }
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
      )}

      {openIframe && (
        <div className="content h-[100vh]">
          <iframe
            src={urlCharge}
            frameborder="0"
            className="w-full h-full"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default PopupCharge;
