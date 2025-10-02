import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

import BlueMindSidebar from "../Components/BlueMindSidebar";
import { ToastContainer } from "react-toastify";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="bg-background-light dark:bg-background-dark ">
      <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <BlueMindSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <main className="pt-[1px] left-[280px] dark:bg-background-dark">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}
