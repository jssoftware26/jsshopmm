import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

//Import Components
import SecondNavigation from "../../src/components/second-navigation.jsx";
import FirstNavigation from "../components/first-navigation.jsx";

//Product Detail Style Import
import "../pages/Home.css";
import "./ProductDetail.css";
import "./ProductCart.css";

//Import Lucide-React Icons
import {MapPin, Van, Clock, Home} from "lucide-react";

function ProductCart(){
    //Navigate
    const navigate = useNavigate();    
    //Logged in user
    const user = JSON.parse(
        sessionStorage.getItem("user")
    );

    const [cart, setCart] = useState([]);

    //Load Cart
    useEffect(()=>{
        if(!user){
            navigate("/");
            return;
        }

        const cartKey = `cart_${user._id}`;
        const cartData = JSON.parse(localStorage.getItem(cartKey)) || [];

        //Add checked property
        const updatedCart = cartData.map((item)=>({
            ...item, checked:item.checked || false, qty: item.qty || 1
        }));
        setCart(updatedCart);
    }, [navigate]);

    //Checkbox select
    const handleCheck = (id)=>{
        const updated = cart.map((item)=>
            item._id === id ? {...item, checked:!item.checked} : item
        );
        setCart(updated);
    }

    //Quantity Increase
    const handleIncrease = (id)=>{
        const updated = cart.map((item)=>
            item._id === id ? {...item, qty:item.qty + 1} : item
        );
        setCart(updated);
        saveCart(updated);
    }

    //Quantity Decrease
    const handleDecrease = (id)=>{
        const updated = cart.map((item)=>
            item._id === id && item.qty > 1 ? {...item, qty:item.qty - 1} : item
        );
        setCart(updated);
        saveCart(updated);
    }

    //Remove item
    const handleRemove = (id)=>{
        const updated = cart.filter((item)=>
            item._id !== id
        );
        setCart(updated);
        saveCart(updated);
    }

    //Save Cart
    const saveCart = (updatedCart)=>{
        const cartKey = `cart_${user._id}`;

        localStorage.setItem(
            cartKey, JSON.stringify(updatedCart)
        );
    }

    //Total Price
    const productTotal = cart
        .filter((item)=> item.checked)
        .reduce((sum, item)=>
            sum + (item.price * item.qty), 0
        )

    const uniqueDeliveryFees = [
        ...new Set(
            cart
                .filter((item)=> item.checked)
                .map((item)=> Number(item.delifee))
        )
    ];

    const deliveryTotal = uniqueDeliveryFees.reduce(
        (sum, fee)=> sum + fee, 0
    );

    const grandTotal = productTotal + deliveryTotal;

    //Process CheckOut Button
    const handleCheckOut = ()=>{
        const selectedItems = cart.filter(
            (item)=> item.checked
        );
        if(selectedItems.length === 0){
            alert("Please select product");
            return;
        }
        localStorage.setItem(
            "checkoutItems", JSON.stringify(selectedItems)
        )
        //Remove ordered items only
        const remainingCart = cart.filter(
            (item)=> !item.checked
        );

        //Update state
        setCart(remainingCart);

        //Save updated cart
        const cartKey = `cart_${user._id}`;

        localStorage.setItem(
            cartKey,
            JSON.stringify(remainingCart)
        );
        navigate("/orderpage");
    }


    return(
        <div className="home-main-container">
            <div className="productcart-nav-container">
                <button onClick={()=>navigate("/")}><Home size={20} color="white"/></button>
                <FirstNavigation />
            </div>

            <div className="second-nav-container"><SecondNavigation /></div>

            <div className="third-nav-container"
                style={{
                    marginTop:"10px",
                    background:"none"                    
                }}>
                <p>Cart List</p>
            </div>

            <div className="main-section-container">
                <div className="productcart-container">
                    <div className="productcart-left">
                        {cart.length === 0 ? (
                            <div className="empty-text-style">Empty</div>
                        ) : (
                            <>
                                {cart.map((item)=>(
                                    <div className="productcart-left-detail"
                                        key={item._id}
                                        style={{
                                            display:"flex",                                        
                                            alignItems:"center",
                                            gap:"15px",
                                            padding:"15px",
                                            border:"1px solid #ddd",
                                            marginBottom:"15px",
                                            borderRadius:"10px"
                                        }}
                                    >
                                        {/*Check Box*/}
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={()=> handleCheck(item._id)}
                                        />

                                        {/*Product Image*/}
                                        <img
                                            src={item.file}
                                            width="90" alt=""
                                        />

                                        {/*Product Info*/}
                                        <div style={{flex:1}}>
                                            <h3>{item.productname}</h3>
                                            <p>Price : {item.price}Ks</p>
                                            {/*Quantity*/}
                                            <div style={{
                                                display:"flex",
                                                alignItems:"center",
                                                gap:"10px"
                                            }}
                                            >
                                                <button onClick={()=>handleDecrease(item._id)}>
                                                    -
                                                </button>
                                                <span>{item.qty}</span>
                                                <button onClick={()=>handleIncrease(item._id)}>
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/*Subtotal*/}
                                        <div>
                                            <h3>{item.price * item.qty} Ks</h3>
                                            <p>Deli Fee : {item.delifee}</p>
                                        </div>

                                        {/*Remove*/}
                                        <button onClick={()=>handleRemove(item._id)}>
                                            Remove
                                        </button>
                                    </div>
                                ))}                                
                            </>
                        )}
                    </div>

                    <div className="productcart-right">
                        <p style={{color:"#495057"}}>Delivery Option</p>
                        <p style={{
                            fontSize:"18px", padding:"18px 0px", display:"flex", alignItems:"center",
                            gap:"6px", color:"rgb(78, 78, 78)"
                        }}
                        ><MapPin size={25}/> Yangon, Hlaing Thayar Township</p>
                        <p style={{
                            fontSize:"18px", padding:"18px 0px", display:"flex", alignItems:"center",
                            gap:"6px", color:"rgb(78, 78, 78)"
                        }}
                        ><Clock size={25}/>7 Days Return</p>
                        <p style={{
                            borderBottom:"0.5px solid #ced4da", fontSize:"18px",                              
                            padding:"18px 0px", display:"flex", alignItems:"center",
                            gap:"6px", color:"rgb(78, 78, 78)"
                        }}
                        ><Van size={25}/>Order Processing 3 Days to 7 Days</p><br/>

                        {/*Total Of Product + Delivery Fee*/}                        
                        <h2>Final Total : {grandTotal} Ks</h2>

                        <button onClick={handleCheckOut}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>

            <div className="detail-container" style={{display:"none"}}></div>

            <div className="left-section-container">LEFT</div>
            <div className="right-section-container">RIGHT</div>
            <div className="footer-section-container">
                <div className="f1">
                    <strong>CUSTOMER CARE</strong>
                    <ul>
                        <li>Return</li>
                        <li>FAQs</li>
                        <li>How to use</li>
                        <li>Shipping</li>
                        <li>Gift Cards</li>
                        <li>Text Club</li>
                    </ul>
                </div>
                <div className="f2">
                    <strong>INFORMATIONS</strong>
                    <p>If you want text moving <br/>from left
                        to right across the page,
                        here are the most<br/>
                        common ways to do it.
                    </p>
                    <small>Copy right 2026 @justforyou online shop</small>
                </div>
            </div>            
        </div>
    )
}

export default ProductCart;