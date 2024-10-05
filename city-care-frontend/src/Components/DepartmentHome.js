import React from "react";

import { Outlet } from "react-router-dom";
import DepartmentDashboard from "./DepartmentDashboard";


function AdminHome() {
  return (
    <>
      <DepartmentDashboard/>
      <Outlet />
      
    </>
  );
}

export default AdminHome;
