import React from 'react';
import { Spin } from 'antd';

export default class PromiseRender extends React.Component {
  state = {
    component: null,
  };
  componentDidMount() {
    const ok = this.checkIsInstantiation(this.props.ok);
    const error = this.checkIsInstantiation(this.props.error);
    this.props.promise
      .then(() => {
        this.setState({
          component: ok,
        });
      })
      .catch(() => {
        this.setState({
          component: error,
        });
      });
  }
  
  // Determine whether the incoming component has been instantiated
  // AuthorizedRoute is already instantiated
  // Authorized  render is already instantiated, children is no instantiated
  // Secured is not instantiated
  checkIsInstantiation = (target) => {
    if (!React.isValidElement(target)) {
      return target;
    }
    return () => target;
  };
  render() {
    const C = this.state.component;
    return C ? (
      <C {...this.props} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
