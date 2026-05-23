import React, {useState} from "react";
import "./AdminLoginStyle.css";
import api from "../../service/API.jsx";
import { useNavigate } from "react-router-dom";

function AdminLogin(){
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const res = await api.post("/admin/adminlogin", {
                username,
                password
            });
            alert(res.data.message);

            //Store Login State
            sessionStorage.setItem("username", "true");
            
            navigate("/admin/dashboard");

        }catch(err){
            alert(err.response?.data?.message || "Login failed!");
        }
    }

    return(
        <div className="admin-main-container">
            <div className="admin-login-form">
                <form onSubmit={handleSubmit} className="form-style">
                    <h2>ADMIN LOGIN</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e)=>setUsername(e.target.value)}
                    />

                    {/*Password Wrapper*/}
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <span className="toggle-password" onClick={()=>setShowPassword(!showPassword)}>
                            {showPassword ? "hide":"show"}
                        </span>
                    </div>

                    <button type="submit">LOGIN</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin;