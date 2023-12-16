import { FaPlus } from "react-icons/fa6";
import imgUser from "../../images/img-user.jpg";
import "./boxInfoUser.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IoReloadOutline } from "react-icons/io5";
import { getUser } from "../../redux/actions/user";
import Loader from "../loader/Loader";

const BoxInfoUser = ({ setOpen }) => {
  const { t } = useTranslation();
  const { userInfo, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleRefrechUserData = async () => {
    getUser(dispatch);
  };

  return (
    <>
      {userInfo ? (
        <>
          <div
            className="refrech flex items-center justify-end gap-2 mb-2 "
            onClick={handleRefrechUserData}
          >
            <button>
              <IoReloadOutline size={20} />
            </button>
            <span className="time">{t("Last updated")} 10:00 ص</span>
          </div>
          <div
            className="box_info_user"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
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
                <h4 className="name text-[20px] font-semibold">
                  {userInfo.name}
                </h4>
                <span className="user_name text-gray-400">
                  {userInfo.username}
                </span>
              </div>
            </div>
            <div className="bottom_info flex items-center justify-between p-4">
              <div className="text">
                <h5 className="text-[18px] font-semibold">
                  {t("Account balance")}
                </h5>
                <h3 className=" font-bold text-[26px]">
                  {userInfo.balance} {t("EGP")}
                </h3>
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
        </>
      ) : (
        <div>Loading...</div>
      )}

      {loading && <Loader fixed={true} />}
    </>
  );
};

export default BoxInfoUser;
