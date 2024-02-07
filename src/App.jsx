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
const SpecialSubscriptions = React.lazy(() =>
  import("./pages/specialSubscriptions/specialSubscriptions")
);
const ChangePackage = React.lazy(() =>
  import("./pages/changePackage/ChangePackage")
);
const ChargePackage = React.lazy(() =>
  import("./pages/chargePackage/ChargePackage")
);
const Matches = React.lazy(() => import("./pages/matches/Matches"));
const CardsLogin = React.lazy(() => import("./pages/cardsLogin/CardsLogin"));

import { Navigate } from "react-router-dom/dist";
import AOS from "aos";
import { useDispatch, useSelector } from "react-redux";
import Message from "./pages/message/Message";
import { useTranslation } from "react-i18next";

import apiAxios from "./utils/apiAxios";
import {
  setUserError,
  setUserStart,
  setUserSuccess,
} from "./redux/reducers/userReducer";
import "./utils/apiAxios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardsSubscriptionOptions from "./pages/cardsSubscriptionOptions/CardsSubscriptionOptions";
import AvailableCards from "./pages/availableCards/AvailableCards";
import MyCards from "./pages/myCards/MyCards";
import Library from "./pages/library/Library";

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

  const handlerefrechData = async (makeLoading = true) => {
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
        handlerefrechData(false);
      }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  // handle language and mode theme
  useEffect(() => {
    AOS.init();
    localStorage.setItem("lang", "ar");

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
        !location.pathname.includes("special-subscriptions") &&
        !location.pathname.includes("change-package") &&
        !location.pathname.includes("charge-package") &&
        !location.pathname.includes("available-cards") &&
        !location.pathname.includes("cards-subscription-options") &&
        !location.pathname.includes("cards-login") &&
        !location.pathname.includes("my-cards") &&
        !location.pathname.includes("library") && <Navigation />}
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
              <Suspense fallback={<Loader />}>
                <Message />
              </Suspense>
            </ProidectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProidectedRoute>
              <Suspense fallback={<Loader />}>
                <Library />
              </Suspense>
            </ProidectedRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <ProidectedRoute>
              <Suspense fallback={<Loader />}>
                <Matches />
              </Suspense>
            </ProidectedRoute>
          }
        />
        <Route
          path="/special-subscriptions"
          element={
            <ProidectedRoute>
              <Suspense fallback={<Loader />}>
                <SpecialSubscriptions />
              </Suspense>
            </ProidectedRoute>
          }
        />
        <Route
          path="/change-package"
          element={
            <ProidectedRoute>
              <Suspense fallback={<Loader />}>
                <ChangePackage />
              </Suspense>
            </ProidectedRoute>
          }
        />
        <Route
          path="/charge-package"
          element={
            <ProidectedRoute>
              <Suspense fallback={<Loader />}>
                <ChargePackage />
              </Suspense>
            </ProidectedRoute>
          }
        />
        <Route
          path="/cards-login"
          element={
            <Suspense fallback={<Loader />}>
              <CardsLogin />
            </Suspense>
          }
        />
        <Route
          path="/cards-subscription-options"
          element={
            <Suspense fallback={<Loader />}>
              <CardsSubscriptionOptions />
            </Suspense>
          }
        />
        <Route
          path="/available-cards"
          element={
            <Suspense fallback={<Loader />}>
              <AvailableCards />
            </Suspense>
          }
        />
        <Route
          path="/my-cards"
          element={
            <Suspense fallback={<Loader />}>
              <MyCards />
            </Suspense>
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
