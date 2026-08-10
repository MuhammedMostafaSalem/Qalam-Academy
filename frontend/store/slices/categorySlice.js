import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    mode: null,
    category: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,

    reducers: {
        openCategoryModal: (state, action) => {
            state.isOpen = true;
            state.mode = action.payload.mode;
            state.category = action.payload.category || null;
        },

        closeCategoryModal: (state) => {
            state.isOpen = false;
            state.mode = null;
            state.category = null;
        },
    },
});

export const { openCategoryModal, closeCategoryModal } = categorySlice.actions;

export default categorySlice.reducer;