import React from "react";
import { Navigate, Outlet, Redirect, Route } from "react-router-dom";
import { checkIsUserAuthenticated } from "../services/AuthServicce";

const PublicRoutes = () => {

  return (!checkIsUserAuthenticated() ? <Outlet /> : <Navigate to="/" />)
};

export default PublicRoutes
