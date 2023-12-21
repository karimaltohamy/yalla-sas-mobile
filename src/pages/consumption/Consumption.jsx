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

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//   ],
// };

const Consumption = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [valueDailyComsumption, onChangeDaily] = useState(new Date());
  const [openCalenderDaily, setOpenCalenderDaily] = useState(false);
  const [typeComsumption, setTypeComsumption] = useState("Monthly consumption");
  const [years, setYears] = useState([]);
  const { t } = useTranslation();

  const handleCloseCalender = (e, type) => {
    if (e.target === e.currentTarget && type == "daily") {
      setOpenCalenderDaily(false);
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
  const handleDateDaily = (month) => {
    const date = new Date();
    let body = {
      report_type: "daily",
      year: date.getFullYear(),
      month: month,
    };
    onChangeDaily(date);
    setTypeComsumption("Monthly consumption");
    // get all traffic data
    getTrafficReport(body);
  };

  // handle get daily monthly
  const handleDateMonthly = (year) => {
    let body = {
      report_type: "monthly",
      year: year,
    };
    setTypeComsumption("Annual consumption");
    // get all traffic data
    getTrafficReport(body);
  };

  // get all traffic data
  const getTrafficReport = async (body) => {
    try {
      const { data } = await apiAxios.post("mob/traffic/report", body);
      setTrafficData(data.data);
      setChartData(data.chart.total);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: chartData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
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
            <option className="text-[13px]">{t("Annual consumption")}</option>
            {years &&
              years.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
          </select>
          <select
            className="flex items-center gap-1 btn_outline flex-1 justify-center py-[2px]"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="400"
            onChange={(e) => handleDateDaily(e.target.value)}
          >
            <option className="text-[13px]">{t("Monthly consumption")}</option>
            <option value="1">{t("January")}</option>
            <option value="2">{t("February")}</option>
            <option value="3">{t("March")}</option>
            <option value="4">{t("April")}</option>
            <option value="5">{t("May")}</option>
            <option value="6">{t("June")}</option>
            <option value="7">{t("July")}</option>
            <option value="8">{t("August")}</option>
            <option value="9">{t("September")}</option>
            <option value="10">{t("October")}</option>
            <option value="11">{t("November")}</option>
            <option value="12">{t("December")}</option>
          </select>
        </div>
        <div
          className="consumption_chart mt-7"
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          <h5 className="font-semibold text-[22px]">{t(typeComsumption)}</h5>
          <div className="chart">
            <Line options={options} data={data} />
          </div>
        </div>
        <div className="ruselt_consumption_chart mt-5">
          <div className="items">
            {trafficData.length > 0 ? (
              trafficData.map((item, index) => {
                return (
                  <div key={index} className="item">
                    <div className="package">{item.total}</div>
                    <div className="date">{item.date}</div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">{t("you don't have data")}</div>
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
    </div>
  );
};

export default Consumption;
