import {Modal} from "antd/lib/index";
import services from "../../../services/user";
import {alertError} from "../../handler";
import _ from 'lodash';
import {formatDataForModel, initFormData} from "../handler";
import {message} from "antd";

export function stepParamsCheck({moduleOptions, prefix, formStep}) {
  const {writeByStep, steps} = moduleOptions;
  const moduleUrl = steps[formStep] && steps[formStep].moduleUrl;

  const title = `配置错误 - 位置：${prefix.list}`;
  const okText = '确认';

  if (writeByStep && steps.length === 0) {
    Modal.error({title, okText, content: `pageSettingOptions： 配置了writeByStep为true，则必须同时配置相应的steps`});
    return false;
  }

  if (writeByStep && !moduleUrl) {
    Modal.error({title, okText, content: `pageSettingOptions：第${formStep}步 请配置相应的moduleUrl`});
    return false;
  }

  return true;
}


export const handleSubmit = _.debounce(({dispatch, getState}, props) => {
  const {form, actionType} = props;

  form.validateFieldsAndScroll((err, values) => {
    if (!err && stepParamsCheck(props)) {
      switch (actionType) {
        case 'add':
           addFormData({dispatch, getState}, {...props, values});
           break;
        case 'mod':
          modFormData({dispatch, getState}, {...props, values});
          break;
      }
    }
  })


}, 2000, {leading: true, trailing: false});


function addFormData({dispatch, getState}, props) {
  const {moduleOptions: {steps, writeByStep}, formStep, prefix, values, link_id} = props;

  const addFormDataParams = {
    step: formStep,
    steps,
    values
  };

  if (formStep > 0) {
    const {link_id, submitId} = getState().list[`step${formStep - 1}`];
    submitId && (addFormDataParams.params = {
      [link_id]: +submitId
    });
  }


  services.addFormData(addFormDataParams).then(res => {
    const {status: isSuccess, id: addId, listData} = res;
    const nextStep = formStep + 1;
    const isLastSubmit = !writeByStep || steps.length === formStep + 1;

    !isSuccess && alertError({title: `写入错误：${prefix.list}`, res});

    if (isSuccess && !isLastSubmit && stepParamsCheck({...props, formStep: nextStep})) {
      dispatch({type: 'list/changeStepState', payload: {submitId: addId}});
      dispatch({type: 'list/appendList', payload: {...listData, id: addId, key: addId}});

      services.getTableData({step: nextStep, steps, params: {[link_id]: addId}}).then(tableRes => {
        const {listData, link_field, link_id, link_module} = tableRes;
        const formatColumnsData = formatDataForModel(steps[nextStep].moduleUrl, tableRes);
        const formatListData = listData.map((item, key) => ({...item, key, operations: 0}));

        dispatch({type: 'list/changeState', payload: {formStep: nextStep}});
        dispatch({
          type: 'list/changeStepState',
          payload: {
            ...formatColumnsData,
            listData: formatListData,
            link_field,
            link_id,
            link_module
          }
        });
        initFormData({dispatch, getState});
      });
    }

    if (isSuccess && isLastSubmit) {
      dispatch({type: 'list/appendList', payload: {...listData, id: addId, key: addId}});
      dispatch({
        type: 'list/changeStepState',
        payload: {
          submitId: ''
        }
      });
      dispatch({
        type: 'list/changeState',
        payload: {
          formStep: 0,
          modalVisible: false
        }
      });
      message.success('新建成功^-^');
    }

  });
}

function modFormData({dispatch, getState}, props) {

  const {moduleOptions: {steps, writeByStep}, formStep, prefix, values, link_id} = props;

  const params = {
    path: prefix.list,
    step: formStep,
    steps,
    values
  };
  services.modFormData(params).then(modRes => {
    const {status: isSuccess, id: modId, listData} = modRes;
    const nextStep = formStep + 1;
    const isLastSubmit = !writeByStep || steps.length === formStep + 1;
    !isSuccess && alertError({title: `写入错误：${prefix.list}`, res});
    if (isSuccess && !isLastSubmit && stepParamsCheck({...props, formStep: nextStep})) {

      dispatch({type: 'list/changeStepState', payload: {submitId: modId}});
      dispatch({type: 'list/modList', payload: {...listData, id: modId, key: modId}});

      services.getTableData({step: nextStep, steps, params: {[link_id]: modId}}).then(tableRes => {
        const {listData, link_field, link_id, link_module} = tableRes;
        const formatColumnsData = formatDataForModel(steps[nextStep].moduleUrl, tableRes);
        const formatListData = listData.map((item, key) => ({...item, key, operations: 0}));

        dispatch({type: 'list/changeState', payload: {formStep: nextStep}});
        dispatch({
          type: 'list/changeStepState',
          payload: {
            ...formatColumnsData,
            listData: formatListData,
            link_field,
            link_id,
            link_module
          }
        });
        initFormData({dispatch, getState});
      });
    }

    if (isSuccess && isLastSubmit) {
      dispatch({type: 'list/modList', payload: {...listData, key: modId}});
      dispatch({
        type: 'list/changeStepState',
        payload: {
          submitId: ''
        }
      });

      dispatch({
        type: 'list/changeState',
        payload: {
          formStep: 0,
          modalVisible: false,
          actionType: '',
        }
      });
      message.success('编辑成功^-^');
    }
  });
}
