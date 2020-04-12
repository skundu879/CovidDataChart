import React,{useState,useEffect} from 'react';
import {Select, FormControl} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {countries} from '../../Api'
import styles from './CountryPicker.module.css';
const CountryPicker = ({handelCountrychange})=>{
const[fetchedCountries, setfetchedCountries]= useState([]);

useEffect(()=>{
    const fetchCountries = async ()=>{
        setfetchedCountries(await countries());
    }
    fetchCountries();
},[setfetchedCountries]);

console.log(fetchedCountries);

    return(
        <div>
        <FormControl variant="filled" className={styles.fromControl}>
        <InputLabel id="demo-simple-select-filled-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          defaultValue="Global"
          onChange={(e)=>handelCountrychange(e.target.value)}
        >
          <MenuItem value="Global">
            <em>Global</em>
          </MenuItem>
          {fetchedCountries.map((country,i)=><MenuItem key={i} value={country}>{country}</MenuItem>)}
        </Select>
        </FormControl>
        </div>
    )
}

export default CountryPicker;