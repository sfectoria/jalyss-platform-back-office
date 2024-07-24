import React from 'react'

  import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const Navbar = ({isCollapsed}) => {
return (
  <Sidebar
    collapsedWidth="0"
    collapsed={isCollapsed}
    style={{ height: "100vh" }}
  >
    <Menu
      menuItemStyles={{
        button: {
          // the active class will be added automatically by react router
          // so we can use it to style the active menu item
          [`&.active`]: {
            backgroundColor: "#13395e",
            color: "#b6c8d9",
          },
        },
      }}
    >
      <MenuItem> Documentation</MenuItem>
      <MenuItem> Calendar</MenuItem>
      <MenuItem> E-commerce</MenuItem>
    </Menu>
  </Sidebar>
);
}

export default Navbar