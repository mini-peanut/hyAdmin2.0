import {Icon, Button, Dropdown } from 'antd';
import styles from '../style.less';

export default function Action(props) {
  const {handleAdd, pageSetting: {buttons = {}}} = props;
  const {hidden = false, title = '新建'} = buttons.add || {};

  return <div className={styles.tableListOperator}>
    {
      !hidden  && <Button icon="plus" type="primary" onClick={handleAdd}>{title}</Button>
    }
  </div>
}
