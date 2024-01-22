import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formateDate } from "../../utils/formatDate";
import "./boxSpecialSubscriptions.scss";
import { handleSubscription } from "../../redux/actions/handleSubscription";
import Loader from "../loader/Loader";
import { IoMdClose } from "react-icons/io";
import { GiHotSpices } from "react-icons/gi";

const BoxSpecialSubscriptions = ({ item }) => {
  const { t } = useTranslation();
  const [openIframe, setOpenIframe] = useState(false);
  const [urlCharge, setUrlCharge] = useState(null);
  const [loading, setLoading] = useState(false);
  const todayDate = new Date();
  const lang = localStorage.getItem("lang");

  return (
    <div className="box_special_subscriptions relative overflow-hidden">
      <div className="relative z-30">
        <div className="text">
          <div className="flex items-center justify-between mb-3">
            <h4 className="package_name mb-2 flex items-center gap-2">
              {" "}
              <GiHotSpices size={"25"} />
              {item.name}
            </h4>
            {item.active ? (
              <span className="status text-green-500 font-bold">
                {t("Active")}
              </span>
            ) : (
              <span className="status text-green-500 font-bold text-red-500">
                {t("Not Active")}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div>
              {t("Remaining days")}: <span>{item.remaining_days}</span>
            </div>
            {formateDate(todayDate) <= formateDate(item.expiration) && (
              <button
                className="btn_fill text-[17px] px-6"
                onClick={() =>
                  handleSubscription(
                    item.addon_id,
                    setLoading,
                    setUrlCharge,
                    setOpenIframe
                  )
                }
              >
                {t("Renewal")}
              </button>
            )}
          </div>
        </div>
      </div>
      <div class="primary2-shadow z-10"></div>
      {openIframe && (
        <div className="content fixed top-0 left-0 w-full h-[100vh] ">
          <div
            className={`top flex items-center justify-between ${
              lang == "en" ? "en" : "ar"
            }`}
          >
            <div
              className={`back text-red-500 flex items-center gap-2`}
              onClick={() => setOpenIframe(false)}
            >
              <span>{t("close")}</span>
              <IoMdClose size={25} />
            </div>

            <h4 className=" font-semibold">{t("Special Subscriptions")}</h4>
          </div>
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

export default BoxSpecialSubscriptions;
