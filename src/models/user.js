const initState = {
  list: [],
  currentUser: {}
};

export default {
  namespace: 'user',

  state: {
    ...initState
  },
  
  reducers: {
    resetState(state) {
      return {
        ...state,
        ...initState
      }
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  }
};
