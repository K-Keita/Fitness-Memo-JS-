import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LeftPaperTitle, ListPaper } from "../components/index";
import { SecondButton } from "../components/UIkit/index";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { getFitnessMenu, getUserId } from "../reducks/users/selectors";
import { saveDayMenus, fetchDayMenus } from "../reducks/menus/operations";
import { getOnedayMenu } from "../reducks/menus/selectors";

const useStyles = makeStyles(() => ({
  root: {
    margin: "auto",
  },
  paper: {
    width: 250,
    height: 300,
    overflow: "auto",
  },
}));

const d = new Date();
const todayYear = d.getFullYear();
const todayMonth = d.getMonth() + 1;
const todayDate = d.getDate();
const nowDateId = String(todayYear) + String(todayMonth) + String(todayDate);

let days = new Date(d.getFullYear(), d.getMonth(), d.getDate());
let year;
let month;
let day;

let date = `${todayYear}/${todayMonth}/${todayDate}`;
let titleDay = `${todayMonth}/${todayDate}`;
let dateId = String(todayYear) + String(todayMonth) + String(todayDate);

const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

const changeDay = () => {
  year = days.getFullYear();
  month = days.getMonth() + 1;
  day = days.getDate();
  date = `${year}/${month}/${day}`;
  dateId = String(year) + String(month) + String(day);
  titleDay = `${month}/${day}`;
};

const TransferList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const fitMenus = getFitnessMenu(selector);
  const fitItems = getOnedayMenu(selector);

  const [checked, setChecked] = useState([]),
    [left, setLeft] = useState([]),
    [right, setRight] = useState([]),
    [dateTitle, setDateTitle] = useState(titleDay),
    [isRegist, setIsRegist] = useState(false);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const id = String(props.id);

  const addClass = !isRegist ? "sign-box" : "sign-box m3-color";
  const leftClick = leftChecked.length === 0 ? "" : "m3-color";
  const rightClick = rightChecked.length === 0 ? "" : "m3-color";

  const prevdays = () => {
    days = new Date(days.getFullYear(), days.getMonth(), days.getDate() - 1);

    changeDay();
    setDateTitle(titleDay);
  };

  const nextdays = () => {
    if (dateId === nowDateId) {
      return false;
    }
    days = new Date(days.getFullYear(), days.getMonth(), days.getDate() + 1);

    changeDay();
    setDateTitle(titleDay);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    setIsRegist(true);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    const registLeft = left;
    const registArr = [];
    rightChecked.map((value) => {
      return registArr.push(`${value}＜${id}＞`);
    });

    const registArr2 = [...registLeft, ...registArr];

    const registArr3 = registArr2.filter((x, i, self) => {
      return self.indexOf(x) === i;
    });

    setIsRegist(true);
    setLeft(registArr3);
    setChecked(not(checked, rightChecked));
  };

  useEffect(() => {
    setRight(fitMenus[id]);
  }, [id]);

  useEffect(() => {
    dispatch(fetchDayMenus(uid, dateId, date));
  }, [dateId]);

  useEffect(() => {
    setLeft(fitItems);
  }, [fitItems]);

  return (
    <>
      <div className="min_midium-width">
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>
            <Paper className={classes.paper} id="m-height">
              <ListPaper
                title={id}
                handleToggle={handleToggle}
                items={right}
                checked={checked}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <div className={rightClick}>
                <SecondButton
                  onClick={handleCheckedLeft}
                  label={"追加する"}
                  fullWidth={true}
                />
              </div>
              <div className={leftClick}>
                <SecondButton
                  onClick={handleCheckedRight}
                  label={"削除する"}
                  fullWidth={true}
                />
              </div>
            </Grid>
          </Grid>
          <Grid item>
            <Paper className={classes.paper} id="m-height">
              <ListPaper
                title={
                  <LeftPaperTitle
                    label={dateTitle}
                    prevdays={prevdays}
                    nextdays={nextdays}
                  />
                }
                handleToggle={handleToggle}
                items={left}
                checked={checked}
                class={"block"}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div className={addClass}>
        <SecondButton
          label={"登録する"}
          fullWidth={true}
          onClick={() => dispatch(saveDayMenus(left, date, uid, dateId))}
        />
      </div>
    </>
  );
};

export default TransferList;
