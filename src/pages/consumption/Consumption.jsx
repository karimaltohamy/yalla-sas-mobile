import "./consumption.scss";
import styles from "../../styles/style.js";
import Calendar from "react-calendar";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      display: false, // Hide x-axis
      grid: {
        display: false, // Hide x-axis grid lines
      },
    },
    y: {
      display: false, // Hide y-axis
      grid: {
        display: false, // Hide y-axis grid lines
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Consumption = () => {
  const [valueDailyComsumption, onChangeDaily] = useState(new Date());
  const [valueMonthlyComsumption, onChangeMonthly] = useState(new Date());
  const [openCalenderDaily, setOpenCalenderDaily] = useState(false);
  const [openCalenderMonthlty, setOpenCalenderMonthly] = useState(false);
  const [typeComsumption, setTypeComsumption] = useState("Monthly");
  const { t } = useTranslation();

  const handleCloseCalender = (e, type) => {
    if (e.target === e.currentTarget && type == "daily") {
      setOpenCalenderDaily(false);
    } else if (e.target === e.currentTarget && type == "monthly") {
      setOpenCalenderMonthly(false);
    }
  };

  const handleDateDaily = (date) => {
    onChangeDaily(date);
    setTypeComsumption("Daily");
  };

  const handleDateMonthly = (date) => {
    onChangeMonthly(date);
    setTypeComsumption("monthly");
  };

  return (
    <div className="consumption py-4">
      <div className={styles.custom_container}>
        <div className="btns_consumption flex items-center gap-4 py-5">
          <button
            className="flex items-center gap-1 btn_outline flex-1 justify-center py-2"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
            onClick={() => setOpenCalenderMonthly(true)}
          >
            <span className="text-[13px]">{t("Monthly consumption")}</span>
          </button>
          <button
            className="flex items-center gap-1 btn_outline flex-1 justify-center py-2"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="400"
            onClick={() => setOpenCalenderDaily(true)}
          >
            <span className="text-[13px]">{t("Daily consumption")}</span>
          </button>
        </div>
        <div
          className="consumption_chart mt-7"
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          <h5 className="font-medium">{t("consumption")}</h5>
          <h5 className="font-semibold text-[22px]">
            {t(typeComsumption)} {t("consumption")}
          </h5>
          <div className="chart">
            <Line options={options} data={data} />
          </div>
        </div>
        <div className="ruselt_consumption_chart mt-5">
          <div className="items">
            <div
              className="item"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="package">MB 0</div>
              <div className="date">1-1-2023</div>
            </div>
            <div
              className="item"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <div className="package">MB 0</div>
              <div className="date">1-1-2023</div>
            </div>
            <div
              className="item"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <div className="package">MB 0</div>
              <div className="date">1-1-2023</div>
            </div>
            <div
              className="item"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <div className="package">MB 0</div>
              <div className="date">1-1-2023</div>
            </div>
            <div
              className="item"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="600"
            >
              <div className="package">MB 0</div>
              <div className="date">1-1-2023</div>
            </div>
          </div>
        </div>
      </div>
      {openCalenderDaily && (
        <div
          className="popup_calender absolute w-full h-full flex items-center justify-center top-0 left-0 text-black z-[1000]"
          onClick={(e) => handleCloseCalender(e, "daily")}
        >
          <Calendar
            onChange={handleDateDaily}
            value={valueDailyComsumption}
            onClickDay={() => setOpenCalenderDaily(false)}
            closeCalendar={true}
          />
        </div>
      )}

      {openCalenderMonthlty && (
        <div
          className="popup_calender absolute w-full h-full flex items-center justify-center top-0 left-0 text-black z-[1000]"
          onClick={(e) => handleCloseCalender(e, "monthly")}
        >
          <Calendar
            onChange={handleDateMonthly}
            value={valueMonthlyComsumption}
            onClickDay={() => setOpenCalenderMonthly(false)}
            closeCalendar={true}
            defaultView="year"
            showNeighboringMonth={false}
          />
        </div>
      )}
    </div>
  );
};

export default Consumption;
