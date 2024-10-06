import  { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import ChooseUserType from "./Components/ChooseUserType";
import CitizenSignIn from "./Components/CitizenSignIn";
import CitizenSignUp from "./Components/CitizenSignUp";
import CitizenHome from "./Components/CitizenHome";
import DepartmentHome from "./Components/DepartmentHome";
import Complaint from "./Components/Complaint";
import AdminHome from "./Components/AdminHome";
import Inbox from "./Components/Inbox";
import DepartmentInbox from "./Components/DepartmentInbox";
import AdminSignIn from "./Components/AdminSignIn";
import DepartmentSignIn from "./Components/DepartmentSignIn";
import ComplaintsStatus from "./Components/ComplaintsStatus";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const [user, setUser] = useState("");
  return (
    <>
      <BrowserRouter>
      <AuthContextProvider>
        <Routes>

        <Route path="CitizenDashboard" element={<CitizenHome />}>
          <Route path="Complaint" element={<Complaint/>}> </Route>
          <Route path="ComplaintsStatus" element={<ComplaintsStatus/>}> </Route>
        </Route>
        <Route path="AdminDashboard" element={<AdminHome />}>
          <Route path="Inbox" element={<Inbox/>}> </Route>
        </Route>
        <Route path="DepartmentDashboard/:department" element={<DepartmentHome />}>
          <Route path="DepartmentInbox/:department" element={<DepartmentInbox/>}> </Route>
        </Route>

        
          <Route path="/" element={<Home />}>
            <Route path="About" element={<About />}></Route>
            <Route path="Contact" element={<Contact />}></Route>
            <Route
              path="SignIn"
              element={<ChooseUserType user={user} setUser={setUser} />}
            ></Route>
            <Route path="CitizenSignIn" element={<CitizenSignIn />}></Route>
            <Route path="CitizenSignUp" element={<CitizenSignUp />}></Route>
            <Route path="AdminSignIn" element={<AdminSignIn />}></Route>
            <Route path="DepartmentSignIn" element={<DepartmentSignIn />}></Route>
          
           </Route>
        </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
