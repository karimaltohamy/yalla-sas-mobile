import React, { Fragment, Suspense, useEffect, useState } from "react";
import HeaderHome from "../../components/headerHome/HeaderHome";
const BoxInfoUser = React.lazy(() =>
  import("../../components/boxInfoUser/BoxInfoUser")
);
const BoxInfoPackage = React.lazy(() =>
  import("../../components/boxInfoPackage/BoxInfoPackage")
);
const PopupExtendingPackage = React.lazy(() =>
  import("../../components/popups/popupExtendingPackage/PopupExtendingPackage")
);

const PopupSettings = React.lazy(() =>
  import("../../components/popups/popupSettings/PopupSettings")
);
import styles from "../../styles/style";
import "./home.scss";
import LoaderBox from "../../components/loaderBox/LoaderBox";
import { useDispatch, useSelector } from "react-redux";
const BoxSpecialSubscriptions = React.lazy(() =>
  import("../../components/boxSpecialSubscriptions/BoxSpecialSubscriptions")
);
import Slider from "react-slick";
import { getUser } from "../../redux/actions/user";

const Home = () => {
  const lang = localStorage.getItem("lang");
  const { userInfo } = useSelector((state) => state.user);
  const [openExtending, setOpenExtending] = useState(false);
  const [openPopupSettings, setOpenPopupSettings] = useState(false);
  const dispatch = useDispatch();

  // settings slider
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: lang == "ar" ? true : false,
  };

  return (
    <Fragment>
      <div className="home">
        <HeaderHome setOpenPopupSettings={setOpenPopupSettings} />
        <div className={styles.custom_container}>
          <div className="pt-[10px]">
            <Suspense
              fallback={
                <div className="flex items-center justify-center my-4 p-4 rounded bg_loader">
                  <LoaderBox />
                </div>
              }
            >
              <BoxInfoUser />
            </Suspense>
          </div>
          <div className="pt-[25px]">
            <Suspense
              fallback={
                <div className="flex items-center justify-center my-4 p-4 rounded bg_loader">
                  <LoaderBox />
                </div>
              }
            >
              <Slider {...settings}>
                {userInfo?.addons &&
                  userInfo?.addons.map((item, index) => (
                    <BoxSpecialSubscriptions item={item} key={index} />
                  ))}
              </Slider>
            </Suspense>
          </div>
          <div className="pt-[25px]">
            <Suspense
              fallback={
                <div className="flex items-center justify-center my-4 p-4 rounded bg_loader">
                  <LoaderBox />
                </div>
              }
            >
              <BoxInfoPackage />
            </Suspense>
          </div>
        </div>
        <div className="primary-shadow"></div>
        <div className="primary2-shadow"></div>
      </div>

      {/* popups */}
      <Suspense>
        <PopupExtendingPackage
          setOpen={setOpenExtending}
          open={openExtending}
        />
      </Suspense>
      <Suspense>
        <PopupSettings
          setOpen={setOpenPopupSettings}
          open={openPopupSettings}
        />
      </Suspense>
    </Fragment>
  );
};

export default Home;
