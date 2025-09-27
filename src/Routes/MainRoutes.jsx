import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader";
import MainLayout from "../Layout/MainLayout";
import MediaMonitoring from "../Pages/Main/media/MediaMonitoring";
import MediaAddEdit from "../Pages/Main/media/MediaAddEdit";
import HousePrediction from "../Pages/Main/real-state/HousePrediction";
import HousePredictionAddEdit from "../Pages/Main/real-state/HousePredictionAddEdit";

const Dashboard = lazy(() => import("../Pages/Dashboard"));

export default function MainRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="*" element={<Dashboard />} />
          <Route path="mediaMonitoring" element={<MediaMonitoring />} />
          <Route path="mediaMonitoring/:id" element={<MediaAddEdit />} />
          <Route path="housePrediction" element={<HousePrediction />} />
          <Route
            path="housePrediction/:id"
            element={<HousePredictionAddEdit />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
