import React, {Component, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar';

import Skeleton from '@material-ui/lab/Skeleton'
import Alert from '@material-ui/lab/Alert';

import BreezeCardNumberForm from "./BreezeCardNumberForm";

import { getBreezeCardInfo } from "./BreezecardService";

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
  }
});

function BreezeCard () {
  const classes = useStyles();
  const [cardInfo, setCardInfo] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [loadingData, setLoadingData] = useState(false);

  const populateFields = (cardInput) => {
    setLoadingData(true);
    getBreezeCardInfo(cardInput).then((breezeCardResponse) =>{
      setLoadingData(false);
      setCardInfo(breezeCardResponse);
    }).catch((error) => {
      setLoadingData(false);
      setOpenSnackBar(true);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
      <div className="App">
        <div className={classes.title}>BreezeCard</div>
        <Grid
            className={classes.grid}
            container
            justify="center"
            alignItems="center"
            spacing={3}
        >
          <Grid item xs={6}>
            <div>Card Number</div>
          </Grid>
          <Grid item xs={6}>
            {!loadingData ? (
                <div>{cardInfo.cardNum}</div>
            ) : (
                <Skeleton variant="text"/>
            )}
          </Grid>
          <Grid item xs={6}>
            <div>Exp. Date</div>
          </Grid>
          <Grid item xs={6}>
            {!loadingData ? (
                <Paper>{cardInfo.cardExprDate}</Paper>
            ) : (
                <Skeleton variant="text"/>
            )}
          </Grid>
          <Grid item xs={6}>
            <div>Pass Type</div>
          </Grid>
          <Grid item xs={6}>
            {!loadingData ? (
                <Paper>{cardInfo.passType}</Paper>
            ) : (
                <Skeleton variant="text"/>
            )}
          </Grid>
          <Grid item xs={6}>
            <div>Pass Exp. Date</div>
          </Grid>
          <Grid item xs={6}>
            {!loadingData ? (
                <Paper>{cardInfo.passExp}</Paper>
            ) : (
                <Skeleton variant="text"/>
            )}
          </Grid>
          <Grid item xs={6}>
            <div>Remaining Balance</div>
          </Grid>
          <Grid item xs={6}>
            {!loadingData ? (
                <Paper>{cardInfo.remBal}</Paper>
            ) : (
                <Skeleton variant="text"/>
            )}
          </Grid>
          <Grid item xs={6}>
            <div>Remaining Rides</div>
          </Grid>
          <Grid item xs={6}>
            {!loadingData ? (
                <Paper>{cardInfo.remRides}</Paper>
            ) : (
                <Skeleton variant="text"/>
            )}
          </Grid>
        </Grid>

        <BreezeCardNumberForm open={openModal} close={populateFields}/>

        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            Uh oh! Card was not found
          </Alert>
        </Snackbar>
      </div>
  );
}

export default BreezeCard;
