import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import "./App.css";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState();

  return (
    <>
      <div>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home/*" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />
              {/* <Route path="/userDetails" element={<UserDetails />} /> 
            <Route path="/home/*" element={<Home/>}/> */}
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </div>
    </>
  );
}
export default App;
