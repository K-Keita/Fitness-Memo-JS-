import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { EditList, LinkContainer } from "../components";

const EditMenuList = () => {
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
        icons={<EditIcon className={"icons-align"} />}
        label={"メニューリストを編集する"}
        link={"/edit"}
        arr={true}
      />
      <EditList />
      <div className="midium-space" />
      <LinkContainer
        icons={<AddCircleOutlineIcon className={"icons-align"} />}
        label={"トレーニングメニューを登録"}
        link={"/regist"}
        arr={true}
      />
      <LinkContainer
        icons={<ListAltIcon className={"iconst-align"} />}
        label={"過去のトレーニング"}
        link={"/list"}
        buttonLabel={"見る"}
        arr={false}
      />
    </>
  );
};

export default EditMenuList;
