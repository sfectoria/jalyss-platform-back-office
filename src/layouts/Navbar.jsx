import React from "react";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { sidebarData } from "../constants/sidebarData";
import { Link } from "react-router-dom";

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
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        {sidebarData.map((element) =>
          element.children ? (
            <SubMenu
              component={<Link to={element.link} />}
              key={element.title}
              icon={element.icon}
              label={element.title}
              
            >
              {element.children.map((el, index) => (
                <MenuItem
                  icon={el.icon}
                  key={index}
                  component={<Link to={el.link} />}
                >
                  {el.title}
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            <MenuItem
              component={<Link to={element.link} />}
              key={element.title}
              icon={element.icon}
            >
              {element.title}
            </MenuItem>
          )
        )}
      </Menu>
    </Sidebar>
  );
};

export default Navbar;
