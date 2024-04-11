import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { userEndpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/userSlice";

const {
    USER_SIGNUP_API,
    USER_LOGIN_API,
    UPDATE_USER_DATA_API,
    SHOW_USER_DETAILS_API
} = userEndpoints;

export const signUp = async (data, navigate) => {
    let result = null
    const toastId = toast.loading("Loading...");
    try {

        console.log("Befor backend function call", data);

        if(data.Password !== data.ConfirmPass){
            toast.dismiss(toastId);
            toast.error("Password and ConfirmPass Not Same");
            return null;
        }

        const response = await apiConnector("POST", USER_SIGNUP_API, data);

        console.log("after backend function call");

        console.log("USER_SIGNUP_API RESPONSE......", response)

        if (!response?.data?.success) {
            throw new Error("Could Not Create User")
        }

        result = response?.data?.data
        toast.success("User Registered Successfull");
        navigate("/signIn")
    }
    catch (error) {
        toast.error("Internal Server Error")
        console.log("USER_SIGNUP_API Error......", error)
        console.log("Error Message ", error.message);
    }

    toast.dismiss(toastId);
    return result
}

export const login = async (data, navigate, dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
        const { Email, Password } = data
        console.log("inside login frontend");
        const response = await apiConnector("POST", USER_LOGIN_API, {
            Email,
            Password,
        })

        console.log("Login API response.....", response)

        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        // const userImage = response.data?.user?.Image
        //     ? response.data.user.image
        //     : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user }))
        localStorage.setItem("Token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/")
    } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("User Not Found")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
}

export const updateUser = async (data, Token, dispatch, navigate) => {
    let result = null
    const toastId = toast.loading("Loading...");
    try {
        console.log("Befor backend function call", data);

        const response = await apiConnector("POST", UPDATE_USER_DATA_API, data,
            {
                Authorization: `Bearer ${Token}`,
            });

        console.log("after backend function call");

        console.log("CREATE_USER_DATA_API RESPONSE......", response)

        if (!response?.data?.success) {
            throw new Error("Could Not Create User")
        }

        result = response?.data?.data?.updatedUserDetails

        dispatch(setUser({ ...response.data.updatedUserDetails }))
        localStorage.setItem("user", JSON.stringify(response.data.updatedUserDetails))
        navigate("/")
    }
    catch (error) {
        console.log("CREATE_USER_DATA_API Error......", error)
        console.log("Error Message ", error.message);
    }

    toast.dismiss(toastId);
    return result
}

export const getUserDetails = async (Email) => {
    const toastId = toast.loading("Loading...");
    let result = null
    try {
        const response = await apiConnector("POST", SHOW_USER_DETAILS_API, Email);

        console.log("SHOW_USER_DETAILS_API response.....", response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data
    }
    catch (error) {
        console.log("SHOW_USER_DETAILS_API ERROR....", error);
    }

    toast.dismiss(toastId);
    return result
}

export const logout = (navigate, dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("Token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
}