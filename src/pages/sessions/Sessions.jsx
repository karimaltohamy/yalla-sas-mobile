import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import "./sessions.scss";
import { useTranslation } from "react-i18next";
import apiAxios from "../../utils/apiAxios";
import { formateDate } from "../../utils/formatDate";
import LoaderBox from "../../components/loaderBox/LoaderBox";
import Pagination from "../../components/pagination/Pagination";

const Sessions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [totalRecords, setTotalRecords] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(false);
      try {
        const { data } = await apiAxios.get(`mob/sessions?page=${currentPage}`);
        setSessions(data.data);
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
        setTotalRecords(data.total_records);
        setLoading(true);
      } catch (error) {}
    })();
  }, [currentPage]);

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
            {sessions.length > 0 && (
              <tbody>
                {loading ? (
                  sessions.map((session, index) => {
                    return (
                      <tr key={index}>
                        <td>{session.start_time?.split(" ")[0]}</td>
                        <td> {session.end_time?.split(" ")[0]}</td>
                        <td>{session.ip_address}</td>
                        <td>{session.download}</td>
                        <td>{session.upload}</td>
                        <td>{session.mac_address}</td>
                        <td>{session.profile_name}</td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="text-center">
                    <LoaderBox />
                  </div>
                )}
              </tbody>
            )}
          </table>
        </div>
        <Pagination
          lastPage={lastPage}
          page={currentPage}
          setPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Sessions;
