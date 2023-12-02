import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Consumption from "./pages/consumption/Consumption";
import Navigation from "./components/navigation/Navigation";
import { Fragment, useEffect, useState } from "react";

function App() {
  const [mobile, setMobile] = useState(false);

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
  }, [document, mobile]);

  return mobile ? (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/consumption" element={<Consumption />} />
      </Routes>
    </Fragment>
  ) : (
    <p className="text-center absolute top-1/2 left-1/2">only in mobile</p>
  );
}

export default App;
