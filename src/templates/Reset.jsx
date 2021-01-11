import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  InputText,
  SecondButton,
  PartsButton,
} from "../components/UIkit/index";
import { resetPassword } from "../reducks/users/operations";

const Reset = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const fillIn = email !== "";
  const addClass = fillIn ? "b-center m-color" : "b-center";

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <>
      <div className={"sign-box sign-border"}>
        <h2 className={"sign-title"}>パスワード再設定</h2>
        <div className={"midium-space"} />
        <InputText
          label={"メールアドレス"}
          fullWidth={true}
          onChange={inputEmail}
          type={"email"}
        />
        <div className={addClass}>
          <SecondButton
            label={"再設定用のメールを送る"}
            fullWidth={true}
            onClick={() => dispatch(resetPassword(email))}
          />
        </div>
      </div>
      <div className="sign-box">
        <PartsButton label={"・ログイン画面に戻る"} path={"/signin"} />
      </div>
    </>
  );
};

export default Reset;
