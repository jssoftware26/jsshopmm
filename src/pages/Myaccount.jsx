import React, {useState, useEffect} from "react";
import api from "../service/API.jsx";
import profilepicture from "../assets/profile-picture.png";
import { useNavigate } from "react-router-dom";

//Import Components
import FirstNavigation from "../components/first-navigation.jsx";

//Product Detail Style Import
import "./Myaccount.css";

import {Home} from "lucide-react";

function Myaccount(){

    const [myaccount, setMyAccount] = useState({});
    const navigate = useNavigate();

    //Logged in user
    const user = JSON.parse(
        sessionStorage.getItem("user")
    );

    useEffect(()=>{
        const fetchData = async()=>{
            const myaccDetail = await api.get(`/myaccount/${user._id}`);
            setMyAccount(myaccDetail.data);
        }
        fetchData();
    }, []);

    return(
        <div className="myaccount-container">
            <div className="myaccount-top-nav">
                <button onClick={()=>navigate("/")}><Home size={20} color="white"/></button>
                <FirstNavigation />
            </div>

            <div className="myaccount-second-nav">
                <p style={{fontSize:"20px"}}>
                    <span style={{fontWeight:"bold"}}>JS Shopping</span> - My Account
                </p>
            </div>          

            <div className="myaccount-main-section">          
                <div className="profile-picture">             
                    <img src={profilepicture}></img>
                    <p>Profile Picture</p>
                </div>
                <div className="account-detail">
                    <table>                        
                        <tbody>
                            <tr>
                                <td style={{width:"250px"}}>User Name</td>
                                <td>{myaccount.username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{myaccount.email}</td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>**********</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{myaccount.address}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{myaccount.phonenumber}</td>
                            </tr>
                            <tr>
                                <td>Created Date</td>
                                <td>{new Date(myaccount.createdAt).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                        <br/>                        
                        <br/>
                        <small style={{color:"#bbb"}}>@Copy-right by JS-Shop 2026</small>                
                    </table>
                </div>                
            </div>
            <div className="myaccount-left-panel"></div>
            <div className="myaccount-right-panel"></div>
        </div>
    )
}

export default Myaccount;