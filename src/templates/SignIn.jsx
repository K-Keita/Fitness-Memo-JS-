import React, { useCallback, useState } from "react";
import {
  InputText,
  SecondButton,
  PartsButton,
  LinkContainerTop,
} from "../components/UIkit/index";
import {LinkContainer} from '../components/index';
import { signIn } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";

const SignIn = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const fillIn = email !== "" && password !== "";
  const addClass = fillIn ? "b-center m-color" : "b-center";

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <div className="m-center">
      <LinkContainerTop label={"ログイン"} />
      <div className={"sign-box sign-border"}>
        <InputText
          id={"email"}
          label={"メールアドレス"}
          fullWidth={true}
          width={"280px"}
          onChange={inputEmail}
          type={"email"}
        />
        <InputText
        id={"password"}
          label={"パスワード"}
          fullWidth={true}
          width={"280px"}
          onChange={inputPassword}
          type={"password"}
        />
        <div className={addClass}>
          <SecondButton
            label={"サインイン"}
            fullWidth={true}
            onClick={() => dispatch(signIn(email, password))}
          />
        </div>
      </div>
      <LinkContainer label={"アカウント登録"} buttonLabel={"アカウント登録はこちら"} link={"/signup"} />
      <LinkContainer label={"パスワード再設定"} buttonLabel={"パスワードをお忘れの方はこちら"} link={"reset"} />
      <LinkContainer label={"テストログイン"} buttonLabel={"テストユーザーでログインする"} />
    </div>
  );
};

export default SignIn;
