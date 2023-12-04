import { NavLink } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiMenu2Fill } from "react-icons/ri";
import "./navigation.scss";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className="navigation">
      <div className="links">
        <NavLink
          to={"/my-profile"}
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          <div className="icon">
            <IoPerson size={25} />
          </div>
          <span>{t("Account")}</span>
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          <div className="icon">
            <FaHome size={25} />
          </div>
          <span>{t("Home")}</span>
        </NavLink>
        <NavLink
          to={"/consumption"}
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          <div className="icon">
            <TbBrandGoogleAnalytics size={25} />
          </div>
          <span>{t("Consumption")}</span>
        </NavLink>
        <NavLink
          to={"/menu"}
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          <div className="icon">
            <RiMenu2Fill size={25} />
          </div>
          <span>{t("Menu")}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
