import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LOCALSTORAGE from "../helpers/constants/localStorage";

const hasToken = !!localStorage.getItem(LOCALSTORAGE.TOKEN);

interface IProtectedRoute {
  isAllowed?: boolean;
  redirectPath?: string;
  children: JSX.Element;
}

export default function ProtectedRoute({
  isAllowed = true,
  redirectPath = "/",
  children,
}: IProtectedRoute): JSX.Element {
  if (!hasToken) {
    return <Navigate to={"/login"} replace />;
  } else if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  } else {
    return children ? children : <Outlet />;
  }
}
