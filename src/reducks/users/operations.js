import { signInAction, signOutAction, fetchUsersAction } from "./actions";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import { push } from "connected-react-router";

function createData(name) {
  return { name };
}
const createArr = (part, arr) => {
  part.forEach((part) => {
    arr.push(createData(part));
  });
};

const arm = ["ダンベルカール", "フレンチプレス", "ケーブルプレス"],
  shoulder = ["ショルダープレス", "サイドレイズ", "フロントレイズ"],
  chest = ["ダンベルプレス", "ベンチプレス", "インクラインベンチプレス"],
  back = ["チンニング", "デッドリフト", "ラットプルダウン"],
  reg = ["スクワット", "レッグエクステンション", "レッグカール"];

const fitMenus = {
  arm: [],
  shoulder: [],
  chest: [],
  back: [],
  reg: [],
};

createArr(arm, fitMenus.arm);
createArr(shoulder, fitMenus.shoulder);
createArr(chest, fitMenus.chest);
createArr(back, fitMenus.back);
createArr(reg, fitMenus.reg);

const usersRef = db.collection("users");

//匿名認証
export const anonymousSignIn = (username) => {
  return async (dispatch) => {
    if (username === "") {
      alert("必須項目が未入力です");
      return false;
    }
    const timestamp = FirebaseTimestamp.now();
    auth
      .signInAnonymously()
      .then(async (result) => {
        const user = result.user;
        const uid = user.uid;

        dispatch(
          signInAction({
            isSignIn: true,
            role: "costomor",
            uid: uid,
            username: username,
            fitMenus: fitMenus,
          })
        );

        const userInitialData = {
          created_at: timestamp,
          email: "",
          role: "customer",
          uid: uid,
          updated_at: timestamp,
          username: username,
          fitMenus: fitMenus,
        };
        usersRef
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(push("/"));
          });
      })
      .catch((error) => {
        throw Error(error);
      });
  };
};

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        usersRef
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

              dispatch(
              signInAction({
                isSignIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
                fitMenus: data.fitMenus,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目が未入力です");
      return false;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert(
            "入力されたアドレスにパスワードリセット用のメールをお送りしました。"
          );
          dispatch(push("/signin"));
        })
        .catch(() => {
          alert("パスワードリセットに失敗しました。通信状況をご確認ください");
        });
    }
  };
};

//サインイン処理
export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === "" || password === "") {
      alert("必須項目が未入力です");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        usersRef
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
                fitMenus: data.fitMenus,
              })
            );

            dispatch(push("/"));
          });
      } else {
        alert ("ユーザーが存在しません。もう一度お試しください")
      }
    }).catch((error) => {
      throw new Error(error)
    })
  };
};

//サインアップ処理
export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
            fitMenus: fitMenus,
          };

          usersRef
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/"));
            });
        }
      });
  };
};

//サインアウト処理
export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};

export const saveMenus = (uid, id, newMenus) => {
  return async (dispatch) => {
    await db
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();

        data.fitMenus[id] = newMenus;

        usersRef
          .doc(uid)
          .set(data, { merge: true })
          .then(() => {
            dispatch(fetchUsersAction(data));
          })
          .catch(() => {
            console.log(Error);
          });
      });
  };
};
