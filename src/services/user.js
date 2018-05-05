import {ajax} from '../utils/request';


const services = {};

const request = path => (params = {}) => {
  const hash = window.location.hash;
  const mainModule = hash.split('~')[0].slice(1);

  params = {mainModule, ...params, params: {...params.params}};

  hash.split('~')[1] && hash.split('~')[1].split('&').map(function (item) {
    const [key, value] = item.split('=');
    if (key === 'page') {
      params.page = value
    } else {
      params.params[key] = +value;
    }
  });

  return ajax.post(path, params);
};

services.login = request('System/Account/login');

services.logout = request('System/Account/logout');

services.getCurrentUser = request('System/Account/currentUser');

services.checkAuthority = request('System/Account/checkAuth');


services.getRouterData = request('System/BasicData/routerData');

services.getMenuData = request('System/BasicData/menuData');

services.getModules = request('System/BasicData/modules');

services.getTableData = request('Common/HyAll/all');



services.addFormData = request('Common/HyAll/ajax?q=insert');

services.delListData = request('Common/HyAll/ajax?q=delete');

services.modFormData = request('Common/HyAll/ajax?q=edit');

services.getColumns = request('Common/HyAll/nextForm');

services.getModuleOption = request('Common/HyAll/moduleOption');

services.getModuleList = request('Common/HyAll/moduleList');


export default services;
