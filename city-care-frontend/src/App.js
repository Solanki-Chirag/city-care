import React, { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import ChooseUserType from "./Components/ChooseUserType";
import CitizenSignIn from "./Components/CitizenSignIn";
import CitizenSignUp from "./Components/CitizenSignUp";
import CitizenHome from "./Components/CitizenHome";
import AdminSignIn from "./Components/AdminSignIn";
import AdminHome from "./Components/AdminHome";

function App() {
  const [user, setUser] = useState("");
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="CitizenDashboard" element={<CitizenHome />}></Route>
        <Route path="AdminDashboard" element={<AdminHome />}></Route>
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
          
           </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
