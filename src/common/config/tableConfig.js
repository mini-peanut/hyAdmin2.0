import React from 'react';
import {Input} from 'antd';
const noop = function () {};

/**
 * 管理页配置信息
 *
 */

export const defaultPageSettingOptions = {
  // 新增和编辑的弹层类型 可选'drawer','Model'
  writeType: '',
  // 新增和编辑的内容类型 是否分步展示
  writeByStep: false,
  // 如果writeByStep为true，则必须配置steps，且steps.length 不得为 0
  steps: [
    // {
    //   title: '', // 当前步骤名
    //   moduleUrl: '', // 该步骤对应的模块url
    // }
  ],
  // 操作组
  actions: {
    edit: {
      title: '编辑',
    },
    delete: {
      title: '删除',
      // 物理删除 ：delete | 逻辑删除：status|9 （status为逻辑删除的字段，9为临界值）
      type: '',
    }
  },
  // 按钮组
  buttons: {
    add: {
      title: '新增',
    }
  },
  //分页限制
  limit:	10,
  // 显示全部
  all: false,
  // 复选框
  checkbox: true,
  //字段排序开关
  sort: true,
  // 默认排序字段
  order: '',
  // 打印开关
  print: true,
  // 导出 xls(csv)、pdf
  export: 'xls',
  //表单尺寸 small | default | large
  formSize: 'default',
  // 详情模板
  detailTpl: ''
};

/**
 * 字段配置信息
 *
 *  说明：
 *
 *  1、title可继承自上一级！（list.title = list.title ?: ROOT.title）
 *
 *  2、如果无title则当前组无效（list = !list.title ? [] : list）
 *
 *  3、表现类型：text|select|date|datetime|dateRange|textarea|file|html...
 *
 *  字段名 => 配置数组：
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

/**
 * 默认表单字段配置
 *
 * 说明
 * 参数	          类型              默认值    说明
 * colon	        boolean	          true     配合 label 属性使用，表示是否显示 label 后面的冒号
 * extra	        string|ReactNode           额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。
 * hasFeedback	  boolean           false    配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用
 * help	          string|ReactNode           提示信息，如不设置，则会根据校验规则自动生成
 * label	        string|ReactNode           label 标签的文本
 * labelCol	      object                     label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
 * required	      boolean           false    是否必填，如不设置，则会根据校验规则自动生成
 * validateStatus	string                     校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'
 * wrapperCol	    object                     需要为输入控件设置布局样式时，使用该属性，用法同labelCol
 *
 */

export const defaultFormFieldOptions = {
  // label 标签的文本
  title: '',
  // 配合 label 属性使用，表示是否显示 label 后面的冒号
  colon: true,
  // 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。
  // extra: '',
  // 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用
  // hasFeedback: false,
  // 提示信息，如不设置，则会根据校验规则自动生成
  // help: '',
  // label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  // 是否必填，如不设置，则会根据校验规则自动生成
  required: true,
  // 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'
  // validateStatus: '',
  // 需要为输入控件设置布局样式时，使用该属性，用法同labelCol
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  // 装饰组件
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
         required: false,
       }]
    }

  },

};

export const ignoreFieldOptions = {};
