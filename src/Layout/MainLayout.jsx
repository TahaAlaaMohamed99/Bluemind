import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

import BlueMindSidebar from "../Components/BlueMindSidebar";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <BlueMindSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
}
