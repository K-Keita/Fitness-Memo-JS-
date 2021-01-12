import React from "react";
import { OnedayList, TableBox } from "../components/index";
import { LinkContainer } from "../components/index";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import ListAltIcon from "@material-ui/icons/ListAlt";

const d = new Date();
const year = d.getFullYear();
const month = d.getMonth() + 1;
const day = d.getDate();
const dateId = String(year) + String(month) + String(day);

const Home = () => {
  return (
    <>
      <div style={{ height: 20 }} />
      <div className="d-flex_between">
        <div className="table-container">
          <TableBox />
        </div>
        <div className="list-container">
          <OnedayList title={"今日のトレーニング"} dateId={dateId} />
        </div>
      </div>
      <LinkContainer
        icons={<AddCircleOutlineIcon className="icons-align" />}
        label={"トレーニングメニューを登録"}
        link={"/regist"}
        arr={true}
      />
      <LinkContainer
        icons={<EditIcon className="icons-align" />}
        label={"メニューリストの編集"}
        link={"/edit"}
        arr={true}
      />
      <LinkContainer
        icons={<ListAltIcon className="icons-align" />}
        label={"過去のトレーニング"}
        buttonLabel={"見る"}
        link={"/list"}
        arr={false}
      />
    </>
  );
};

export default Home;
