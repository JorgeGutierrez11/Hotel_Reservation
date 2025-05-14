import { Navigate, Route } from "react-router"
import { RoutesWithNotFound } from "../RoutesWithNotFound"
import { Home } from "../../pages/Home"
import Profile from "../../pages/Profile"
import { Pruebas } from "../../pages/Pruebas"

export const PublicRouters = () => {
    return (
        <RoutesWithNotFound>
            <Route path="/" element={<Navigate to={"/shop"} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/prueba/:id" element={<Pruebas />} />
            <Route path="/profile" element={<Profile />} />
        </RoutesWithNotFound>
    )
}