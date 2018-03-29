import { isUrl } from '../utils/utils';

const menuData = [{
  name: 'dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: '工作台',
    path: 'workplace',
    // hideInMenu: true,
  }],
}, {
  name: '列表页',
  icon: 'table',
  path: 'list',
  children: [{
    name: '查询表格',
    path: 'table-list',
  }],
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
