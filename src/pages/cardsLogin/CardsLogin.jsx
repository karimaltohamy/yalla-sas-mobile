import React, { useState } from "react";
import logo from "../../images/logo.png";
import "./cardsLogin.scss";
import { GrLicense } from "react-icons/gr";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiAxios from "../../utils/apiAxios";
import Loader from "../../components/loader/Loader";

const CardsLogin = () => {
  const [licenseName, setLicenseName] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const lang = localStorage.getItem("lang");

  const handleCardsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiAxios.post("/mob/cards/login", {
        license_num: licenseName,
      });
      setLoading(false);
      sessionStorage.setItem("license_num", data.data.license_num);
      navigate("/cards-subscription-options");
      toast.success(
        data.success && lang == "en"
          ? "Successful Registration "
          : "تم تسجيل  بنجاح"
      );
    } catch (error) {
      setLoading(false);
      toast.error(
        lang == "en"
          ? error.response.data.message.en
          : error.response.data.message.ar
      );
    }
  };

  return (
    <div className="cards_login">
      <div className="logo py-3 text-center">
        <img
          src={logo}
          alt="logo"
          loading="lazy"
          className="w-[100px] mt-4 mx-auto"
        />
      </div>
      <div className="line">
        <div className="login_form">
          <form onSubmit={handleCardsLogin}>
            <div className="input_item">
              <GrLicense size={20} />
              <input
                type="number"
                placeholder={t("License number")}
                value={licenseName}
                onChange={(e) => setLicenseName(e.target.value)}
                autoComplete="License name"
              />
            </div>
            <button className="btn_fill w-full py-2 text-[18px] rounded-full">
              {t("Registration")}
            </button>
          </form>
        </div>
      </div>
      {loading && <Loader fixed={true} />}
    </div>
  );
};

export default CardsLogin;
