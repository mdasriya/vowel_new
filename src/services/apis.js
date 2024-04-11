const BASE_URL = process.env.REACT_APP_BASE_URL
// const BASE_URL = `http://localhost:4000`

export const paymentEndpoints = {
    PRODUCT_PAYMENT_API : BASE_URL + "/payment/capturePayment",
    PRODUCT_VERIFY_API: BASE_URL + "/payment/verifyPayment",
}

export const userEndpoints = {
  USER_SIGNUP_API : BASE_URL + "/user/signup",
  USER_LOGIN_API : BASE_URL + "/user/login",
  UPDATE_USER_DATA_API : BASE_URL + "/user/updateUserDetails",
  SHOW_USER_DETAILS_API : BASE_URL + "/user/getUserDetails"
}

// router.post("/createProduct", auth, createProduct);
// router.post("/editProduct", auth, editProduct);
// router.get("/getAllProducts", getAllProducts);
// router.post("/getProductDetails", getProductDetails);
// router.delete("/deleteProduct", deleteProduct);

export const productEndpoints = {
  CREATE_PRODUCT_API : BASE_URL + "/product/createProduct",
  EDIT_PRODUCT_API : BASE_URL + "/product/editProduct",
  GET_ALL_PRODUCTS_API : BASE_URL + "/product/getAllProducts",
  GET_PRODUCT_DETAILS_API : BASE_URL + "/product/getProductDetails",
  DELETE_PRODUCT_API : BASE_URL + "/product/deleteProduct"
}