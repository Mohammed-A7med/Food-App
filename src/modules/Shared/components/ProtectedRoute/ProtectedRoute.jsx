import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ userDate, children }) {
  if (localStorage.getItem("userToken") || userDate != null) return children;
  else return <Navigate to="/login" />;
}
