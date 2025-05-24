import { Navigate, Outlet } from "react-router-dom";


export const isTokenValid = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Date.now() / 1000;
        return payload.exp && payload.exp > now;
    } catch {
        return false;
    }
}

/* 
  "roles": [
    {
      "authority": "ROLE_USER"
    }
*/
export const getUserRoleFromToken = (token: string): string => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const roles = payload.roles;
        return roles[0].authority.replace('ROLE_', '');

    } catch {
        return "UNKNOWN_ROLE";
    }
}

export const PrivateGuard = () => {
    const token = localStorage.getItem("token")

    if (!token || !isTokenValid(token)) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}