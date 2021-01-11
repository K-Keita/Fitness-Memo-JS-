import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    minWidth: 270,
    border: "solid 2px #00c853",
    boxSizing: "border-box",
    borderRadius: 2,
    backgroundColor: "mintcream",
    margin: "20px auto",
    overflow: "auto",
    height: 250,
    padding: 0,
  },
  titleBox: {
    margin: 0,
    textAlign: "center",
    fontSize: 20,
    padding: 8,
    borderBottom: "solid 2px gray",
    boxSizing: "border-box",
    backgroundColor: "rgb(38, 240, 139)",
  },
  text: {
    width: "100%",
    maxWidth: 400,
    minWidth: 270,
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

export default function TransferList(props) {
  const classes = useStyles();
  const [left, setLeft] = React.useState([0, 1, 2, 3, 5, 6, 7, 8]);

  return (
    <Card className={classes.root}>
      <CardHeader title={"title"} className={classes.titleBox} />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {left.map((value) => {
          const colorBox = props.box
            ? `color-box color_${value.part}`
            : `color-box color_${props.partsId}`;
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button>
              <ListItemText
                className={classes.text}
                id={labelId}
                primary={"aaaa"}
              />
              <div className={colorBox} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
}
