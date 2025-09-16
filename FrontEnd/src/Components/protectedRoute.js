import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

    const isLoggedIn = localStorage.getItem("loggedIn");
      if (isLoggedIn === "true") {
    return <Outlet />;
  } else {
    // If not logged in, redirect them to the login page
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;