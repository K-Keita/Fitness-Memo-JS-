export const FETCH_DAYMENUS = "FETCH_DAYMENUS";
export const fetchDayMenusAction = (menu) => {
  return {
    type: "FETCH_DAYMENUS",
    payload: menu
  }
};

export const FETCH_NEARMENUS = "FETCH_NEARMENUS";
export const fetchNearMenusAction = (menus) => {
  return {
    type: "FETCH_NEARMENUS",
    payload: menus
  }
}

export const EMPTY_MENUS = "EMPTY_MENUS";
export const emptyMenusAction = (menu) => {
  return {
    type: "EMPTY_MENUS",
    payload: {
      fitItems: [], 
      partsId: [],
      date: menu.date,
    }
  }
}