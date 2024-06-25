import React from "react";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ isRegister = false, children }) {
  if (!isRegister) {
    return <Navigate to={"/waitingScreen"} />;
  }
  return children;
}

export default ProtectedRoute;
