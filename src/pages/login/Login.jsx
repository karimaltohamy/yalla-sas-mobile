import "./login.scss";
import { FaRegUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import logo from "../../images/logo.png";
import imageLogin from "../../images/internet-img.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div className="login">
      <div className="line h-full">
        <div className="info p-5 pb-0 h-full flex justify-end flex-col text-center">
          <h4 className="text-[22px] font-semibold mb-1">
            {t("Pay with one Click")}
          </h4>
          <p className="text-[15px] mb-4">
            {t(
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo sunt itaque pariatur."
            )}
          </p>
          <div className="image text-center mb-2">
            <img
              src={imageLogin}
              alt="img-login"
              loading="lazy"
              className="w-[80%] mx-auto"
            />
          </div>
        </div>

        <div className="login_form">
          <div className="logo mb-5 text-center">
            <img
              src={logo}
              alt="logo"
              loading="lazy"
              className="w-[80px] mx-auto"
            />
          </div>
          <form onSubmit={handleLogin}>
            <div className="input_item">
              <FaRegUser size={20} />
              <input
                type="text"
                placeholder={t("username")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input_item">
              <RiLockPasswordLine size={20} />
              <input
                type="password"
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn_fill w-full py-2 text-[18px] rounded-full">
              {t("Login")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
