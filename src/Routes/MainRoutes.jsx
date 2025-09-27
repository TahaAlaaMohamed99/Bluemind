// import React, { lazy, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";
// import Loader from "../Components/Loader";
// import MainLayout from "../Layout/MainLayout";
// import MediaMonitoring from "../Pages/Main/media/MediaMonitoring";
// import MediaAddEdit from "../Pages/Main/media/MediaAddEdit";
// import HousePrediction from "../Pages/Main/real-state/HousePrediction";
// import HousePredictionAddEdit from "../Pages/Main/real-state/HousePredictionAddEdit";

// const Dashboard = lazy(() => import("../Pages/Dashboard"));

// export default function MainRoutes() {
//   return (
//     <Suspense fallback={<Loader />}>
//       <Routes>
//         <Route element={<MainLayout />}>
//           <Route path="*" element={<Dashboard />} />
//           <Route path="mediaMonitoring" element={<MediaMonitoring />} />
//           <Route path="mediaMonitoring/:id" element={<MediaAddEdit />} />
//           <Route path="housePrediction" element={<HousePrediction />} />
//           <Route
//             path="housePrediction/:id"
//             element={<HousePredictionAddEdit />}
//           />
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// }

import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Components/Loader";
import MainLayout from "../Layout/MainLayout";
import MediaMonitoring from "../Pages/Main/media/MediaMonitoring";
import MediaAddEdit from "../Pages/Main/media/MediaAddEdit";
import HousePrediction from "../Pages/Main/real-state/HousePrediction";
import HousePredictionAddEdit from "../Pages/Main/real-state/HousePredictionAddEdit";
import RestaurantRatingPrediction from "../Pages/Main/restaurant/RestaurantRatingPrediction";
import RestaurantRatingPredictionAddEdit from "../Pages/Main/restaurant/RestaurantRatingPredictionAddEdit";
import StudentPerformancePrediction from "../Pages/Main/education/StudentPerformancePrediction";
import StudentPerformancePredictionAddEdit from "../Pages/Main/education/StudentPerformancePredictionAddEdit";

const Dashboard = lazy(() => import("../Pages/Dashboard"));

export default function MainRoutes() {
  const { isAuthenticated } = useSelector((state) => state.user);

   if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mediaMonitoring" element={<MediaMonitoring />} />
          <Route path="/mediaMonitoring/:id" element={<MediaAddEdit />} />
          <Route path="/housePrediction" element={<HousePrediction />} />
          <Route path="/housePrediction/:id" element={<HousePredictionAddEdit />} />
          <Route path="/resturantRatingPrediction" element={<RestaurantRatingPrediction />} />
          <Route path="/resturantRatingPrediction/:id" element={<RestaurantRatingPredictionAddEdit />} />
          <Route path="/studentPerformancePrediction" element={<StudentPerformancePrediction />} />
          <Route path="/studentPerformancePrediction/:id" element={< StudentPerformancePredictionAddEdit/>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}