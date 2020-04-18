import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../Api";
import { Line, Bar } from "react-chartjs-2";
import Alert from '@material-ui/lab/Alert';

import styles from "./Charts.module.css";

const Charts = ({
  data: { confirmed, recovered, deaths },
  country,
  stateName,
}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchApi();
  }, []);
  console.log("Chart in statename:vvvvv" + stateName);
  console.log("Chart Confirm case :" + confirmed);
  // if(state===''){
  //         const confirmed= confirmed.value,
  //         const recovered= recovered.value,
  //        const deaths= deaths.value,
  //  };
  const LineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            fontStyle: "bold",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            fill: true,
            backgroundColor: "rgba(255,0,0,0.5)",
          },
        ],
      }}
    />
  ) : null;
  const barChar = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            labels: "Infected People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(51, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed, recovered, deaths],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Curent situation in ${
            stateName !== "Total" && stateName ? stateName : country
          }`,
        },
      }}
    />
  ) : (
    <Alert className={styles.alart} severity="success" variant="filled" color="info">
     NO ACTIVE CASES FOR COVID-19 IN <b>{stateName !== "Total" && stateName ? stateName : country}</b>.
    </Alert>
  );
  return (
    <div className={styles.container}>
      {country || stateName ? barChar : LineChart}
    </div>
  );
};

export default Charts;
