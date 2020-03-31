import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  addCard: {
    alignItems: 'center',
    marginTop: '76vh'
  },
  getCardPic: {
    alignItems: 'center',
    marginTop: '90vh'
  }
});

export default function BreezeCardNumberForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);
  const [cardNumInput, setCardNumInput] = React.useState();

  const handleChange = event => setCardNumInput(event.target.value);

  const handleClickOpen = () => setOpen(true);

  const validateInput = () => {
    console.log(cardNumInput);
    return String(cardNumInput).length == 20;
  };

  const handleClose = () => {
    console.log(props);
    setOpen(false);
  };

  const handleSubmit = () => {
    if (validateInput()) {
      props.close(cardNumInput);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleTakePhoto = () => {
    //TODO Card Reading Capabilities
  };

  return (
      <div>
        <Button className={classes.addCard} color="primary"  variant="contained" onClick={handleClickOpen}> Add Card</Button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Enter Card Number</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the 20 digit number located on the back of your Breeze Card
            </DialogContentText>
            <TextField
                error
                value={cardNumInput}
                onChange={handleChange}
                autoFocus
                margin="dense"
                id="name"
                label="20 digit number"
                type="number"
                fullWidth
            />
          </DialogContent>
          <DialogActions>
            <IconButton aria-label="take photo" color="primary" onClick={handleTakePhoto}>
              <CameraAltIcon/>
            </IconButton>
            <Button onClick={handleCancel} color="primary">
              Close
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Get Balance
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
