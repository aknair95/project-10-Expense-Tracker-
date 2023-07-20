import classes from "./resetPassword.module.css";
import { Button,Container,Form } from "react-bootstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword=() =>{

    const emailRef=useRef();
    const navigate=useNavigate();
   
    const resetPasswordHandler= async(e) =>{
        e.preventDefault();
        const enteredEmail=emailRef.current.value;

        try{ 
            await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC2XPoZUSexSQEMArfcPRTAXop_LGXmjnY",{
                requestType: "PASSWORD_RESET",
                email: enteredEmail
             });
            alert("!!! Password reset link sent to your email !!!");
            navigate("/login");
            } catch(error){
                alert("!!! Invalid Email !!!");
            }
    }

    return(
        <>
            <Container className={classes.formContainer}>
                <h3 className="p-2">RESET PASSWORD</h3>
                <Form onSubmit={resetPasswordHandler}>
                    <Form.Group className="p-3">                    
                        <Form.Control type="email" placeholder="Enter Email ID" required size="lg" ref={emailRef}/>
                    </Form.Group>
                    <div className={classes.Btn}>
                        <Button type="submit" size="lg">SEND LINK</Button>
                    </div>
                </Form>
            </Container> 
        </>
    )
}

export default ResetPassword;