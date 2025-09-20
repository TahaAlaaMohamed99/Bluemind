import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader";
import MainLayout from "../Layout/MainLayout";
import MediaMonitoringPage from "../Pages/Main/MediaMonitoringPage";

const Dashboard = lazy(() => import("../Pages/Dashboard"));

export default function MainRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mediaMonitoring" element={<MediaMonitoringPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
