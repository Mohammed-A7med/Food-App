import React, { useContext, useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../../assets/Imges/3.png";
import { AuthContext } from "../../../../context/AuthContext";

export default function SideBar() {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapse, setIsCollapse] = useState(false);

  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const logOut = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const getMenuItemClassName = (path) => {
    return location.pathname === path
      ? "ps-menu-button active"
      : "ps-menu-button";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsCollapse(false);
      } else {
        setIsCollapse(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sidebarContainer position-sticky top-0 bottom-0 vh-100">
      <Sidebar className="border-0" collapsed={isCollapse}>
        <button
          className="firstMenuItem mt-5 mb-4 ms-3 border-0 bg-transparent"
          onClick={toggleCollapse}
        >
          <Link to="/dashboard">
            <img src={logo} alt="logo" />
          </Link>
        </button>
        <Menu>
          <MenuItem
            icon={<i className="fa-solid fa-house"></i>}
            className={getMenuItemClassName("/dashboard")}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          {userData?.userGroup === "SuperAdmin" && (
            <MenuItem
              icon={<i className="fa-solid fa-user-group"></i>}
              className={getMenuItemClassName("/dashboard/users-List")}
              component={<Link to="/dashboard/users-List" />}
            >
              Users
            </MenuItem>
          )}

          <MenuItem
            icon={<i className="fa fa-columns"></i>}
            className={getMenuItemClassName("/dashboard/recipes-List")}
            component={<Link to="/dashboard/recipes-List" />}
          >
            Recipes
          </MenuItem>
          {userData?.userGroup === "SuperAdmin" && (
            <MenuItem
              icon={<i className="fa-solid fa-calendar-days"></i>}
              className={getMenuItemClassName("/dashboard/categories-List")}
              component={<Link to="/dashboard/categories-List" />}
            >
              Categories
            </MenuItem>
          )}

          {userData?.userGroup !== "SuperAdmin" && (
            <MenuItem
              icon={<i className="fa-regular fa-heart"></i>}
              className={getMenuItemClassName("/dashboard/favorites")}
              component={<Link to="/dashboard/favorites" />}
            >
              Favorites
            </MenuItem>
          )}

          <MenuItem
            icon={<i className="fa-solid fa-unlock-keyhole"></i>}
            className={getMenuItemClassName("/dashboard/change-password")}
            component={<Link to="/dashboard/change-password" />}
          >
            Change Password
          </MenuItem>
          <MenuItem
            onClick={logOut}
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            className="ps-menu-button"
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

