import "./consumption.scss";
import styles from "../../styles/style.js";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
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
import apiAxios from "../../utils/apiAxios.js";
import ReactDatePicker from "react-datepicker";

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

console.log(labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })));

const Consumption = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [valueDailyComsumption, onChangeDaily] = useState(new Date());
  const [valueMonthlyComsumption, onChangeMonthly] = useState(new Date());
  const [openCalenderDaily, setOpenCalenderDaily] = useState(false);
  const [openCalenderMonthlty, setOpenCalenderMonthly] = useState(false);
  const [typeComsumption, setTypeComsumption] = useState("monthly");
  const [years, setYears] = useState([]);
  const { t } = useTranslation();

  const handleCloseCalender = (e, type) => {
    if (e.target === e.currentTarget && type == "daily") {
      setOpenCalenderDaily(false);
    } else if (e.target === e.currentTarget && type == "monthly") {
      setOpenCalenderMonthly(false);
    }
  };

  useEffect(() => {
    const date = new Date();

    // this for loop for set years in select options
    const yearArray = [];
    for (let i = date.getFullYear(); i >= 2017; i--) {
      yearArray.push(i);
    }
    setYears(yearArray);

    // this for get data when the page load
    let body = {
      report_type: "daily",
      year: date.getFullYear(),
      month: date.getMonth(),
    };
    getTrafficReport(body);
  }, []);

  // handle get daily data
  const handleDateDaily = (date) => {
    let body = {
      report_type: "daily",
      year: date.getFullYear(),
      month: date.getMonth(),
    };
    onChangeDaily(date);
    setTypeComsumption("Daily");
    // get all traffic data
    getTrafficReport(body);
  };

  // handle get daily monthly
  const handleDateMonthly = (year) => {
    let body = {
      report_type: "monthly",
      year: year,
    };
    setTypeComsumption("monthly");
    // get all traffic data
    getTrafficReport(body);
  };

  // get all traffic data
  const getTrafficReport = async (body) => {
    try {
      const { data } = await apiAxios.post("mob/traffic/report", body);
      setTrafficData(data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="consumption py-4">
      <div className={styles.custom_container}>
        <div className="btns_consumption flex items-center gap-4 py-5">
          <select
            className="flex items-center gap-1 btn_outline flex-1 justify-center py-[2px]"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
            onChange={(e) => handleDateMonthly(e.target.value)}
          >
            <option className="text-[13px]">{t("Monthly consumption")}</option>
            {years &&
              years.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
          </select>
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
            {trafficData.length > 0 ? (
              trafficData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="item"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                  >
                    <div className="package">{item.total}</div>
                    <div className="date">{item.date}</div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">you don't have data</div>
            )}
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
            defaultView="year"
            showNeighboringMonth={false}
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
            defaultView="year" // Set the default view to "year"
            showNeighboringMonth={false}
            dateFormat={"yyyy"}
          />
        </div>
      )}
    </div>
  );
};

export default Consumption;
