import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  InputText,
  SecondButton,
  LinkContainerTop
} from "../components/UIkit/index";
import {LinkContainer} from '../components/index';
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
    <div className="m-center">
      <LinkContainerTop label={"パスワード再設定"} />
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
      <LinkContainer label={"アカウント登録"} buttonLabel={"アカウント登録はこちら"} link={"/signup"} />
      <LinkContainer label={"ログイン"} buttonLabel={"アカウントをお持ちの方はこちら"} link={"/signin"} />
      <LinkContainer label={"テストログイン"} buttonLabel={"テストユーザーでログインする"} />
    </div>
    </>
  );
};

export default Reset;
