import { Button } from "react-bootstrap";
import classes from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Home=(props) =>{
    const navigate=useNavigate();

    const completeNowBtnHandler=() =>{
        navigate("/updateProfile");
    }
    
    const token=localStorage.getItem("token");
    const emailId=localStorage.getItem("emailId");

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

    return(
        <>
            <header className={classes.header}>
                <h2>!!! Welcome to Expense Tracker!!!</h2>
                {props.profileUpdated==="false" && <h5>Your Profile Is Incomplete.</h5>}
                {props.profileUpdated==="false" && <Button variant="link" size="lg" onClick={completeNowBtnHandler}>Complete Now</Button>}
            </header><hr/>
            <div className={classes.btns}>
                {emailVerified==="false" && <Button variant="info" size="md" onClick={verifyEmailBtnHandler}>Verify Email</Button>}
                <Button variant="danger">Logout</Button>
            </div>   
        </>
        
    )
}

export default Home;