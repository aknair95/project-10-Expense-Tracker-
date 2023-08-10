
import { createSlice } from "@reduxjs/toolkit";

const initialState={ theme: "light" }

const themeReducer=createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
       setTheme(state,action){
            if(action.payload==="light"){
                state.theme="dark";
            }else{
                state.theme="light";
            }
       }
    }
})

export const themeActions=themeReducer.actions;

export default themeReducer;