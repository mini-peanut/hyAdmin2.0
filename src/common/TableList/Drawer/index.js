import UI from './UI';
import {connect} from "../../../app";
import {Modal} from 'antd';
import {handleSubmit} from "./handler";
import {alertWarning} from "../../handler";
import _ from 'lodash';
import {initFormData, initModFormDataWithCol} from "../handler";

const confirm = Modal.confirm;

export default connect(({list}) => {
  let {moduleOptions, formStep, actionType, modalVisible} = list;

  const currentList = list[`step${formStep}`];
  const formData = currentList[`${actionType}FormData`] || {};

  const modIds = {};
  while (formStep > 1) {
    formStep--;
    modIds[`step${formStep}`] = list[`step${formStep}`].modId;
  }

  return {
    ...currentList,
    modIds,
    formData,
    moduleOptions,
    actionType,
    modalVisible,
    formStep: list.formStep,
    pageStep: list.pageStep
  }
},{
  handleSubmit,
  handleCancel({dispatch, getState}) {
    const list = getState().list;
    alertWarning({
      content: '您确定取消当前操作吗？',
      onOk() {
        dispatch({
          type: 'list/changeState',
          payload: {
            modalVisible: false,
          }
        });
      },
      onCancel() {

      },
    });
  },
  handleForward({dispatch, getState}, formStep) {
    dispatch({type: 'list/changeState', payload: {formStep: formStep - 1}})
  },
  handleTabChange({dispatch, getState}, form, actionType) {
    dispatch({type: 'list/changeState', payload: {actionType}});
  },
  handleSelectExistModule({dispatch, getState}, moduleId) {
    const {formStep} = getState().list;
    const list = getState().list[`step${formStep}`];

    const col = _.find(list.listData, item => item.id === moduleId);

    initModFormDataWithCol({dispatch, getState}, col);
  },
  handleFieldChange({dispatch, getState}, fields) {
    dispatch({type: 'list/updateFormData', payload: fields});
  },
  async handleShowAll({dispatch, getState}, props) {


  }
})(UI);


