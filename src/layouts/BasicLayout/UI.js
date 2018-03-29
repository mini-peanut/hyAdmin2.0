import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { Route, Redirect, Switch } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen } from 'enquire-js';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';
import SiderMenu from './SideMenu';
import NotFound from '../../common/Exception/404';
import { getRoutes } from '../../utils/utils';
import Authorized from '../../utils/Authorized';
import logo from '../../assets/logo.svg';

import {GLOBAL_FOOTER_CONFIG, QUERY} from "./config";

const { Content } = Layout;
const { AuthorizedRoute } = Authorized;

/**
 * 根据菜单取得重定向地址.
 */
function getRedirectData(menuData) {
  const redirectData = [];
  const getRedirect = (item) => {
    if (item && item.children) {
      if (item.children[0] && item.children[0].path) {
        redirectData.push({
          from: `${item.path}`,
          to: `${item.children[0].path}`,
        });
        item.children.forEach((children) => {
          getRedirect(children);
        });
      }
    }
  };

  menuData.forEach(getRedirect);

  return redirectData;
}


let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

export default class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  state = {
    isMobile,
  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }
  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Ant Design Pro`;
    }
    return title;
  }
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      return '/dashboard/workplace';
    }
    return redirect;
  }
  render() {
    const {currentUser, collapsed, fetchingNotices, notices, routerData, match, location, menuData} = this.props;
    const {handleMenuCollapse, handleNoticeClear, handleMenuClick, handleNoticeVisibleChange} = this.props;

    const redirectData = getRedirectData(menuData);
    const bashRedirect = this.getBashRedirect();
    const layout = (
      <Layout>
        <SiderMenu location={location} />
        <Layout>
          <GlobalHeader
            logo={logo}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            collapsed={collapsed}
            isMobile={this.state.isMobile}
            onNoticeClear={handleNoticeClear}
            onCollapse={handleMenuCollapse}
            onMenuClick={handleMenuClick}
            onNoticeVisibleChange={handleNoticeVisibleChange}
          />
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <Switch>
              {
                redirectData.map(item =>
                  <Redirect key={item.from} exact from={item.from} to={item.to} />
                )
              }
              {
                getRoutes(match.path, routerData).map(item =>{
                  return (
                    <AuthorizedRoute
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      authority={item.authority}
                      redirectPath="/exception/403"
                    />
                  )
                }
                )
              }
              <Redirect exact from="/" to={bashRedirect} />
              <Route render={NotFound} />
            </Switch>
          </Content>
          <GlobalFooter {...GLOBAL_FOOTER_CONFIG} />
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={QUERY}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

