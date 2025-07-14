import { configureStore } from "@reduxjs/toolkit";
import addBookReducer from "./addBookSlice.js"

const appStore = configureStore({
    reducer: {
        addBook: addBookReducer,
    }
})

export default appStore