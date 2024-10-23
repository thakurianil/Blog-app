import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PostPage from "./pages/PostPage";
import MyPostPage from "./pages/MyPostPage";
import CreatePostPage from "./pages/CreatePostPage";
import { Auth } from "./auth/Auth";
import { useEffect, useState } from "react";
import { useAuth } from "./utils/AuthContext";
import {AutoLogin} from "./auth/AutoLogin.jsx";

function App() {
  const { user, setUser } = useAuth();

  useEffect(()=>{
    UpdateUser();


  })

  const UpdateUser = async() => {
    const user =  await AutoLogin();
    setUser(user);
  };


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/article" element={<PostPage />} />

        <Route
          path="/mypost"
          element={
            <Auth>
              {" "}
              <MyPostPage />{" "}
            </Auth>
          }
        />
        <Route
          path="/mypost/create"
          element={
            <Auth>
              <CreatePostPage />{" "}
            </Auth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
