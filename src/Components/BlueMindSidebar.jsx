import React, { useState } from "react";
import {
  LayoutDashboard,
  Play,
  Building2,
  UtensilsCrossed,
  GraduationCap,
  Shield,
  ShoppingCart,
  HardHat,
  TrendingUp,
  CreditCard,
  Book,
  Users,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import logo from "../Assets/Logo.svg";
import { NavLink, useLocation } from "react-router-dom";

const BlueMindSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const location = useLocation();

  const sidebarData = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
      route: "/",
      type: "single",
    },

    { id: "subscription", title: "SUBSCRIPTION", type: "header" },
    {
      id: "media",
      title: "Media",
      icon: Play,
      type: "single",
      route: "/mediaMonitoring/Add",
    },
    {
      id: "workSpace",
      title: "Work Space",
      icon: TrendingUp,
      type: "single",
      route: "/workspace",
    },
    {
      id: "real-estate",
      title: "Real Estate",
      icon: Building2,
      type: "single",
      route: "/real-estate/Add",
    },
    {
      id: "restaurant",
      title: "Restaurant",
      icon: UtensilsCrossed,
      type: "single",
      route: "/restaurant/Add",
    },
    {
      id: "education",
      title: "Education",
      icon: GraduationCap,
      type: "single",
      route: "/education/Add",
    },
    {
      id: "sales",
      title: "Sales",
      icon: TrendingUp,
      type: "single",
      route: "/sales/Add",
    },
    {
      id: "concrete",
      title: "Concrete",
      icon: TrendingUp,
      type: "single",
      route: "/concrete/Add",
    },
    {
      id: "textAnalysis",
      title: "Text Analysis",
      icon: TrendingUp,
      type: "single",
      route: "/textAnalysis/Add",
    },
    {
      id: "fraud",
      title: "Fraud",
      icon: Shield,
      type: "expandable",
      children: [
        {
          id: "fraud-detection",
          title: "Fraud Detection",
          route: "/fraud/detection",
        },
      ],
    },
    {
      id: "commerce",
      title: "Commerce",
      icon: ShoppingCart,
      type: "expandable",
      children: [
        {
          id: "product-analysis",
          title: "Product Analysis",
          route: "/commerce/products",
        },
      ],
    },
    {
      id: "construction",
      title: "Construction",
      icon: HardHat,
      type: "expandable",
      children: [
        {
          id: "project-monitoring",
          title: "Project Monitoring",
          route: "/construction/projects",
        },
      ],
    },
    {
      id: "banking",
      title: "Banking",
      icon: CreditCard,
      type: "single",
      route: "/banking",
    },
    { id: "support", title: "SUPPORT", type: "header" },
    {
      id: "documentation",
      title: "Documentation",
      icon: Book,
      type: "single",
      route: "/documentation",
    },
    {
      id: "community",
      title: "Community",
      icon: Users,
      type: "single",
      route: "/community",
    },
    {
      id: "help-support",
      title: "Help & Support",
      icon: HelpCircle,
      type: "single",
      route: "/help",
    },
  ];

  const toggleExpanded = (itemId) =>
    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));

  const isRouteActive = (route) =>
    location.pathname === route || location.pathname.startsWith(route + "/");

  const renderIcon = (IconComponent, isActive = false) =>
    IconComponent ? (
      <IconComponent className={`sidebar-icon ${isActive ? "active" : ""}`} />
    ) : null;

  const renderChildren = (children, parentId, level = 1) => (
    <div className={`sidebar-children level-${level}`}>
      {children.map((child) => {
        const hasGrandChildren =
          Array.isArray(child.children) && child.children.length > 0;

        if (hasGrandChildren) {
          const isExpanded = expandedItems[child.id];
          const hasActiveDescendant =
            child.children?.some((c) => isRouteActive(c.route)) ||
            isRouteActive(child.route || "");

          return (
            <div key={child.id} className="sidebar-child">
              <div
                className={`sidebar-item ${
                  hasActiveDescendant
                    ? "bg-primary text-white dark:bg-primary dark:text-white"
                    : "hover:bg-gray-100 dark:hover:bg-background-cardDark"
                }`}
                onClick={() => toggleExpanded(child.id)}
              >
                <div className="sidebar-item-content">
                  <span className="sidebar-title">{child.title}</span>
                  <span className="sidebar-arrow">
                    {isExpanded ? <ChevronDown /> : <ChevronRight />}
                  </span>
                </div>
              </div>
              {isExpanded &&
                renderChildren(child.children, child.id, level + 1)}
            </div>
          );
        }

        return (
          <NavLink
            key={child.id}
            to={child.route}
            className={({ isActive }) =>
              `sidebar-item ${
                isActive
                  ? "bg-primary text-white dark:bg-primary dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-background-cardDark"
              }`
            }
          >
            {({ isActive }) => (
              <div className="sidebar-item-content">
                <span className="sidebar-title">{child.title}</span>
              </div>
            )}
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <div
      className={`sidebar ${
        isCollapsed ? "collapsed" : ""
      } bg-background-light dark:bg-background-dark`}
    >
      <div className="sidebar-header border-b border-border-light dark:border-border-dark">
        <div className="sidebar-logo">
          <img src={logo} alt="sidebar-logo" />
        </div>
        <button
          className="sidebar-toggle text-textColor-light dark:text-titleColor-dark hover:bg-gray-100 dark:hover:bg-background-cardDark rounded-lg"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Sidebar"
        >
          {!isCollapsed ? <X size={20} /> : null}
        </button>
      </div>

      <div className="sidebar-content text-textColor-light dark:text-titleColor-dark">
        {sidebarData.map((item) => {
          if (item.type === "header") {
            return (
              <div
                key={item.id}
                className="sidebar-header-text text-xs font-semibold text-gray-500 dark:text-textColor-dark mt-4 mb-2"
              >
                {item.title}
              </div>
            );
          }

          if (item.type === "single") {
            return (
              <NavLink
                key={item.id}
                to={item.route}
                className={({ isActive }) =>
                  `sidebar-item flex items-center px-3 py-2 rounded-md transition-colors 
                   ${
                     isActive
                       ? "bg-primary text-white dark:bg-primary dark:text-white"
                       : "hover:bg-gray-100 dark:hover:bg-background-cardDark"
                   } 
                   text-textColor-light dark:text-titleColor-dark`
                }
              >
                {({ isActive }) => (
                  <>
                    {renderIcon(item.icon, isActive)}
                    <span className="ml-2">{item.title}</span>
                  </>
                )}
              </NavLink>
            );
          }

          if (item.type === "expandable") {
            const isExpanded = expandedItems[item.id];
            const hasActiveChild =
              item.children?.some((child) => isRouteActive(child.route)) ||
              false;

            return (
              <div key={item.id} className="sidebar-expandable">
                <div
                  className={`sidebar-item flex items-center px-3 py-2 rounded-md transition-colors cursor-pointer
                  ${
                    hasActiveChild
                      ? "bg-primary text-white dark:bg-primary dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-background-cardDark"
                  } 
                  text-textColor-light dark:text-titleColor-dark`}
                  onClick={() => toggleExpanded(item.id)}
                >
                  {renderIcon(item.icon, hasActiveChild)}
                  <span className="ml-2 flex-1">{item.title}</span>
                  <span className="sidebar-arrow">
                    {isExpanded ? <ChevronDown /> : <ChevronRight />}
                  </span>
                </div>
                {isExpanded && renderChildren(item.children, item.id)}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default BlueMindSidebar;
