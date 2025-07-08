import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Context/authContext";
import { useTheme } from "./Context/themeContext";

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import OnBoardingPage from "./Pages/onBoardingPage";
import ModernIDEPage from "./pages/ModernIDEPage";
import DeploymentPage from "./pages/DeploymentPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import AppLayout from "./Layout/AppLayout";

const App = () => {
  const { currentUser } = useAuth();
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const isOnBoarded = localStorage.getItem("onBoarded") === "true";
  const { theme } = useTheme();

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isOnBoarded ? (
                <ModernIDEPage />
              ) : (
                <Navigate to={!isAuthenticated ? "/home" : "/onBoarding"} />
              )
            }
          />
          <Route path="/home" element={<LandingPage />} />
          <Route
            path="/signup"
            element={!isAuthenticated ? <Signup /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login />
              ) : !isOnBoarded ? (
                <Navigate to={"/onBoarding"} />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />

          <Route
            path="/onBoarding"
            element={
              isAuthenticated ? (
                !isOnBoarded ? (
                  <OnBoardingPage />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? (
                !isOnBoarded ? (
                  <OnBoardingPage />
                ) : (
                  <AppLayout showNavbar="true">

                  <SettingsPage/>
                  </AppLayout>
                )
              ) : (
                <Navigate to={"/logn"} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
