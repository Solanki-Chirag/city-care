import React from "react";

import { Outlet } from "react-router-dom";
import CitizenDashboard from "./CitizenDashboard";


function CitizenHome() {
  return (
    <>
      <CitizenDashboard/>
      <Outlet />
      
    </>
  );
}

export default CitizenHome;
