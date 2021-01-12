import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { LinkContainer, OnedayList } from "../components/index";
import { LinkContainerTop, PartsButton } from "../components/UIkit/index";

const d = new Date();
const daysList = [];

for (let i = 0; i < 7; i++) {
  const days = new Date(d.getFullYear(), d.getMonth(), d.getDate() - i);
  const year = days.getFullYear();
  const month = days.getMonth() + 1;
  const day = days.getDate();

  const date = `${month}/${day}`;
  const dateId = String(year) + String(month) + String(day);

  daysList.push({ day: date, id: dateId });
}

const WeekLists = () => {
  return (
    <>
      <div className="l-flex">
        <PartsButton label={"ホームに戻る"} path={"/"} />
      </div>
      <LinkContainerTop
        icons={<ListAltIcon className="icons-align" />}
        label={"過去のトレーニング"}
      />
      <div className="large-width d-flex">
        {daysList.map((days, index) => {
          return (
            <OnedayList key={String(index)} title={days.day} dateId={days.id} />
          );
        })}
      </div>
      <LinkContainer
        icons={<AddCircleOutlineIcon className="icons-align" />}
        label={"トレーニングメニューを登録"}
        link={"/regist"}
        arr={true}
      />
      <LinkContainer
        icons={<EditIcon className="icons-align" />}
        label={"メニューリストを編集"}
        link={"/edit"}
        arr={true}
      />
    </>
  );
};

export default WeekLists;
