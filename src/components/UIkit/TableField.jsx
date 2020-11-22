import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {db} from '../../firebase/index';
import {getUserId} from '../../reducks/users/selectors';
import {getOnedayMenu, getPartsId} from '../../reducks/menus/selectors';

const TableField = (props) => {
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const partsId = getPartsId(selector);
  const fitItems = getOnedayMenu(selector)
  const date1 = new Date();
  
  const [nearday, setNearday] = useState('-'),
        [day,setDay] = useState('No-Traning');

  useEffect(() => {
    db.collection("users").doc(uid).collection("dayMenus").where("partsId", "array-contains", props.part)
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .then(snapshots => {
        snapshots.forEach(doc => {
          const data = doc.data();
        
          const date2 = new Date(data.date);
          const termDay = Math.floor((date1 - date2) / 86400000)
          setNearday(termDay)
          setDay(data.date)
        })
      })   
  }, [partsId, fitItems])

  return(
    <TableRow style={{height: "30px"}}>
      <TableCell align="center" className="m2-color">{props.name}</TableCell>
      <TableCell align="right" className="m-color">{day}</TableCell>
      <TableCell align="right" className="m2-color">{nearday}日</TableCell>
   </TableRow>
  )
}

export default TableField;