import React from "react";
import { Outlet } from "react-router";
import { LayoutProvider } from "../../features/layout/components/LayoutProvider";

export const PrivateRoute = () => {
  return <LayoutProvider CurrentComponent={<Outlet />}></LayoutProvider>;
};
