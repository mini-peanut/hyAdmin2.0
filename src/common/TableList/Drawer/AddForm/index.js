import React from 'react';
import {Form} from "antd";


const FormItem = Form.Item;

export default function (props) {
  const {formFields, addFormData, form} = props;
  const getFieldDecorator = form.getFieldDecorator;

  return <div>
    {
      formFields.map(field => {

        let {title: label, dataIndex, decorator: {Control, options}, ...formItemProps} = field;
        Control = (typeof Control === "function") ? <Control/> : Control;

        if (addFormData && addFormData[dataIndex]) {
          options.initialValue = addFormData[dataIndex];
        }

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
