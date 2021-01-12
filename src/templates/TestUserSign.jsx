import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  InputText,
  SecondButton,
  LinkContainerTop,
} from "../components/UIkit/index";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import { LinkContainer } from "../components/index";
import { anonymousSignIn } from "../reducks/users/operations";

const TestUserSign = () => {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const fillIn = username !== "";
  const addClass = fillIn ? "b-center color_clicked" : "b-center";
  const icon = <FiberManualRecordOutlinedIcon style={{height: 20}} />

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
    );

    return (
      <>
      <div className="sign-container">
        <LinkContainerTop label={"テストユーザーログイン"}
      icons={icon}
        />
        <div className={"sign-box sign-border"}>
          <InputText
            label={"ユーザー名"}
            fullWidth={true}
            onChange={inputUsername}
            type={"text"}
            width={"280px"}
          />
          <div className={addClass}>
            <SecondButton
              label={"テストユーザーでログインする"}
              fullWidth={true}
              onClick={() => dispatch(anonymousSignIn(username))}
            />
          </div>
        </div>
        <LinkContainer
          label={"アカウント登録"}
          buttonLabel={"アカウント登録はこちら"}
          link={"/signup"}
          icons={icon}
          />
        <LinkContainer
          label={"ログイン"}
          buttonLabel={"アカウントをお持ちの方はこちら"}
          link={"/signin"}
          icons={icon}
          />
      </div>
    </>
  );
};

export default TestUserSign;