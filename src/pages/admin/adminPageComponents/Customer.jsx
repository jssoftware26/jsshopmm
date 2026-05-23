import React, {useState, useEffect} from "react";
import "./Customer.css";

import api from "../../../service/API";

function Customer(){
    const [customerlist, setCustomerList] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await api.get("/admin/customer");
                setCustomerList(res.data);
            }catch(err){
                console.log(err);
            }
        }
        //First Load
        fetchData();
        //Use Polling
        const interval = setInterval(fetchData, 1000);
        return ()=> clearInterval(interval);
    }, []);

    return(
        <div className="customer-container">
            <p style={{
                fontSize:"25px", fontWeight:"bold", marginBottom:"10px",
                textAlign:"center"
                }}>CUSTOMER-LISTS</p>
            <div className="customerlist-table-style">
                <table>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Customer Name</th>
                            <th>Customer Name</th>
                        </tr>                                        
                    </thead>
                    <tbody>
                        {customerlist.map((item)=>(
                            <tr key={item._id}>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                                <td>{item.phonenumber}</td>
                                <td>{item.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Customer;