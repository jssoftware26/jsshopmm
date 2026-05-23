import React, {useState, useEffect} from "react";
import api from "../service/API.jsx";
import { useNavigate } from "react-router-dom";
import {Home} from "lucide-react";

//Import Components
import FirstNavigation from "../components/first-navigation.jsx";

//Product Detail Style Import
import "./MyOrder.css";

function MyOrder(){
    const [myorder, setMyOrder] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const myorderlist = await api.get("/myorder");
                setMyOrder(myorderlist.data);
            }catch(err){
                console.log(err);
            }
        }
        //First Load
        fetchData();
        //Use Polling
        const interval = setInterval(fetchData, 1000);
        return ()=> clearInterval(interval);
    }, []);

    const handleOrderCancel = async(id, status, currentStatus)=>{
        try{
            if(currentStatus === "Shipping"){
                alert("Cannot cancel after shipping");
                return;
            }
            
            const res = await api.put(`/myorder/${id}`, {status});
            console.log(res.data);
            alert("Cancel order successful");
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="myorder-container">
            <div className="myorder-top-nav">
                <button onClick={()=>navigate("/")}><Home size={20} color="white"/>
                </button>
                <FirstNavigation />
            </div>

            <div className="myorder-second-nav">
                <p style={{fontSize:"20px"}}>
                    <span style={{fontWeight:"bold"}}>JS Shopping</span> - Order Review
                </p>
            </div>          

            <div className="myorder-main-section">            
                {myorder.map((order)=>(
                    <div>
                        <div key={order._id} className="myorder-card">
                            <p style={{fontSize:"18px", color:"#333"}}>Order No - <strong>{order.orderid}</strong></p>
                            {order.items.map((item, index)=>(
                                <div key={index} className="myorder-product-row">
                                    <div className="product-image">
                                        <img src={item.file} alt=""/>
                                    </div>
                                    <div className="product-info">
                                        <h4>{item.productname}</h4>
                                        <p style={{color:"#333"}}>Qty : {item.qty}</p>
                                        <p style={{color:"#333"}}>Price : {item.price} Ks</p>
                                        <p style={{color:"#333"}}>Product Code : {item.productcode}</p>
                                    </div>
                                    <div className="product-btns">
                                        <div>UserID : {order.userid}</div>
                                        <div><span>Status : {order.status}</span></div>
                                        <div><button onClick={()=>handleOrderCancel(order._id, "Cancel", order.status)}>
                                            Cancel Order
                                        </button>
                                        </div>
                                    </div>                                    
                                </div>                        
                            ))}                            
                            <div className="total-cost">
                                <strong>Total : {
                                    order.items.reduce(
                                        (total, item)=> total + (item.price * item.qty),
                                        0
                                    ) + order.deliverytotal
                                } Ks</strong>
                            </div>
                        </div>
                    </div>
                    
                ))}
            </div>
            <div className="myorder-left-panel"></div>
            <div className="myorder-right-panel"></div>
        </div>
    )
}

export default MyOrder;