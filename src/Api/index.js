import axios from "axios";
import moment from "moment";

const URL = "https://covid19.mathdro.id/api";
//const STATEURL1='https://bing.com/covid/data';
const STATEURL = "https://api.covid19india.org/data.json";
export const fetchData = async (country) => {
  let changeURL = URL;
  if (country) {
    changeURL = `${URL}/countries/${country}`;
  }
  try {
    const {
      data: {
        confirmed: { value: confirmed },
        deaths:{ value: deaths },
        recovered:{ value: recovered },
        lastUpdate,
      },
    } = await axios.get(changeURL);
    console.log(confirmed.value);

    return { confirmed, deaths, recovered, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchStateData = async (state) => {
  try {
    const {
      data: { statewise },
    } = await axios.get(STATEURL);
    for (let i = 0; i < statewise.length; i++) {
      if (statewise[i].state === state) {
        const modifiedData = statewise.map((state) => ({
          confirmed: Number(state.confirmed),
          recovered: Number(state.recovered),
          deaths: Number(state.deaths),
          lastUpdate: moment(state.lastupdatedtime,'DD/MM/YYYY HH:mm:ss').toDate(),
        }));
        console.log(modifiedData[i].confirmed, modifiedData[i].lastUpdate);
        return modifiedData[i];
      }
    }
    //return {confirmed,recovered,deaths,lastUpdate};
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${URL}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const countries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${URL}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {}
};

export const stateData = async () => {
  try {
    const {
      data: { statewise },
    } = await axios.get(STATEURL);
    // console.log(statewise);
    return statewise.map((state) => state.state);
  } catch (error) {}
};
