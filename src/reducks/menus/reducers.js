import * as Actions from "./actions";
import initialState from "../store/initialState";

export const MenuReducer = (state = initialState.menu, action) => {
  switch (action.type) {
    case Actions.FETCH_DAYMENUS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EMPTY_MENUS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const MenusReducer = (state = initialState.menus, action) => {
  switch (action.type) {
    case Actions.FETCH_NEARMENUS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
