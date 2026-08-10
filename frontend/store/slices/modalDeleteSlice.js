import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modalDelete",
    initialState: {
        isOpen: false,
        title: "",
        message: "",
        itemId: null,
    },
    reducers: {
        openModalDelete: (state, action) => {
            state.isOpen = true;
            state.title = action.payload.title;
            state.message = action.payload.message;
            state.itemId = action.payload.itemId;
        },
        closeModalDelete: (state) => {
            state.isOpen = false;
            state.title = "";
            state.message = "";
            state.itemId = null;
        },
    },
});

export const { openModalDelete, closeModalDelete } = modalSlice.actions;
export default modalSlice.reducer;