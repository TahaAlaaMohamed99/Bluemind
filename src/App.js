import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { useLanguage } from "./Hooks/useLanguage";
import { useTheme } from "./Hooks/useTheme";
import AuthRoutes from "./Routes/AuthRoutes";
import MainRoutes from "./Routes/MainRoutes";
import "./styles/css/main.css";
function App() {
  useTheme();
  useLanguage();
  const userToken = localStorage.getItem("accessToken") || null;
  return <Router>{userToken !== null ? <MainRoutes /> : <AuthRoutes />}</Router>;
}

export default App;
