import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Consumption from "./pages/consumption/Consumption";
import Navigation from "./components/navigation/Navigation";
import { Fragment, useEffect, useState } from "react";
import Menu from "./pages/menu/Menu";
import Sessions from "./pages/sessions/Sessions";
import MailBox from "./pages/mailBox/MailBox";
import ConsumptionCalculation from "./pages/consumptionCalculation/ConsumptionCalculation";

function App() {
  const [mobile, setMobile] = useState(false);
  const location = useLocation();

  console.log(location.pathname);

  useEffect(() => {
    if (window.innerWidth <= 500) {
      setMobile(true);
    } else {
      setMobile(false);
    }

    document.addEventListener("resize", () => {
      if (window.innerWidth <= 500) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    });
  }, [document]);

  return mobile ? (
    <Fragment>
      {!location.pathname.includes("login") && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/consumption" element={<Consumption />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/mail-box" element={<MailBox />} />
        <Route
          path="/consumption-calculation"
          element={<ConsumptionCalculation />}
        />
      </Routes>
    </Fragment>
  ) : (
    <p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      only in mobile
    </p>
  );
}

export default App;
