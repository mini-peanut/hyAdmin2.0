import {connect} from 'app';
import { message as Msg } from 'antd';

import UI from './UI';
import services from 'services/user';
import {reloadAuthorized} from 'utils/Authorized';
import {initBasicData, initGlobalEvent} from "../../handler";
import {cryptoSha1, encryption, decryption} from '../../utils/crypto';
import {PWD_HASH_ADDON} from '../config/systemConfig';
import {globalState} from 'app';

const loginKey = globalState._login_key;

export default connect(({login})=> {
  return {
    ...login
  };
}, {
  async onLoginSubmit({changeModel, dispatch, getState}, err, {userName, password}) {
    if (err) {
      return;
    }
    changeModel('login', {submitting: true});

    userName = userName.trim();
    password = cryptoSha1(`${password.trim()}${PWD_HASH_ADDON}`);

    const loginModel = getState().login;
    const type = loginModel.type;

    const params = {
      type,
      userName: encryption({data: userName, key: loginKey}),
      password: encryption({data: password, key: password.substr(5, 32)})
    };

    const {status, message, userInfo} = await services.login(params);

    changeModel('login', {
      [type]: {...loginModel[type], status, message},
      submitting: false
    });

    changeModel('user', {currentUser: userInfo});

    if (status === 'error') {
      return;
    }

    if (status === 'ok') {
      Msg.loading(message);
      // 初始化事件
      await initGlobalEvent();
      // 初始化数据
      await initBasicData({dispatch, getState});
      // 刷新 重新加载路由
      location.reload();
      // 更新准入权限 (更新后路由自动跳转)
      reloadAuthorized();

      Msg.destroy();
    }

  },
  onTabChange({dispatch, getState}) {

  },
  onChangeAutoLogin({dispatch, getState}) {

  }
})(UI);
