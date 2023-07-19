import React from "react";
import { Navigate, Outlet, Redirect, Route } from "react-router-dom";
import {checkIsUserAuthenticated, getUserUuid} from "../services/AuthServicce";

const PrivateRoutes = () => {
  console.log('id')
  console.log(getUserUuid());
  return (checkIsUserAuthenticated() ? <Outlet /> : <Navigate to="/sign-in" />)
};

export default PrivateRoutes
