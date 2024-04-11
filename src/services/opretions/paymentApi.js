import toast from "react-hot-toast";
import { paymentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../acets/razorpay9274.webp"
import { resetCart } from "../../slices/cartSlice";


const { PRODUCT_PAYMENT_API, PRODUCT_VERIFY_API, TEMPDATA_API } = paymentEndpoints;

export const tempdata = async(name) => {
  let result = null;
  try{
    const data = await apiConnector("POST", TEMPDATA_API, {name});

    console.log("this is api");
      console.log("data is ....", data);

      result = data;
  }
  catch(error) {
    console.log("TEMPDATA_API ERROR............", error)
    toast.error("Could Not fetch data.")
    throw error;
  }

  return result;
}

// Load the Razorpay SDK from the CDN
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}



// Buy the Course
export const BuyProduct = async( total_amount, resetCart, dispatch) => {
  const toastId = toast.loading("Loading...")
  try {
    // Loading the script of Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your Internet Connection."
      )
      return
    }

    // Initiating the Order in Backend
    const orderResponse = await apiConnector( "POST", PRODUCT_PAYMENT_API, {total_amount });
    
    console.log("inside buyproduct");

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message)
    }
    console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)

    // Opening the Razorpay SDK
    const options = {
      // key: process.env.RAZORPAY_KEY,
      key: `rzp_test_t4LUM04KXw6wHc`,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "Mukesh",
      description: "Thank you for Purchasing the Product.",
      image: rzpLogo,
      prefill: {
        //   name: `${user_details.firstName} ${user_details.lastName}`,
        //   email: user_details.email,
      },
      handler: function (response) {
        //   sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
        verifyPayment({ ...response, total_amount },resetCart, dispatch)
      },
    }
    const paymentObject = new window.Razorpay(options)

    paymentObject.open()
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.")
      console.log(response.error)
    })
    // dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT API ERROR............", error)
    toast.error("Could Not make Payment.")
  }
  toast.dismiss(toastId)
}

// Verify the Payment
async function verifyPayment(bodyData, resetCart, dispatch) {
  const toastId = toast.loading("Verifying Payment...")

  try {
    const response = await apiConnector("POST", PRODUCT_VERIFY_API, bodyData)

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successful ")
    //   navigate("/dashboard/enrolled-courses")
      dispatch(resetCart())
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error("Could Not Verify Payment.")
  }
  toast.dismiss(toastId)
}