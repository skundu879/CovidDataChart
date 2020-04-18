import React from "react";
import Cards from "./components/cards/Cards";
import Charts from "./components/charts/Charts";
import CountryPicker from "./components/countryPicker/CountryPicker";
import { fetchData } from "./Api";
import corona from "./Images/image.png";
//import covidimage from "./Images/Covid.svg"
import styles from "./App.module.css";
import StatePicker from "./stateData/statePicker/StatePicker";
import { fetchStateData } from "./Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

class App extends React.Component {
  state = {
    data: {},
    country: "Global",
    statename: "Total",
    lodingdata: false,
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    this.setState({ lodingdata: true });
    const updatedata = await fetchData();
    console.log("APP Updated data" + updatedata);
    this.setState({ data: updatedata, lodingdata: false });
  };
  // handelStatechange =async(stateData)=>{
  //   const updatedata= await fetchData(stateData);
  //     this.setState({data:updatedata,country:cahngeCountry})
  // }

  handelCountrychange = async (country) => {
    let changeCountry = country;
    let stateName = this.statename;
    if (country === "Global") {
      changeCountry = "";
    }
    if (country !== "India") {
      stateName = null;
    }
    const updatedata = await fetchData(changeCountry);
    this.setState({
      data: updatedata,
      country: changeCountry,
      statename: stateName,
    });
  };
  handelStatechange = async (state) => {
    let changeState = state;
    if (this.state.country !== "India") {
      changeState = "";
    }
    const updateStatedata = await fetchStateData(changeState);
    this.setState({ data: updateStatedata, statename: changeState });
  };
  render() {
    return (
      <div className={styles.container}>
        <img className={styles.image} src={corona} alt={"Covid-19"}></img>
        <Cards
          data={this.state.data}
          country={this.state.country}
          stateName={this.state.statename}
          lodingdata={this.state.lodingdata}
        />
        <CountryPicker
          handelCountrychange={this.handelCountrychange}
          country={this.state.country}
        />
        {this.state.country === "India" ? (
          <StatePicker
            handelStatechange={this.handelStatechange}
            statename={this.state.statename}
          />
        ) : null}
        <Charts
          data={this.state.data}
          country={this.state.country}
          stateName={this.state.statename}
        />
        <div className={styles.footer}>
          <h4>Created By @Sujan Kundu</h4>
          <a
          rel="noopener noreferrer"
            href="https://github.com/skundu879"
            className={cn(styles.github, styles.social)}
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
          rel="noopener noreferrer"
            href="https://www.facebook.com/sujan.kundu.7923"
            className={cn(styles.facebook, styles.social)}
            target="_blank"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
          rel="noopener noreferrer"
            href="https://twitter.com/skundu879"
            className={cn(styles.twitter, styles.social)}
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a
          rel="noopener noreferrer"
            href="https://www.instagram.com/skundu879/"
            className={cn(styles.instagram, styles.social)}
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </div>
    );
  }
}

export default App;
