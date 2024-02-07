import { t } from "i18next";
import React, { useEffect, useState } from "react";
import "./myCards.scss";
import { IoMdArrowBack } from "react-icons/io";
import { PiPackage } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import apiAxios from "../../utils/apiAxios";
import Pagination from "../../components/pagination/Pagination";

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const lang = localStorage.getItem("lang");
  const navigate = useNavigate();

  // get all cards
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await apiAxios.get(`mob/my-cards?page=${page}`);
        setCards(data.data);
        setLastPage(data.last_page);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="my_cards">
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <div className={`back `} onClick={() => navigate(-1)}>
          <IoMdArrowBack size={25} />
        </div>

        <h4 className=" font-semibold">{t("Purchased cards")}</h4>
      </div>
      <div className="content mt-10 px-3">
        {cards && cards.length > 0 ? (
          <div className="cards_boxs my-8 grid gap-4">
            {!loading ? (
              cards.map((item, index) => (
                <div className={`box`} key={index}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="text">
                      <h4 className="package_name mb-2">{item.card_name}</h4>
                      <span className="block mb-2">
                        {t("Expiration")}: {formateDate(item.expiration)}
                      </span>
                    </div>
                    <div className="icon">
                      <PiPackage size={30} />
                    </div>
                  </div>
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
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      </div>
    </div>
  );
};

export default MyCards;
