import React from "react";

import { Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";


function AdminHome() {
  return (
    <>
      <AdminDashboard/>
      <Outlet />
      
    </>
  );
}

export default AdminHome;
