export const FETCH_DAYMENUS = "FETCH_DAYMENUS";
export const fetchDayMenusAction = (menu) => {
  return {
    type: "FETCH_DAYMENUS",
    payload: menu,
  };
};

export const FETCH_CLOSEMENUS = "FETCH_CLOSEMENUS";
export const fetchCloseMenusAction = (menus) => {
  return {
    type: "FETCH_CLOSEMENUS",
    payload: menus,
  };
};

export const EMPTY_MENUS = "EMPTY_MENUS";
export const emptyMenusAction = (menu) => {
  return {
    type: "EMPTY_MENUS",
    payload: {
      fitItems: [],
      partsId: [],
      date: menu.date,
    },
  };
};
