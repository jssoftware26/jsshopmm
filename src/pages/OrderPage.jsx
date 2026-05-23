import React, {useState, useEffect} from "react";
import api from "../service/API.jsx";
import { useNavigate } from "react-router-dom";

//Import Components
import FirstNavigation from "../components/first-navigation.jsx";

//Product Detail Style Import
import "./OrderPage.css";

function OrderPage(){
    const navigate = useNavigate();
    //Logged in user
    const user = JSON.parse(
        sessionStorage.getItem("user")
    );
    //Proceed to Checkout's Product
    const [checkoutItems, setCheckoutItems] = useState([]);

    useEffect(()=>{
        const items = JSON.parse(
            localStorage.getItem("checkoutItems")
        ) || [];
        setCheckoutItems(items)
    }, []);

    //Product Total
    const productTotal = checkoutItems.reduce(
        (sum, item)=> sum + (item.price * item.qty), 0
    );

    //Delivery Fee Total
    const uniqueDeliveryFees = [
        ...new Set(checkoutItems.map(
                (item)=> Number(item.delifee)
            )
        )
    ];
    const deliveryTotal = uniqueDeliveryFees.reduce(
        (sum, fee)=> sum + fee, 0
    );

    //Final Grand Total
    const finalTotal = productTotal + deliveryTotal;

    //Place Order Button
    const handlePlaceOrder = async()=>{
        try{
            const orderData = {
                userid:user._id,                
                username:user.username,
                phonenumber:user.phonenumber,
                address:user.address,

                items: checkoutItems.map((item)=>({
                    productid:item._id,
                    productcode:item.productcode,
                    productname:item.productname,
                    price:item.price,
                    qty:item.qty,
                    file:item.file
                })),

                producttotal:productTotal,
                deliverytotal:deliveryTotal,
                grandtotal:finalTotal
            };

            const res = await api.post("/orderpage", orderData);
            alert(res.data.message);

            localStorage.removeItem("checkoutItems");
            
            navigate("/productcart");

        }catch(err){
            console.log(err);
        }
    }
    
    return(
        <div className="orderpage-container">
            <div className="top-nav"><FirstNavigation /></div>

            <div className="second-nav">
                <p style={{fontSize:"20px"}}>
                    <span style={{fontWeight:"bold"}}>JS Shopping</span> - Welcome to Order Page
                </p>
            </div>          

            <div className="main-section">
                <div className="orderform">
                    <h2 style={{
                        background:"#ddd", marginBottom:"10px", padding:"5px",
                        borderRadius:"5px"
                    }}
                    ><span>{user?.username}</span> - Order List</h2>                    
                    {/*Products*/}
                    <div>
                        {checkoutItems.map((item)=>(
                            <div className="productlist-card" key={item._id}>
                                {/*Image*/}
                                <img
                                    src={item.file}
                                    width="100"
                                />

                                {/*Info*/}
                                <div className="productlist-card-field" style={{flex:1}}>
                                    <h3>{item.productname}</h3>
                                    <p style={{color:"#333"}}>Price : {item.price} Ks</p>
                                    <p style={{color:"#333"}}>Quantity : {item.qty}</p>
                                    <p style={{color:"#333"}}>
                                        Subtotal :
                                        {" "}
                                        {item.price * item.qty} Ks
                                    </p>
                                    <p style={{color:"#333"}}>
                                        Delivery Fee :
                                        {" "}
                                        {item.delifee} Ks
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="main-section-rightside">
                <div className="placeorder">
                    {/*User Information*/}
                    <div>
                        <h3>Delivery Information</h3>
                        <p style={{color:"#333"}}>Customer Name : <span>{user.username}</span></p>
                        <p style={{color:"#333"}}>Phone No. : <span>{user.phonenumber}</span></p>
                        <p style={{color:"#333"}}>Address : <span>{user.address}</span></p>
                    </div>
                    {/*Summary*/}
                    <div>
                        <h3>Payment Summary</h3>
                        <p style={{color:"#333"}}>Product Total : {productTotal} Ks</p>
                        <p style={{color:"#333"}}>Delivery Fee : {deliveryTotal} Ks</p>
                        <p style={{fontWeight:"bold", color:"#333"}}>Final Total : {finalTotal} Ks</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <button onClick={handlePlaceOrder}>Place Order</button>                        
                    </div>                    
                </div>
            </div>

            <div className="left-panel"></div>
            <div className="right-panel"></div>
        </div>
    )
}

export default OrderPage;