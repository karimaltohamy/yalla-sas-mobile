import styles from "../../styles/style";
import imgUser from "../../images/img-user.jpg";
import "./profile.scss";
import { FiLogIn } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import apiAxios from "../../utils/apiAxios";
import { setLogout } from "../../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { useState } from "react";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <>
      {userInfo ? (
        <div className="profile">
          <div
            className="user_info pt-8 pb-[70px] px-3 flex items-center gap-3"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div className="image">
              <img
                src={imgUser}
                alt="img-user"
                loading="lazy"
                className="w-[75px] h-[75px] rounded-full"
              />
            </div>
            <div className="text">
              <h4 className="name text-[20px] font-semibold">
                {userInfo.name}
              </h4>
              <span className="user_name  text-[14px]">
                {userInfo.username}
              </span>
            </div>
          </div>
          <div className={styles.custom_container}>
            <div
              className="more_info py-6 px-5 -mt-10"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <div className="items flex items-center gap-3 justify-between">
                <div className="item text-center">
                  <h3 className="text-[21px] font-semibold">
                    {userInfo.remaining_days}
                  </h3>
                  <span className="text-[15px] -translate-y-1 block text-gray-400">
                    {t("Day")}
                  </span>
                </div>
                <div className="item text-center">
                  <h3 className="text-[21px] font-semibold">
                    {userInfo.package_usage_percent == "unlimited" ||
                    userInfo.package_usage_percent == "suspended"
                      ? userInfo.package_usage_percent
                      : userInfo.total_rxtx}
                  </h3>
                  <span className="text-[15px] -translate-y-1 block text-gray-400">
                    {t("You have now")}
                  </span>
                </div>
                <div className="item text-center">
                  <h3 className="text-[21px] font-semibold">
                    {userInfo.balance} EGP
                  </h3>
                  <span className="text-[15px] -translate-y-1 block text-gray-400">
                    {t("Account balance")}
                  </span>
                </div>
              </div>
            </div>

            <div className="items_info my-5">
              <div
                className="item"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <h5 className="font-semibold">{t("Account code")}</h5>
                <span className="text-gray-400">{userInfo.id}</span>
              </div>
              <div
                className="item"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <h5 className="font-semibold">{t("Package Name")}</h5>
                <span className="text-gray-400">{userInfo.package}</span>
              </div>
              <div
                className="item"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="300"
              >
                <h5 className="font-semibold">{t("User Name")}</h5>
                <span className="text-gray-400">{userInfo.username}</span>
              </div>
              <div
                className="item"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
              >
                <h5 className="font-semibold">{t("Account balance")}</h5>
                <span className="text-gray-400">{userInfo.balance}EGP</span>
              </div>
              <div
                className="item"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                <h5 className="font-semibold">{t("Email")}</h5>
                <span className="text-gray-400">
                  {userInfo.email ? userInfo.email : "not have"}
                </span>
              </div>
              <div
                className="item"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="600"
              >
                <h5 className="font-semibold">{t("Phone Number")}</h5>
                <span className="text-gray-400">{userInfo.phone}</span>
              </div>
              <div
                className="item"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="700"
              >
                <h5 className="font-semibold">{t("Address")}</h5>
                <span className="text-gray-400">
                  {userInfo.address ? userInfo.address : "not have"}
                </span>
              </div>
            </div>
            <button
              className="flex items-center justify-center gap-1 btn_fill w-full mt-5 py-2 text-[17px] rounded-full "
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="800"
              onClick={handleLogout}
            >
              <FiLogIn size={20} />
              <span>{t("Logout")}</span>
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {loading && <Loader fixed={true} />}
    </>
  );
};

export default Profile;
