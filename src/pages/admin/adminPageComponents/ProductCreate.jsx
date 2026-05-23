import React, {useState, useEffect, useRef} from "react";

import "./ProductCreate.css";
import api from "../../../service/API.jsx";

function ProductCreate(){
    const [input, setInput] = useState({
        productcode:"",
        productname:"",
        category:"",
        price:"",
        brand:"",
        color:"",
        delifee:"3500",
        cashondeli:"",
        warranty:"Not Avaliable",
        description:""
    });
    const handleChange = (e)=>{
        setInput({...input, [e.target.name]:e.target.value});
    }

    //Upload File
    const [file, setFile] = useState(null);
    const handleFileChange = (e)=>{
        setFile(e.target.files[0]);
    }

    //Reset file input after submit
    const fileRef = useRef();

    const handleSubmit =async(e)=>{
        e.preventDefault();

        try{
            if(edited){
                //Update
                const formData = new FormData();                
                formData.append("productname", input.productname);
                formData.append("category", input.category);
                formData.append("price", input.price);
                formData.append("brand", input.brand);
                formData.append("color", input.color);
                formData.append("delifee", input.delifee);
                formData.append("cashondeli", input.cashondeli);
                formData.append("warranty", input.warranty);
                formData.append("description", input.description);
                if(file){
                    formData.append("file", file);
                }

                const res = await api.put(`/admin/productcreate/${edited}`, formData);

                setListdata((prev)=>
                    prev.map(item=>
                        item._id === edited? res.data : item
                    )
                );
                alert("Update Successfully");
                setInput({                    
                    productname:"",
                    category:"",
                    price:"",
                    brand:"",
                    color:"",
                    delifee:"",
                    cashondeli:"",
                    warranty:"",
                    description:""
                });
                setFile(null);
                fileRef.current.value=""; //This fixed it.                

            }else{
                const formData = new FormData();                
                formData.append("productname", input.productname);
                formData.append("category", input.category);
                formData.append("price", input.price);
                formData.append("brand", input.brand);
                formData.append("color", input.color);
                formData.append("delifee", input.delifee);
                formData.append("cashondeli", input.cashondeli);
                formData.append("warranty", input.warranty);
                formData.append("description", input.description);
                formData.append("file", file);

                const res = await api.post("/admin/productcreate", formData, {
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                });
                console.log(res.data);
                alert("Successfully Inserted");

                setInput({                    
                    productname:"",
                    category:"",
                    price:"",
                    brand:"",
                    color:"",
                    delifee:"",
                    cashondeli:"",
                    warranty:"",
                    description:""
                });
                setFile(null);
                fileRef.current.value=""; //This fixed it.
            }
        }catch(err){
            console.log(err);
            alert("Not successfully")
        }
    }

    const [listdata, setListdata] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await api.get("/admin/productcreate");
            setListdata(res.data);
        };
        //Use Polling
        const interval = setInterval(fetchData, 1000);
        return()=> clearInterval(interval);
    }, []);

    //Delete Button
    const handleDelete = async(id)=>{
        try{
            await api.delete(`/admin/productcreate/${id}`)
            alert("Deleted");
        }catch(err){
            console.log(err);
        }
    }

    //Edit Button
    const [edited, setEdited] = useState(null);
    const handleEdit = (item)=>{
        setInput({   
            productcode: item.productcode,         
            productname: item.productname,
            category: item.category,
            price: item.price,
            brand: item.brand || "",
            color: item.color || "",
            delifee: item.delifee || "",
            cashondeli: item.cashondeli || "",
            warranty: item.warranty || "",
            description: item.description || ""
        });
        setEdited(item._id);
    }


    return(
        <div className="container">
            <div className="card1">
                <h3>Products Create & Edit </h3>
                <form className="formstyle" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Code"
                        name="productcode"
                        value={input.productcode}
                        onChange={handleChange}
                        readOnly
                        >                    
                    </input>
                    <input
                        type="text"
                        placeholder="Product Name"
                        name="productname"
                        value={input.productname}
                        onChange={handleChange}
                        >                    
                    </input>
                    <select
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={input.category}
                        onChange={handleChange}>
                            <option value="">Select Category</option>
                            <option value="Electronic Devices">Electronic Devices</option>
                            <option value="Electronic Accessories">Electronic Accessories</option>
                            <option value="Boy Cloths">Boy Cloths</option>
                            <option value="Girl Cloths">Girl Cloths</option>
                            <option value="Baby Cloths & Accessories">Baby Cloths & Accessories</option>
                            <option value="Cosmetics">Cosmetics</option>
                            <option value="Fancys">Fancys</option>
                            <option value="Perfumes">Perfumes</option>
                            <option value="Furniture">Furniture</option>                           
                    </select>
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={input.price}
                        onChange={handleChange}
                        >                    
                    </input>
                    <input
                        type="text"
                        placeholder="Brand"
                        name="brand"
                        value={input.brand}
                        onChange={handleChange}
                        >                    
                    </input>
                    <select
                        type="text"
                        placeholder="Deli-Fee"
                        name="delifee"
                        value={input.delifee}
                        onChange={handleChange}
                        >
                            <option value="3500">3500</option>
                            <option value="4800">4800</option>
                            <option value="9800">9800</option>
                            <option value="14800">14800</option>
                    </select>  
                    <select
                        type="text"
                        placeholder="Color"
                        name="color"
                        value={input.color}
                        onChange={handleChange}
                        >
                            <option value="">Select Color</option>
                            <option value="Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Green">Green</option>
                            <option value="Black">Black</option>
                            <option value="Silver">Silver</option>
                            <option value="Brown">Brown</option>
                            <option value="White">White</option>
                    </select>                    
                    <select
                        type="text"
                        placeholder="CashonDelivery"
                        name="cashondeli"
                        value={input.cashondeli}
                        onChange={handleChange}
                        >
                            <option value="">Cash on Delivery Avaliable (or) Not</option>          
                            <option value="Avaliable">Avaliable</option>
                            <option value="Unavaliable">Unavaliable</option>                         
                    </select>
                    <select
                        type="text"
                        placeholder="Warranty"
                        name="warranty"
                        value={input.warranty}
                        onChange={handleChange}
                        >
                            <option value="">Warranty Not Avaliable (or) Select</option>
                            <option value="3 Months">3 Months</option>
                            <option value="6 Months">6 Months</option>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Years">2 Years</option>                            
                            <option value="3 Years">3 Years</option>                            
                    </select>                                   
                    <textarea
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={input.description}
                        onChange={handleChange}
                        >                    
                    </textarea>
                    <input type="file" onChange={handleFileChange}
                        ref={fileRef} style={{fontSize:"13px"}}>
                    </input>
                    <input type="submit" />
                </form>
            </div>
            <div className="card2">
                <table>
                    <thead>
                        <tr>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th>Delete/Edit</th>                           
                        </tr>
                    </thead>
                    <tbody>
                        {listdata.map((item)=>(
                            <tr key={item._id}>
                                <td>{item.productcode}</td>
                                <td>{item.productname}</td>
                                <td><button onClick={()=>handleDelete(item._id)}>
                                    Delete
                                    </button>
                                    <button onClick={()=>handleEdit(item)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductCreate;