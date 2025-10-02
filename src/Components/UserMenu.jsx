import React from "react";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import DropdownActions from "./DropdownActions";
import { useSelector } from "react-redux";

export const UserMenu = () => {
  const handleLogout = () => {
     localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    window.location.reload()
  };

  const handleProfile = () => {
    console.log("Opening profile...");
  };

  const handleSettings = () => {
    console.log("Opening settings...");
  };
 
  const userMenuItems = [
    {
      label: "profile",
      icon: <User size={16} />,
      onClick: handleProfile,
      isActive: false,
    },
    {
      label: "settings",
      icon: <Settings size={16} />,
      onClick: handleSettings,
      isActive: false,
    },
    {
      label: "logout",
      icon: <LogOut size={16} />,
      onClick: handleLogout,
      isActive: false,
    },
  ];

  return (
    <DropdownActions
      className="avatar"
      isActiveClassName="btn_icon_Active"
      icon={
        <img src="https://avatar.iran.liara.run/public/7" alt="User Avatar" />
      }
      menuItems={[
        {
          label: "profile",
          icon: <User size={16} />,
          onClick: handleProfile,
          isActive: false,
          className: "user-name",
        },
        ...userMenuItems,
      ]}
      ResourcePage="header"
      isDropdownIcon={false}
      isUserMenu={true}
    />
  );
};
