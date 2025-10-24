import { useLanguage } from "./Hooks/useLanguage";
import { useTheme } from "./Hooks/useTheme";
import AuthRoutes from "./Routes/AuthRoutes";
import MainRoutes from "./Routes/MainRoutes";
import "./styles/scss/main.css";
function App() {
  useTheme();
  useLanguage();
  const userToken = localStorage.getItem("accessToken") || null;
<<<<<<< HEAD
  return userToken !== null ? <MainRoutes /> : <AuthRoutes />;
=======
  return userToken == null ? <AuthRoutes /> : <MainRoutes />;
>>>>>>> b527b01d925259ac6458e069446df0204b4784d1
}

export default App;
