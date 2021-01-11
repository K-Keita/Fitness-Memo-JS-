import React from "react";
import Divider from "@material-ui/core/Divider";
import green from "@material-ui/core/colors/green";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    color: green["A400"],
    marginBottom: 0,
    minWidth: 350,
  },
});

const LinkContainerTop = (props) => {
  const classes = useStyles();

  return (
    <div>
      <h2 className={classes.root}>
        {props.icons}
        {props.label}
      </h2>
      <Divider />
    </div>
  );
};

export default LinkContainerTop;
