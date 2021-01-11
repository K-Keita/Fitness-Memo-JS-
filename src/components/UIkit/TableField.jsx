import React, { useState, useEffect } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { db } from "../../firebase/index";
import { getUserId } from "../../reducks/users/selectors";
import { getOnedayMenu } from "../../reducks/menus/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  tableCell: {
    background: "#f5fffa",
    textAlign: "center",
  },
});

const TableField = React.memo((props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector),
  fitItems = getOnedayMenu(selector);

  const date1 = new Date();
  const colorBox = `color_${props.part} color-box`

  const [nearday, setNearday] = useState("-"),
    [day, setDay] = useState("No-Traning");

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

          setNearday(termDay);
          setDay(data.date);
        });
      });
  }, [fitItems]);

  return (
    <TableRow style={{ height: "30px"}}>
      <TableCell align="center" className="m-color d-flex" style={{fontSize: "16px"}}>
        <div className={colorBox} style={{marginRight: "8px"}} />
       {props.name}
      </TableCell>
      <TableCell className={classes.tableCell}>
        {day}
      </TableCell>
      <TableCell className={classes.tableCell}>
        {nearday}日
      </TableCell>
    </TableRow>
  );
});

export default TableField;
