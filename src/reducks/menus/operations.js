import {db, FirebaseTimestamp} from '../../firebase/index';
import {fetchDayMenusAction, emptyMenusAction} from './actions';
import {push} from 'connected-react-router';

export const fetchDayMenus = (uid, dateId, date) => {
  console.log(dateId)
  const id = String(dateId)
  return async (dispatch) => {
    await db.collection("users").doc(uid).collection('dayMenus').doc(id).get()
      .then(snapshot => {
        if (!snapshot.exists) {
          console.log("kkkkkkk")

          dispatch(emptyMenusAction({
            date: date
          }))
        } else {
          const data = snapshot.data();
          
          dispatch(fetchDayMenusAction(data));
        }
      }).catch(() => {
        console.log("ok")
      })
  }
}

export const saveDayMenus = (items, date, uid, dateId) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
      
    const partsArr = [];
    items.map(item => {
      const i = item.indexOf('＜');
      return partsArr.push(item.substring(i + 1, item.length - 1));
    })
        
      const newData = {
        fitItems: items,
        update_at: timestamp,
        partsId: partsArr,
        date: date,
        created_at: timestamp,
      }

      await db.collection("users").doc(uid).collection("dayMenus").doc(dateId).set(newData, {merge: true})
      .then(() => {
        console.log('set-ok!')
        dispatch(fetchDayMenusAction(newData))
      })
      
    dispatch(push("/"))
  }
}