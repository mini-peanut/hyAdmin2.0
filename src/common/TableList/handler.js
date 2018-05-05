import React from 'react';
import _ from 'lodash';
import { Link } from 'dva/router';

import {
  defaultFormFieldOptions,
} from "../config/tableConfig.js";
import MultipleSelect from './Control/MultipleSelect.jsx';
import SingleSelect from './Control/SingleSelect.jsx';

import role from '../../routes/Manage/role';
import auth from '../../routes/Manage/auth';
import module from '../../routes/Manage/module';
import basicInfo from '../../routes/UserInfo/basicInfo';
import LinkField from './Renderer/LinkField';

const CUSTOM_CONFIG_MAP = {
  '/Manage/Role': role,
  '/Manage/Auth': auth,
  '/Manage/Module': module,
  '/UserInfo/BasicInfo': basicInfo
};

export function formatDataForModel(moduleUrl, {
  columns,
  pageOptions: pageSetting,
  link_id,
  link_field,
  link_module
}) {
  const {listColumns, formColumns, searchColumns} = columns;
  let {
    listFieldOptions = {},
    formFieldOptions = {},
    searchFieldOptions = {},
    ignoreFieldOptions = {}
  } = CUSTOM_CONFIG_MAP[moduleUrl] || {};

  const listFields = formatListFieldsForModel(listColumns, listFieldOptions, {link_id, link_field, link_module});
  const searchFields = formatSearchFieldsForModel(searchColumns, searchFieldOptions);
  const formFields = formatFormFieldsForModel(formColumns, formFieldOptions, defaultFormFieldOptions);

  return {
    listFields,
    formFields,
    searchFields,
    pageSetting: pageSetting || {}
  }
}

function formatSearchFieldsForModel(columns, fieldOptions, defaultFieldOptions = {}) {
  columns = _.defaultsDeep({}, columns, fieldOptions);
  const keys = Object.keys(columns);

  return keys.reduce((ret, cKey) => [...ret, _.defaultsDeep(columns[cKey], defaultFieldOptions, {dataIndex: cKey})], []);

}

function formatFormFieldsForModel(columns, fieldOptions, defaultFieldOptions = {}) {
  columns = _.defaultsDeep({}, columns, fieldOptions);


  return Object.keys(columns).reduce((ret, cKey) => {
    const {type, multiple, options, placeholder = '请选择'} = columns[cKey];
    switch (type) {
      case 'select':
        columns[cKey]['decorator'].Control = multiple
          ? <MultipleSelect options={options} placeholder={placeholder}/>
          : <SingleSelect options={options} placeholder={placeholder}/>
        break;
      case 'text':
        // decorator.Control = <Input />
        break;
    }
    return [...ret, _.defaultsDeep(columns[cKey], defaultFieldOptions, {dataIndex: cKey})];
  }, []);

}

function formatListFieldsForModel(columns, fieldOptions, {link_id, link_field}) {
  columns = _.defaultsDeep({}, columns, fieldOptions);
  const keys = Object.keys(columns);

  return keys.reduce((ret, cKey) => {
    if (link_id && link_field && cKey === link_field) {
      columns[cKey].render = LinkField;
    }
    return [...ret, _.defaultsDeep(columns[cKey], {dataIndex: cKey})]
  }, []);

}

export function initFormData({dispatch, getState}) {
  let {formStep} = getState().list;
  let {formFields, addFormData, modFormData} = getState().list[`step${formStep}`];

  addFormData = formFields.reduce((ret, item) => {
    ret[item.dataIndex] = {value: ''};
    return ret;
  }, {});

  modFormData = {...addFormData, id: {value: ''}};

  dispatch({type: 'list/changeStepState', payload: {addFormData, modFormData}});
}

export function initModFormDataWithCol({dispatch, getState}, col) {
  const formStep = getState().list.formStep;
  const {formFields} = getState().list[`step${formStep}`];

  const modFormData = formFields.reduce((ret, item) => {
    ret[item.dataIndex] = {
      value: col[item.dataIndex]
    };
    return ret;
  }, {});

  modFormData['id'] = {
    value: col.id
  };
  dispatch({type: 'list/updateFormData', payload: modFormData});
}



