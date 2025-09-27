import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader";
import MainLayout from "../Layout/MainLayout";
import MediaMonitoring from "../Pages/Main/media/MediaMonitoring";
import MediaAddEdit from "../Pages/Main/media/MediaAddEdit";
import HousePrediction from "../Pages/Main/real-state/HousePrediction";
import HousePredictionAddEdit from "../Pages/Main/real-state/HousePredictionAddEdit";
import RestaurantAddEdit from "../Pages/Main/Restaurant";
import EducationAddEdit from "../Pages/Main/Education";
import SalesAddEdit from "../Pages/Main/Sales";
import ConcreteAddEdit from "../Pages/Main/Concrete";
import TextAnalysisAddEdit from "../Pages/Main/TextAnalysis";
import RealEstateAddEdit from "../Pages/Main/RealEstate";

const Dashboard = lazy(() => import("../Pages/Dashboard"));

export default function MainRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="*" element={<Dashboard />} />
          <Route path="mediaMonitoring" element={<MediaMonitoring />} />
          <Route path="mediaMonitoring/:id" element={<MediaAddEdit />} />
          <Route path="/restaurant/:id" element={<RestaurantAddEdit />} />
          <Route path="/education/:id" element={<EducationAddEdit />} />
          <Route path="/education/:id" element={<EducationAddEdit />} />
          <Route path="/sales/:id" element={<SalesAddEdit />} />
          <Route path="/concrete/:id" element={<ConcreteAddEdit />} />
          <Route path="/textAnalysis/:id" element={<TextAnalysisAddEdit />} />
          <Route path="/real-estate/:id" element={<RealEstateAddEdit />} />
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
