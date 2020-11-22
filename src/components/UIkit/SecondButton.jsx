import React from 'react';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  primary: {
    color: green['A400'],
    borderColor: green['A400'],
    margin: 0
  }
}));

const SecondButton = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="outlined" className={classes.primary} href="#outlined-buttons"
        onClick={props.onClick} fullWidth={props.fullWidth}>
        {props.label}
      </Button>
    </div>
  );
}

export default SecondButton;