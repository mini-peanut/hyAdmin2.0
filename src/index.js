import '@babel/polyfill';
import 'url-polyfill';
import 'moment/locale/zh-cn';
import './index.less';
import './rollbar';

import FastClick from 'fastclick';
import app, {globalState} from './app';
import {initGlobalEvent, initBasicData} from './handler';

// 1. exec global event
initGlobalEvent().then(function () {

  // 2. Register global models
  app.model(require('./models/global').default);
  app.model(require('./models/list').default);

  // 3. Router
  app.router(require('./router').default);

  // 4. Start
  app.start('#root');

  if (globalState._online) {
    initBasicData(app._store);
  }


  FastClick.attach(document.body);
});
