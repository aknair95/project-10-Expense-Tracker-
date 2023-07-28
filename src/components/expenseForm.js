import classes from "./expenseForm.module.css";
import { Button,Container,Form } from "react-bootstrap";
import { useRef } from "react";

const ExpenseForm=(props) =>{
    const amountRef=useRef();
    const descriptionRef=useRef();
    const categoryRef=useRef();

    const addExpenseHandler= (e) =>{
        e.preventDefault();
        const enteredAmount=amountRef.current.value;
        const enteredDescription=descriptionRef.current.value; 
        const enteredCategory=categoryRef.current.value; 

        const newExpense={
            id: Math.random(),
            amount: enteredAmount,
            description: enteredDescription,
            category: enteredCategory
        }

        props.addNewExpense(newExpense);

        amountRef.current.value="";
        descriptionRef.current.value="";
        categoryRef.current.value="default";
        alert("!!! EXPENSE ADDED !!!");
    }

    return(
    <>
        <Container className={classes.formContainer}>
            <h3 className="p-2">ADD NEW EXPENSE</h3>
            <Form onSubmit={addExpenseHandler}>
                <Form.Group className="p-3">                    
                    <Form.Control type="number" placeholder="Enter Amount" required size="lg" ref={amountRef} defaultValue={props.amt} />
                </Form.Group>
                <Form.Group className="p-3">                      
                    <Form.Control type="text" placeholder="Enter Description" required size="lg" ref={descriptionRef} defaultValue={props.description}/>
                </Form.Group>
                <Form.Group className="p-3">
                    <Form.Select ref={categoryRef} size="lg" defaultValue={props.category}>
                        <option value="default">SELECT CATEGORY</option>
                        <option value="food">FOOD</option>
                        <option value="grocery">GROCERY</option>
                        <option value="fuel">FUEL</option>
                        <option value="travel">TRAVEL</option>
                        <option value="bills">BILLS</option>
                        <option value="clothing">CLOTHING</option>
                        <option value="others">OTHERS</option>
                    </Form.Select>
                </Form.Group>
                <div className={classes.Btn}>
                    <Button type="submit" size="lg">ADD EXPENSE</Button>
                </div>
            </Form>
        </Container>     
    </>
    )
}

export default ExpenseForm;