import React, { useState, useEffect } from "react";
import { Select, FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
//import MenuItem from "@material-ui/core/MenuItem";
import { countries } from "../../Api";
import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handelCountrychange, country }) => {
  const [fetchedCountries, setfetchedCountries] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      setfetchedCountries(await countries());
    };
    fetchCountries();
  }, [setfetchedCountries]);
  return (
    <div>
      <FormControl variant="filled" className={styles.fromControl}>
        <InputLabel id="demo-simple-select-filled-label">Country</InputLabel>
        <Select
          native
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={country}
          onChange={(e) => handelCountrychange(e.target.value)}
        >
          <option value="Global">
            Global
          </option>
          {fetchedCountries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
