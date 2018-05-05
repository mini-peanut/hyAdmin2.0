import { queryFakeList } from '../services/api';
import {globalState} from "../app";
import _ from "lodash";
import services from "../services/user";
import {formatDataForModel} from "../common/TableList/handler";

const prefix = [];

const _routes = globalState._routes;
_routes && _routes.filter(item => item.component === 'tableList').forEach(item => prefix.push(item.path));

const initState = {
  listFields: [],
  formFields: [],
  searchFields: [],
  listData: [],
  pageSetting: {},
  modFormData: {},
  addFormData: {},
  modId: '',
  submitId: '',
  link_field: '',
  link_id: '',
  link_module: '',
  pagination: {
    pageSize: 10,
    pageNo: 1
  },
  loading: false,
  selectedRows: [],
};

export default {
  namespace: 'list',
  prefix: prefix,
  state: {
    step0: {
      ...initState
    },
    step1: {
      ...initState
    },
    step2: {
      ...initState
    },
    moduleOptions: [],
    formStep: 0,
    pageStep: 0,
    actionType: '',
    modalVisible: false,
  },
  reducers: {
    appendList(state, {payload}) {
      const stepState = `step${state.formStep}`;
      return {
        ...state,
        [stepState]: {
          ...state[stepState],
          listData: [
            ...state[stepState].listData,
            payload
          ]
        }
      };
    },
    delList(state, {payload: {id}}) {
      const stepState = `step${state.formStep}`;
      const listData = state[stepState].listData.filter(item => item.id !== id);
      return {
        ...state,
        [stepState]: {
          ...state[stepState],
          listData
        }
      }
    },
    modList(state, {payload: col}) {
      const stepState = `step${state.formStep}`;
      const listData = state[stepState].listData.map(item => {
        return item.id === col.id ? col : item;
      });

      return {
        ...state,
        [stepState]: {
          ...state[stepState],
          listData
        }
      }
    },
    appendFormField(state, action) {
      const stepState = `step${state.formStep}`;

      return {
        ...state,
        [stepState]: {
          formFields: {
            ...state.formFields,
            ...action.payload
          }
        }
      }
    },
    changeState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    changeStepState(state, {payload}) {
      const stepState = `step${state.formStep}`;
      return {
        ...state,
        [stepState]: {
          ...state[stepState],
          ...payload
        }
      }
    },
    updateFormData(state, {payload}) {
      const stepState = `step${state.formStep}`;
      const formData = state.actionType + 'FormData';

      return {
        ...state,
        [stepState]: {
          ...state[stepState],
          [formData]: {
            ...state[stepState][formData],
            ...payload
          }
        }
      }
    },
    addFormStep(state) {
      return {
        ...state,
        formStep: state.formStep + 1
      }
    },
    addPageStep(state) {
      return {
        ...state,
        pageStep: state.formStep + 1
      }
    }
  },
  effects: {
    *fetchListAllData({payload: prefix}, {put, select, call}) {
      const hash = window.location.hash;
      const {getModuleOption, getTableData} = services;

      let page;

      hash.split('~')[1] && hash.split('~')[1].split('&').map(function (item) {
        const [key, value] = item.split('=');
        if (key === 'page') {
          page = value
        }
      });

      const {moduleOptions} = yield call(getModuleOption);

      yield put({
        type: 'changeState',
        payload: {moduleOptions},
        meta: {prefix}
      });

      const steps = moduleOptions.steps;

      let pageStep = 0;
      if (page) {
        pageStep = _.findIndex(steps, item => item.moduleUrl.split('/')[2] === page);
      }

      yield put({
        type: 'changeState',
        payload: {
          pageStep,
          formStep: pageStep,
        },
        meta: {prefix}
      });

      const moduleUrl = steps[pageStep] ? steps[pageStep].moduleUrl : prefix;

      const tableData = yield call(getTableData, {step: pageStep, steps});
      const {listData, link_field, link_id, link_module} = tableData;

      const formatColumnsData = formatDataForModel(moduleUrl, tableData);
      const formatListData = listData.map((item, key) => ({...item, key: item.id, operations: 0}));

      yield put({
        type: 'changeStepState',
        payload: {
          ...formatColumnsData,
          listData: formatListData,
          link_field,
          link_id,
          link_module
        },
        meta: {prefix}
      });
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({pathname, search}) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
        const routes = globalState._routes;
        const urlPath = pathname.split('~')[0];

        _.each(routes, function ({component, path}) {
          switch (component) {
            case 'tableList':
              if (urlPath === path) {
                dispatch({type: 'fetchListAllData', payload: urlPath});
              }
              break;
          }
        });
      });
    },
  }
};
