
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import expensesReducer from "./expensesReducer";
import themeReducer from "./themeReducer";

const storeReducer= configureStore({
    reducer: { authentication: authReducer.reducer,expenses: expensesReducer.reducer,theme: themeReducer.reducer }
});

export default storeReducer;