import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFitnessMenu, getUserId} from '../reducks/users/selectors';
import {InputText, SecondButton} from '../components/UIkit/index';
import {ListPaper} from '../components';
import {db} from '../firebase/index';
import {saveMenus} from '../reducks/users/operations'; 

const EditList = () => {  
  const [checked, setChecked] = useState([]),
  [fitMemo, setFitMemo] = useState([]),
  [value, setvalue] = useState(""),
  [scrollLine, setScrollLine] = useState(false);

  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const fitMenus = getFitnessMenu(selector);
  
  let id = window.location.pathname.split('/edit')[1];
  
  if(id !== "") {
    id = id.split('/')[1]
  } 
  console.log(fitMenus[id])

  const selectItems = (checked.length === 0);
  const classes = selectItems ? "sign-box" : "sign-box m3-color";
  const isEmpty = (value === "") ? "b-position" : "b-position m3-color";

  
  const inputvalue = (event) => {
    setvalue(event.target.value);
  }
  
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
  
  const deleteItems = (checked) => {
    if(checked.length === 0){
      return false;
    }
    db.collection("users").doc(uid).get()
    .then(snapshot => {
      const data = snapshot.data();
      const items = data.fitMenus[id];
      
      checked.map(value => {
        items.splice(items.indexOf(value), 1);
      })

      dispatch(saveMenus(uid, id, items))
      setFitMemo(items);
    })
    const newchecked = [];
    setChecked(newchecked);
  }
  
  const addMenu = (item, value) => {
    if (value === "") {
      return false;
    } else if (item.indexOf(value) !== -1){
      alert('既にメニューがあります')
      return false;
    }
    const newMenu = [...item, value];
    
    
    setFitMemo(newMenu);
    setvalue("");
    setScrollLine(!scrollLine);
    dispatch(saveMenus(uid, id, newMenu))
  }
  
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');
    if(scrollArea){
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  } ,[scrollLine])

  useEffect(() => {
    setFitMemo(fitMenus[id])
  }, [fitMenus[id]])

  return(
    <>
      <div className="list-border" id="scroll-area">
        <ListPaper id="scroll-area" title={id} items={fitMemo} handleToggle={handleToggle} checked={checked}/>
      </div>
      <div className={classes}>
        <SecondButton fullWidth={true} label={'削除'} onClick={() => {deleteItems(checked)}} />
      </div>
      <div className="input-center c-flex">
        <InputText fullWidth={true} label={'新規メニュー'} onChange={inputvalue} 
          type={"text"} value={value}/>
        <div className={isEmpty}>
        <SecondButton fullWidth={true} label={'追加'} onClick={() => {addMenu(fitMemo, value)}}/>
        </div>
      </div>
    </>
  )
}

export default EditList;