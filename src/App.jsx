import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import Loader from "./components/loader/Loader";
import Home from "./pages/home/Home";
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
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom/dist";
import Message from "./pages/message/Message";
import { useTranslation } from "react-i18next";
import WhatsAppSupport from "./pages/whatsAppSupport/WhatsAppSupport";
import Matches from "./pages/matches/Matches";
import apiAxios from "./utils/apiAxios";
import {
  setUserError,
  setUserStart,
  setUserSuccess,
} from "./redux/reducers/userReducer";
import "./utils/apiAxios";
import { getUser } from "./redux/actions/user";
import SpecialSubscriptions from "./pages/specialSubscriptions/specialSubscriptions";

const ProidectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);

  if (userInfo === null) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

function App() {
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const controller = new AbortController();

  const refrechData = async (makeLoading = true) => {
    makeLoading && dispatch(setUserStart());
    try {
      const { data } = await apiAxios.get("mob/refresh");
      apiAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;
      dispatch(setUserSuccess(data.data));
      localStorage.setItem("access_token", data.access_token);
      return data;
    } catch (error) {
      dispatch(setUserError());
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const intervalId =
      !location.pathname.includes("login") &&
      setInterval(() => {
        refrechData(false);
      }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  // handle language and mode theme
  useEffect(() => {
    AOS.init();
    localStorage.setItem("lang", "ar");

    if (!location.pathname.includes("login")) {
      refrechData();
    }

    if (window.innerWidth <= 900) {
      setMobile(true);
    } else {
      setMobile(false);
    }

    // theme mode
    if (localStorage.getItem("mode") == "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }

    // default lang
    if (localStorage.getItem("lang") == "ar") {
      document.body.classList.add("ar");
      document.body.classList.remove("en");
    } else {
      document.body.classList.add("en");
      document.body.classList.remove("ar");
    }

    return () => {
      controller.abort();
    };
  }, []);

  return mobile ? (
    <Fragment>
      {!location.pathname.includes("login") &&
        !location.pathname.includes("matches") &&
        !location.pathname.includes("special-subscriptions") && <Navigation />}
      <Routes>
        <Route
          path="/"
          element={
            <ProidectedRoute>
              <Home />
            </ProidectedRoute>
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
              <ProidectedRoute>
                <Profile />
              </ProidectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/consumption"
          element={
            <Suspense fallback={<Loader />}>
              <ProidectedRoute>
                <Consumption />
              </ProidectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/menu"
          element={
            <Suspense fallback={<Loader />}>
              <ProidectedRoute>
                <Menu />
              </ProidectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/sessions"
          element={
            <Suspense fallback={<Loader />}>
              <ProidectedRoute>
                <Sessions />
              </ProidectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/mail-box"
          element={
            <Suspense fallback={<Loader />}>
              <ProidectedRoute>
                <MailBox />
              </ProidectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/consumption-calculation"
          element={
            <Suspense fallback={<Loader />}>
              <ProidectedRoute>
                <ConsumptionCalculation />
              </ProidectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/message"
          element={
            <ProidectedRoute>
              <Message />
            </ProidectedRoute>
          }
        />
        <Route
          path="/whatsappSupport"
          element={
            <ProidectedRoute>
              <WhatsAppSupport />
            </ProidectedRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <ProidectedRoute>
              <Matches />
            </ProidectedRoute>
          }
        />
        <Route
          path="/special-subscriptions"
          element={
            <ProidectedRoute>
              <SpecialSubscriptions />
            </ProidectedRoute>
          }
        />
      </Routes>
    </Fragment>
  ) : (
    <p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {t("being processing now")}
    </p>
  );
}

export default App;
