import { useLanguage } from "./Hooks/useLanguage";
import { useTheme } from "./Hooks/useTheme";
import AuthRoutes from "./Routes/AuthRoutes";
import MainRoutes from "./Routes/MainRoutes";
import "./Styles/scss/main.css";
function App() {
  useTheme();
  useLanguage();
  const userToken = localStorage.getItem("accessToken") || null;
  return userToken !== null ? <MainRoutes /> : <AuthRoutes />;
}

export default App;
