import React, { Fragment } from 'react';
import { Divider, Badge, Select } from 'antd';
import { Link } from 'dva/router';

const Option = Select.Option;

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];
const listFieldOptions = {
  name: {
    render(val, record) {
      return <Link to='/System/role~auth'>{val}</Link>
    }
  },
  status: {
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    }
  }
};


const pageSettingOptions = {
  writeByStep: true,
  steps: [
    {
      title: '完善基础信息',
      moduleUrl: '/System/role',
      submitType: 'multiple'
    },
    {
      title: '完善权限信息',
      moduleUrl: '/System/role~auth',
    }
  ]
};

const ignoreFieldOptions = {
  list: [],
  form: [],
  search: []
};

const formFieldOptions = {
  status: {
    decorator: {
      // 字段表现类型：React.Node
      Control: <Select dropdownStyle={{zIndex: 1300}}>
        <Option key={1} value={1}>启用</Option>
        <Option key={9} value={9}>禁用</Option>
      </Select>,
      options: {
        initialValue: 1
      }

    }
  }
};
export default {
  listFieldOptions,
  ignoreFieldOptions,
  pageSettingOptions,
  formFieldOptions
}



