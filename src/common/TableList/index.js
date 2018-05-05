import {connect} from "app";
import UI from './UI';
import { Modal } from 'antd';
import {ACTION_TYPE} from "./config";
import services from '../../services/user';
import {message} from "antd";
import {alertWarning} from "../handler";
import {initFormData, initModFormDataWithCol} from "./handler";

const confirm = Modal.confirm;

export default connect(({list}) => {
  const {pageStep} = list;

  return {
    ...list[`step${pageStep}`]
  }
}, {
  async handleAdd({dispatch, getState}) {
    dispatch({type: 'list/changeState', payload: {
      modalVisible: true,
      actionType: ACTION_TYPE.ADD
    }});
  },
  handleEdit({dispatch, getState}, col) {
    dispatch({type: 'list/changeState', payload: {
      modalVisible: true,
      actionType: ACTION_TYPE.MOD
    }});
    initFormData({dispatch, getState});
    initModFormDataWithCol({dispatch, getState}, col)
  },
  handleDelete({dispatch, getState}, col) {
    const {moduleOptions: {steps}, pageStep} = getState().list;

    services.delListData({id: col.id, steps, step: pageStep}).then(res => {
      if (res.status) {
        dispatch({type: 'list/delList', payload: {id: col.id}});
        message.success('删除成功！！！');
      } else {
        alertWarning({title: '删除失败', content: res.message})
      }
    })
  }
})(UI)
