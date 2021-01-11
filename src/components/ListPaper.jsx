import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    maxHeight: 250,
    maxWidth: 800,
    minHeight: 150,
    padding: 0,
    width: "100%",
  },
});

const ListPaper = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <div className="title-box">{props.title}</div>
      {props.items.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        const colorBox = props.partsList ? `color-box color_${value.part}` : `color-box color_${props.partsId}`
        return (
          <div className="m-color" key={index}>
            <ListItem
              button
              dense
              role={undefined}
              key={value}
              onClick={props.handleToggle(value)}
            >
              <div className={props.class}>

                  <Checkbox
checked={props.checked.indexOf(value) !== -1}
disableRipple

                    edge="start"

                    inputProps={{ "aria-labelledby": labelId }}
                    tabIndex={-1}
                  />

              </div>
              <ListItemText
                className={props.textHeight}
                id={labelId}
                primary={value.name}
              />
              <div className={colorBox} />
            </ListItem>
          </div>
        );
      })}
    </List>
  );
};

export default ListPaper;
