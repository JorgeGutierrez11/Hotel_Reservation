import { Navigate, Route } from "react-router"
import { RoutesWithNotFound } from "../RoutesWithNotFound"
import { Home } from "../../pages/Home"
import RoomDetials from "../../pages/RoomDetails"

export const PublicRouters = () => {
    return (
        <RoutesWithNotFound>
            <Route path="/" element={<Navigate to={"/shop"} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/roomDetails/:id" element={<RoomDetials/>} />
        </RoutesWithNotFound>
    )
}