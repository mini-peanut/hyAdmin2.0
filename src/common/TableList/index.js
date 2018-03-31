import {connect} from "app";
import UI from './UI';
import { Modal } from 'antd';
import {ACTION_TYPE} from "./config";

const confirm = Modal.confirm;

export default connect(({list}) => {
  return {
    ...list
  }
}, {
  handleAdd({dispatch, getState}) {
    dispatch({type: 'list/changeState', payload: {
      modalVisible: true,
      actionType: ACTION_TYPE.ADD
    }});
  },
  handleEdit({dispatch, getState}, col) {

  },
  handleDelete({dispatch, getState}, col) {
    dispatch({type: 'list/deleteList', payload: {
      col
    }});
  },
  handleModalVisible({dispatch, getState}) {

  },
})(UI)
