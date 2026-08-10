import { configureStore } from '@reduxjs/toolkit'
import toastReducer from "./slices/toastSlice"
import modalDeleteReducer from "./slices/modalDeleteSlice"
import categoryReducer from "./slices/categorySlice"

export const store = configureStore({
    reducer: {
        toast: toastReducer,
        modalDelete: modalDeleteReducer,
        category: categoryReducer,
    },
});