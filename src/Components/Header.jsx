import MainActionsTheme from "./MainActionsTheme";
import { Menu, X } from "lucide-react";
import { UserMenu } from "./UserMenu";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/slices/user-slice";
export default function Header({ isCollapsed, setIsCollapsed }) {
  const breadcrumb = useSelector((state) => state.layout.breadcrumb);
  const { currentUser, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <header
      className={`main-header bg-background-light  dark:bg-background-dark  ${
        isCollapsed ? "sidebar-collapsed" : "sidebar-open"
      }`}
    >
      <div className="header-left">
        <button
          className="sidebar-toggle dark:bg-background-cardDark hover:bg-background-cardDark dark:text-titleColor-dark hover:text-primary"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
        {/* <div className="welcome-msg">👋 Good morning , Islam Mohamed</div> */}
        {breadcrumb && (
          <div className="flex items-center text-sm text-gray-600 dark:text-titleColor-dark">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <span className="mx-2 dark:text-titleColor-dark ">/</span>
                )}
                <span
                  className={
                    index === breadcrumb.length - 1
                      ? "font-medium text-gray-900 dark:text-titleColor-dark"
                      : ""
                  }
                >
                  {item}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}

        {!breadcrumb && (
          <div className="welcome-msg dark:text-titleColor-dark">
            👋 Good morning , {currentUser?.email}
          </div>
        )}
      </div>
      <div className="actions">
        <MainActionsTheme />
        <UserMenu />
      </div>
    </header>
  );
}
