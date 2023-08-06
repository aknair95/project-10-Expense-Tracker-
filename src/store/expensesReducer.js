import { createSlice } from "@reduxjs/toolkit";

const initialState={ expenses: []};

const expensesReducer=createSlice({
    name: "expenses",
    initialState: initialState,
    reducers: {
       updateExpense(state,action){
        state.expenses=action.payload;
       }
    }
})

export const expensesActions=expensesReducer.actions;

export default expensesReducer;