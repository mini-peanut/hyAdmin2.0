import _ from 'lodash';
import {
  defaultFormFieldOptions,
  defaultListFiledOptions,
  defaultSearchFiledOptions,
  defaultPageSettingOptions
} from "../config/tableConfig.js";

import role from '../../routes/System/role';
import auth from '../../routes/System/auth';
import module from '../../routes/System/module';

const CUSTOM_CONFIG_MAP = {
  '/system/role': role,
  '/role/auth': auth,
  '/system/module': module
};

export function formatDataForModel(step, path, columns) {
  let {
    listFieldOptions = {},
    formFieldOptions = {},
    searchFieldOptions = {},
    ignoreFieldOptions = {},
    pageSettingOptions = {}
  } = CUSTOM_CONFIG_MAP[path] || {};


  const {list = [], form = [], search = []} = ignoreFieldOptions;

  const listFields = formatFieldsForModel(columns, defaultListFiledOptions, listFieldOptions, list);
  const formFields = formatFieldsForModel(columns, defaultFormFieldOptions, formFieldOptions, form);
  const searchFields = formatFieldsForModel(columns, defaultSearchFiledOptions, searchFieldOptions, search);
  const pageSetting = _.defaultsDeep({}, pageSettingOptions, defaultPageSettingOptions);

  return {
    listFields,
    formFields: {
      [`step${step}`]: formFields
    },
    searchFields,
    pageSetting
  }
}

function formatFieldsForModel(columns, defaultFieldOptions, FieldOptions, ignoreFields) {
  columns = _.defaultsDeep({}, columns, FieldOptions);
  const keys = Object.keys(columns).filter(key => !~ignoreFields.indexOf(key));

  return keys.reduce((ret, cKey) => [...ret, {...defaultFieldOptions, ...columns[cKey], dataIndex: cKey}], []);

}



