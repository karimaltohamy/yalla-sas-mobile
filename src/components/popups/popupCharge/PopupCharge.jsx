import { IoMdArrowBack } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import "./popupCharge.scss";

const PopupCharge = ({ setOpen, open }) => {
  return (
    <div className={`PopupCharge ${open ? "active" : ""}`}>
      <div className="top">
        <div className="back" onClick={() => setOpen(false)}>
          <IoMdArrowBack size={25} />
        </div>
      </div>
      <div className="content mt-10 px-3">
        <form>
          <div className="input_item">
            <FaRegCreditCard size={25} />
            <input type="text" placeholder="Card number" />
          </div>
          <div className="btns flex items-center justify-center gap-5">
            <button className="flex items-center gap-[6px] btn_fill">
              <GiElectric size={20} />
              Charge
            </button>
            <button className="flex items-center gap-[6px] btn_outline">
              <MdOutlineQrCodeScanner size={20} />
              Scan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupCharge;
