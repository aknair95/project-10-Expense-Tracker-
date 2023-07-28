import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/pages/login/login";
import SignUp from "./components/pages/signUp/signUp";
import Home from "./components/pages/home/home";
import UpdateProfile from "./components/pages/updateProfile/updateProfile";
import ResetPassword from "./components/pages/resetPassword/resetPassword";

function App() {
  
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
  const [expensesData,setExpensesData]= useState([]);

  const getExpensesFirebase= async() =>{ 
  try{ 
    const response=await axios.get(`https://expense-tracker-ae3ae-default-rtdb.firebaseio.com/expense-${updatedEmailId}.json`);
    if(!!response.data){
     setExpensesData(response.data.updatedExpenses);
    }
    } catch(error){
      console.log(error);
    }  
  }

  useEffect(() =>{
    getExpensesFirebase();
  },[])

  const postExpensesFirebase= async(updatedExpenses) =>{
    try{ 
      await axios.patch(`https://expense-tracker-ae3ae-default-rtdb.firebaseio.com/expense-${updatedEmailId}.json`,{
          updatedExpenses: updatedExpenses
         });  
    } catch(error){
      console.log(error);
  }  
  }

  useEffect(() =>{
    postExpensesFirebase();
  },[postExpensesFirebase])

  const addNewExpenseHandler=(newExpense) =>{
    const updatedExpenses=[ ...expensesData,newExpense];
    setExpensesData(updatedExpenses);  
    postExpensesFirebase(updatedExpenses);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setExpensesData={setExpensesData}/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/home" element={<Home profileUpdated={profileUpdated} addNewExpense={addNewExpenseHandler} 
            expensesData={expensesData} setExpensesData={setExpensesData} />} />
          <Route path="/updateProfile" element={<UpdateProfile setProfileUpdated={setProfileUpdated} profileUpdated={profileUpdated} />} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
