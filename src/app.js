import dva from '../lib/index';

const app = dva();

export const connect = app.connect;

export const globalState = {
  _routes: [],
  _login_key: '',
  _online: false,
};


export default app;

