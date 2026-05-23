import React, {useState} from "react";
import UserAccAuthModal from "./useraccAuthModal.jsx";
import { useNavigate } from "react-router-dom";

import {Clipboard, ShoppingCart, User} from "lucide-react";

function FirstNavigation(){
    const navigate = useNavigate();

    //Dropdown State
    const [showMenu, setShowMenu] = useState(false);

    //User Account Logout
    const handleLogout = ()=>{
        sessionStorage.removeItem("user");
        window.location.reload();
    }
    //Portal Section
    const [open, setOpen] = useState(false);

    return(
        <div className="firstnav-style" style={{
            display:"flex",
            flexDirection:"row"
        }}>
            {sessionStorage.getItem("user") ? (
                <>
                    {/*User Button*/}
                    <button onClick={()=>setShowMenu(!showMenu)} style={{
                        borderStyle:"none",
                        background:"none",
                        color:"#e5ff00",
                        cursor:"pointer",
                        fontSize:"15px"
                    }}>
                        Welcome, 
                        {
                            JSON.parse(
                                sessionStorage.getItem("user")
                            ).username
                        }                        
                    </button>
                    {/*Dropdown Menu*/}
                    {showMenu && (
                        <div style={{
                            position:"absolute",
                            top:"26px",
                            background:"#9999a1",                                             
                            padding:"10px",
                            borderRadius:"10px",
                            display:"flex",
                            flexDirection:"column",
                            gap:"30px",
                            width:"180px"                                                  
                        }}>
                            <span style={{display:"flex", alignItems:"center"}}>
                                <Clipboard size={20} color="white"/>
                                <button onClick={()=>navigate("/myorder")} style={{
                                    border:"none",
                                    background:"none",
                                    cursor:"pointer",
                                    color:"white",
                                    textAlign:"left",
                                    fontSize:"18px"                                    
                                }}>
                                    My Orders
                                </button>                            
                            </span>
                            <span style={{display:"flex", alignItems:"center"}}>
                                <ShoppingCart size={20} color="white"/>
                                <button onClick={()=>navigate("/productcart")} style={{
                                    border:"none",
                                    background:"none",
                                    cursor:"pointer",
                                    color:"white",
                                    textAlign:"left",
                                    fontSize:"18px"
                                }}>
                                    Go to Cart
                                </button>                            
                            </span>
                            <span style={{display:"flex", alignItems:"center"}}>
                                <User size={20} color="white"/>
                                <button onClick={()=>navigate("/myaccount")} style={{
                                    border:"none",
                                    background:"none",
                                    cursor:"pointer",
                                    color:"white",
                                    textAlign:"left",
                                    fontSize:"18px"
                                }}>
                                    My Account
                                </button>                            
                            </span>
                        </div>
                    )}

                    <button onClick={handleLogout} style={{
                        borderStyle:"none",
                        background:"#ff6000",
                        color:"white",
                        cursor:"pointer",
                        fontSize:"15px"
                    }}>
                        Logout
                    </button>
                </>

                ) : (

                <>
                    <button onClick={()=>setOpen(true)} style={{
                        borderStyle:"none",
                        background:"none",
                        color:"white",
                        cursor:"pointer",
                        fontSize:"15px"
                    }}>
                        Login / Signup
                    </button>

                    <UserAccAuthModal
                        isOpen={open}
                        onClose={()=> setOpen(false)}
                    />
                </>

            )}
        </div>
    )
}

export default FirstNavigation;