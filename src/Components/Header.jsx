import MainActionsTheme from "./MainActionsTheme";
import { ArrowLeft, Menu, X } from "lucide-react";
import { UserMenu } from "./UserMenu";
import React from "react";
import { useSelector } from "react-redux";
export default function Header({ isCollapsed, setIsCollapsed }) {
  const breadcrumb = useSelector((state) => state.layout.breadcrumb);



 
  return (
    <header
      className={`main-header  bg-background-light  dark:bg-background-dark `}
    >
      <div className="header-left">
        {/* <button
          className="sidebar-toggle dark:bg-background-cardDark hover:bg-background-cardDark dark:text-titleColor-dark hover:text-primary"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button> */}
        {/* <div className="welcome-msg">👋 Good morning , Islam Mohamed</div> */}
        {breadcrumb && (
          <div className="flex items-center text-sm text-gray-600 dark:text-titleColor-dark">
            <ArrowLeft className="w-5 h-5 me-2 text-gray-600" />
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
            👋 Good morning , 
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
