import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const isLoggedIn = sessionStorage.getItem("username");
    
    if(!isLoggedIn){
        return <Navigate to="/admin" />
    }
    return children;
}

export default ProtectedRoute;