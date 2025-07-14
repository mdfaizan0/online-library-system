import { createSlice } from "@reduxjs/toolkit";

const addBookSlice = createSlice({
    name: "add book",
    initialState: {
        books: []
    },
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        }
    }
})

export const { addBook } = addBookSlice.actions

export default addBookSlice.reducer