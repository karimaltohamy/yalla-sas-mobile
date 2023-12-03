import { Fragment, useState } from "react";
import HeaderHome from "../../components/headerHome/HeaderHome";
import BoxInfoUser from "../../components/boxInfoUser/BoxInfoUser";
import styles from "../../styles/style";
import BoxInfoPackage from "../../components/boxInfoPackage/BoxInfoPackage";
import "./home.scss";
import PopupCharge from "../../components/popups/popupCharge/PopupCharge";
import PopupPackageManagement from "../../components/popups/popupPackageManagement/PopupPackageManagement";
import PopupChangePackage from "../../components/popups/popupChangePackage/PopupChangePackage";
import PopupExtendingPackage from "../../components/popups/popupExtendingPackage/PopupExtendingPackage";
import PopupActivatePackage from "../../components/popups/popupActivatePackage/PopupActivatePackage";
import PopupSettings from "../../components/popups/popupSettings/PopupSettings";
import PopupNotification from "../../components/popups/PopupNotification/PopupNotification";

const Home = () => {
  const [openPopupCharge, setOpenPopupCharge] = useState(false);
  const [openPackageManagement, setOpenPackageManagement] = useState(false);
  const [openChangePackage, setOpenChangePackage] = useState(false);
  const [openExtending, setOpenExtending] = useState(false);
  const [openActivatePackage, setOpenActivatePackage] = useState(false);
  const [openPopupSettings, setOpenPopupSettings] = useState(false);
  const [openPopupNotification, setOpenPopupNotification] = useState(false);

  return (
    <Fragment>
      <div className="home">
        <HeaderHome
          setOpenPopupSettings={setOpenPopupSettings}
          setOpenPopupNotification={setOpenPopupNotification}
        />
        <div className={styles.custom_container}>
          <div className="pt-[80px]">
            <BoxInfoUser setOpen={setOpenPopupCharge} />
          </div>
          <div className="pt-[40px]">
            <BoxInfoPackage setOpen={setOpenPackageManagement} />
          </div>
        </div>
        <div className="primary-shadow"></div>
        <div className="primary2-shadow"></div>
      </div>

      {/* popups */}
      <PopupCharge open={openPopupCharge} setOpen={setOpenPopupCharge} />
      <PopupPackageManagement
        setOpen={setOpenPackageManagement}
        open={openPackageManagement}
        setOpenChangePackage={setOpenChangePackage}
        setOpenExtending={setOpenExtending}
        setOpenActivatePackage={setOpenActivatePackage}
      />
      <PopupChangePackage
        setOpen={setOpenChangePackage}
        open={openChangePackage}
      />
      <PopupActivatePackage
        setOpen={setOpenActivatePackage}
        open={openActivatePackage}
      />
      <PopupExtendingPackage setOpen={setOpenExtending} open={openExtending} />
      <PopupSettings setOpen={setOpenPopupSettings} open={openPopupSettings} />
      <PopupNotification
        setOpen={setOpenPopupNotification}
        open={openPopupNotification}
      />
    </Fragment>
  );
};

export default Home;
