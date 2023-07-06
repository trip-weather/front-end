import React from "react";
import { Navigate, Outlet, Redirect, Route } from "react-router-dom";
import { checkIsUserAuthenticated } from "../services/AuthServicce";

const PrivateRoutes = () => {
  return (checkIsUserAuthenticated() ? <Outlet /> : <Navigate to="/sign-in" />)
};

export default PrivateRoutes
