import axios from 'axios';

const URL='https://covid19.mathdro.id/api';
//const STATEURL='https://api.covid19india.org/data.json';
export const fetchData = async (country)=>{
    let changeURL=URL;
    if(country){
        changeURL=`${URL}/countries/${country}`;
    }
    try {
        const {data :{confirmed,recovered,deaths,lastUpdate}} = await axios.get(changeURL);
        
        return {confirmed,recovered,deaths,lastUpdate};
    } catch (error) {
        console.log(error)
    }

}

export const fetchDailyData= async ()=>{
    try {
       const {data} = await axios.get(`${URL}/daily`); 
      const modifiedData=data.map((dailyData)=>({
          confirmed: dailyData.confirmed.total,
          deaths: dailyData.deaths.total,
          date: dailyData.reportDate,

      }));

      return modifiedData;
    } catch (error) {
        console.log(error)
    }
}

export const countries=async ()=>{
    try {
        const {data:{countries}}= await axios.get(`${URL}/countries`);

        return countries.map((country)=>country.name);
    } catch (error) {
        
    }
}
