import { Button } from "react-bootstrap";
import classes from "./home.module.css"
import { useNavigate } from "react-router-dom";

const Home=() =>{
    const navigate=useNavigate();
    const completeNowBtnHandler=() =>{
        navigate("/updateProfile");
    }

    return(
        <>
            <header className={classes.header}>
                <h2>!!! Welcome to Expense Tracker!!!</h2>
                <h5>Your Profile Is Incomplete.</h5>
                <Button variant="link" size="lg" onClick={completeNowBtnHandler}>Complete Now</Button>
            </header>
            <hr/>
        </>
        
    )
}

export default Home;