import { IoMdArrowBack } from "react-icons/io";
import "./popupChangePackage.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import apiAxios from "../../../utils/apiAxios";

const PopupChangePackage = ({ open, setOpen }) => {
  const [selectPackage, setSelectPackage] = useState(0);
  const lang = localStorage.getItem("lang");
  const { t } = useTranslation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(false);
      try {
        const { data } = await apiAxios.get("mob/packages");
        setPackages(data.data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChangePackage = () => {
    console.log(selectPackage);
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
          <span className="text-gray-500">Le test 5</span>
        </div>

        <div className="packages_boxs my-8 grid grid-cols-2 gap-4">
          {packages.length > 0 ? (
            loading ? (
              packages.map((item, index) => (
                <div
                  className={`box ${selectPackage === item.id ? "active" : ""}`}
                  key={index}
                  onClick={() => setSelectPackage(item.id)}
                >
                  <h4 className="package_name text-center">{item.name}</h4>
                  <span className="price">{item.price}EGP</span>
                </div>
              ))
            ) : (
              <div className="mb-5 text-center">Loading...</div>
            )
          ) : (
            <div className="text-center">No packages available</div>
          )}
        </div>

        <div>
          <button
            className="btn_fill w-full rounded-full text-[17px] py-3"
            onClick={handleChangePackage}
          >
            {t("Change Package")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupChangePackage;
