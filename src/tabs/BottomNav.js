import React, {Component, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import TrainIcon from '@material-ui/icons/Train';
import PaymentIcon from '@material-ui/icons/Payment';
import DehazeIcon from '@material-ui/icons/Dehaze';

import BusMap from "./bus-arrivals/BusMap";
import BreezeCard from "./breezecard/Breezecard"
import Station from "./train-arrivals/Station";

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  drawerButton: {
    position: 'absolute',
    left: '20px',
    zIndex: 100
  }
});

const tabValues = ["BUS", "CARD", "TRAIN"];

function Page(props) {
  const tabValue = props.tabValue;
  if (tabValue == tabValues[0]) {
    return <div><BusMap/></div>
  } else if (tabValue == tabValues[2]) {
    return <div><BreezeCard/></div>
  } else {
    return <div><Station/></div>
  }
}

function BottomNav() {
  const classes = useStyles();
  const [value, setValue] = useState(tabValues[2]);
  const [state, setState] = useState({left: false});

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  return (
      <div className="App">
        <IconButton onClick={toggleDrawer('left', true)} className={classes.drawerButton}>
          <DehazeIcon/>
        </IconButton>
        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        </Drawer>
        <Page tabValue={value}/>
        <BottomNavigation value={value}
                          onChange={(event, newValue) =>{ setValue(newValue)} }
                          showLabels
                          className={classes.root}>
          <BottomNavigationAction value={tabValues[0]} label="Stops" icon={<DirectionsBusIcon />} />
          <BottomNavigationAction  value={tabValues[1]} label="Stations" icon={<TrainIcon />} />
          <BottomNavigationAction  value={tabValues[2]} label="BreezeCard" icon={<PaymentIcon />} />
        </BottomNavigation>
      </div>
  );
}

export default BottomNav;
