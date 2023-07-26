import { Button } from "react-bootstrap";
import "./expenseList.css";
import axios from "axios";

const ExpenseList=(props) =>{

    if(props.expensesData.length === 0)
    {
        return <h2 className="expenses-list-message">!!! NO EXPENSE FOUND !!!</h2>;
    }

    const emailId=localStorage.getItem("emailId");
    const emailId1=emailId.replace('@',"");
    const updatedEmailId=emailId1.replace('.',"");

    const deleteExpenseHandler= async(e) =>{
        const Id=e.target.parentElement.parentElement.id;
        const updatedExpenses=props.expensesData.filter((element) => element.id!=Id )
        props.setExpensesData(updatedExpenses);
         
        try{ 
            await axios.patch(`https://expense-tracker-ae3ae-default-rtdb.firebaseio.com/expense-${updatedEmailId}.json`,{
                updatedExpenses: updatedExpenses
               });
            alert("!!! Expense Deleted !!!");     
        } catch(error){
            console.log(error);
        } 
    }

    const editExpenseHandler=(e) =>{

    }

    return (
        <>
        <h2 className="expenses">EXPENSES</h2>
        <ul className="expenses-list">
            {   
                props.expensesData.map((element) => (
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