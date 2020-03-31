import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import { red, orange, green, blue, blueGrey } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: '77vh'
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  gold: {
    color: theme.palette.getContrastText(orange[600]),
    backgroundColor: orange[600],
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  green: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
  },
  blue: {
    color: theme.palette.getContrastText(blue[400]),
    backgroundColor: blue[600],
  },
  grey: {
    color: theme.palette.getContrastText(blueGrey[400]),
    backgroundColor: blueGrey[400],
  }
}));

export default function TrainArrivalsList(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);

  const getTrainLineColor = (color) => {
    if (color == "RED") { return classes.red; }
    else if (color == "GOLD") { return classes.gold; }
    else if (color == "GREEN") { return classes.green; }
    else if (color == "BLUE") { return classes.blue; }
    else { return classes.grey; }
  };

  var trainArrivalsList = props.timeTable ? props.timeTable.map(function(table) {
    return <ListItem>
      <ListItemAvatar>
        <Avatar className={getTrainLineColor(table.line)}>{table.direction.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
          primary={"To: " + table.to}
          secondary={table.when}
      />
    </ListItem>
  }) : null;

  return (
      <div className={classes.root}>
            <div className={classes.container}>
              <List dense={dense}>
                {trainArrivalsList}
              </List>
            </div>
      </div>
  );
}
