import UI from './UI';
import { connect } from 'app';
import { reloadLoginStatus} from "../../handler";
import { routerRedux } from 'dva/router';
import {message} from 'antd';
import services from 'services/user';

export default connect(({ user, global, menu, loading }) => ({
  currentUser: user.currentUser,
  menuData: menu.menuData,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
  isMobile: false
}), {
  handleMenuCollapse({dispatch, getState}, collapsed) {
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  },
  handleNoticeClear({dispatch, getState}, type) {
    message.success(`清空了${type}`);
    dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  },
  async handleMenuClick({changeModel, dispatch, getState}, { key }) {
    if (key === 'triggerError') {
      dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      await services.logout();
      // 更新登录态
      await reloadLoginStatus();
      dispatch({
        type: 'user/resetState'
      });
      dispatch(routerRedux.push('/user/login'));
    }
  },
  handleNoticeVisibleChange({dispatch, getState}, visible) {
    if (visible) {
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  },
  fetchCurrent({dispatch, getState}, visible) {
    dispatch({
      type: 'user/fetchCurrent',
    });
  }
})(UI);
