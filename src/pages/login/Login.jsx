import "./login.scss";
import { FaRegUser } from "react-icons/fa6";
import { GrLicense } from "react-icons/gr";
import logo from "../../images/logo.png";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndLoading,
  setUserError,
  setUserStart,
  setUserSuccess,
} from "../../redux/reducers/userReducer";
import apiAxios from "../../utils/apiAxios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom/dist";
import Loader from "../../components/loader/Loader";
import { MdOutlinePhoneEnabled } from "react-icons/md";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [LicenseName, setLicenseName] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  const [users, setUsers] = useState([]);
  const { loading } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = localStorage.getItem("lang");

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setUserStart());
    try {
      const { data } = await apiAxios.post("mob/login", {
        phone: phoneNumber,
        license_num: LicenseName,
      });
      if (data.success == "multiable") {
        setShowSelect(true);
        setUsers(data.data);
        dispatch(setEndLoading());
      } else {
        dispatch(setUserSuccess(data.data));
        localStorage.setItem("access_token", data.access_token);

        apiAxios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.access_token}`;
        toast.success(
          data.success && lang == "en"
            ? "Successful login"
            : "تم تسجيل الدخول بنجاح"
        );
        navigate("/");
      }
    } catch (error) {
      toast.error(
        lang == "en"
          ? error.response.data.message.en
          : error.response.data.message.ar
      );
      dispatch(setUserError());
    }
  };

  // this work when user have more than phoneNumber
  const handleMultipleUser = async (e) => {
    let value = e.target.value;
    dispatch(setUserStart());
    try {
      const { data } = await apiAxios.post("mob/login", {
        phone: phoneNumber,
        license_num: LicenseName,
        user_id: value,
      });
      dispatch(setUserSuccess(data?.data));
      localStorage.setItem("access_token", data?.access_token);

      apiAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;
      toast.success(
        data.success && lang == "en"
          ? "Successful login"
          : "تم تسجيل الدخول بنجاح"
      );
      navigate("/");
    } catch (error) {
      toast.error("something error");
    }
  };

  return (
    <div className="login">
      <div className="logo py-3 text-center">
        <img
          src={logo}
          alt="logo"
          loading="lazy"
          className="w-[100px] mt-4 mx-auto"
        />
      </div>
      <div className="line">
        <div className="login_form">
          <form onSubmit={handleLogin}>
            <div className="input_item">
              <GrLicense size={20} />
              <input
                type="number"
                placeholder={t("License number")}
                value={LicenseName}
                onChange={(e) => setLicenseName(e.target.value)}
                autoComplete="License name"
              />
            </div>
            <div className="input_item">
              <MdOutlinePhoneEnabled size={20} />
              <input
                type="text"
                placeholder={t("write username or phone number")}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoComplete="phoneNumber"
              />
            </div>
            {showSelect && (
              <Fragment>
                <p className="text-center text-red-500">
                  تحذير هذا الرقم لدية اكثر من حساب
                </p>
                <div className="input_item">
                  <FaRegUser size={20} />
                  <select onChange={handleMultipleUser}>
                    <option value="">{t("Choose account")}</option>
                    {users &&
                      users.map((user, index) => {
                        return (
                          <option option value={user.id} key={index}>
                            {user.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </Fragment>
            )}
            {!showSelect && (
              <button className="btn_fill w-full py-2 text-[18px] rounded-full">
                {t("Login")}
              </button>
            )}
            <Link
              to={"/cards-login"}
              className="btn_card_subscriptions block mt-3 btn_fill text-center"
            >
              {t("Card subscriptions")}
            </Link>
          </form>
        </div>
      </div>
      {loading && <Loader fixed={true} />}
    </div>
  );
};

export default Login;
