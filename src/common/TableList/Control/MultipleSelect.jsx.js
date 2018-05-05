import {Select} from 'antd';
const Option = Select.Option;

export default class MultipleSelect extends React.Component {
  constructor(props) {
    super(props);
    const value = this.props.value || [];
    this.state = {
      value: value
    }
  }
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({
        value
      });
    }
  }
  onSelectChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };
  render() {
    const {placeholder, options} = this.props;
    console.log(this.props);
    return <Select
      placeholder={placeholder}
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
