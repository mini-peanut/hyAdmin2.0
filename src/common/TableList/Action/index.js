import {Icon, Button, Dropdown } from 'antd';
import styles from '../style.less';

export default function Action(props) {
  const {handleAdd, selectedRows, menu} = props;
  return <div className={styles.tableListOperator}>
    <Button icon="plus" type="primary" onClick={handleAdd}>新建</Button>
    {
      selectedRows.length > 0 && <span>
      <Button>批量操作</Button>
      <Dropdown overlay={menu}>
        <Button>
          更多操作 <Icon type="down" />
        </Button>
      </Dropdown>
    </span>
    }
  </div>
}
