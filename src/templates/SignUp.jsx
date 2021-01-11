import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  InputText,
  SecondButton,
  PartsButton,
} from "../components/UIkit/index";
import { signUp } from "../reducks/users/operations";

const SignUp = () => {
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const fillIn =
    username !== "" &&
    email !== "" &&
    password !== "" &&
    confirmPassword !== "";
  const addClass = fillIn ? "b-center m-color" : "b-center";

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );
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
  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <>
      <div className={"sign-box sign-border"}>
        <h2 className={"sign-title"}>アカウント登録</h2>
        <div className={"midium-space"} />
        <InputText
          label={"ユーザー名"}
          fullWidth={true}
          onChange={inputUsername}
          type={"text"}
        />
        <InputText
          label={"メールアドレス"}
          fullWidth={true}
          onChange={inputEmail}
          type={"email"}
        />
        <InputText
          label={"パスワード"}
          fullWidth={true}
          onChange={inputPassword}
          type={"password"}
        />
        <InputText
          label={"パスワード(再確認)"}
          fullWidth={true}
          onChange={inputConfirmPassword}
          type={"password"}
        />
        <div className={addClass}>
          <SecondButton
            label={"アカウント登録"}
            fullWidth={true}
            onClick={() =>
              dispatch(signUp(username, email, password, confirmPassword))
            }
          />
        </div>
      </div>
      <div className="sign-box">
        <PartsButton
          label={"・アカウントをお持ちの方はこちら"}
          path={"/signin"}
        />
      </div>
      </>
  );
};

export default SignUp;
