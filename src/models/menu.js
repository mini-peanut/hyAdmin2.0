import { enquireScreen } from 'enquire-js';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

export default {
  namespace: 'menu',
  state: {
    collapsed: true,
    menuData: [],
    auth: [],
    isMobile
  },
  reducers: {
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    changeMenuData(state, {payload}) {
      return {
        ...state,
        menuData: payload
      }
    }
  },
};
