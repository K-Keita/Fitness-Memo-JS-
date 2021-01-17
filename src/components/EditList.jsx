import React, { useEffect, useState } from "react";
import { db } from "../firebase/index";
import { getFitnessMenu, getUserId } from "../reducks/users/selectors";
import { InputText, SecondButton } from "../components/UIkit/index";
import { ListPaper } from "../components";
import { saveMenus } from "../reducks/users/operations";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/editList/EditList.module.scss";

const EditList = () => {
  const [checked, setChecked] = useState([]),
    [fitMemo, setFitMemo] = useState([]),
    [scrollLine, setScrollLine] = useState(false),
    [value, setValue] = useState("");

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const fitMenus = getFitnessMenu(selector),
    uid = getUserId(selector);

  let id = window.location.pathname.split("/edit")[1];
  if (id !== "") {
    id = id.split("/")[1];
  }

  const selectItems = checked.length === 0;
  const classes = selectItems ? styles.b_delete : styles.b_delete__clicked;
  const isEmpty = value === "" ? styles.b_add : styles.b_add__clicked;

  const inputValue = (event) => {
    setValue(event.target.value);
  };

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
    if (checked.length === 0) {
      return false;
    }
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        const items = data.fitMenus[id];

        checked.map((value) => {
          return items.splice(items.indexOf(value), 1);
        });

        dispatch(saveMenus(uid, id, items));
        setFitMemo(items);
      });
    const newChecked = [];
    setChecked(newChecked);
  };

  const addMenu = (item, value) => {
    if (value === "") {
      return false;
    }
    const newItem = { name: value, part: id };
    if (item.indexOf(newItem) !== -1) {
      alert("すでに同じ名前があります");
      return false;
    }
    const newMenu = [...item, newItem];

    setFitMemo(newMenu);
    setValue("");
    setScrollLine(!scrollLine);
    dispatch(saveMenus(uid, id, newMenu));
  };

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [scrollLine]);

  useEffect(() => {
    setFitMemo(fitMenus[id]);
  }, [fitMenus, id]);

  return (
    <>
      <div id="scroll-area">
        <ListPaper
          box={false}
          checked={checked}
          handleToggle={handleToggle}
          items={fitMemo}
          title={id}
          check={false}
        />
      </div>
      <div className={classes}>
        <SecondButton
          fullWidth={true}
          label={"削除"}
          onClick={() => {
            deleteItems(checked);
          }}
        />
      </div>
      <div className={styles.input_center}>
        <InputText
          fullWidth={true}
          label={"新規メニュー"}
          onChange={inputValue}
          type={"text"}
          value={value}
          width={"260px"}
        />
        <div className={isEmpty}>
          <SecondButton
            fullWidth={true}
            label={"追加"}
            onClick={() => {
              addMenu(fitMemo, value);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditList;
