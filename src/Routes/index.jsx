import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import MainRoutes from "./MainRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route path="/app/*" element={<MainRoutes />} />

      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}
