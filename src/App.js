import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/pages/login/login";
import SignUp from "./components/pages/signUp/signUp";
import Home from "./components/pages/home/home";
import UpdateProfile from "./components/pages/updateProfile/updateProfile";
import ResetPassword from "./components/pages/resetPassword/resetPassword";
import { useDispatch } from "react-redux";
import { expensesActions } from "./store/expensesReducer";
import NavigationBar from "./components/navbar";

function App() {
  const dispatch=useDispatch();
  
  const emailId=localStorage.getItem("emailId");
  let updatedEmailId;
  if(!!emailId){
    const emailId1=emailId.replace('@',"");
    updatedEmailId=emailId1.replace('.',"");
  }

  let profileUpdatedStatus=localStorage.getItem(`profileUpdatedStatus${emailId}`);
  if(profileUpdatedStatus===null){ 
      profileUpdatedStatus="false";
  }

  const [profileUpdated,setProfileUpdated]= useState(profileUpdatedStatus);
 
  const getExpensesFirebase= async() =>{ 
  try{ 
    const response=await axios.get(`https://expense-tracker-ae3ae-default-rtdb.firebaseio.com/expense-${updatedEmailId}.json`);
    if(!!response.data){
    dispatch(expensesActions.updateExpense(response.data.updatedExpenses));
    }
    } catch(error){
      console.log(error);
    }  
  }

  useEffect(() =>{
    getExpensesFirebase();
  },[])


  return (
    <>
      <BrowserRouter>
        <NavigationBar/>
        <Routes >
          <Route path="/" element={<Home profileUpdated={profileUpdated} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/updateProfile" element={<UpdateProfile setProfileUpdated={setProfileUpdated} profileUpdated={profileUpdated} />} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
