import { db, FirebaseTimestamp } from "../../firebase/index";
import { fetchDayMenusAction, emptyMenusAction } from "./actions";
import { push } from "connected-react-router";

export const fetchDayMenus = (uid, dateId, date) => {
  console.log(dateId);
  const id = String(dateId);
  return async (dispatch) => {
    await db
      .collection("users")
      .doc(uid)
      .collection("dayMenus")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (!snapshot.exists) {
          dispatch(
            emptyMenusAction({
              date: date,
            })
          );
        } else {
          const data = snapshot.data();

          dispatch(fetchDayMenusAction(data));
        }
      })
      .catch(() => {
        console.log("ok");
      });
  };
};

export const saveDayMenus = (items, days, date, uid, dateId) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const partsArr = [];
    items.map(value => {
      return partsArr.push(value.part)
    })

    const newData = {
      fitItems: items,
      update_at: timestamp,
      partsId: partsArr,
      days: days,
      date: date,
      created_at: timestamp,
    };
    console.log(dateId)

    await db
      .collection("users")
      .doc(uid)
      .collection("dayMenus")
      .doc(dateId)
      .set(newData, { merge: true })
      .then(() => {
        console.log("set-ok!");
        dispatch(fetchDayMenusAction(newData));
      });

    dispatch(push("/"));
  };
};
