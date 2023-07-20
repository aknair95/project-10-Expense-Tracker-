import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./components/pages/login/login";
import SignUp from "./components/pages/signUp/signUp";
import Home from "./components/pages/home/home";
import UpdateProfile from "./components/pages/updateProfile/updateProfile";
import ResetPassword from "./components/pages/resetPassword/resetPassword";

function App() {
  const emailId=localStorage.getItem("emailId");
  let profileUpdatedStatus=localStorage.getItem(`profileUpdatedStatus${emailId}`);
  if(profileUpdatedStatus===null){ 
      profileUpdatedStatus="false";
  }  
  const [profileUpdated,setProfileUpdated]= useState(profileUpdatedStatus);
  
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/home" element={<Home profileUpdated={profileUpdated}/>} />
          <Route path="/updateProfile" element={<UpdateProfile setProfileUpdated={setProfileUpdated} profileUpdated={profileUpdated}/>} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
