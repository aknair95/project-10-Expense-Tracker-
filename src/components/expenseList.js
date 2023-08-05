import { Button } from "react-bootstrap";
import "./expenseList.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../store/expensesReducer";

const ExpenseList=(props) =>{
    const expenses=useSelector((state) => state.expenses.expenses);
    const dispatch=useDispatch();

    if(expenses.length === 0)
    {
        return <h2 className="expenses-list-message">!!! NO EXPENSE FOUND !!!</h2>;
    }

    const emailId=localStorage.getItem("emailId");
    const emailId1=emailId.replace('@',"");
    const updatedEmailId=emailId1.replace('.',"");

    const deleteExpenseHandler= async(e) =>{
        const Id=e.target.parentElement.parentElement.id;
        const updatedExpenses=expenses.filter((element) => element.id!=Id )
        dispatch(expensesActions.removeExpense(updatedExpenses));

        try{ 
            await axios.patch(`https://expense-tracker-ae3ae-default-rtdb.firebaseio.com/expense-${updatedEmailId}.json`,{
                updatedExpenses: updatedExpenses
               });
            alert("!!! Expense Deleted !!!");     
        } catch(error){
            console.log(error);
        } 
    }

    const editExpenseHandler= async(e) =>{
        const Id=e.target.parentElement.parentElement.id;

        let amt,description,category;
        expenses.map((element) =>{
            if(element.id==Id){
                amt=element.amount;
                description=element.description;
                category=element.category;
            }      
        })
        props.preFillForm(amt,description,category);     

        const updatedExpenses=expenses.filter((element) => element.id!=Id)
        dispatch(expensesActions.addExpense(updatedExpenses));
         
        try{ 
            await axios.patch(`https://expense-tracker-ae3ae-default-rtdb.firebaseio.com/expense-${updatedEmailId}.json`,{
                updatedExpenses: updatedExpenses
               });    
        } catch(error){
            console.log(error);
        } 
    }

    return (
        <>
        <h2 className="expenses">EXPENSES</h2>
        <ul className="expenses-list">
            {   
                expenses.map((element) => (
                    <li className="expense-item" key={Math.random()} id={element.id}>
                        <div className="expense-item__description"> 
                            <div className='expense-item__amt'>{`Rs ${element.amount}`}</div>
                            <div className="description"><h5 >DESCRIPTION</h5>{element.description}</div> 
                            <div className="category"><h5 >CATEGORY</h5>{element.category}</div>      
                        </div>
                        <div className="btns">
                            <Button variant="warning" onClick={editExpenseHandler}>EDIT</Button>{" "}
                            <Button variant="danger" onClick={deleteExpenseHandler}>DELETE</Button>  
                        </div>  
                    </li>    
            ))}
        </ul>
        </>
    )
}

export default ExpenseList;