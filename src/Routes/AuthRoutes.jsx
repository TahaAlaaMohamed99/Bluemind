import React, { lazy, Suspense } from 'react'
import Loader from '../Components/Loader'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from '../Layout/AuthLayout';
const Login = lazy(() => import("../Pages/Auth/Login"));
const ForgotPassword = lazy(() => import("../Pages/Auth/ForgotPassword"));
const Signup = lazy(() => import("../Pages/Auth/Signup"));

export default function AuthRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes >
        <Route element={<AuthLayout />}>
          <Route path="/" index element={<Login />} />
          <Route
            path="*"
            element={<Login />}
          />
          <Route path="ForgotPassword/:step/:key" element={<ForgotPassword />} />
          <Route path="Register/:step/:key" element={<Signup />} />

        </Route>
      </Routes>
    </Suspense>
  )
}
