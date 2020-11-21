import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {InputText, SecondButton, PartsButton} from '../components/UIkit/index';
import {auth} from '../firebase/index';
import {push} from 'connected-react-router';

const Reset = withRouter((props) => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const fillIn = (email !== "");
  const addClass = fillIn ? "b-center m3-color" : "b-center";

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  },[setEmail])

  const resetPassword = (email) => {
    if(email === ''){
      alert('必須項目が未入力です');
      return false;
    }else{
      auth.sendPasswordResetEmail(email)
          .then(() => {
            alert('入力されたアドレスにパスワードリセット用のメールをお送りしました。')
            props.history.push("/signin");
          }).catch(() => {
            alert('パスワードリセットに失敗しました。通信状況をご確認ください');
          })
    }
  }
     
  return(
    <div className={"container-width"}>
      <div className={"sign-box sign-border"}>
        <h2 className={"sign-title"}>パスワード再設定</h2>
        <div className={"midium-space"} />
        <InputText label={"メールアドレス"} fullWidth={true} onChange={inputEmail} type={"email"} />
        <div className={addClass}>
          <SecondButton label={'再設定用のメールを送る'} fullWidth={true} onClick={() => dispatch(resetPassword(email))} />
        </div>
      </div>
      <div className="sign-box">
        <PartsButton label={"・ログイン画面に戻る"} path={"/signin"} />
      </div>
    </div>
  )
})

export default Reset;