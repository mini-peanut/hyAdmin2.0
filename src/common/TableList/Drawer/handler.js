import {Modal} from "antd/lib/index";
import services from "../../../services/user";
import {alertError} from "../../handler";
import _ from 'lodash';
import {formatDataForModel} from "../handler";

export function stepParamsCheck({pageSetting, prefix, step}) {
  const steps = pageSetting.steps;
  const moduleUrl = steps[step] && steps[step].moduleUrl;

  const title = `配置错误 - 位置：${prefix.list}`;
  const okText = '确认';

  if (steps.length === 0) {
    Modal.error({title, okText, content: `pageSettingOptions： 配置了writeByStep为true，则必须同时配置相应的steps`});
    return false;
  }

  if (!moduleUrl) {
    Modal.error({title, okText, content: `pageSettingOptions：第${step}步 请配置相应的moduleUrl`});
    return false;
  }

  return true;
}


export const handleSubmit = _.debounce(({dispatch, getState}, props) => {
  const {pageSetting: {writeByStep}, form} = props;

  form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      writeByStep && stepParamsCheck(props) && stepSubmit({dispatch, getState}, {...props, values});

      !writeByStep && submitDirect();
    }
  })


}, 2000, {leading: true, trailing: false});


function stepSubmit({dispatch}, props) {
  const {pageSetting: {steps}, step, prefix, stepIds, values} = props;

  services.addFormData({path: prefix.list, step, values, ...stepIds}).then(res => {
    const isSuccess = res.status;
    const nextStep = step + 1;
    const isLastSubmit = steps.length === step + 1;

    !isSuccess && alertError({title: `写入错误：${prefix.list}`, res});

    if (isSuccess && !isLastSubmit && stepParamsCheck({...props, step: nextStep})) {

      dispatch({type: 'list/changeState', payload: {[`step${step}`]: res.id}});
      dispatch({type: 'list/appendList', payload: {...values, id: res.id, key: res.id}});

      services.getColumns({path: prefix.list, step: nextStep, id: res.id}).then(res => {
        const {formFields} = formatDataForModel(nextStep, res['module_name'], res.columns);
        dispatch({type: 'list/appendFormField', payload: {[`step${nextStep}`]: formFields[`step${nextStep}`]}});
        dispatch({type: 'list/changeState', payload: {step: nextStep}});

      });

    }

  });
}

function submitDirect() {

}
