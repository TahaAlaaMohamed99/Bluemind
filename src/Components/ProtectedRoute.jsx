import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { refreshAccessToken } from "../Redux/Slices/userSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, accessToken, refreshToken } = useSelector((state) => state.user);

  useEffect(() => {
     const checkTokenValidity = async () => {
      if (accessToken && refreshToken) {
        try {
           const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
          const currentTime = Date.now() / 1000;
          
           if (tokenPayload.exp - currentTime < 300) {
            await dispatch(refreshAccessToken()).unwrap();
          }
        } catch (error) {
          console.error("Token validation error:", error);
        }
      }
    };

    if (isAuthenticated) {
      checkTokenValidity();
    }
  }, [dispatch, accessToken, refreshToken, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;