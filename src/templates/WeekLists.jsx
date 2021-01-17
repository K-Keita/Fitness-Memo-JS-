import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { LinkContainer, DateList } from "../components/index";
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
      <div className="flex">
        <PartsButton label={"ホームに戻る"} path={"/"} />
      </div>
      <LinkContainerTop
        icons={<ListAltIcon className="icon_align" />}
        label={"過去のトレーニング"}
      />
      <div className="flex_between">
        {daysList.map((days, index) => {
          return (
            <DateList key={String(index)} title={days.day} dateId={days.id} />
          );
        })}
      </div>
      <LinkContainer
        icons={<AddCircleOutlineIcon className="icon_align" />}
        label={"トレーニングメニューを登録"}
        link={"/regist"}
        arr={true}
      />
      <LinkContainer
        icons={<EditIcon className="icon_align" />}
        label={"メニューリストを編集"}
        link={"/edit"}
        arr={true}
      />
    </>
  );
};

export default WeekLists;
