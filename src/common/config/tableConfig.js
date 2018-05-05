import React from 'react';
import {Input} from 'antd';
const noop = function () {};

/**
 * 管理页配置信息
 *
 */
export const defaultSearchFiledOptions = {
  // 检索字段显示名称：
  title: 'null',
  // 检索表现类型（text|select|date...）
  type: 'text',
  // 如果类型是select，制定options
  options: {},
  // SQL 匹配方式（eq|like|lt|gt...）
  query: {}
};

export const defaultListFiledOptions = {
  // 字段显示名称
  title: '',
  // 排序（为false则关闭排序，字符串为自定义排序，如排序字典）
  order: true,
  // 宽度
  width: '',
  // 自定义渲染
  render: val => val,
};

export const defaultFormFieldOptions = {

  decorator: {
    // 字段表现类型：React.Node
    Control: <Input />,

    // options 说明
    // 参数	              类型	                                           默认值
    // id	                string
    // getValueFromEvent	function(..args)	                             参考https://github.com/react-component/form#option-object
    // initialValue	      any
    // normalize	        function(value, prevValue, allValues): any	   -
    // rules	           	object[]
    // trigger	         	string	                                       'onChange'
    // validateFirst	  	boolean	false
    // validateTrigger	 	string|string[]	'onChange'
    // valuePropName	    Switch 的是 'checked'	string	'value'
    options: {
      // 必填输入控件唯一标志。支持嵌套式的写法。
      id: '',
      // 可以把 onChange 的参数（如 event）转化为控件的值
      // getValueFromEvent: '',
      // 子节点的初始值，类型、可选值均由子节点决定(注意：由于内部校验时使用 === 判断是否变化，建议使用变量缓存所需设置的值而非直接使用字面量))
      // normalize: '',
      // 收集子节点的值的时机
      // trigger: '',
      // 当某一规则校验不通过时，是否停止剩下的规则的校验
      // validateFirst: '',
      // 校验子节点值的时机
      // validateTrigger: '',
      // 子节点的值的属性，如
      // valuePropName: '',
      // 子节点的初始值, 类型、可选值均由子节点决定
      // initialValue: '',
      /*
      *  校验规则rules
      *
      */
       rules: [{
         /*
         *  enum	枚举类型	string	-
         *  len	字段长度	number	-
         *  max	最大长度	number	-
         *  message	校验文案	string	-
         *  min	最小长度	number	-
         *  pattern	正则表达式校验	RegExp	-
         *  required	是否必选	boolean	false
         *  transform	校验前转换字段值	function(value) => transformedValue:any	-
         *  type	内建校验类型，可选项	string	'string'
         *  validator	自定义校验（注意，callback 必须被调用）	function(rule, value, callback)	-
         *  whitespace 必选时，空格是否会被视为错误	boolean	false
         *
         *  更多高级用法可研究  https://github.com/yiminghe/async-validator
         */
         required: true,
       }]
    }

  },

};
