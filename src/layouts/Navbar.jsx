import React from "react";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { sidebarData } from "../constants/sidebarData";

const Navbar = ({ isCollapsed }) => {
  return (
    <Sidebar
      collapsed={isCollapsed}
      style={{
        height: "100vh",
      }}
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
        {sidebarData.map((element) => {
          return (
            <MenuItem key={element.title} icon={element.icon}>
              {element.title}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default Navbar;
