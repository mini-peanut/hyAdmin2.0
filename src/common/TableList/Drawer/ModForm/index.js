import React from 'react';
import {Form, Input} from "antd";
import SingleSelect from '../../Control/SingleSelect.jsx';


const FormItem = Form.Item;

export default function (props) {
  const {formFields, form, listData, link_field, link_id, actionType} = props;
  const {handleSelectExistModule} = props;
  const getFieldDecorator = form.getFieldDecorator;
  const formData = props[`${actionType}FormData`];
  const options = listData.map((item, index) => {
    return {value: item.id, title: item[link_field]}
  });

  const initialValue = !_.isEmpty(formData) && formData['id'] ? formData['id'].value : '';

  return <div>
    {
      <FormItem {...{...formFields[0], label: '模块', key: '模__HY__块'}} >
        {
          getFieldDecorator('id')(
            <SingleSelect options={options} onChange={handleSelectExistModule} />
          )
        }
      </FormItem>
    }
    {
      initialValue && formFields.map(field => {
        let {title: label, dataIndex, decorator: {Control, options}, ...formItemProps} = field;

        Control = (typeof Control === "function") ? <Control/> : Control;
        formData[dataIndex] && (options.initialValue = formData[dataIndex]);

        return <FormItem {...{...formItemProps, label, key: dataIndex}} >
          {
            getFieldDecorator(dataIndex, options)(
              Control
            )
          }
        </FormItem>
      })
    }
  </div>
}
