import { db, FirebaseTimestamp } from "../../firebase/index";
import { fetchDayMenusAction, emptyMenusAction } from "./actions";
import { push } from "connected-react-router";

const usersRef = db.collection("users");

export const fetchDayMenus = (uid, dateId, date) => {
  const id = String(dateId);
  return async (dispatch) => {
    const snapshot = usersRef
      .doc(uid)
      .collection("dayMenus")
      .doc(id)
      .get()

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

      snapshot.catch((error) => {
        throw Error(error);
      });
  };
};

export const saveDayMenus = (items, days, date, uid, dateId) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const partsArr = [];
    items.map((value) => {
      return partsArr.push(value.part);
    });

    const newData = {
      created_at: timestamp,
      date: date,
      days: days,
      fitItems: items,
      partsId: partsArr,
      update_at: timestamp,
    };

    await usersRef
      .doc(uid)
      .collection("dayMenus")
      .doc(dateId)
      .set(newData, { merge: true })
      .then(() => {
        dispatch(fetchDayMenusAction(newData));
      });

    dispatch(push("/"));
  };
};
