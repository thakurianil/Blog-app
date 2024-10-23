// src/utils/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { userLogin } from "./axiosHelper";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (loginInfo) => {
    try {
      const response = await userLogin(loginInfo);
      const { token, username } = response.data;
      localStorage.setItem("jwtToken", token);
      setUser(username);
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken"); // Clear the token on logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
