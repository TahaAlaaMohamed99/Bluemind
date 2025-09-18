import { BrowserRouter as Router } from "react-router-dom";
import { useLanguage } from "./Hooks/useLanguage";
import { useTheme } from "./Hooks/useTheme";
import AppRoutes from "./Routes";
import "./Styles/main/styles.css";
function App() {
  useTheme();
  useLanguage();

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
