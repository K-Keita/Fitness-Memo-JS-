import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { EditList, LinkContainer } from "../components";
import { PartsButton } from "../components/UIkit/index";

const EditMenuList = () => {
  return (
    <>
      <div className="l-flex">
        <PartsButton label={"ホームに戻る"} path={"/"} />
      </div>
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
