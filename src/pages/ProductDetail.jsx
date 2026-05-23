import React, {useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import api from "../service/API.jsx";
import { useNavigate } from "react-router-dom";

//Import Components
import SecondNavigation from "../../src/components/second-navigation.jsx";
import FirstNavigation from "../components/first-navigation.jsx";

//Product Detail Style Import
import "../pages/Home.css";
import "./ProductDetail.css";

//Import Lucide-React Icons
import {MapPin, Handshake, Receipt, Clock, Shield, Home} from "lucide-react";

function ProductDetail(){
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        fetchProduct();
    }, []);
    const fetchProduct = async()=>{
        const res = await api.get(`/productdetail/${id}`);
        setProduct(res.data);
    }

    //Add to Cart
    const handleAddToCart = ()=>{
        const user = JSON.parse(sessionStorage.getItem("user"));
        //If Not Logged in
        if(!user){
            alert("Please login first");
            return;
        }

        //Unique cart key
        const cartKey = `cart_${user._id}`;

        //Get Old Cart
        const oldCart = JSON.parse(localStorage.getItem(cartKey)) || [];

        //Check existing product
        const exist = oldCart.find(
            (item) => item._id === product._id
        );

        if(exist){
            exist.qty +=1;
        }else{
            oldCart.push({
                _id: product._id,
                productcode: product.productcode,
                productname: product.productname,
                price: product.price,
                file: product.file,
                qty: qty,
                delifee: product.delifee
            });
        }
        localStorage.setItem(cartKey, JSON.stringify(oldCart));
        alert("Successfully added to Cart");
    }

    const [qty, setQty] = useState(1);
    //Increase Button
    const handleIncrease = ()=>{
        setQty(qty + 1);
    }

    //Decrease Button
    const handleDecrease = ()=>{
        if(qty > 1){
            setQty(qty - 1);
        }
    }

    //Calculate
    const productTotal = product.price * qty;
    const deliveryFee = Number(product.delifee || 0);
    const amountCost = productTotal + deliveryFee;


    return(
        <div className="home-main-container">
            <div className="productdetail-nav-container">
                <button onClick={()=>navigate("/")}><Home size={20} color="white"/></button>
                <FirstNavigation />
            </div>

            <div className="second-nav-container"><SecondNavigation /></div>

            <div className="third-nav-container"
                style={{
                    marginTop:"10px",
                    background:"none"                    
                }}>
                <p>Product Detail</p>
            </div>

            <div className="main-section-container">
                <div className="productdetail-container">
                    <div className="productdetail-cardleft">
                        <img src={product.file} width="350"/>
                    </div>

                    <div className="productdetail-cardcenter">
                        <p style={{fontSize:"22px"}}>{product.productname}</p>
                        <br/>
                        <p>Brand: {product.brand}</p>
                        <br/>
                        <p style={{
                            fontSize:"25px", color:"#bb3e03",
                            borderBottom:"0.5px solid #ced4da",
                            borderTop:"0.5px solid #ced4da",
                            padding:"10px 0px"
                        }}
                        >Ks-{product.price}</p>
                        <br/>
                        <p>Color Family : {product.color}</p><br/>
                        <p>Quantiy : {qty} </p>                        
                        <div className="productdetail-quantitybtn-style">
                            <button onClick={handleDecrease}>-</button>                            
                            <button onClick={handleIncrease}>+</button>
                        </div>                       
                        <div className="productdetail-addtocartbtn-style">
                            <nav>
                                <button onClick={handleAddToCart}>Add to Cart</button>
                            </nav>
                        </div>
                    </div>
                    
                    <div className="productdetail-cardright">
                        <p style={{color:"#495057"}}>Delivery Option</p>
                        <p style={{
                            fontSize:"18px", padding:"10px 0px", display:"flex", alignItems:"center",
                            gap:"6px", color:"rgb(78, 78, 78)"
                        }}
                        ><MapPin size={25}/> Yangon, Hlaing Thayar Township</p>                        
                        <p style={{
                            fontSize:"18px", padding:"10px 0px", display:"flex", alignItems:"center",
                            gap:"6px", color:"rgb(78, 78, 78)"
                        }}
                        ><Handshake size={25}/> Standard Delivery <span style={{fontWeight:"bold"}}
                            >Ks-{product.delifee}</span>
                        </p>                        
                        <p style={{
                            borderBottom:"0.5px solid #ced4da", fontSize:"18px",                              
                            padding:"10px 0px", display:"flex", alignItems:"center",
                            gap:"6px", color:"rgb(78, 78, 78)"
                        }}
                        ><Receipt size={25}/> Cash on Delivery <span>{product.cashondeli}</span></p><br/>

                        <p style={{color:"#495057"}}>Return & Warranty</p>
                        <p style={{
                            fontSize:"18px", padding:"10px 0px", display:"flex", alignItems:"center",
                            gap:"6px", color:"rgb(78, 78, 78)"
                        }}
                        ><Clock size={25}/>7 Days Return</p>
                        <p style={{
                            borderBottom:"0.5px solid #ced4da", fontSize:"18px",
                            padding:"10px 0px", display:"flex", alignItems:"center",
                            gap:"6px", color:"rgb(78, 78, 78)"
                        }}
                        ><Shield size={25}/>Warranty <span style={{fontWeight:"bold"}}>{product.warranty}</span></p>

                        <p style={{
                            fontSize:"23px", padding:"18px 5px", display:"flex",
                            alignItems:"center", background:"#ddd", fontWeight:"bold",
                            gap:"6px", color:"rgb(78, 78, 78)", borderRadius:"5px",
                            marginTop:"20px"
                        }}
                        >Total : {amountCost} Ks</p><br/>
                    </div>
                </div>
            </div>
            <div className="detail-container">
                <p style={{fontSize:"20px"}}>Product Details</p>
                <p>{product.description}</p>
            </div>

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

export default ProductDetail;