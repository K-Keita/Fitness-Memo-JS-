import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  textField: {
    backgroundColor: "rgb(223, 252, 252)",
  }
}));

const InputText = (props) => {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      style={{ width: props.width }}
      noValidate
      autoComplete="off"
    >
      <TextField
        className={classes.textField}
        fullWidth={props.fullWidth}
        id={props.id}
        label={props.label}
        onChange={props.onChange}
        type={props.type}
        value={props.value}
        variant="outlined"
      />
    </form>
  );
};

export default InputText;
