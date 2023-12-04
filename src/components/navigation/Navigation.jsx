import { NavLink } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiMenu2Fill } from "react-icons/ri";
import "./navigation.scss";

const Sidebar = () => {
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
          <span>Account</span>
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          <div className="icon">
            <FaHome size={25} />
          </div>
          <span>Home</span>
        </NavLink>
        <NavLink
          to={"/consumption"}
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          <div className="icon">
            <TbBrandGoogleAnalytics size={25} />
          </div>
          <span>Consumption</span>
        </NavLink>
        <NavLink
          to={"/login"}
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          <div className="icon">
            <RiMenu2Fill size={25} />
          </div>
          <span>Menu</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
