import React from "react";
import jsshoplogo from "../assets/js-shop-logo.png";
import {ShoppingCart} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./second-navigation.css";

function SecondNavigation({search, setSearch}){
    const navigate = useNavigate();

    const handleCartClick = ()=>{
        const user = sessionStorage.getItem("user");
        if(user){
            navigate("/productcart");
        }else{
            alert("Please login first");
            navigate("/");
        }
    }

    return(
        <div className="second-nav-style">
            <img src={jsshoplogo} style={{width:"60px"}}></img>
            <input
                type="text"
                placeholder="Search Products"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            ></input>
            <nav onClick={handleCartClick} style={{cursor:"pointer"}}>
                <ShoppingCart color="white"/>
            </nav>            
        </div>
    )
}

export default SecondNavigation;