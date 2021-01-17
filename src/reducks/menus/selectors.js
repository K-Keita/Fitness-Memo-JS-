import { createSelector } from "reselect";

const menuSelector = (state) => state.menu;
const menusSelector = (state) => state.menus;

export const getCloseDate = createSelector(
  [menuSelector],
  (state) => state.date
);

export const getDateMenu = createSelector(
  [menuSelector],
  (state) => state.fitItems
);

export const getPartsId = createSelector(
  [menuSelector],
  (state) => state.partsId
);

export const getMenus = createSelector([menusSelector], (state) => state.list);

export const getFitMenus = createSelector(
  [menuSelector],
  (state) => state.fitMenus
);

export const getTermDay = createSelector(
  [menuSelector],
  (state) => state.termDay
);
