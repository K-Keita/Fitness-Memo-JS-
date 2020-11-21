const initialState = {
  users: {
    isSignedIn: false,
    role: "",
    uid: "",
    username: "",
    fitMenus: {}
  },
  menu: {
    fitItems: [], 
    partsId: [],
    date: "",
  },
  menus: {
    list: []
  }
};

export default initialState;