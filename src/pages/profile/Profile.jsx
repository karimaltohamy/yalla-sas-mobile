import styles from "../../styles/style";
import imgUser from "../../images/img-user.jpg";
import "./profile.scss";
import { FiLogIn } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  return (
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
          <h4 className="name text-[20px] font-semibold">Hossam</h4>
          <span className="user_name  text-[14px]">hossam.mohammed</span>
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
              <h3 className="text-[21px] font-semibold">26</h3>
              <span className="text-[15px] -translate-y-1 block text-gray-400">
                {t("Day")}
              </span>
            </div>
            <div className="item text-center">
              <h3 className="text-[21px] font-semibold">MB 0</h3>
              <span className="text-[15px] -translate-y-1 block text-gray-400">
                {t("Package")}
              </span>
            </div>
            <div className="item text-center">
              <h3 className="text-[21px] font-semibold">0.00 EGP</h3>
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
            <span className="text-gray-400">12456</span>
          </div>
          <div
            className="item"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <h5 className="font-semibold">{t("User Name")}</h5>
            <span className="text-gray-400">011194898</span>
          </div>
          <div
            className="item"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <h5 className="font-semibold">{t("Account balance")}</h5>
            <span className="text-gray-400">0.0EGP</span>
          </div>
          <div
            className="item"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            <h5 className="font-semibold">{t("Email")}</h5>
            <span className="text-gray-400">example@info.com</span>
          </div>
          <div
            className="item"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <h5 className="font-semibold">{t("Phone Number")}</h5>
            <span className="text-gray-400">010487587</span>
          </div>
          <div
            className="item"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="700"
          >
            <h5 className="font-semibold">{t("Address")}</h5>
            <span className="text-gray-400">
              101 Kasr El Ainy Street Cairo.
            </span>
          </div>
        </div>
        <button
          className="flex items-center justify-center gap-1 btn_fill w-full mt-5 py-2 text-[17px] rounded-full "
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="800"
          onClick={() => setOpen(true)}
        >
          <FiLogIn size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
