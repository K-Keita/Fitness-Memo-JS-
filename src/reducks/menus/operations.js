import {db, FirebaseTimestamp} from '../../firebase/index';
import {fetchDayMenusAction, fetchNearMenusAction, emptyMenusAction} from './actions';
import {push} from 'connected-react-router';

export const fetchNearMenus = (uid, part) => {
  return async (dispatch) => {

    const fitArr = [];
    // ["arm", "shoulder", "chest", "back", "reg"].map( async (value) => {
    await db.collection("users").doc(uid).collection("dayMenus").where("partsId", "array-contains", part)
    .orderBy("registDay", "desc")
    .limit(1)
    .get()
    .then(snapshots => {
      snapshots.forEach(doc => {
        const data = doc.data();
        
        console.log(data)
        fitArr.push({
          date: data.registDay,
          part: part
        })
      })
      
    })
    dispatch(fetchNearMenusAction(fitArr))
  // })
  }
}

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
      partsArr.push(item.substring(i + 1, item.length - 1));
    })
        
      const newData = {
        fitItems: items,
        update_at: timestamp,
        partsId: partsArr,
        date: date,
        created_at: timestamp,
      }

      db.collection("users").doc(uid).collection("dayMenus").doc(dateId).set(newData, {merge: true})
      .then(() => {
        console.log('set-ok!')
        dispatch(fetchDayMenusAction(newData))
      })
      
    dispatch(push("/"))
  }
}