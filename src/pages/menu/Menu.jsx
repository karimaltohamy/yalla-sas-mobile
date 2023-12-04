import React from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiMathOperationsFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import "./menu.scss";

const Menu = () => {
  return (
    <div className="menu pt-[90px] h-full">
      <div className={`${styles.custom_container} h-full`}>
        <div className="content h-full">
          <div className="links grid grid-cols-2 gap-5">
            <Link className="link" to={"/sessions"}>
              <BiSolidFoodMenu size={45} />
              Sessions
            </Link>
            <Link className="link" to={"/mail-box"}>
              <MdOutlineMailOutline size={45} />
              mail box
            </Link>
            <Link className="link" to={"/consumption-calculation"}>
              <PiMathOperationsFill size={45} />
              Consumption calculation
            </Link>
            <Link className="link" to={"/payment"}>
              <MdOutlinePayment size={45} />
              Payment fawry or Visa
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
