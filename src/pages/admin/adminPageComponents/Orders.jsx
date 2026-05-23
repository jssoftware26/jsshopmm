import React, {useState, useEffect} from "react";
import "./Orders.css";

import api from "../../../service/API";

import { useOutletContext } from "react-router-dom";

function Orders(){
    const [orderlist, setOrderList] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const orderlist = await api.get("/admin/orders");
                setOrderList(orderlist.data);
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

    //Update Status
    const updateStatus = async(id, status)=>{
        try{
            const response = await api.put(`/admin/orders/${id}`, {status});
            console.log(response.data);
        }catch(err){
            console.log(err);
        }
    }

    //Order Delete
    const handleOrderDelete = async(id)=>{
        try{
            await api.delete(`/admin/orders/${id}`);
            alert("Order request deleting is successful");
        }catch(err){
            console.log(err);
        }
    }

    //Search
    const {search} = useOutletContext();

    return(
        <div className="orders-container">
            <h2 className="orders-title">Order Requests</h2>            
            {orderlist.filter((order)=>
                order.orderid
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                order.username
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ).map((order)=>(
                <div key={order._id} className="order-card">

                    {/*Top*/}
                    <div className="order-top">                        
                        <div>
                            <h3>{order.username}</h3>
                            <p>{order.phonenumber}</p>
                            <p>{order.address}</p>
                        </div>
                         {/*Request Time*/}
                        <small style={{color:"gray"}}>
                            Request Time :
                            {new Date(order.createdAt).toLocaleString()}
                        </small>
                        <div className="status-box">
                            <span>{order.status}</span>
                        </div>
                        {/*Custom Print Like Table Form*/}
                        <button
                            className="print-btn"
                            onClick={()=>{
                                const productRows = order.items.map((item)=>`
                                    <tr>
                                        <td style="border:1px solid #000;padding:8px;">
                                            ${item.productcode}
                                        </td>
                                        <td style="border:1px solid #000;padding:8px;">
                                            ${item.productname}
                                        </td>

                                        <td style="border:1px solid #000;padding:8px;text-align:center;">
                                            ${item.qty}
                                        </td>

                                        <td style="border:1px solid #000;padding:8px;text-align:right;">
                                            ${item.price} Ks
                                        </td>

                                        <td style="border:1px solid #000;padding:8px;text-align:right;">
                                            ${item.price * item.qty} Ks
                                        </td>
                                    </tr>
                                `).join("");

                                const width = 900;
                                const height = 700;

                                const left = window.screenX + (window.innerWidth - width) / 2;
                                const top = window.screenY + (window.innerHeight - height) / 2;

                                const printWindow = window.open(
                                    "",
                                    "_blank",
                                    `width=${width},
                                    height=${height},
                                    top=${top},
                                    left=${left},
                                    resizable=yes,
                                    scrollbars=yes`
                                );

                                printWindow.document.write(`
                                    <html>
                                        <head>
                                            <title>Order Invoice</title>

                                            <style>
                                                body{
                                                    font-family:Arial;
                                                    padding:30px;
                                                }

                                                h2{
                                                    text-align:center;
                                                }

                                                table{
                                                    width:100%;
                                                    border-collapse:collapse;
                                                    margin-top:20px;
                                                }

                                                th{
                                                    border:1px solid black;
                                                    padding:10px;
                                                    background:#f1f1f1;
                                                }

                                                td{
                                                    border:1px solid black;
                                                    padding:10px;
                                                }

                                                .top-section{
                                                    margin-bottom:20px;
                                                    line-height:1.8;
                                                }

                                                .total-box{
                                                    margin-top:20px;
                                                    text-align:right;
                                                }
                                            </style>
                                        </head>

                                        <body>
                                            <h2>JS ONLINE SHOP ORDER INVOICE</h2>
                                            <div class="top-section">
                                                <strong>Order No :</strong>
                                                ${order.orderid}<br/>

                                                <strong>Customer :</strong>
                                                ${order.username}<br/>

                                                <strong>Phone :</strong>
                                                ${order.phonenumber}<br/>

                                                <strong>Address :</strong>
                                                ${order.address}<br/>

                                                <strong>Order Time :</strong>
                                                ${new Date(order.createdAt).toLocaleString()}
                                            </div>
                                            <div>
                                                <strong>Shipping Date :</strong>
                                                ${Date()}
                                            </div>
                                            
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Product Code</th>
                                                        <th>Product Name</th>
                                                        <th>Qty</th>
                                                        <th>Price</th>
                                                        <th>Subtotal</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    ${productRows}
                                                </tbody>
                                            </table>

                                            <div class="total-box">
                                                <p>
                                                    Product Total :
                                                    ${order.producttotal} Ks
                                                </p>

                                                <p>
                                                    Delivery Fee :
                                                    ${order.deliverytotal} Ks
                                                </p>

                                                <h3>
                                                    Grand Total :
                                                    ${order.grandtotal} Ks
                                                </h3>
                                            </div>
                                            <hr>
                                            <p>${order.userid}</p>
                                        </body>
                                    </html>
                                `);

                                printWindow.document.close();
                                printWindow.focus();
                                printWindow.print();

                                printWindow.onafterprint = ()=>{
                                    printWindow.close();
                                }
                            }}
                        >
                            Print
                        </button>
                        <button className="delete-btn" onClick={()=>handleOrderDelete(order._id)}>
                            Delete
                        </button>

                    </div>

                    {/*Dropdown Products*/}
                    <details className="order-dropdown">
                        <summary>
                            View Products / Total / Actions ............... Order No - <span>{order.orderid}</span>
                        </summary>

                        <div className="order-products">

                            {order.items.map((item, index)=>(
                                <div key={index} className="product-row">

                                    <img
                                        src={item.file}
                                        alt=""
                                    />

                                    <div className="product-info">
                                        <h4>{item.productname}</h4>
                                        <p>Qty : {item.qty}</p>
                                        <p>Price : {item.price} Ks</p>
                                        <p>Product Code : {item.productcode}</p>
                                    </div>

                                </div>
                            ))}

                        </div>

                        {/*Total*/}
                        <div className="order-total">
                            <p>Product Total : {order.producttotal} Ks</p>
                            <p>Delivery Fee : {order.deliverytotal} Ks</p>

                            <h3>
                                Grand Total : {order.grandtotal} Ks
                            </h3>
                        </div>

                        {/*Buttons*/}
                        <div className="order-buttons">
                            <button className="confirm-btn"
                                onClick={()=>updateStatus(order._id, "Confirmed")}>
                                Confirm
                            </button>
                            <button className="shipping-btn"
                                onClick={()=>updateStatus(order._id, "Shipping")}>
                                Shipping
                            </button>
                            <button className="complete-btn"
                                onClick={()=>updateStatus(order._id, "Completed")}>
                                Completed
                            </button>
                        </div>
                    </details>                    

                </div>
                ))                
            }
        </div>
    )
}

export default Orders;