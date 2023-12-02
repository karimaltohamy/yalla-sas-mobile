import { Fragment, useState } from "react";
import HeaderHome from "../../components/headerHome/HeaderHome";
import BoxInfoUser from "../../components/boxInfoUser/BoxInfoUser";
import styles from "../../styles/style";
import BoxInfoPackage from "../../components/boxInfoPackage/BoxInfoPackage";
import "./home.scss";
import PopupCharge from "../../components/popupCharge/PopupCharge";

const Home = () => {
  const [openPopupCharge, setOpenPopupCharge] = useState(false);
  return (
    <Fragment>
      <div className="home">
        <HeaderHome />
        <div className={styles.custom_container}>
          <div className="pt-[80px]">
            <BoxInfoUser setOpen={setOpenPopupCharge} />
          </div>
          <div className="pt-[40px]">
            <BoxInfoPackage />
          </div>
        </div>
        <div className="primary-shadow"></div>
        <div className="primary2-shadow"></div>
      </div>

      <PopupCharge open={openPopupCharge} setOpen={setOpenPopupCharge} />
    </Fragment>
  );
};

export default Home;
