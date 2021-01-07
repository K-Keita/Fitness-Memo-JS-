import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import { UsersReducer } from "../users/reducers";
import { MenuReducer } from "../menus/reducers";
import { MenusReducer } from "../menus/reducers";

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      menu: MenuReducer,
      menus: MenusReducer,
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
