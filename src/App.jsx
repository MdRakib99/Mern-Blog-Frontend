import React from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import Header from "./components/Header";
import ProjectPage from "./pages/ProjectPage";
import Footer from "./components/Footer";

import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import CreatePostPage from "./pages/CreatePostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />

          <Route path='/sign-in' element={<SigninPage />} />
          <Route path='/sign-up' element={<SignupPage />} />

          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route path='/create-post' element={<CreatePostPage />} />
            <Route path='/update-post/:postId' element={<UpdatePostPage />} />
          </Route>

          <Route path='/post/:postSlug' element={<PostPage />} />
          <Route path='/projects' element={<ProjectPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>

      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </div>
  );
};

export default App;
