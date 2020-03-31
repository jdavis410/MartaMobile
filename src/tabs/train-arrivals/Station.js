import React, {Component, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'

import TrainArrivalsList from "./TrainArrivalsList";

import { station_list, getTrainArrivalsByStation } from "./TrainArrivalsService";

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  grid: {
    position: 'absolute',
    marginTop: '50%'
  },
  title: {
    position: 'absolute',
    left: '18vw',
    top: '10vh',
    fontSize: '47px',
    fontWeight: 'bold',
    color: 'slateblue'
  },
  formControl: {
    minWidth: 120,
    marginTop: '15%'
  },
  selectEmpty: {
  },
});

const getInitialTable = () => {
  getTrainArrivalsByStation("FIVE POINTS")
      .then ((response) => {return response;})
      .catch((error) => {return error;});
};

function Station () {
  const classes = useStyles();
  const [timeTable, setTimeTable] = useState(getInitialTable());
  const [state, setState] = React.useState({
    station: station_list[16]
  });


  const inputLabel = React.useRef(station_list[0]);
  useEffect(() => {

    const interval = setInterval(() => {
      updateTable();
    }, 5000);
    return () => clearInterval(interval);
  });

  const updateTable = () => {
    getTrainArrivalsByStation(getStationParam())
        .then((response) => {
          setTimeTable(response);});
  };

  const getStationParam = () => {
    let lastIndex = state.station.lastIndexOf(" ");
    return state.station.substring(0, lastIndex);
  };
  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log("change station to:" + event.target.value);
    getTrainArrivalsByStation(getStationParam()).then((response) => setTimeTable(response));
  };

  var stationOptions = station_list.map(function(station){
    return <option key={station} value={station}>{station}</option>;
  });

  return (
      <div className="App">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
            Station
          </InputLabel>
          <Select
              native
              defaultValue={station_list[16]}
              onChange={handleChange('station')}
              inputProps={{
                name: 'station',
                id: 'outlined-age-native-simple',
              }}
          >
            {stationOptions}
          </Select>
        </FormControl>
        <TrainArrivalsList timeTable={timeTable}/>
      </div>
  );
}

export default Station;
