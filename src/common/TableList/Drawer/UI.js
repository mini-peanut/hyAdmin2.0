import Drawer from 'components/Drawer';
import styles from '../style.less';
import {Form, Steps, Card, Layout, Button, Tabs } from "antd";
import AddForm from './AddForm';
import ModForm from './ModForm';
import _ from 'lodash';


const TabPane = Tabs.TabPane;
const {Footer, Content} = Layout;
const Step = Steps.Step;

const ShojiScreen = function (props) {
    const {modalVisible, formStep, moduleOptions, actionType, form} = props;
    const {handleCancel, handleForward, handleSubmit, handleTabChange} = props;
    const {writeByStep, steps} = moduleOptions;

    return <Drawer anchor="right" open={modalVisible} className={styles.drawer}>
      <Form onSubmit={() => handleSubmit(props)}>
        <Layout>
          <Content>
            {
              writeByStep && <div className={styles['steps-container']}>
                <Card  bordered={false}>
                  <Steps current={formStep} size="small" >
                    {steps.map((item, key) => <Step key={key} title={item.title} />)}
                  </Steps>
                </Card>
              </div>
            }
            <div className={styles["formItem-container"]} >
              <Card bordered={false}>
                <Tabs defaultActiveKey={actionType} onChange={_.partial(handleTabChange, form)}>
                  <TabPane tab="新建" key="add"><AddForm {...props} /></TabPane>
                  <TabPane tab="选择已有模块" key="mod"><ModForm {...props} /></TabPane>
                </Tabs>

              </Card>
            </div>
          </Content>
          <Footer className={styles["layout-footer"]}>
            <Button className={styles.cancel} onClick={handleCancel}>取消</Button>
            <Button className={styles.next} htmlType="submit">下一步</Button>
            {formStep !== 0 &&  <Button className={styles.back} onClick={_.partial(handleForward, formStep)}>上一步</Button> }
          </Footer>
        </Layout>
      </Form>
    </Drawer>
};


export default Form.create({
  onFieldsChange(props, changedFields) {
    props.handleFieldChange(changedFields);
  },
  mapPropsToFields(props) {
    const {formData} = props;

    return Object.keys(formData).reduce((ret, key) => {
      ret[key] = Form.createFormField({
        ...formData[key],
        value: formData[key].value,
      });
      return ret;
    }, {});
  }
})(ShojiScreen);
