import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import "./changePackage.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import apiAxios from "../../utils/apiAxios";
import { toast } from "react-toastify";
import { getUser } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { PiPackage } from "react-icons/pi";
import Loader from "../../components/loader/Loader";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ChangePackage = ({ open, setOpen }) => {
  const [selectPackage, setSelectPackage] = useState(0);
  const [openPopupWarning, setOpenPopupWarning] = useState(false);
  const lang = localStorage.getItem("lang");
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.user);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openIframe, setOpenIframe] = useState(false);
  const [urlCharge, setUrlCharge] = useState(null);
  const navigate = useNavigate();

  // get all packages
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await apiAxios.get("mob/packages");
        setPackages(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  // change package
  const handleChangePackage = async () => {
    setLoading(true);
    try {
      const { data } = await apiAxios.put("mob/profile", {
        profile_id: selectPackage,
      });
      setUrlCharge(data.data?.url && data.data.url);
      setOpenIframe(data.data?.url && true);
      setLoading(false);
      setOpenPopupWarning(false);
      // refrach user data
      getUser(dispatch);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
      setOpenPopupWarning(false);
    }
  };

  return (
    <div className={`change_package`}>
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

        <h4 className=" font-semibold">{t("Change Package")}</h4>
      </div>
      {!openIframe && (
        <div className="content mt-10 px-3">
          <div className="current_package flex items-center gap-1 justify-between">
            <h5>{t("Current Package")}:</h5>
            <span className="text-gray-500">{userInfo.package}</span>
          </div>

          {packages && packages.length > 0 ? (
            <div className="packages_boxs my-8 grid gap-4">
              {!loading ? (
                packages.map((item, index) => (
                  <div className={`box`} key={index}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="text">
                        <h4 className="package_name mb-2">{item.name}</h4>
                        <span className="price">
                          {t("price")}: {item.price}EGP
                        </span>
                      </div>
                      <div className="icon">
                        <PiPackage size={30} />
                      </div>
                    </div>

                    <button
                      className="btn_fill w-full rounded-full text-[17px] py-1 mt-3"
                      onClick={() => {
                        setSelectPackage(item.id);
                        setOpenPopupWarning(true);
                      }}
                    >
                      {t("Change Package")}
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
        </div>
      )}

      {openPopupWarning && (
        <div className="warning_popup">
          <div className="content">
            <div
              className="close_popup"
              onClick={() => setOpenPopupWarning(false)}
            >
              <IoClose size={20} />
            </div>
            {lang == "en" ? (
              <p className="desc">
                Please note that your current package has not expired yet, and
                you have {userInfo.total_rxtx} remaining and{" "}
                {userInfo.remaining_days} days until your package expires. If
                you click on change now, you must pay the cost of the new
                package for it to work for you. If you pay, the internet will be
                stopped. If you have any other inquiries, please contact the
                company. 🤍
              </p>
            ) : (
              <p className="desc">
                يرجي العلم ان باقتك الحالية لم تنتهي بعد ومتبقي لديك{" "}
                {userInfo.total_rxtx} و {userInfo.remaining_days} يوم علي انتهاء
                باقتك وفي حالة الضغط علي التغير الان فأنة يجب عليك دفع تكلفة
                الباقه الجديده لكي تعمل معك وفي حالة عدم الدفع سوف يتم ايقاف
                الانترنت واذا كان لديك اي استفسارات اخري برجاء التواصل مع الشركه
                الخاصه بك 🤍
              </p>
            )}

            <button
              className="btn_fill w-full rounded-full text-[17px] py-1 mt-3"
              onClick={handleChangePackage}
            >
              {t("Change Package Now")}
            </button>
          </div>
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

export default ChangePackage;
