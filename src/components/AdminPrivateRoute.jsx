import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { profileDetailsRequest } from "../apiRequest/apiRequest";
import { getUserDetails } from "../helper/sessionHelper";

const AdminPrivateRoute = () => {
  useEffect(() => {
    (() => {
      profileDetailsRequest();
    })();
  }, []);
  const profileData = getUserDetails();
  // const profileData = useSelector((state) => state.profile.value);
  return profileData.isAdmin ? <Outlet /> : <Navigate to='sign-in' />;
};

export default AdminPrivateRoute;
