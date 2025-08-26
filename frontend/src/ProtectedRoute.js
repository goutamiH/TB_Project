import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ adminLoggedIn, children }) {
  if (!adminLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
