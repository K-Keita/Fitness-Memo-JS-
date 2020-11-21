import React from 'react';
import Divider from '@material-ui/core/Divider';
import green from '@material-ui/core/colors/green';
import {makeStyles} from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    marginBottom: 0,
    color: green["A400"]
  }
})

const LinkContainerTop = (props) => {
  const classes = useStyles();

  return(
    <div>
      <h2 className={classes.root}>
        {props.icons}
        {props.label}
      </h2>
      <Divider />
    </div>
  )
}

export default LinkContainerTop;