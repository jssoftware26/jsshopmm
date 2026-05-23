import React, {useState, useEffect} from "react";
//Backdrop Images
import backdrop1 from "../assets/backdrop1.png";
import backdrop2 from "../assets/backdrop2.png";
import backdrop3 from "../assets/backdrop3.png";

//Import Components
import SecondNavigation from "../components/second-navigation.jsx";
import FirstNavigation from "../components/first-navigation.jsx";

//Home Page Style Import
import "./Home.css";
import api from "../service/API.jsx";

import {Link} from "react-router-dom";

function Home(){
    //Fetch Products
    const [products, setProducts] = useState([]);
    const [categorys, setCategorys] = useState([]);

    useEffect(()=>{
        fetchProducts();
    }, []);

    const fetchProducts = async()=>{
        try{
            const res = await api.get("/home");

            setProducts(res.data);
            //Group by Categorys
            const grouped = res.data.reduce((acc, product)=>{
                if(!acc[product.category]){
                    acc[product.category] = [];
                }

                acc[product.category].push(product);
                return acc;
            }, {});

            setCategorys(grouped);

        }catch(err){
            console.log(err);
        }
    }

    const [search, setSearch] = useState("");

    //For Backdrop Slide (BannerSlider)    
    const images = [backdrop1, backdrop2, backdrop3];
    const [currentBackDropImage , setCurrentBackDropImage] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentBackDropImage((prev)=>
                prev === images.length - 1? 0 : prev + 1
            );
        }, 3000);
        return ()=> clearInterval(interval);
    }, []);
        
    return(
        <div className="home-main-container">
            <div className="first-nav-container"><FirstNavigation /></div>

            <div className="second-nav-container">
                <SecondNavigation
                    search={search} setSearch={setSearch}
                />
            </div>

            <div className="third-nav-container">
                <img src={images[currentBackDropImage]} alt="backdrop-image"/>
            </div>

            <div className="main-section-container">
                {Object.keys(categorys).filter((category)=>
                    categorys[category].some((product)=>
                    product.productname
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                ).map((category)=>(
                    <div key={category}>
                            <p style={{fontSize:"18px"}}>{category}</p>                        
                            <div style={{display:"flex", flexWrap:"wrap",
                                justifyContent:"center", gap:"10px"}}>
                                {categorys[category].filter((product)=>
                                    product.productname
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                ).map((product)=>(                                                                        
                                    <Link to={`/productdetail/${product._id}`} className="product-link"> 
                                        <div key={product._id} className="product-box">
                                            <img src={product.file} width="100"/>
                                            <div className="product-text">
                                                <h4>{product.productname}</h4>
                                                <p style={{fontSize:"14px"}}>Ks-{product.price}</p>                                            
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                            </div>
                        </div>                   
                ))}
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

export default Home;