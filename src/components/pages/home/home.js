import { Button } from "react-bootstrap";
import classes from "./home.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home=() =>{
    const navigate=useNavigate();
    const completeNowBtnHandler=() =>{
        navigate("/updateProfile");
    }

    const [profileUpdated,setProfileUpdated]= useState(false);

    useEffect(() =>{
        const profileStatus=localStorage.getItem("profileUpdated");
        setProfileUpdated(profileStatus);
    },[])

    return(
        <>
            <header className={classes.header}>
                <h2>!!! Welcome to Expense Tracker!!!</h2>
                {!profileUpdated && <h5>Your Profile Is Incomplete.</h5>}
                {!profileUpdated && <Button variant="link" size="lg" onClick={completeNowBtnHandler}>Complete Now</Button>}
            </header>
            <hr/>
        </>
        
    )
}

export default Home;