import React from 'react';
import Cards from './components/cards/Cards';
import Charts from './components/charts/Charts';
import CountryPicker from './components/countryPicker/CountryPicker';
import { fetchData } from './Api'
import corona from './Images/corona.jpg';

import styles from './App.module.css';


class  App extends React.Component {

  state={
data:{},
country:'',
}
  async componentDidMount(){
    const updatedata= await fetchData();
    console.log(updatedata)
    this.setState({data:updatedata})
    
  }

  handelCountrychange= async (country)=>{
    let cahngeCountry=country;
    if(country==='Global'){
      cahngeCountry=''
    }
    const updatedata= await fetchData(cahngeCountry);
    this.setState({data:updatedata,country:cahngeCountry})
  }

  render(){
  return (
    <div className={styles.container}>
    <img className={styles.image} src={corona} alt={'Covid-19'}></img>
    <Cards data={this.state.data}/>
    <CountryPicker handelCountrychange={this.handelCountrychange}/>
    <Charts data={this.state.data} country={this.state.country}/>
    <div className={styles.footer}>
  <p>Created By <a href="http://sujan-weather-app.herokuapp.com/">@Sujan Kundu</a></p>
</div>
    </div>
  );}
}

export default App;
