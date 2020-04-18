import React, { useState, useEffect } from "react";
import { Select, FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
//import MenuItem from "@material-ui/core/MenuItem";
import { stateData } from "../../Api";
import styles from "./statePicker.module.css";

const StatePicker = ({ handelStatechange,statename }) => {
  const [fetchedState, setfetchedState] = useState([]);
  useEffect(() => {
    const fetchState = async () => {
      setfetchedState(await stateData());
    };
    fetchState();
  }, [setfetchedState]);
  return (
    <div>
      <FormControl variant="filled" className={styles.fromControl}>
        <InputLabel id="demo-simple-select-filled-label">
          Indian State
        </InputLabel>
        <Select
          native
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={statename}
          onChange={(e) => handelStatechange(e.target.value)}
        >
          <option value="Total">Total</option>
          {fetchedState.map((statewise, i) => (
            <option key={i} value={statewise}>
              {statewise}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default StatePicker;
