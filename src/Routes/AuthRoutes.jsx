// import React, { lazy, Suspense } from "react";
// import Loader from "../Components/Loader";
// import { Route, Routes } from "react-router-dom";
// import AuthLayout from "../Layout/AuthLayout";

// const Login = lazy(() => import("../Pages/Auth/Login"));
// const ForgotPassword = lazy(() => import("../Pages/Auth/ForgotPassword"));
// const Signup = lazy(() => import("../Pages/Auth/Signup"));

// export default function AuthRoutes() {
//   return (
//     <Suspense fallback={<Loader />}>
//       <Routes>
//         <Route element={<AuthLayout />}>
//           <Route index element={<Login />} />
//           <Route path="login" element={<Login />} />
//           <Route
//             path="forgot-password/:step/:key"
//             element={<ForgotPassword />}
//           />
//           <Route path="register/:step/:key" element={<Signup />} />
//         </Route>
//       </Routes>
//     </Suspense>
    
//   );
// }
import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Components/Loader";
import AuthLayout from "../Layout/AuthLayout";

  const Login = lazy(() => import("../Pages/Auth/Login"));
const ForgotPassword = lazy(() => import("../Pages/Auth/ForgotPassword"));
const Signup = lazy(() => import("../Pages/Auth/Signup"));
export default function AuthRoutes() {
  const { isAuthenticated } = useSelector((state) => state.user);

   if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Signup />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}