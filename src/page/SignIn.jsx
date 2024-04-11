// import { useState } from "react"
// import { useNavigate } from "react-router-dom"

import { useState } from "react"


// export default function SignIn() {
//     const [email, setEmail] = useState("")
//     const [pass, setPass] = useState("")

// const navigate =  useNavigate()

//     return (
//       <>

//         <div classNameName="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
//        <div classNameName="border-2 border-gray-600 w-[30%] m-auto mt-8 rounded-lg pb-4">
//           <div classNameName="sm:mx-auto sm:w-full sm:max-w-sm mt-10 ">
//             <img
//               classNameName="mx-auto h-10 w-auto"
//               src="https://www.vowelweb.com/wp-content/uploads/2022/06/vowelweb-logo.png"
//               alt="Your Company"
//             />
//             <h2 classNameName="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//               Sign in to your account
//             </h2>
//           </div>

//           <div classNameName="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//             <form classNameName="space-y-6" action="#" method="POST">
//               <div>
//                 <label htmlFor="email" classNameName="block text-sm font-medium leading-6 text-gray-900">
//                   Email address
//                 </label>
//                 <div classNameName="mt-2">
//                   <input
//                   onChange={(e)=>setEmail(e.target.value)}
//                     id="email"
//                     name="email"
//                     type="email"

//                     classNameName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div classNameName="flex items-center justify-between">
//                   <label htmlFor="password" classNameName="block text-sm font-medium leading-6 text-gray-900">
//                     Password
//                   </label>
//                   <div classNameName="text-sm">
//                     <a href="#" classNameName="font-semibold text-indigo-600 hover:text-indigo-500">
//                       Forgot password?
//                     </a>
//                   </div>
//                 </div>
//                 <div classNameName="mt-2">
//                   <input

//                     classNameName="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   classNameName="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 >
//                   Sign in
//                 </button>
//               </div>
//             </form>

//             <p classNameName="mt-10 text-center text-sm text-gray-500" onClick={()=>navigate("/register")}>
//               New User?{' '}
//               <a  href="/register" classNameName="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:cursor-pointer hover:border-b-2">
//                 Sign Up
//               </a>

//             </p>
//           </div>
//           </div>
//         </div>
//       </>
//     )
//   }



const SignIn = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const handleSignIn = (e) => {
    e.preventDefault()
    alert("login success")
    let userData = { email, pass }
    console.log(userData)
    setEmail("")
    setPass("")
  }


  return (
    <div>

      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" value={email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" value={email} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setPass(e.target.value)} />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSignIn}>Sign In</button>
      </form>

    </div>
  )
}

export default SignIn

