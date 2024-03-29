import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { getFitnessMenu, getUserId } from "../reducks/users/selectors";
import { getDateMenu } from "../reducks/menus/selectors";
import { LeftPaperTitle, ListPaper } from "../components/index";
import { makeStyles } from "@material-ui/core/styles";
import { saveDayMenus, fetchDayMenus } from "../reducks/menus/operations";
import { SecondButton } from "../components/UIkit/index";
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/UIkit/TransferList.module.scss'

const useStyles = makeStyles(() => ({
  root: {
    margin: "auto",
  },
  paper: {
    border: "solid 1px #4caf50",
    height: 250,
    overflow: "auto",
    width: 280,
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
let dateId = String(todayYear) + String(todayMonth) + String(todayDate);
let titleDay = `${todayMonth}/${todayDate}`;

const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

const TransferList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const dayMenu = getDateMenu(selector),
    partsMenu = getFitnessMenu(selector),
    uid = getUserId(selector);

  //日付の変更

  const [checked, setChecked] = useState([]),
    [left, setLeft] = useState([]),
    [right, setRight] = useState([]),
    [da, setDa] = useState(dateId),
    [dateTitle, setDateTitle] = useState(titleDay),
    [isRegist, setIsRegist] = useState(false);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const id = String(props.id);

  const addClass = !isRegist ? styles.registration_button : styles.registration_button__clicked;
  const leftClick = leftChecked.length === 0 ? "" : styles.color__clicked;
  const rightClick = rightChecked.length === 0 ? "" : styles.color__clicked;

  const changeDay = () => {
    year = days.getFullYear();
    month = days.getMonth() + 1;
    day = days.getDate();
    date = `${year}/${month}/${day}`;
    dateId = String(year) + String(month) + String(day);
    titleDay = `${month}/${day}`;
    setDa(dateId);
  };

  //日付を一日前
  const prevDays = () => {
    days = new Date(days.getFullYear(), days.getMonth(), days.getDate() - 1);

    changeDay();
    setDateTitle(titleDay);
  };

  //日付を一日後
  const nextDays = () => {
    if (dateId === nowDateId) {
      return false;
    }
    days = new Date(days.getFullYear(), days.getMonth(), days.getDate() + 1);

    changeDay();
    setDateTitle(titleDay);
  };

  //チェックのオンオフ
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

  //メニューの削除
  const handleCheckedRight = () => {
    setIsRegist(true);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  //メニューの追加
  const handleCheckedLeft = () => {
    const registArr = left;
    const arr = [];
    registArr.map((value) => {
      return arr.push(value.name);
    });

    const partsArr = [];
    rightChecked.map((value) => {
      if (arr.indexOf(value.name) === -1) {
        partsArr.push(id);
        return registArr.push({ name: value.name, part: id });
      }
    });

    setIsRegist(true);
    setLeft(registArr);
    setChecked(not(checked, rightChecked));
  };

  useEffect(() => {
    setRight(partsMenu[id]);
  }, [partsMenu, id]);

  useEffect(() => {
    dispatch(fetchDayMenus(uid, da, days));
  }, [dispatch, uid, da]);

  useEffect(() => {
    setLeft(dayMenu);
  }, [dayMenu]);

  return (
    <>
      <div className={styles.transfer_container}>
        <Grid
          alignItems="center"
          container
          className={classes.root}
          justify="center"
          spacing={2}
        >
          <Grid item>
            <Paper>
              <ListPaper
                box={false}
                checked={checked}
                check={true}
                handleToggle={handleToggle}
                items={right}
                title={id}
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
            <Paper>
              <ListPaper
                box={true}
                handleToggle={handleToggle}
                items={left}
                checked={checked}
                check={true}
                title={
                  <LeftPaperTitle
                    label={dateTitle}
                    prevDays={prevDays}
                    nextDays={nextDays}
                  />
                }
              />
            </Paper>
          </Grid>
              </Grid>
      </div>
      <div className={addClass}>
        <SecondButton
          label={"登録する"}
          fullWidth={true}
          onClick={() => dispatch(saveDayMenus(left, days, date, uid, dateId))}
        />
      </div>
    </>
  );
};

export default TransferList;
