import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modalDelete",
    initialState: {
        isOpen: false,
        title: "",
        message: "",
        itemId: null,
        confirmLabel: "",
    },
    reducers: {
        openModalDelete: (state, action) => {
            state.isOpen = true;
            state.title = action.payload.title;
            state.message = action.payload.message;
            state.itemId = action.payload.itemId;
            state.confirmLabel = action.payload.confirmLabel || "";
        },
        closeModalDelete: (state) => {
            state.isOpen = false;
            state.title = "";
            state.message = "";
            state.itemId = null;
            state.confirmLabel = "";
        },
    },
});

export const { openModalDelete, closeModalDelete } = modalSlice.actions;
export default modalSlice.reducer;
