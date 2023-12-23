import React, { Fragment, Suspense, useEffect, useState } from "react";
import HeaderHome from "../../components/headerHome/HeaderHome";
const BoxInfoUser = React.lazy(() =>
  import("../../components/boxInfoUser/BoxInfoUser")
);
const BoxInfoPackage = React.lazy(() =>
  import("../../components/boxInfoPackage/BoxInfoPackage")
);
const PopupCharge = React.lazy(() =>
  import("../../components/popups/popupCharge/PopupCharge")
);
const PopupChangePackage = React.lazy(() =>
  import("../../components/popups/popupChangePackage/PopupChangePackage")
);
const PopupExtendingPackage = React.lazy(() =>
  import("../../components/popups/popupExtendingPackage/PopupExtendingPackage")
);
const PopupActivatePackage = React.lazy(() =>
  import("../../components/popups/popupActivatePackage/PopupActivatePackage")
);
const PopupSettings = React.lazy(() =>
  import("../../components/popups/popupSettings/PopupSettings")
);
const PopupNotification = React.lazy(() =>
  import("../../components/popups/popupNotification/PopupNotification")
);
import styles from "../../styles/style";
import "./home.scss";
import LoaderBox from "../../components/loaderBox/LoaderBox";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/actions/user";

const Home = () => {
  const [openPopupCharge, setOpenPopupCharge] = useState(false);
  const [openChangePackage, setOpenChangePackage] = useState(false);
  const [openExtending, setOpenExtending] = useState(false);
  const [openActivatePackage, setOpenActivatePackage] = useState(false);
  const [openPopupSettings, setOpenPopupSettings] = useState(false);
  const [openPopupNotification, setOpenPopupNotification] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   getUser(dispatch);
  // }, []);

  return (
    <Fragment>
      <div className="home">
        <HeaderHome
          setOpenPopupSettings={setOpenPopupSettings}
          setOpenPopupNotification={setOpenPopupNotification}
        />
        <div className={styles.custom_container}>
          <div className="pt-[10px]">
            <Suspense
              fallback={
                <div className="flex items-center justify-center my-4 p-4 rounded bg_loader">
                  <LoaderBox />
                </div>
              }
            >
              <BoxInfoUser setOpen={setOpenPopupCharge} />
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
              <BoxInfoPackage setOpen={setOpenChangePackage} />
            </Suspense>
          </div>
        </div>
        <div className="primary-shadow"></div>
        <div className="primary2-shadow"></div>
      </div>

      {/* popups */}
      <Suspense>
        <PopupCharge open={openPopupCharge} setOpen={setOpenPopupCharge} />
      </Suspense>
      <Suspense>
        <PopupChangePackage
          setOpen={setOpenChangePackage}
          open={openChangePackage}
        />
      </Suspense>
      <Suspense>
        <PopupActivatePackage
          setOpen={setOpenActivatePackage}
          open={openActivatePackage}
        />
      </Suspense>
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
      <Suspense>
        <PopupNotification
          setOpen={setOpenPopupNotification}
          open={openPopupNotification}
        />
      </Suspense>
    </Fragment>
  );
};

export default Home;
