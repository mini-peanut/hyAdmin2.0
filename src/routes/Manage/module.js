import { Link } from 'dva/router';
import { Badge } from 'antd';


const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const listFieldOptions = {
  status: {
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    }
  }
};


export default {
  listFieldOptions
}
