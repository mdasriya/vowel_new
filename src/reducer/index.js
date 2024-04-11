import { combineReducers } from "@reduxjs/toolkit"
import cartReducer from "../slices/cartSlice"
import authReducer from "../slices/authSlice"
import useReducer from "../slices/userSlice"
import productReducer from "../slices/productSlice"

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  user: useReducer,
  product: productReducer,
})

export default rootReducer
