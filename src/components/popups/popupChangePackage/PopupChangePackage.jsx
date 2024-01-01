import { IoMdArrowBack } from "react-icons/io";
import "./popupChangePackage.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import apiAxios from "../../../utils/apiAxios";
import { toast } from "react-toastify";
import { getUser } from "../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { PiPackage } from "react-icons/pi";
import Loader from "../../loader/Loader";

const PopupChangePackage = ({ open, setOpen }) => {
  const [selectPackage, setSelectPackage] = useState(0);
  const lang = localStorage.getItem("lang");
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.user);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
  const handleChangePackage = async (profileId) => {
    setLoading(true);
    try {
      const { data } = await apiAxios.put("mob/profile", {
        profile_id: profileId,
      });
      toast.success(data.success && data.message);
      getUser(dispatch);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className={`popup_change_package ${open ? "active" : ""}`}>
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <div className="back" onClick={() => setOpen(false)}>
          <IoMdArrowBack size={25} />
        </div>

        <h4 className=" font-semibold">{t("Change Package")}</h4>
      </div>
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
                      <h4 className="package_name text-center mb-2">
                        {item.name}
                      </h4>
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
                    onClick={() => handleChangePackage(item.id)}
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

        {loading && <Loader fixed={true} />}
      </div>
    </div>
  );
};

export default PopupChangePackage;
