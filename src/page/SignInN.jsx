import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { login } from '../services/opretions/userApi';
import { useDispatch, useSelector } from 'react-redux'

const SignInN = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    const formData = getValues();
    console.log("formData : ", data);
    await login(formData, navigate, dispatch);

    console.log("Result in CartForm : ");
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-screen -mt-24 ">
      <div className="bg-white  shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 ">Welcome Back!</h1>
        <form >
          <div className="mb-4">
            <label for="email" className="block text-sm font-medium text-gray-700  mb-2">Email Address</label>
            <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" {...register("Email", { required: true })} />
            {errors.Email && (
              <span className="ml-2 text-xs tracking-wide text-pink-600">
                Email is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label for="password" className="block text-sm font-medium text-gray-700  mb-2">Password</label>
            <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" {...register("Password", { required: true })} />
            {errors.Password && (
              <span className="ml-2 text-xs tracking-wide text-pink-600">
                Password is required
              </span>
            )}
            <a href="#"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
              Password?</a>
          </div>

          <button onClick={handleSubmit(onSubmit)}  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>

          <div className=" mb-4">
            <div onClick={() => navigate("/signup")} className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center cursor-pointer">Create
              Account</div>
          </div>
        </form>
      </div>
    </div >
  )
}

export default SignInN
