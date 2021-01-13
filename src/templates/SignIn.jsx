import React, { useCallback, useState } from "react";
import {
  InputText,
  SecondButton,
  LinkContainerTop,
} from "../components/UIkit/index";
import { LinkContainer } from "../components/index";
import { signIn } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";

const SignIn = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const fillIn = email !== "" && password !== "";
  const addClass = fillIn ? "b-center color_clicked" : "b-center";
  const icon = <FiberManualRecordOutlinedIcon style={{ height: 20 }} />;

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
    <div className="sign-container">
      <LinkContainerTop label={"ログイン"} icons={icon} />
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
      <LinkContainer
        label={"アカウント登録"}
        buttonLabel={"アカウント登録はこちら"}
        link={"/signup"}
        icons={icon}
      />
      <LinkContainer
        label={"パスワード再設定"}
        buttonLabel={"パスワードをお忘れの方はこちら"}
        link={"reset"}
        icons={icon}
      />
      <LinkContainer
        label={"テストログイン"}
        buttonLabel={"テストユーザーでログインする"}
        icons={icon}
        link={"/signin/test"}
      />
    </div>
  );
};

export default SignIn;
