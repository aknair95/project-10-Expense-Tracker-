import { Button } from "react-bootstrap";
import classes from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ExpenseForm from "../../expenseForm";
import ExpenseList from "../../expenseList";

const Home=(props) =>{
    const navigate=useNavigate();

    const completeNowBtnHandler=() =>{
        navigate("/updateProfile");
    }
    
    const token=localStorage.getItem("token");
    const emailId=localStorage.getItem("emailId");

    const [tokenStatus,setTokenStatus]= useState(token);

    let emailVerifyStatus=localStorage.getItem(`emailVerifyStatus${emailId}`);
    if(emailVerifyStatus===null){ 
        emailVerifyStatus="false";
    }    
    const [emailVerified,setEmailVerified]= useState(emailVerifyStatus);
    
    const verifyEmailBtnHandler= async() =>{
        try{ 
            await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC2XPoZUSexSQEMArfcPRTAXop_LGXmjnY",{
               requestType: "VERIFY_EMAIL",
               idToken: token
             });
            setEmailVerified("true");
            localStorage.setItem(`emailVerifyStatus${emailId}`,true);
            alert("Email verification link sent to your email. Please check your email.");
            } catch(error){
                alert("!!! Invalid Email !!!");
            }
    }

    const logoutHandler=() =>{
        localStorage.removeItem("token");
        localStorage.removeItem("emailId");
        setTokenStatus(null);
        navigate("/login");
    }

    return(
        <>
            <header className={classes.header}>
                <h2>!!! Welcome to Expense Tracker !!!</h2>
                {(props.profileUpdated==="false" && !!tokenStatus) && <h5>Your Profile Is Incomplete.</h5>}
                {(props.profileUpdated==="false" && !!tokenStatus) && <Button variant="link" size="lg" onClick={completeNowBtnHandler}>Complete Now</Button>}
            </header><hr/>
            <div className={classes.btns}>
                {(emailVerified==="false" && !!tokenStatus) && <Button variant="info" size="md" onClick={verifyEmailBtnHandler}>Verify Email</Button>}
                {!!tokenStatus && <Button variant="danger" onClick={logoutHandler}>Logout</Button>}
            </div>
           { !!tokenStatus &&
            <>
                <main>
                    <hr/>
                    <ExpenseForm addNewExpense={props.addNewExpense}/>   
                </main>
                <footer>
                    <br/><hr/>
                    <ExpenseList expensesData={props.expensesData} setExpensesData={props.setExpensesData}/>
                </footer>
            </>
            }    
        </>
    )
}

export default Home;