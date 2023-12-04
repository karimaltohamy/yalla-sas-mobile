import { FaPlus } from "react-icons/fa6";
import imgUser from "../../images/img-user.jpg";
import "./boxInfoUser.scss";
import { useTranslation } from "react-i18next";

const BoxInfoUser = ({ setOpen }) => {
  const { t } = useTranslation();
  return (
    <div className="box_info_user">
      <div className="top_info p-4 flex items-center gap-3">
        <div className="image">
          <img
            src={imgUser}
            alt="img-user"
            loading="lazy"
            className="w-[90px] h-[90px] rounded-full"
          />
        </div>
        <div className="text">
          <h4 className="name text-[20px] font-semibold">Hossam</h4>
          <span className="user_name text-gray-400">hossam.mohammed</span>
        </div>
      </div>
      <div className="bottom_info flex items-center justify-between p-4">
        <div className="text">
          <h5 className="text-[18px] font-semibold">{t("Account balance")}</h5>
          <h3 className=" font-bold text-[26px]">0.0 {t("EGP")}</h3>
        </div>
        <button
          className="flex items-center gap-1 btn_fill"
          onClick={() => setOpen(true)}
        >
          <FaPlus />
          <span>{t("Charge")}</span>
        </button>
      </div>
    </div>
  );
};

export default BoxInfoUser;
