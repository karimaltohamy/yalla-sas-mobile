import { IoMdNotificationsOutline, IoMdSettings } from "react-icons/io";
import logo from "../../images/logo.png";
import styles from "../../styles/style";
import { Link } from "react-router-dom";

const HeaderHome = ({ setOpenPopupSettings, setOpenPopupNotification }) => {
  return (
    <header className="py-[12px]">
      <div className={styles.custom_container}>
        <div className="line flex items-center justify-between">
          <button
            className="notification"
            onClick={() => setOpenPopupNotification(true)}
          >
            <IoMdNotificationsOutline size={25} />
          </button>
          <div className="logo">
            <img src={logo} alt="logo" loading="lazy" className="w-[80px]" />
          </div>
          <button
            className="settings"
            onClick={() => setOpenPopupSettings(true)}
          >
            <IoMdSettings size={25} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderHome;
