
import { Button,Container,Form } from "react-bootstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./updateProfile.module.css";

const UpdateProfile=() =>{

    const nameRef=useRef();
    const photoURLRef=useRef();

    const navigate=useNavigate();

    const updateBtnHandler= async (e) =>{
        e.preventDefault();
        const enteredName=nameRef.current.value;
        const enteredPhotoURL=photoURLRef.current.value;
        const idToken=localStorage.getItem("token");

        try{ 
            await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC2XPoZUSexSQEMArfcPRTAXop_LGXmjnY",{
                idToken: idToken,
                displayName: enteredName,
                photoUrl: enteredPhotoURL,
                returnSecureToken: true
             });
            alert("Profile updated successfully"); 
            navigate("/home");
            } catch(error){
                alert("Please enter valid name & photo URL");
            }
    }

    const cancelBtnHandler=() =>{
        navigate("/home");
    }

    return(
        <Container className={classes.formContainer}>
            <h3 className="p-2">PROFILE DETAILS</h3>
            <Form onSubmit={updateBtnHandler}>
                <Form.Group className="p-3">                    
                    <Form.Control type="text" placeholder="Enter Full Name" required size="lg" ref={nameRef}/>
                </Form.Group>
                <Form.Group className="p-3">                      
                    <Form.Control type="url" placeholder="Enter Profile Photo URL" required size="lg" ref={photoURLRef} />
                </Form.Group>
                <div className={classes.Btns}>
                    <Button type="submit" size="lg">UPDATE</Button>{" "}
                    <Button variant="dark" size="lg" onClick={cancelBtnHandler}>CANCEL</Button>
                </div>
            </Form>
        </Container> 
    )
}

export default UpdateProfile;