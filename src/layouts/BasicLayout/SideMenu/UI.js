import React from 'react';
import SiderMenu from 'components/SiderMenu';
import logo from '../../../assets/logo.svg';
import Authorized from 'utils/Authorized';



export default function ({menuData, collapsed, isMobile, location, onMenuCollapse}) {
  const sideMenuProps = {
    logo,
    Authorized,
    collapsed,
    location,
    isMobile,
    onCollapse: onMenuCollapse,
    menuData: menuData,
  };

  return <SiderMenu {...sideMenuProps}  />
}
