import { Navigate, Outlet } from "react-router";
import { isTokenValid, getUserRoleFromToken } from './PrivateGuard.tsx';

interface RoleGuardProps {
    allowedRoles: string[];
}

export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
    const token = localStorage.getItem('token');

    if ((!token) || !isTokenValid(token)) {
        return <Navigate to="/home" replace />;
    }

    const role = getUserRoleFromToken(token);
    console.log("soy el rol", role)
    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />
}