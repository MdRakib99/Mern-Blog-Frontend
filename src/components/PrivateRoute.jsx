import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../helper/sessionHelper";

const PrivateRoute = () => {
  return getToken() ? <Outlet /> : <Navigate to='sign-in' />;
};

export default PrivateRoute;
