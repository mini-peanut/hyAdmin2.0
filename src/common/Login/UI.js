import Login from 'components/Login';
import {Checkbox, Alert, Icon, Spin, message as Msg} from 'antd';

import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

function renderErrMsg(message) {
  return (
    <Alert style={{ marginBottom: 24 }} message={message} type="error" showIcon />
  );
}

export default function ({type, submitting, isAutoLogin, ...props}) {
    const {onLoginSubmit, onTabChange, onChangeAutoLogin} = props;
    const message = props[type].message;
    const status = props[type].status;
    const isRenderErrMsg = status === 'error' && !submitting;

    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={onTabChange} onSubmit={onLoginSubmit}>
          <Tab key="account" tab="账户密码登录">
            {isRenderErrMsg && renderErrMsg(message)}
            <UserName name="userName" placeholder="请输入用户名" />
            <Password name="password" placeholder="请输入密码" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {isRenderErrMsg && renderErrMsg(message)}
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab>
          <div>
            <Checkbox checked={isAutoLogin} onChange={onChangeAutoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">忘记密码</a>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
}
