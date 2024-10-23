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

function App() {
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
