// import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Feedback from "./pages/Feedback";
// import CartPage from "./pages/CartController";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/feedback" element={<Feedback />} />
      {/* <Route path="/cart" component={CartPage} /> */}
    </Routes>
  );
}

export default App;
