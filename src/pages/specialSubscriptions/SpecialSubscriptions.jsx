import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./specialSubscriptions.scss";
import apiAxios from "../../utils/apiAxios";
import { PiPackage } from "react-icons/pi";
import { toast } from "react-toastify";
import { getOptions } from "../../redux/actions/optionCharge";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { handleSubscription } from "../../redux/actions/handleSubscription";
import Pagination from "../../components/pagination/Pagination";

const SpecialSubscriptions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [subscriptions, setSubscriptions] = useState([]);
  const [openIframe, setOpenIframe] = useState(false);
  const [urlCharge, setUrlCharge] = useState(null);
  const [lastPage, setLastPage] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await apiAxios.post(`mob/addon`, {
          page: currentPage,
        });
        setSubscriptions(data.data);
        setLastPage(data.last_page);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    })();
  }, [currentPage]);

  return (
    <div className="special_subscriptions">
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

        <h4 className=" font-semibold">{t("Special Subscriptions")}</h4>
      </div>
      {!openIframe && (
        <div className="content mt-10 px-3">
          {subscriptions && subscriptions.length > 0 ? (
            <div className="subscriptions_boxs my-8 grid gap-4">
              {!loading ? (
                subscriptions.map((item, index) => (
                  <div className={`box`} key={index}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="text">
                        <h4 className="package_name ">{item.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="mb-1">
                            {t("price")}: {item.price}EGP
                          </span>
                          <span className="block">
                            {t("Expiration unit")}: {item.expiration_unit}
                          </span>
                        </div>
                      </div>
                      <div className="icon block">
                        <PiPackage size={30} />
                      </div>
                    </div>

                    <button
                      className="btn_fill w-full rounded-full text-[17px] py-1 mt-3"
                      onClick={() =>
                        handleSubscription(
                          item.id,
                          setLoading,
                          setUrlCharge,
                          setOpenIframe
                        )
                      }
                    >
                      {t("Subscription")}
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
                "Sorry, there are no packages available now Please contact the company"
              )}
            </div>
          )}

          <Pagination
            lastPage={lastPage}
            page={currentPage}
            setPage={setCurrentPage}
          />
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

export default SpecialSubscriptions;
