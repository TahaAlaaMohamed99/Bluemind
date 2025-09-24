import React from "react";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import DropdownActions from "./DropdownActions";

export const UserMenu = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleProfile = () => {
    console.log("Opening profile...");
  };

  const handleSettings = () => {
    console.log("Opening settings...");
  };
  const userMenuItems = [
    {
      label: "Islam Mohamed",
      icon: <User size={16} />,
      onClick: handleProfile,
      isActive: false,
      className: "user-name",
    },
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
      menuItems={userMenuItems}
      ResourcePage="header"
      isDropdownIcon={false}
      isUserMenu={true}
    />
  );
};
