import React from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiMathOperationsFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import "./menu.scss";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const { t } = useTranslation();
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
            <Link
              className="link"
              to={"/mail-box"}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <MdOutlineMailOutline size={45} />
              {t("mail box")}
            </Link>
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
            <Link
              className="link"
              to={"/payment"}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <MdOutlinePayment size={45} />
              {t("Payment fawry or Visa")}
            </Link>
          </div>
        </div>
      </div>
      <div className="primary-shadow"></div>
      <div className="primary2-shadow"></div>
    </div>
  );
};

export default Menu;
