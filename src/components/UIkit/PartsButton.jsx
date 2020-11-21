import React from 'react';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  primary: {
    color: green['A400'],
    borderColor: green['A400'],
    borderRadius: 50,
    margin: '5px',
    '&:hover': {
      width: '110%',
      height: '110%',
    }
  },
}));

const PartsButton = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <Button variant="outlined" fullWidth={props.fullWidth} className={classes.primary} href="#outlined-buttons" onClick={() => dispatch(push(props.path))}>
        {props.label}
      </Button>
    </div>
  );
}

export default PartsButton;