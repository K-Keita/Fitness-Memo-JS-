import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { signOut } from "../../reducks/users/operations";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  mainColor: {
    backgroundColor: green["A400"],
  },
  icon: {
    "& > svg": {
      margin: theme.spacing(2),
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <div className="head-position">
      <div className={classes.root}>
        <AppBar position="static" className={classes.mainColor}>
          <Toolbar>
            <div className={"midium-space"} />
            <Typography variant="h6" className={classes.title}>
              Fitness-Memo
            </Typography>
            <div className="p-cursor" onClick={() => dispatch(signOut())}>
              ログアウト
            </div>
            <div className={"midium-space"} />
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Header;
