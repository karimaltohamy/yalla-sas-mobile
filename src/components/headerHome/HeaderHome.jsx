import { IoMdNotificationsOutline, IoMdSettings } from "react-icons/io";
import logo from "../../images/logo.png";
import styles from "../../styles/style";
import { Link } from "react-router-dom";

const HeaderHome = () => {
  return (
    <header className="py-[12px]">
      <div className={styles.custom_container}>
        <div className="line flex items-center justify-between">
          <Link to={"/"} className="notification">
            <IoMdNotificationsOutline size={25} />
          </Link>
          <div className="logo">
            <img src={logo} alt="logo" loading="lazy" className="w-[80px]" />
          </div>
          <Link to={"/"} className="settings">
            <IoMdSettings size={25} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderHome;
