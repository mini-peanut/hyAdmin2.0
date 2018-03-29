import { queryFakeList } from '../services/api';
import {globalState} from "../app";

const prefix = [];

const _routes = globalState._routes;
_routes && _routes.filter(item => item.component === 'tableList').forEach(item => prefix.push(item.path));

export default {
  namespace: 'list',
  prefix: prefix,
  state: {
    listFields: [],
    formFields: {
      step0: []
    },
    searchFields: [],
    pageSetting: {},
    addFormData: {},
    modeFormData: {},
    listData: {
      list: [],
      pagination: {},
    },
    actionType: '',
    modalVisible: false,
    loading: false,
    selectedRows: [],
    step: 0
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        listData: {
          list: state.listData.list.concat(action.payload)
        },
      };
    },
    appendFormField(state, action) {
      return {
        ...state,
        formFields: {
          ...state.formFields,
          ...action.payload
        }
      }
    },
    changeState(state, {payload, meta}) {
      return {
        ...state,
        ...payload
      }
    }
  },
};
