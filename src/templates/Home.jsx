import React from "react";
import { OnedayList, TableBox } from "../components/index";
import { LinkContainerTop } from "../components/UIkit/index";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
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
    <div className="container-width">
      <LinkContainerTop
        icons={<HomeOutlinedIcon fontSize="large" className="icons-align" />}
        label={"Fitness-Memo"}
      />
      <div className="midium-space" />
      <div className="d-flex m-center">
        <div className="midium-width">
          <div className="d-none__block">
            <OnedayList title={"今日のトレーニング"} dateId={dateId} />
          </div>
          <TableBox />
        </div>
        <div className="small-width__none m-center">
          <OnedayList title={"今日のトレーニング"} dateId={dateId} />
        </div>
      </div>
      <LinkContainer
        flexLine="l-flex"
        icons={<AddCircleOutlineIcon className="icons-align" />}
        label={"今日のトレーニングを登録"}
        link={"/regist"}
        arr={true}
      />
      <LinkContainer
        flexLine="l-flex"
        icons={<EditIcon className="icons-align" />}
        label={"メニューリストを編集する"}
        link={"/edit"}
        arr={true}
      />
      <LinkContainer
        flexLine="l-flex"
        icons={<ListAltIcon className="icons-align" />}
        label={"過去のトレーニング"}
        buttonLabel={"見る"}
        link={"/list"}
        arr={false}
      />
    </div>
  );
};

export default Home;
