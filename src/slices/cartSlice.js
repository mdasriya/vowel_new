import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cartData: localStorage.getItem("cartData")
    ? JSON.parse(localStorage.getItem("cartData"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  cartOpen: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const index = state.cartData.findIndex((item) => item._id === product._id);

      if (index >= 0) {
        // If the product is already in the cart, increase its quantity
        state.cartData[index].quantity++;
        // Update the total price
        state.total += product.Price;
        // Update to localstorage
        localStorage.setItem("cartData", JSON.stringify(state.cartData));
        localStorage.setItem("total", JSON.stringify(state.total));
        // show toast
        toast.success("Quantity Increased");
      } else {
        // If the product is not in the cart, add it to the cart with quantity 1
        product.quantity = 1;
        state.cartData.push(product);
        // Update the total quantity and price
        state.totalItems++;
        state.total += product.Price;
        // Update to localstorage
        localStorage.setItem("cartData", JSON.stringify(state.cartData));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        // show toast
        toast.success("Product Added To Cart");
      }
    },
    decreaseQuantity: (state, action) => {
      const product = action.payload;
      const index = state.cartData.findIndex((item) => item._id === product._id);

      if (index >= 0) {
        // If the product is in the cart and its quantity is more than 1, decrease its quantity
        if (state.cartData[index].quantity > 1) {
          state.cartData[index].quantity--;
          // Update the total price
          state.total -= product.Price;
          // Update to localstorage
          localStorage.setItem("cartData", JSON.stringify(state.cartData));
          localStorage.setItem("total", JSON.stringify(state.total));
          // show toast
          toast.success("Quantity Decreased");
        } else {
          // If the product quantity is 1, remove it from the cart
          state.totalItems--;
          state.total -= product.Price;
          state.cartData.splice(index, 1);
          // Update to localstorage
          localStorage.setItem("cartData", JSON.stringify(state.cartData));
          localStorage.setItem("total", JSON.stringify(state.total));
          localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
          // show toast
          toast.success("Product Removed From Cart");
        }
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      const index = state.cartData.findIndex((item) => item._id === product._id);
    
      if (index >= 0) {
        // If the product is found in the cart, remove all quantities of the product
        const removedQuantity = state.cartData[index].quantity;
        state.totalItems -= 1;
        state.total -= state.cartData[index].Price * removedQuantity;
        state.cartData.splice(index, 1);
        // Update to local storage
        localStorage.setItem("cartData", JSON.stringify(state.cartData));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        // Show toast
        toast.success(`Removed ${removedQuantity} ${product.Name}(s) from cart`);
      }
    },    
    resetCart: (state) => {
      state.cartData = []
      state.total = 0
      state.totalItems = 0
      // Update to localstorage
      localStorage.removeItem("cartData")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    },

    setCartOpen : (state) => {
      state.cartOpen = true;
    },
    setCartClose : (state) => {
      state.cartOpen = false;
    },
  },
})

export const { addToCart, decreaseQuantity, removeFromCart, resetCart, setCartOpen, setCartClose } = cartSlice.actions

export default cartSlice.reducer
