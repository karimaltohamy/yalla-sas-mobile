import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import "./sessions.scss";
import { useTranslation } from "react-i18next";

const Sessions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");

  return (
    <div className="sessions">
      <div
        className={`top flex items-center justify-between ${
          lang == "en" ? "en" : "ar"
        }`}
      >
        <span className="back" onClick={() => navigate(-1)}>
          <IoMdArrowBack size={25} />
        </span>

        <h4 className=" font-semibold">{t("Sessions")}</h4>
      </div>
      <div className={`${styles.custom_container} h-full`}>
        <div className="container_table mt-5">
          <table>
            <thead>
              <tr>
                <th>{t("Starting from")}</th>
                <th>{t("Ends in")}</th>
                <th>{t("IP address")}</th>
                <th>{t("Download")}</th>
                <th>{t("Upload")}</th>
                <th>{t("Device address")}</th>
                <th>{t("Package name")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12-12-2034</td>
                <td>12-12-2034</td>
                <td>34878782</td>
                <td>20MB</td>
                <td>30MB</td>
                <td>pc</td>
                <td>Te lest4</td>
              </tr>
              <tr>
                <td>12-12-2034</td>
                <td>12-12-2034</td>
                <td>34878782</td>
                <td>20MB</td>
                <td>30MB</td>
                <td>pc</td>
                <td>Te lest4</td>
              </tr>
              <tr>
                <td>12-12-2034</td>
                <td>12-12-2034</td>
                <td>34878782</td>
                <td>20MB</td>
                <td>30MB</td>
                <td>pc</td>
                <td>Te lest4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
