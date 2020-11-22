import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {InputText, SecondButton, PartsButton} from '../components/UIkit/index';
import { signIn } from '../reducks/users/operations';

const SignIn = () => {
  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const fillIn = (email !== "" && password !== "");
  const addClass = fillIn ? "b-center m3-color" : "b-center";

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);
  const inputPassword = useCallback((event) => {
      setPassword(event.target.value)
  }, [setPassword]);


  return(
    <div className={"container-width"}>
      <div className={"sign-box sign-border"}>
        <h2 className={"sign-title"}>ログイン</h2>
        <div className={"midium-space"} />
          <InputText label={"メールアドレス"} fullWidth={true} onChange={inputEmail} type={"email"} />
          <InputText label={"パスワード"} fullWidth={true} onChange={inputPassword} type={"password"} />
        <div className={addClass}>
          <SecondButton label={'サインイン'} fullWidth={true} onClick={() => dispatch(signIn(email, password))} />
        </div>
      </div>
      <div className="sign-box">
        <PartsButton label={"・アカウントの新規登録はこちら"} path={"/signup"} />
        <PartsButton label={"・パスワードをお忘れの方はこちら"} path={"/reset"} />
      </div>
    </div>
  )
}

export default SignIn;