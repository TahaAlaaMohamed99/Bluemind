import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { useLanguage } from "./Hooks/useLanguage";
import { useTheme } from "./Hooks/useTheme";
import AuthRoutes from "./Routes/AuthRoutes";
import MainRoutes from "./Routes/MainRoutes";
import "./styles/css/main.css";
function App() {
  useTheme();
  useLanguage();

  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />

        <Route path="/app/*" element={<MainRoutes />} />

        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
