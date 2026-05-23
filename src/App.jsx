import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//Import Packages
import Home from "./pages/Home.jsx";
import Dashboard from "../src/pages/admin/Dashboard.jsx";
import AdminLogin from "../src/pages/admin/AdminLogin.jsx";

import ProtectedRoute from "./pages/admin/ProtectedRoute.jsx";

//Import Components from adminpagecomponents folder
import Customer from "./pages/admin/adminPageComponents/Customer.jsx";
import ProductList from "./pages/admin/adminPageComponents/ProductList.jsx";
import ProductCreate from "./pages/admin/adminPageComponents/ProductCreate.jsx";
import Orders from "./pages/admin/adminPageComponents/Orders.jsx";

import Settings from "./pages/admin/adminPageComponents/Settings.jsx";

//Import Pages for User
import ProductDetail from "./pages/ProductDetail.jsx";
import ProductCart from "./pages/ProductCart.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import Myaccount from "./pages/Myaccount.jsx";

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }>
                    <Route index element={<ProductList/>} />
                    <Route path="customer" element={<Customer />} />
                    <Route path="productcreate" element={<ProductCreate />} />
                    <Route path="orders" element={<Orders />} />

                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="/admin" element={<AdminLogin />} />
                {/*Import for User*/}
                <Route path="/productdetail/:id" element={<ProductDetail />} />                                
                <Route path="/productcart" element={<ProductCart />} />
                <Route path="/productcart/:id" element={<ProductCart />} />
                <Route path="/orderpage" element={<OrderPage />} />
                <Route path="/myorder" element={<MyOrder />} />
                <Route path="/myaccount" element={<Myaccount />} />
            </Routes>
        </Router>
    )
}

export default App;