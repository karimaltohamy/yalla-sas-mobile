import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import "./chargePackage.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import apiAxios from "../../utils/apiAxios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaGift } from "react-icons/fa";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const ChargePackage = () => {
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");
  const { userInfo } = useSelector((state) => state.user);
  const [amount, setAmount] = useState(1);
  const [paymentType, setPaymentType] = useState("fullCharge");
  const [openIframe, setOpenIframe] = useState(false);
  const [urlCharge, setUrlCharge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [options, setOtipns] = useState(null);
  const navigate = useNavigate();

  const getOptions = async () => {
    try {
      const { data } = await apiAxios.get("mob/charge/options");
      setOtipns(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getOptions();
  }, []);

  const handleRadioChange = (event) => {
    setPaymentType(event.target.value);
  };

  // handle payment
  const handlePayment = async (e) => {
    e.preventDefault();

    if (amount < 1) {
      return toast.error(
        t("You must write a number greater than 0 in the amount")
      );
    }

    setLoading(true);
    try {
      let response = null;
      response = await apiAxios.post("mob/charge", {
        payment_type: paymentType,
        amount: paymentType == "fullCharge" ? userInfo.package_price : amount,
      });

      toast.success(response.data.success && t("Successful operation"));
      setLoading(false);
      setUrlCharge(response.data.data?.url && response.data.data.url);
      setOpenIframe(response.data.data?.url && true);
      paymentType == "extend" && navigate(-1);
      getOptions();
    } catch (error) {
      toast.error(error.response.data.message);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className={`charge_package`}>
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        {!openIframe && (
          <div className={`back `} onClick={() => navigate(-1)}>
            <IoMdArrowBack size={25} />
          </div>
        )}
        {openIframe && (
          <div
            className={`back text-red-500 flex items-center gap-2`}
            onClick={() => setOpenIframe(false)}
          >
            <span>{t("close")}</span>
            <IoMdClose size={25} />
          </div>
        )}
        <h4 className=" font-semibold">{t("Recharge Package")}</h4>
      </div>
      {!openIframe && (
        <div className="content mt-[30px] px-5 h-[100vh] flex items-center justify-center">
          {options?.offer_enable && (
            <div className="offers mb-5 text-center">
              <h4 className="title">{t("Our options")}</h4>
              <div className="items">
                <div className="item">
                  <div className="icon">
                    <FaGift size={20} />
                  </div>
                  <h5>{lang == "en" ? options.text_en : options.text_ar}</h5>
                  <div className="icon">
                    <FaGift size={20} />
                  </div>
                </div>
              </div>
            </div>
          )}

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
              {options?.deposit_enable && (
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
              )}
              {options?.offer_enable && (
                <div className="input_radio">
                  <input
                    type="radio"
                    id="offer"
                    name="redio-charge"
                    onChange={handleRadioChange}
                    value={"offer"}
                    checked={paymentType === "offer"}
                  />
                  <label htmlFor="offer">{t("Use option")}</label>
                </div>
              )}
              {options?.extend_enable && (
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
              )}
              {options?.user_balance_renew && (
                <div className="input_radio">
                  <input
                    type="radio"
                    id="userbalance"
                    name="redio-charge"
                    onChange={handleRadioChange}
                    value={"userbalance"}
                    checked={paymentType === "userbalance"}
                  />
                  <label htmlFor="userbalance">
                    {t("Renewal from my balance")}
                  </label>
                </div>
              )}
            </div>
            {paymentType !== "extend" && paymentType !== "userbalance" && (
              <div className="input_item">
                <FaRegCreditCard size={25} />
                <input
                  type="number"
                  placeholder={t("amount")}
                  value={
                    paymentType == "fullCharge"
                      ? userInfo.package_price
                      : paymentType == "offer"
                      ? userInfo.package_price * Number(options.no_of_months)
                      : amount
                  }
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            )}
            <div className="btns flex items-center justify-center gap-5">
              <button className="flex items-center justify-center gap-[6px] btn_fill w-full">
                <GiElectric size={20} />
                {paymentType === "fullCharge"
                  ? t("Renew package")
                  : paymentType === "deposit"
                  ? t("Deposit balance")
                  : paymentType === "options"
                  ? t("Use options")
                  : paymentType === "extend"
                  ? t("Extending package")
                  : paymentType === "offer"
                  ? t("Use option")
                  : null}{" "}
                {t("now")}
              </button>
            </div>
          </form>
        </div>
      )}

      {openIframe && (
        <div className="content h-[100vh]">
          <iframe
            src={urlCharge}
            frameBorder="0"
            className="w-full h-full"
          ></iframe>
        </div>
      )}

      {loading && <Loader fixed={true} />}
    </div>
  );
};

export default ChargePackage;
