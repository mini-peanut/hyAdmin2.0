import {ajax} from '../utils/request';


const services = {};

const request = path => (params = {}) => ajax.post(path, params);

services.login = request('System/HyStart/login');

services.logout = request('System/HyStart/logout');

services.checkAuthority = request('System/User/checkAuth');

services.getRouterData = request('System/User/routerData');

services.getMenuData = request('System/User/menuData');

services.getModules = request('System/User/modules');

services.getTableData = request('Common/HyAll/all');

services.addFormData = request('Common/HyAll/ajax?q=insert');

services.delListData = request('Common/HyAll/ajax?q=insert');

services.getColumns = request('Common/HyAll/columns');

services.getCurrentUser = request('System/User/currentUser')


export default services;
