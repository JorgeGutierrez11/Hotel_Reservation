import { Navigate, Outlet } from "react-router-dom";


const isTokenValid = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Date.now() / 1000;
        return payload.exp && payload.exp > now;
    } catch {
        return false;
    }
}

export const PrivateGuard = () => {
    const token = localStorage.getItem("token")

    if (!token || !isTokenValid(token)) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}