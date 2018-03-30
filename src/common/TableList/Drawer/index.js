import UI from './UI';
import {connect} from "../../../app";
import {Modal} from 'antd';
import {handleSubmit} from "./handler";
import {alertWarning} from "../../handler";

const confirm = Modal.confirm;

export default connect(({list}) => {
  let {modalVisible, step, pageSetting, formFields} = list;
  let count = 0;
  let stepIds = {};
  while (count < step) {
    stepIds[`step${count}`] = list[`step${count}`];
    count++;
  }
  return {
    modalVisible,
    pageSetting,
    formFields: formFields[`step${step}`],
    step,
    stepIds
  }
},{
  handleSubmit,
  handleCancel({dispatch, getState}) {
    alertWarning({
      content: '您确定取消当前操作吗？',
      onOk() {
        dispatch({type: 'list/changeState', payload: {modalVisible: false}});
      },
      onCancel() {

      },
    });
  },
  handleForward({dispatch, getState}, step) {
    dispatch({type: 'list/changeState', payload: {step: step - 1}});
  }
})(UI);


