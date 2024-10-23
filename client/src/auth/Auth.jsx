import React from "react";
import { Navigate } from "react-router-dom";

export const Auth = ({ children }) => {
  
  const isLoggedIn = true;
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

