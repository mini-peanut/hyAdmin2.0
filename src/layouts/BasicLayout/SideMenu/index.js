import {connect} from 'app';
import UI from './UI';

export default connect(({menu})=> {
  const {collapsed, menuData, isMobile} = menu;
  return {
    collapsed,
    menuData,
    isMobile: false
  };
}, {
  onMenuCollapse({dispatch, getState}, collapsed) {
    dispatch({
      type: 'menu/changeState',
      payload: {
        collapsed
      },
    });
  }
})(UI);
