import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Product: null,
    editProduct: false,
    ProductNo : 0
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.Product = action.payload
        },
        setEditProduct: (state, action) => {
            state.editProduct = action.payload
        },
        // increseProductNo : (state, action )
    },
});

export const {
    setProduct,
    setEditProduct
} = productSlice.actions

export default productSlice.reducer