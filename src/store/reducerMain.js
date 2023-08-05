
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import expensesReducer from "./expensesReducer";

const storeReducer= configureStore({
    reducer: { authentication: authReducer.reducer,expenses: expensesReducer.reducer }
});

export default storeReducer;