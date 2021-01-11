import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TableField } from "../components/UIkit/index";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// const TableCell = withStyles((theme) => ({
//   head: {
//     fontSize: 18,

//   },
//   body: {
//     fontSize: 14,
//     height: 18,
//   },
// }))(TableCell);

const useStyles = makeStyles({
  tableWidth: {
    minWidth: 300,
  },
  tableCell: {
    fontSize: 18,
    textAlign: "center",
  },
});

const TableBox = () => {
  const classes = useStyles();

  const parts = [
    { name: "肩", id: "shoulder" },
    { name: "腕", id: "arm" },
    { name: "胸", id: "chest" },
    { name: "背中", id: "back" },
    { name: "脚", id: "reg" },
  ];

  return (
    <TableContainer className="table-border">
      <Table className={classes.tableWidth} aria-label="simple table">
        <TableHead>
          <TableRow className="border__under">
            <TableCell className={classes.tableCell} width="25%">
              部位
            </TableCell>
            <TableCell className={classes.tableCell} width="45%">
              前回の日付
            </TableCell>
            <TableCell className={classes.tableCell} width="30%">
              経過日
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parts.map((part) => {
            return <TableField key={part.id} name={part.name} part={part.id} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableBox;
