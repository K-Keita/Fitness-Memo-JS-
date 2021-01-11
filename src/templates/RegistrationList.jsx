import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { LinkContainer, TransferList } from "../components/index";

const RegistrationList = () => {
  let id = window.location.pathname.split("/regist")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  return (
    <>
      <LinkContainer
        icons={<HomeOutlinedIcon fontSize="large" className="icons-align" />}
        label={"Fitness-Memo"}
        link={"/"}
        buttonLabel={"ホームに戻る"}
        arr={false}
      />
      <LinkContainer
        icons={<AddCircleOutlineIcon className="icons-align" />}
        label={"トレーニングメニューを登録する"}
        link={"/regist"}
        arr={true}
      />
      <TransferList id={id} />
      <div className="midium-space" />
      <LinkContainer
        icons={<EditIcon className="icons-align" />}
        label={"メニューリストを編集する"}
        link={"/edit"}
        arr={true}
      />
      <LinkContainer
        icons={<ListAltIcon className="icons-align" />}
        label={"過去のトレーニングリスト"}
        link={"/list"}
        buttonLabel={"見る"}
        arr={false}
      />
    </>
  );
};

export default RegistrationList;
