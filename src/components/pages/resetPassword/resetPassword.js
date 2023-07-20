import classes from "./resetPassword.module.css";
import { Button,Container,Form } from "react-bootstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword=() =>{

    const emailRef=useRef();

    const resetPasswordHandler=(e) =>{
        e.preventDefault();
        
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