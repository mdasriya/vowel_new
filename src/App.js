import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/commanCompo/Navbar";
import SignIn from "./page/SignIn";
import Register from "./page/Register";
import Home from "./page/Home";
import CartForm from "./page/CartForm";
import SignUp from "./page/SignUp";
import Cart from "./page/Cart";
import SignInN from "./page/SignInN";
import CreateProduct from "./page/CreateProduct";
import PrivateRouts from "./component/auth/PrivateRouts";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/signIn" element={<SignInN />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/CartCheckOut" element={<CartForm/>} />
        {/* <Route path="/createProduct" element={<CreateProduct/>} /> */}
        {/* Private Route */}
        <Route path="/product/createProduct" element={
          <PrivateRouts>
            <CreateProduct />
          </PrivateRouts>
        }></Route>
        <Route path="/product-edite/:ProductId" element={
          <PrivateRouts>
            <CreateProduct />
          </PrivateRouts>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
