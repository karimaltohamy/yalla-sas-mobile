import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import Loader from "./components/loader/Loader";
const Home = React.lazy(() => import("./pages/home/Home"));
const Login = React.lazy(() => import("./pages/login/Login"));
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const Consumption = React.lazy(() => import("./pages/consumption/Consumption"));
const Navigation = React.lazy(() =>
  import("./components/navigation/Navigation")
);
const Menu = React.lazy(() => import("./pages/menu/Menu"));
const Sessions = React.lazy(() => import("./pages/sessions/Sessions"));
const MailBox = React.lazy(() => import("./pages/mailBox/MailBox"));
const ConsumptionCalculation = React.lazy(() =>
  import("./pages/consumptionCalculation/ConsumptionCalculation")
);
import AOS from "aos";

function App() {
  const [mobile, setMobile] = useState(false);
  const location = useLocation();

  // aos animation
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 500) {
      setMobile(true);
    } else {
      setMobile(false);
    }

    if (localStorage.getItem("mode") == "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }

    if (localStorage.getItem("lang") == "ar") {
      document.body.classList.add("ar");
      document.body.classList.remove("en");
    } else {
      document.body.classList.add("en");
      document.body.classList.remove("ar");
    }
  }, []);

  return mobile ? (
    <Fragment>
      {!location.pathname.includes("login") && <Navigation />}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/my-profile"
          element={
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/consumption"
          element={
            <Suspense fallback={<Loader />}>
              <Consumption />
            </Suspense>
          }
        />
        <Route
          path="/menu"
          element={
            <Suspense fallback={<Loader />}>
              <Menu />
            </Suspense>
          }
        />
        <Route
          path="/sessions"
          element={
            <Suspense fallback={<Loader />}>
              {" "}
              <Sessions />
            </Suspense>
          }
        />
        <Route path="/mail-box" element={<MailBox />} />
        <Route
          path="/consumption-calculation"
          element={
            <Suspense fallback={<Loader />}>
              <ConsumptionCalculation />
            </Suspense>
          }
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
