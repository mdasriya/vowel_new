import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { productEndpoints } from "../apis";

const {
    CREATE_PRODUCT_API,
    EDIT_PRODUCT_API,
    GET_ALL_PRODUCTS_API,
    GET_PRODUCT_DETAILS_API,
    DELETE_PRODUCT_API
} = productEndpoints;

export const addProduct = async ( data, Token ) => {
    let result = null
    const toastId = toast.loading("loading...");
    try {
        console.log("Befor backend function call", data);
        
        const response = await apiConnector("POST", CREATE_PRODUCT_API, data,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${Token}`,
            })

        console.log("CREATE_PRODUCT_API RESPONSE......", response)

        if (!response?.data?.success) {
            throw new Error("Could Not Create Product")
        }

        result = response?.data?.data
    } catch (error) {
        console.log("CREATE_PRODUCT_API ERROR............", error)
        console.log("error message   ", error.message)
    }

    toast.dismiss(toastId)
    return result
}

export const editProductData = async (data, Token) => {
    let result = null
    const toastId = toast.loading("loading...");
    try {
        console.log("in front end 1");
        const response = await apiConnector("POST", EDIT_PRODUCT_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
        })
        console.log("in front end 2");

        console.log("EDIT_PRODUCT_API RESPONSE........", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Product Details")
        }

        result = response?.data?.data
    }
    catch (error) {
        console.log("EDIT_PRODUCT_API error.....", error)
    }
    toast.dismiss(toastId)
    return result
}

export const getAllProducts = async () => {
    let result = []
    const toastId = toast.loading("loading...");
    try {
        const response = await apiConnector("GET", GET_ALL_PRODUCTS_API)

        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Product data")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_PRODUCTS_API ERROR.......", error)
        // console.log(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchProductDetails = async (ProductId) => {
    const toastId = toast.loading("loading...");
    let result = null
    try {
        const response = await apiConnector("POST", GET_PRODUCT_DETAILS_API, {ProductId })
        
        console.log("GET_PRODUCT_DETAILS_API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data
    } catch (error) {
        console.log("GET_PRODUCT_DETAILS_API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    return result
}

export const deleteProduct = async (ProductId, Token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        console.log("Data in eventAPI ", ProductId);
        const response = await apiConnector("DELETE", DELETE_PRODUCT_API, { ProductId },
            {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
            });
        console.log("DELETE_PRODUCT_API RESPONSE............", response);
        if (!response?.data?.success) {
            toast.error("Could Not Delete Product");
            throw new Error("Could Not Delete Produt");
        }
        toast.success("Product Deleted");
        result = response?.data;
    } catch (error) {
        console.log("DELETE_PRODUCT_API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};
