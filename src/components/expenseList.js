import "./expenseList.css";

const ExpenseList=(props) =>{

    if(props.expensesData.length === 0)
    {
        return <h2 className="expenses-list-message">!!! NO EXPENSE FOUND !!!</h2>;
    }

    return (
        <>
        <h2 className="expenses">EXPENSES</h2>
        <ul className="expenses-list">
            {   
                props.expensesData.map((element) => (
                    <div className="expense-item">
                        <div className="expense-item__description"> 
                            <div className='expense-item__amt'>{`Rs ${element.amount}`}</div>
                            <div className="description"><h5 >DESCRIPTION</h5>{element.description}</div> 
                            <div className="category"><h5 >CATEGORY</h5>{element.category}</div>    
                        </div>
                    </div>    
            ))}
        </ul>
        </>
    )
}

export default ExpenseList;