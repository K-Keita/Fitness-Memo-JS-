import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  InputText,
  SecondButton,
  LinkContainerTop,
} from "../components/UIkit/index";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import { LinkContainer } from "../components/index";
import { signUp } from "../reducks/users/operations";
import styles from "../styles/auth/auth.module.scss";

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
  const addClass = fillIn ? styles.sign_button__clicked : styles.sign_button;
  const icon = <FiberManualRecordOutlinedIcon style={{ height: 20 }} />;

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
      <div className={styles.sign_container}>
        <LinkContainerTop label={"アカウント登録"} icons={icon} />
        <div className={styles.sign_box}>
          <InputText
            label={"ユーザー名"}
            fullWidth={true}
            onChange={inputUsername}
            type={"text"}
            width={"280px"}
          />
          <InputText
            label={"メールアドレス"}
            fullWidth={true}
            onChange={inputEmail}
            type={"email"}
            width={"280px"}
          />
          <InputText
            label={"パスワード"}
            fullWidth={true}
            onChange={inputPassword}
            type={"password"}
            width={"280px"}
          />
          <InputText
            label={"パスワード(再確認)"}
            fullWidth={true}
            onChange={inputConfirmPassword}
            type={"password"}
            width={"280px"}
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
        <LinkContainer
          label={"ログイン"}
          buttonLabel={"アカウントをお持ちの方はこちら"}
          link={"/signin"}
          icons={icon}
        />
        <LinkContainer
          label={"テストログイン"}
          buttonLabel={"テストユーザーでログインする"}
          icons={icon}
          link={"/signin/test"}
        />
      </div>
    </>
  );
};

export default SignUp;
