
import { Navbar,Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const NavigationBar=() =>{

    const location=useLocation();
    const activePath=location.pathname;
    let homePage,loginPage;
    
    switch (activePath) {
            case "/":
                homePage=true;
                break;
            case "/login":
                loginPage=true;
                break;                       
    }

    return(
        <>
            <Navbar bg="dark" expand="sm" variant="light" fixed="top">
                <Nav variant="tabs" style={{marginLeft:"760px"}}>
                    <Nav.Item>
                        <Nav.Link href="/" style={{fontFamily:"times-new-roman",fontWeight:"bold",fontSize:"20px",color:"blue"}} 
                        active={homePage}>HOME</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/login" style={{fontFamily:"times-new-roman",fontWeight:"bold",fontSize:"20px",color:"red"}} 
                        active={loginPage}>LOGIN</Nav.Link>
                    </Nav.Item>
                </Nav>       
            </Navbar>
        </>
    )
}

export default NavigationBar;