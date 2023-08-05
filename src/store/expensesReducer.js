import { createSlice } from "@reduxjs/toolkit";

const initialState={ expenses: []};

const expensesReducer=createSlice({
    name: "expenses",
    initialState: initialState,
    reducers: {
        addExpense(state,action){
            state.expenses=action.payload;
        },
        removeExpense(state,action){
            state.expenses=[...state.expenses,action.payload];
        }
    }
})

export const expensesActions=expensesReducer.actions;

export default expensesReducer;