import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import "./availableCards.scss";
import apiAxios from "../../utils/apiAxios";
import { PiPackage } from "react-icons/pi";
import { formateDate } from "../../utils/formatDate";
import { toast } from "react-toastify";

const AvailableCards = () => {
  const lang = localStorage.getItem("lang");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openIframe, setOpenIframe] = useState(false);
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();
  const licenseNum = sessionStorage.getItem("license_num");

  // get all cards
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await apiAxios.get(
          `mob/cards?license_num=${licenseNum}`
        );
        setCards(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  // change package
  const handleBuyCard = async (series) => {
    setLoading(true);
    try {
      const { data } = await apiAxios.post("mob/cards/pay", {
        series,
        license_num: licenseNum,
      });
      setUrl(data.data?.url && data.data.url);
      setOpenIframe(data.data?.url && true);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <div className="available_cards">
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

        <h4 className=" font-semibold">{t("Buy card")}</h4>
      </div>
      {!openIframe && (
        <div className="content mt-10 px-3">
          {cards && cards.length > 0 ? (
            <div className="cards_boxs my-8 grid gap-4">
              {!loading ? (
                cards.map((item, index) => (
                  <div className={`box`} key={index}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="text">
                        <h4 className="package_name mb-2">{item.name}</h4>
                        <span className="price block mb-2">
                          {t("price")}: {item.price}
                        </span>
                        <span className="block mb-2">
                          {t("Total Traffic")}: {item.total_traffic}
                        </span>
                        <span className="block mb-2">
                          {t("Expiration")}: {formateDate(item.expiration)}
                        </span>
                      </div>
                      <div className="icon">
                        <PiPackage size={30} />
                      </div>
                    </div>

                    <button
                      className="btn_fill w-full rounded-full text-[17px] py-1 mt-3"
                      onClick={() => {
                        handleBuyCard(item.series);
                      }}
                    >
                      {t("Buy card")}
                    </button>
                  </div>
                ))
              ) : (
                <div className="mb-5 text-center">Loading...</div>
              )}
            </div>
          ) : (
            <div className="text-center py-3">
              {t(
                "Sorry, there are no cards available now Please contact the company"
              )}
            </div>
          )}
        </div>
      )}
      {openIframe && (
        <div className="content h-[100vh]">
          <iframe src={url} frameBorder="0" className="w-full h-full"></iframe>
        </div>
      )}
      {loading && <Loader fixed={true} />}
    </div>
  );
};

export default AvailableCards;
