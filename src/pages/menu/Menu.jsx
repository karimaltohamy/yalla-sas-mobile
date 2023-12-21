import React from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { BiSolidFoodMenu } from "react-icons/bi";
import { PiMathOperationsFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { RiCustomerServiceLine } from "react-icons/ri";
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
          {
            <Link
              className="link mt-4"
              to={"https://www.youtube.com/watch?v=XmD9WsFnyKo"}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <RiCustomerServiceLine size={45} />
              {t("Contact customer service")}
            </Link>
          }
        </div>
      </div>
      <div className="primary-shadow"></div>
      <div className="primary2-shadow"></div>
    </div>
  );
};

export default Menu;
