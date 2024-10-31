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
import { useEffect } from "react";
import { useAuth } from "./utils/AuthContext";
import SearchPage from "./pages/SearchPostPage";
import { toast, ToastContainer } from "react-toastify";
import DefaultLayout from "./components/layout/DefaultLayout";

function App() {
  const { autoLogin, globalMessage, setGlobalMessage } = useAuth();

  useEffect(() => {
    autoLogin();
  }, []);

  useEffect(() => {
    if (globalMessage) {
      toast(globalMessage);
      setGlobalMessage(null);
    }
  }, [globalMessage]);

  return (
    <>
      <Routes>
        {/* public page */}
        <Route path="*" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="article" element={<PostPage />} />
          <Route path="search" element={<SearchPage />} />
          {/* private page */}
          <Route
            path="mypost"
            element={
              <Auth>
                <MyPostPage />
              </Auth>
            }
          />
          <Route
            path="mypost/create"
            element={
              <Auth>
                <CreatePostPage />
              </Auth>
            }
          />

          <Route
            path="mypost/update"
            element={
              <Auth>
                <CreatePostPage />
              </Auth>
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
