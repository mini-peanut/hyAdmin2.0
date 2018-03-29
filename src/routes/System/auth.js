import React  from 'react';
import {Select, Input } from 'antd';
import services from '../../services/user';
import {alertError} from "../../common/handler";

const Option = Select.Option;

class ModuleSelect extends React.Component {
  constructor(props) {
    super(props);
    const value = this.props.value || [];
    this.state = {
      options: [],
      value: value
    }
  }
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    console.log(nextProps);
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({
        value
      });
    }
  }
  componentDidMount() {
    const self = this;
    services.getModules().then(function (res) {
      if (!res.status) {
        alertError({res});
      }
      else {
        self.setState({
          options: res.data
        })
      }
    })
  }
  onSelectChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };
  render() {
    const options = this.state.options;

    return <Select
      placeholder='请选择需要添加的模块'
      value={this.state.value}
      mode="multiple"
      onChange={this.onSelectChange}
    >
      {
        options.map(({value, title}, key) => {
          return <Option key={key} value={value}>{title}</Option>
        })
      }
    </Select>
  }
}

const ignoreFieldOptions = {
  form: ['frame_modules_@hy_title']
};


const formFieldOptions = {
  ['module_id']: {
    title: '选择模块名',

    decorator: {

      // 字段表现类型：React.Node
      Control: ModuleSelect,
    }
  }
};

export default {
  ignoreFieldOptions,
  formFieldOptions
}



