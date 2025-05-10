import { Navigate, Outlet } from "react-router-dom";

export const PrivateGuard = () => {
    /* const autenticated = false; */
    const token = localStorage.getItem("token")

    return token ? <Outlet/> : <Navigate to={"/login"} replace/>
    
}