import React, { useState } from "react";
import styles from "../../styles/style";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidFoodMenu } from "react-icons/bi";
import { PiMathOperationsFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { RiCustomerServiceLine } from "react-icons/ri";
import "./menu.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import apiAxios from "../../utils/apiAxios";
import { setLogout } from "../../redux/reducers/userReducer";
import Loader from "../../components/loader/Loader";
import { FiLogIn } from "react-icons/fi";

const Menu = () => {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await apiAxios.get("mob/logout");
      dispatch(setLogout());
      localStorage.setItem("access_token", null);
      apiAxios.defaults.headers.common["Authorization"] = null;

      setLoading(false);
      toast.success(data.success && "Successful logout");
      navigate("/login");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="menu pt-[90px] h-full">
      <div className={`${styles.custom_container} h-full`}>
        <div className="content h-full">
          <div className="links grid grid-cols-2 gap-5">
            <Link
              className="link"
              to={"/sessions"}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <BiSolidFoodMenu size={45} />
              {t("Sessions")}
            </Link>
            {/* <Link
              className="link"
              to={"/mail-box"}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <MdOutlineMailOutline size={45} />
              {t("mail box")}
              </Link>*/}
            <Link
              className="link"
              to={"/consumption-calculation"}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <PiMathOperationsFill size={45} />
              {t("Consumption calculation")}
            </Link>
          </div>
          {userInfo.whatsapp_support_number && (
            <Link
              className="link mt-4"
              to={"/whatsappSupport"}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <RiCustomerServiceLine size={45} />
              {t("Contact customer service")}
            </Link>
          )}
          <button
            className="flex items-center justify-center gap-1 btn_fill w-full mt-5 py-2 text-[17px] rounded-full "
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="800"
            onClick={handleLogout}
          >
            <FiLogIn size={20} />
            <span>{t("Logout")}</span>
          </button>
        </div>
      </div>
      <div className="primary-shadow"></div>
      <div className="primary2-shadow"></div>

      {loading && <Loader fixed={true} />}
    </div>
  );
};

export default Menu;
