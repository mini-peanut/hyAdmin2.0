import services from 'services/user';
import {globalState} from "./app";

export async function  reloadLoginStatus() {
  const {status, key} = await services.checkAuthority();

  globalState._online = status;
  globalState._login_key = key;

  return status;
}

export async function initRouterData() {
  const {routerData} = await services.getRouterData();
  globalState._routes = routerData;
}

export async function initGlobalEvent() {
  const isOnline = await reloadLoginStatus();
  isOnline && await initRouterData();
}

export async function initBasicData({dispatch, getState}) {
  const {menuData} = await services.getMenuData();
  const currentUser = await services.getCurrentUser();
  dispatch({
    type: 'menu/changeMenuData',
    payload: menuData
  });
  dispatch({
    type: 'user/saveCurrentUser',
    payload: currentUser
  })
}
