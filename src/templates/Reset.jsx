import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  InputText,
  SecondButton,
  LinkContainerTop,
} from "../components/UIkit/index";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import { LinkContainer } from "../components/index";
import { resetPassword } from "../reducks/users/operations";

const Reset = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const fillIn = email !== "";
  const addClass = fillIn ? "b-center color_clicked" : "b-center";
  const icon = <FiberManualRecordOutlinedIcon style={{ height: 20 }} />;

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <>
      <div className="sign-container">
        <LinkContainerTop label={"パスワード再設定"} icons={icon} />
        <div className={"sign-box sign-border"}>
          <InputText
            label={"メールアドレス"}
            fullWidth={true}
            onChange={inputEmail}
            type={"email"}
            width={"280px"}
          />
          <div className={addClass}>
            <SecondButton
              label={"再設定用のメールを送る"}
              fullWidth={true}
              onClick={() => dispatch(resetPassword(email))}
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

export default Reset;
