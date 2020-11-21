import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: 0,
    width: '100%',
    maxWidth: 800,
    maxHeight: 250,
    minHeight: 150,
    boxSizing: "border-box"
  },
});

const ListPaper = (props) => {
  const classes = useStyles();

  return(
    <List className={classes.root}>
      <div className="title-box">{props.title}</div>
      {props.items.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <div className={(index % 2 === 0) ? 'm-color' : 'm2-color'} key={index}>
            <ListItem key={value} role={undefined} dense button onClick={props.handleToggle(value)}>
              <div className={props.class}>
                <ListItemIcon>
                  <Checkbox
                  edge="start"
                  checked={props.checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              </div>
              <ListItemText id={labelId} primary={value} className={props.textHeight}/>
            </ListItem>
          </div>
        );
      })}
    </List>
  )
}

export default ListPaper;