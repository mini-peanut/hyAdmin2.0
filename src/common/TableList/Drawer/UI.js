import Drawer from 'components/Drawer';
import styles from '../style.less';
import {Form, Steps, Card, Layout, Select, Button } from "antd";
import _ from 'lodash';


const FormItem = Form.Item;
const {Footer, Content} = Layout;
const Option = Select.Option;
const Step = Steps.Step;

const ShojiScreen = (props) => {
  const {modalVisible, step, pageSetting, formFields, form, prefix, stepIds} = props;
  const {handleCancel, handleForward, handleSubmit} = props;
  const {writeByStep, steps} = pageSetting;
  const getFieldDecorator = form.getFieldDecorator;

  return <Drawer anchor="right" open={modalVisible} className={styles.drawer}>
    <Form onSubmit={() => handleSubmit({pageSetting, form, step, prefix, stepIds})}>
      <Layout>
        <Content>
          {
            writeByStep && <div className={styles['steps-container']}>
              <Card  bordered={false}>
                <Steps current={step} size="small" >
                  {steps.map((item, key) => <Step key={key} title={item.title} />)}
                </Steps>
              </Card>
            </div>
          }
          <div className={styles["formItem-container"]} >
            <Card bordered={false}>
              {
                formFields.map(field => {
                  let {title: label, dataIndex, decorator: {Control, options}, ...formItemProps} = field;
                  Control = (typeof Control === "function") ? <Control/> : Control;
                  return <FormItem {...{...formItemProps, label, key: dataIndex}} >
                    {
                      getFieldDecorator(dataIndex, options)(
                        Control
                      )
                    }
                  </FormItem>
                })
              }
            </Card>
          </div>
        </Content>
        <Footer className={styles["layout-footer"]}>
          <Button className={styles.cancel} onClick={handleCancel}>取消</Button>
          <Button className={styles.next} htmlType="submit">下一步</Button>
          {step !== 0 &&  <Button className={styles.back} onClick={_.partial(handleForward, step)}>上一步</Button> }
        </Footer>
      </Layout>
    </Form>
  </Drawer>
};

export default Form.create()(ShojiScreen);
