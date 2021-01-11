import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { signOut } from "../../reducks/users/operations";

const useStyles = makeStyles({
  button: {
    color: "#fff",
    cursor: "pointer",
  },
  mainColor: {
    backgroundColor: green["A400"],
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
});

const Header = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <div className="head-position">
      <div className={classes.root}>
        <AppBar position="static" className={classes.mainColor}>
          <Toolbar>
            <div className="midium-space" />
            <Typography variant="h4" className={classes.title}>
              Fitness-Memo
            </Typography>
            <div className={classes.button} onClick={() => dispatch(signOut())}>
              ログアウト
            </div>
            <div className="midium-space" />
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Header;
