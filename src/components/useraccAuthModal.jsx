import React, {useState} from "react";
import ReactDOM from "react-dom";
import "./useraccAuthModalStyle.css";

//Import Axios
import api from "../service/API";

function UserAccAuthModal({isOpen, onClose}){
    const [isLogin, setLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [userAccInput, setUserAccInput] = useState({
        username:"",
        email:"",
        password:"",
        phonenumber:"",
        address:""
    });

    const handleChange = (e)=>{
        setUserAccInput({...userAccInput, [e.target.name]:e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            //Login
            if(isLogin){
                const res = await api.post("/auth/login",{
                    email: userAccInput.email,
                    password: userAccInput.password
                });

                const user = res.data.useraccExist;

                //Safety Check for login
                if(!user || !user._id){
                    alert("Login failed: invalid user data");
                    return;
                }
                sessionStorage.setItem(
                    "user", JSON.stringify({
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        phonenumber: user.phonenumber,
                        address: user.address
                    }));
                    
                onClose();
            }else{
                //Signup
                const res = await api.post("/auth/signup", userAccInput);
                alert(res.data.message);
                setLogin(true);

                //Clear Form
                setUserAccInput({
                    username:"",
                    email:"",
                    password:"",
                    phonenumber:"",
                    address:""
                });
            }

        }catch(err){
            console.log(err);
            alert(err.response?.data?.message || "Something went wrong");
        }
    }

    if(!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="overlaystyle">
            <div className="modalstyle">
                {/*Close Button*/}
                <div className="row1">
                    <button onClick={onClose}>Close</button>
                </div>
                {/*Form*/}       
                <form onSubmit={handleSubmit} className="row2">
                    <h2>{isLogin ? "Login" : "Signup"}</h2>
                    {/*Signup Only*/}
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="Your name"
                                name="username"
                                value={userAccInput.username}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Phone number"
                                name="phonenumber"
                                value={userAccInput.phonenumber}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={userAccInput.address}
                                onChange={handleChange}
                            />
                        </>
                    )}

                    {/*Email*/}
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={userAccInput.email}
                        onChange={handleChange}
                    />

                    {/*Password Wrapper*/}
                    <div className="passwordwrapperstyle">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={userAccInput.password}
                            onChange={handleChange}
                        />
                        <span className="togglepasswordstyle" onClick={()=>setShowPassword(!showPassword)}>
                            {showPassword ? "hide":"show"}
                        </span>
                    </div>                    

                    <button type="submit">{isLogin ? "Login" : "Signup"}</button>
                </form>
                {/*Switch Login/Signup*/}
                <div className="row3">
                    <p>
                        {isLogin ? "Don't have account" : "Already have account"}

                        <span
                            onClick={()=> setLogin(!isLogin)}
                            style={{
                                color:"blue",
                                cursor:"pointer",
                                marginLeft:"5px"
                            }}
                        >
                            {isLogin ? "Signup" : "Login"}                        </span>
                    </p>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

export default UserAccAuthModal;