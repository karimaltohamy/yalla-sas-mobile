import "./login.scss";
import { FaRegUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { GrLicense } from "react-icons/gr";
import logo from "../../images/logo.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserError,
  setUserStart,
  setUserSuccess,
} from "../../redux/reducers/userReducer";
import apiAxios from "../../utils/apiAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom/dist";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [LicenseName, setLicenseName] = useState("");
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
        username,
        password,
        license_num: LicenseName,
      });
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
    } catch (error) {
      console.log(error);
      toast.error(
        lang == "en"
          ? error.response.data.message.en
          : error.response.data.message.ar
      );
      dispatch(setUserError());
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
              <FaRegUser size={20} />
              <input
                type="number"
                placeholder={t("username")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="input_item">
              <RiLockPasswordLine size={20} />
              <input
                type="password"
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <button className="btn_fill w-full py-2 text-[18px] rounded-full">
              {t("Login")}
            </button>
          </form>
        </div>
      </div>
      {loading && <Loader fixed={true} />}
    </div>
  );
};

export default Login;

// "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTk5MCIsInNhc19pZCI6IjI2IiwidXNlcm5hbWUiOiIwMTAwMDA1NjEyMCIsInBob25lIjoiMDEwMDAwNTYxMjAiLCJwYXNzd29yZCI6IjAxMDAwMDU2MTIwIiwibGljZW5zZV9udW0iOiIxMjM0NTY3ODkwIiwiaWF0IjoxNzAyNzE4NDIwfQ.pUkR6XNyOvg2eHgTWGOvAJQo5OV7aDseF4c-zmWhiVU",
