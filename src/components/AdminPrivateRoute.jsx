import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { getToken } from "../helper/sessionHelper";
import { useSelector } from "react-redux";
import { profileDetailsRequest } from "../apiRequest/apiRequest";

const AdminPrivateRoute = () => {
  useEffect(() => {
    (() => {
      profileDetailsRequest();
    })();
  }, []);
  const profileData = useSelector((state) => state.profile.value);
  return profileData.isAdmin ? <Outlet /> : <Navigate to='sign-in' />;
};

export default AdminPrivateRoute;
