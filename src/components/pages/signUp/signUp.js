import classes from "./signUp.module.css";
import { Button,Container,Form } from "react-bootstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp=() =>{
    const emailRef=useRef();
    const passwordRef=useRef();
    const confirmPasswordRef=useRef();
    const navigate=useNavigate();

    const signUpHandler= async (e) =>{
        e.preventDefault();
        const enteredEmail=emailRef.current.value;
        const enteredPassword=passwordRef.current.value;
        const confirmPassword=confirmPasswordRef.current.value; 

        if(enteredPassword===confirmPassword){
            try{ 
            await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2XPoZUSexSQEMArfcPRTAXop_LGXmjnY",{
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
             });
            alert("Signed up successfully"); 
            navigate("/login");
            } catch(error){
                alert("Please enter valid email & password(min length- 6 character)");
            }
        } else{
            alert("!!! Incorrect Password. Please Enter Again !!!");
        }
        
        emailRef.current.value="";
        passwordRef.current.value="";
    }

    const loginExistingAccHandler=() =>{
        navigate("/login");
    }

    return(
    <>
        <Container className={classes.formContainer}>
            <h3 className="p-2">SIGN UP</h3>
            <Form onSubmit={signUpHandler}>
                <Form.Group className="p-3">                    
                    <Form.Control type="email" placeholder="Enter Email ID" required size="lg" ref={emailRef}/>
                </Form.Group>
                <Form.Group className="p-3">                      
                    <Form.Control type="password" placeholder="Enter Password" minLength={6} required size="lg" ref={passwordRef} />
                </Form.Group>
                <Form.Group className="p-3">                      
                    <Form.Control type="password" placeholder="Confirm Password" minLength={6} required size="lg" ref={confirmPasswordRef} />
                </Form.Group>
                <div className={classes.Btns}>
                    <Button type="submit" size="lg">SIGN UP</Button>
                    <Button variant="link" size="lg" onClick={loginExistingAccHandler}>Login With Existing Account</Button>
                </div>
            </Form>
        </Container>     
    </>
    )
}

export default SignUp;