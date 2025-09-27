import MainActionsTheme from "./MainActionsTheme";
import { Menu, X } from "lucide-react";
import { UserMenu } from "./UserMenu";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
export default function Header({ isCollapsed, setIsCollapsed }) {
  const breadcrumb = useSelector((state) => state.layout.breadcrumb);

  return (
    <header
      className={`main-header ${
        isCollapsed ? "sidebar-collapsed" : "sidebar-open"
      }`}
    >
      <div className="header-left">
        <button
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
        {/* <div className="welcome-msg">👋 Good morning , Islam Mohamed</div> */}
        {breadcrumb && (
          <div className="flex items-center text-sm text-gray-600">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="mx-2">/</span>}
                <span
                  className={
                    index === breadcrumb.length - 1
                      ? "font-medium text-gray-900"
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
          <div className="welcome-msg">👋 Good morning</div>
        )}
      </div>
      <div className="actions">
        <MainActionsTheme />
        <UserMenu />
      </div>
    </header>
  );
}
