import React, { useState, useEffect } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { db } from "../../firebase/index";
import { getUserId } from "../../reducks/users/selectors";
import { getDateMenu } from "../../reducks/menus/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  tableCell: {
    background: "#f5fffa",
    textAlign: "center",
  },
  tableCell_part: {
    background: "#f5fffa",
    textAlign: "center",
    fontSize: 16,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

const TableField = React.memo((props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector),
    dayMenu = getDateMenu(selector);

  const date1 = new Date();

  const colorBox = `color_${props.part} color-box`;

  const [closeDay, setCloseDay] = useState("-"),
    [trainingDay, setTrainingDay] = useState("No-Training");

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .collection("dayMenus")
      .where("partsId", "array-contains", props.part)
      .orderBy("days", "desc")
      .limit(1)
      .get()
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const data = doc.data();

          const date2 = new Date(data.date);

          const termDay = Math.floor((date1 - date2) / 86400000);

          setCloseDay(termDay);
          setTrainingDay(data.date);
        });
      });
  }, [date1, dayMenu, props.part, uid]);

  return (
    <TableRow style={{ height: "30px" }}>
      <TableCell className={classes.tableCell_part}>
        <div className={colorBox} style={{ marginRight: "8px" }} />
        {props.name}
      </TableCell>
      <TableCell className={classes.tableCell}>{trainingDay}</TableCell>
      <TableCell className={classes.tableCell}>{closeDay}日</TableCell>
    </TableRow>
  );
});

export default TableField;
