import { IoMdNotificationsOutline, IoMdSettings } from "react-icons/io";
import logo from "../../images/logo.png";
import styles from "../../styles/style";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiAxios from "../../utils/apiAxios";
import { setLogout } from "../../redux/reducers/userReducer";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FiLogIn } from "react-icons/fi";
import Loader from "../loader/Loader";
import { useState } from "react";

const HeaderHome = ({ setOpenPopupSettings, setOpenPopupNotification }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
    <header className="py-[12px]">
      <div className={styles.custom_container}>
        <div className="line flex items-center justify-between">
          <button className="notification" onClick={handleLogout}>
            <FiLogIn size={20} />
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
      {loading && <Loader fixed={true} />}
    </header>
  );
};

export default HeaderHome;
