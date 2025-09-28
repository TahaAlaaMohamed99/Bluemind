 

// // App.js
// import { useSelector } from "react-redux";
// import { useLanguage } from "./Hooks/useLanguage";
// import { useTheme } from "./Hooks/useTheme";
// import AuthRoutes from "./Routes/AuthRoutes";
// import MainRoutes from "./Routes/MainRoutes";
// import "./Styles/css/main.css";
// function App() {
//   useTheme();
//   useLanguage();
//   const user = useSelector((state)=> state.user)
//   console.log(user,'user')
//   const userToken = localStorage.getItem("accessToken") || null;
//   return userToken !== null ? <MainRoutes /> : <AuthRoutes />;
// }

// export default App;


import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLanguage } from "./Hooks/useLanguage";
import { useTheme } from "./Hooks/useTheme";
import AuthRoutes from "./Routes/AuthRoutes";
import MainRoutes from "./Routes/MainRoutes";
 
import "./styles/css/main.css";
import { initializeFromStorage } from "./Store/slices/user-slice";

function App() {
  useTheme();
  useLanguage();
  const dispatch = useDispatch();
  
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  
  useEffect(() => {
     dispatch(initializeFromStorage());
  }, [dispatch]);

 

  return isAuthenticated ? <MainRoutes /> : <AuthRoutes />;
}

export default App;