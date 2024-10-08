import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { sidebarData } from "../constants/sidebarData";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isCollapsed }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/"; 
    }
    return location.pathname.startsWith(path);
  };

  const isChildActive = (children) => {
    return children.some((child) => isActive(child.link));
  };
  return (
    <Sidebar
      collapsed={isCollapsed}
      style={{
        height: "100vh",
      }}
    >
      <Menu>
        {sidebarData.map((element) =>
          element.children ? (
            <SubMenu
              key={element.title}
              icon={element.icon}
              label={element.title}
              style={{
                color: isChildActive(element.children) ? "#800080" : "inherit", // Mauve si un enfant est actif
                textDecoration: isChildActive(element.children) ? "underline" : "none", // Souligné si actif
                textUnderlineOffset: isChildActive(element.children) ? "3px" : "0px", // Ajouter de l'espace sous la ligne

              }}
            >
              {element.children.map((el, index) => (
                <MenuItem
                  icon={el.icon}
                  key={index}
                  component={<Link to={el.link} />}
                  style={{
                    backgroundColor:
                      location.pathname === el.link ? "#800080" : "inherit", // Couleur mauve si actif
                    color: location.pathname === el.link ? "#fff" : "inherit", // Texte blanc si actif
                    borderRadius: location.pathname === el.link ? "10px" : "0", // Border radius si actif
                  }}
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
              style={{
                backgroundColor:
                  location.pathname === element.link ? "#800080" : "inherit", // Couleur mauve si actif
                color: location.pathname === element.link ? "#fff" : "inherit", // Texte blanc si actif
                borderRadius: location.pathname === element.link ? "10px" : "0", // Border radius si actif
              }}
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
