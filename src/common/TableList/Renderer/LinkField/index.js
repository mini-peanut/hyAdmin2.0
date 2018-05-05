import {connect} from "../../../../app";
import { routerRedux } from 'dva/router';

const LinkField = connect(() => ({}), {
  onEnterToNextModule({dispatch, getState}, record) {
    const {pageStep} = getState().list;
    const {link_module, link_id} = getState().list[`step${pageStep}`];
    const module = window.location.hash.split('~')[0].slice(1);
    const path = `${module}~page=${link_module}&${link_id}=${record.id}`;

    dispatch({type: 'list/addPageStep'});
    dispatch(routerRedux.push(path));

  }
})((props) => {
  const {record, val, onEnterToNextModule} = props;
  return <a onClick={_.partial(onEnterToNextModule, record)}>{val}</a>
});

export default (val, record) => <LinkField {...{val, record}} />;
