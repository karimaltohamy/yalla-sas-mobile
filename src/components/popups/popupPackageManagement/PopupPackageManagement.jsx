import { LiaExchangeAltSolid } from "react-icons/lia";
import { GiElectric } from "react-icons/gi";
import { LuPackage } from "react-icons/lu";
import "./popupPackageManagement.scss";

const PopupPackageManagement = ({
  open,
  setOpen,
  setOpenChangePackage,
  setOpenExtending,
  setOpenActivatePackage,
}) => {
  const closePoppup = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <div
      className={`popup_package ${open ? "active" : ""}`}
      onClick={closePoppup}
    >
      <div className={`content ${open ? "active" : ""}`}>
        <div className="items">
          <button
            className="item"
            onClick={() => {
              setOpen(false);
              setOpenChangePackage(true);
            }}
          >
            <LiaExchangeAltSolid size={25} />
            Change Package
          </button>
          <button
            className="item"
            onClick={() => {
              setOpen(false);
              setOpenActivatePackage(true);
            }}
          >
            <GiElectric size={25} />
            Activate Package
          </button>
          <button
            className="item"
            onClick={() => {
              setOpen(false);
              setOpenExtending(true);
            }}
          >
            <LuPackage size={25} />
            Extending Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupPackageManagement;
