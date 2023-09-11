import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const LoggedRoute = () => {
  const token = localStorage.getItem("Token");
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default LoggedRoute;
