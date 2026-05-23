import React, {useState, useEffect} from "react";
import api from "../../../service/API.jsx";

import "./Settings.css";

function Settings(){
    const[accinput, setAccInput] = useState({
        username:"",
        password:""       
    });

    const handleChange = async(e)=>{
        setAccInput({...accinput, [e.target.name]:e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const res = await api.post("/admin/settings", accinput);
            console.log(res.data.message);
            alert("Account action completed.");

            setAccInput({
                username:"",
                password:""
            });
        }catch(err){
            console.log(err);
        }
    }

    const[acclist, setAccList] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await api.get("/admin/settings");
            setAccList(res.data);
        }
        //Use Polling
        const interval = setInterval(fetchData, 1000);
        return()=>clearInterval(interval);
    }, []);

    return(
        <div className="setting-container">            
            <div className="setting-card-style1">
                <form onSubmit={handleSubmit}>
                    <p style={{fontSize:"20px", fontWeight:"bold", color:"#5a5a5a"}}>Create Account & Update</p>
                    <input
                        type="text"
                        placeholder="Username (or) Email"
                        onChange={handleChange}
                        name="username"
                        value={accinput.username}
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        onChange={handleChange}
                        name="password"
                        value={accinput.password}
                    />
                    <input type="submit" style={{width:"70px"}}/>
                </form>
            </div>
            <div className="setting-card-style2">
                <p style={{fontSize:"20px", fontWeight:"bold", color:"#5a5a5a"}}>Account Details</p>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Remove/Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acclist.map((item)=>(
                            <tr key={item._id}>
                                <td>{item.username}</td>
                                <td>{item.password}</td>
                                <td>
                                    <button onClick={()=>handleEdit(item)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Settings;