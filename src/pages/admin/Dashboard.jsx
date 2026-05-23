import React, {useState, useEffect} from "react";
import { NavLink, Outlet } from "react-router-dom";
import jsshoplogo from "../../assets/js-shop-logo.png";

import { useNavigate } from "react-router-dom";

//import API
import api from "../../service/API";

//Import Lucide-React Icons
import {List, User, Plus, ShoppingCart, Settings, LogOut} from "lucide-react";

//Import Style
import "./Dashboard.css";

function Dashboard(){
    //Logout function and use Navigate
    const navigate = useNavigate();
    const Logout = ()=>{
        sessionStorage.removeItem("username");
        navigate("/admin");
    }

    //Fetch Datas for count status
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        const fetchOrders = async()=>{
            try{
                const response  = await api.get("/admin/dashboard");
                setOrders(response.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchOrders();
    }, []);

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        (order)=> order.status === "Pending"
    ).length;
    const shippingOrders = orders.filter(
        (order)=> order.status === "Shipping"
    ).length;
    const completedOrders = orders.filter(
        (order)=> order.status === "Completed"
    ).length;
    const cancelOrders = orders.filter(
        (order)=> order.status === "Cancel"
    ).length;

    //Search Box
    const [search, setSearch] = useState("");

    return(
        <div className="main-container">
            {/*Admin Board Title*/}
            <div className="nav-adminboard-title">
                JS SHOP - ADMIN DASHBOARD                        
            </div>

            {/*Search Box*/}
            <div className="nav-admin-searchbox">
                <span style={{fontSize:"20px"}}>Search</span>
                <input
                    type="text"
                    placeholder="ProductCode/Name,UserName,UserID and ORD ..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}                    
                    >
                </input>                        
            </div>

            {/*Navigation New Order*/}
            <div className="nav-new-order">
                <p>Total Orders</p>
                <p style={{fontSize:"30px", fontWeight:"bold"}}>{totalOrders}</p>
            </div>

            {/*Navigation Order Pending*/}
            <div className="nav-order-pending">
                <p>Pending Orders</p>
                <p style={{fontSize:"30px", fontWeight:"bold"}}>{pendingOrders}</p>
            </div>

            {/*Navigation Order Canceled*/}
            <div className="nav-shipping-order">
                <p>Shipping Orders</p>
                <p style={{fontSize:"30px", fontWeight:"bold"}}>{shippingOrders}</p>
            </div>

            {/*Navigation Order Completed*/}
            <div className="nav-order-completed">
                <p>Orders Completed</p>
                <p style={{fontSize:"30px", fontWeight:"bold"}}>{completedOrders}</p>
            </div>

            {/*Navigation Order Completed*/}
            <div className="nav-order-canceled">
                <p>Canceled Orders</p>
                <p style={{fontSize:"30px", fontWeight:"bold"}}>{cancelOrders}</p>
            </div>           


            {/*Left Panel*/}
            <div className="dashboard-left-panel">
                <div className="left-panel-logo">
                    <img src={jsshoplogo} style={{width:"100%"}}></img>
                </div>
                <div className="group1">                    
                    {/*Navigation Button Link*/}                    
                    <nav className="nav-links">
                        <p style={{marginLeft:"20px"}}>Main</p>
                        <NavLink to="" end className={({isActive})=>isActive ? "active-link" : ""}><List size={20}/><span>ProductList</span></NavLink>
                        <NavLink to="customer" className={({isActive})=>isActive ? "active-link" : ""}><User size={20}/><span>Customer</span></NavLink>
                        <NavLink to="productcreate" className={({isActive})=>isActive ? "active-link" : ""}><Plus size={20}/><span>ProductCreate</span></NavLink>
                        <NavLink to="orders" className={({isActive})=>isActive ? "active-link" : ""}><ShoppingCart size={20}/><span>Orders</span></NavLink>
                        <br/><hr/><br/>                        
                        <p style={{marginLeft:"20px"}}>Others</p>
                        <NavLink to="settings" className={({isActive})=>isActive ? "active-link" : ""}><Settings size={20}/><span>Account Setting</span></NavLink>
                        
                        <button onClick={Logout}><LogOut size={20}/><span>Logout</span></button>
                        
                    </nav>                   
                </div>
            </div>

            {/*Main Field*/}
            <div className="main-field">
                <Outlet context={{search}}/>
            </div>
        </div>
    )
}

export default Dashboard;