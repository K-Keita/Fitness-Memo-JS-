import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "260px",
    },
  },
}));

const InputText = (props) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label={props.label}
        variant="outlined"
        fullWidth={props.fullWidth}
        onChange={props.onChange}
        type={props.type}
        value={props.value}
      />
    </form>
  );
};

export default InputText;
