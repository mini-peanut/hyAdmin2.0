import {Modal} from "antd/lib/index";

export function alertError({title = '错误', res}) {
  Modal.error({title: title, content: res.message, okText: '确认'});
}

export function alertWarning({title, content, onOk, onCancel}) {
  Modal.warning({title, content, onOk, onCancel, okText: '确认', cancelText: '取消',})
}
