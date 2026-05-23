import React, { useEffect, useState } from "react";
import api from "../../../service/API.jsx";

import { useOutletContext } from "react-router-dom";

import "./ProductList.css";

function ProductList(){
    const [listdata, setListdata] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await api.get("/admin/productlist");
            setListdata(res.data);
        }
        //Use Polling
        const interval = setInterval(fetchData, 1000);
        return()=> clearInterval(interval);
    }, []);

    //Search
    const {search} = useOutletContext();   

    return(
        <div className="productlist-container">
            <p style={{
                fontSize:"25px", fontWeight:"bold", marginBottom:"10px",
                textAlign:"center"
                }}>PRODUCT-LISTS</p>
            <div className="tablebox-style">
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th>Color</th>
                            <th>Deli-Fee</th>
                            <th>Cash on Delivery</th>
                            <th>Warranty</th>                            
                            <th>Photos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listdata.filter((item)=>
                            item.productcode
                                .toLowerCase()
                                .includes(search.toLowerCase())
                                ||
                            item.productname
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        ).map((item)=>(                                                      
                            <tr key={item._id}>
                                <td>{item.productcode}</td>
                                <td>{item.productname}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>{item.brand}</td>
                                <td>{item.color}</td>
                                <td>{item.delifee}</td>
                                <td>{item.cashondeli}</td>
                                <td>{item.warranty}</td>                                
                                <td>{item.file && (
                                    <img src={item.file}
                                    width="50px"/>
                                )}</td>
                            </tr>
                            ))
                        }
                    </tbody>                 
                </table>
            </div>
        </div>
    )
}

export default ProductList;