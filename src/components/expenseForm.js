import classes from "./expenseForm.module.css";
import { Button,Container,Form } from "react-bootstrap";
import { useRef,useEffect } from "react";
import { expensesActions } from "../store/expensesReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ExpenseForm=(props) =>{
    const dispatch=useDispatch();
    const expenses=useSelector((state) => state.expenses.expenses);

    const amountRef=useRef();
    const descriptionRef=useRef();
    const categoryRef=useRef();

    const emailId=localStorage.getItem("emailId");
    let updatedEmailId;
    if(!!emailId){
      const emailId1=emailId.replace('@',"");
      updatedEmailId=emailId1.replace('.',"");
    }

    const postExpensesFirebase= async(updatedExpenses) =>{
        try{ 
          await axios.patch(`https://expense-tracker-ae3ae-default-rtdb.firebaseio.com/expense-${updatedEmailId}.json`,{
              updatedExpenses: updatedExpenses
             });  
        } catch(error){
          console.log(error);
      }  
    }
    
    // POST request ti firebase to update expenses in the DB.
    useEffect(() =>{
        postExpensesFirebase();
    },[postExpensesFirebase]);

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

        const updatedExpenses=[...expenses,newExpense];
        dispatch(expensesActions.updateExpense(updatedExpenses));
        postExpensesFirebase(updatedExpenses);
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