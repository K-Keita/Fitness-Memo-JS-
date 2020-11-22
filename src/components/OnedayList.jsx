import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {db} from '../firebase';
import {ListPaper} from './index';
import {getUserId} from '../reducks/users/selectors';


const OnedayList = (props) => {
  const [checked, setChecked] = useState([0]),
        [menuList, setMenuList] = useState([]);

  const selector = useSelector(state => state);
  const uid = getUserId(selector);

  const id = String(props.dateId);

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
  
  useEffect(() => {   
    db.collection("users").doc(uid).collection("dayMenus").doc(id).get()
    .then(snapshot => {
      if (!snapshot.exists) {
        setMenuList(["TRANING-OFF"])
      } else {
        const data = snapshot.data();

        if (data.fitItems.length === 0) {
          setMenuList(["TRANING-OFF"])
        } else {
          const fitMenus = [];
          data.fitItems.map((value, index) => {
            return fitMenus.push(`${index + 1}: ${value}`);
          });
          setMenuList(fitMenus);
        }
      } 
      }).catch(() => {
        console.log(Error)
      })    
  }, []);

  return (
    <div className="list-border">
      <ListPaper title={props.title} items={menuList} handleToggle={handleToggle} checked={checked} class={'d-none'} textHeight={'text-height'}/>
    </div>
  );
}

export default OnedayList;