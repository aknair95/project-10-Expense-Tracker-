import { Button } from "react-bootstrap";
import classes from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ExpenseForm from "../../expenseForm";
import ExpenseList from "../../expenseList";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/authReducer";

const Home=(props) =>{
    const [amt,setAmt]=useState();
    const [description,setDescription]=useState();
    const [category,setCategory]=useState();
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const token=localStorage.getItem("token");
    const emailId=localStorage.getItem("emailId");

    dispatch(authActions.setToken(token));

    let emailVerifyStatus=localStorage.getItem(`emailVerifyStatus${emailId}`);
    if(emailVerifyStatus===null){ 
        emailVerifyStatus="false";
    }    
    const [emailVerified,setEmailVerified]= useState(emailVerifyStatus);
    
    const theme=useSelector((state) => state.theme.theme);

    const completeNowBtnHandler=() =>{
        navigate("/updateProfile");
    }

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

        dispatch(authActions.logout());
        dispatch(authActions.setEmailID(null));
        dispatch(authActions.setToken(null));
    
        navigate("/login");
    }

    const preFillFormHandler=(amt,description,category) =>{
        setAmt(amt);
        setDescription(description);
        setCategory(category);
        scrollTo(0,0);
        alert("!!! EDIT EXPENSE AND RE-SUBMIT !!!");
    }

    return(
        <div className={theme==="dark" ? classes.darkTheme: classes.lightTheme}>
            <header className={classes.header}>
                <h2>!!! Welcome to Expense Tracker !!!</h2>
                {(props.profileUpdated==="false" && !!token) && <h5>Your Profile Is Incomplete.</h5>}
                {(props.profileUpdated==="false" && !!token) && <Button variant="link" size="lg" onClick={completeNowBtnHandler}>Complete Now</Button>}
            </header><hr/>
            <div className={classes.btns}>
                {(emailVerified==="false" && !!token) && <Button variant="info" size="md" onClick={verifyEmailBtnHandler}>Verify Email</Button>}{" "}
                {!!token && <Button variant="danger" onClick={logoutHandler}>Logout</Button>}
            </div>
           { !!token &&
            <>
                <main>
                    <hr/>
                    <ExpenseForm 
                        preFillFormHandler={preFillFormHandler} 
                        amt={amt} 
                        description={description} 
                        category={category}/>   
                </main>
                <footer>
                    <br/><hr/>
                    <ExpenseList  
                        preFillForm={preFillFormHandler}/>
                </footer>
            </>
            }    
        </div>
    )
}

export default Home;