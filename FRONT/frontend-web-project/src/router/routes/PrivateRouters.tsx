import { Navigate, Route } from "react-router-dom"
import { RoutesWithNotFound } from "../RoutesWithNotFound"
import { Login } from "../../pages/Login"

export const  PrivateRouter = () => {
    return (
        <RoutesWithNotFound>
            <Route path="/" element={<Navigate to={"/dashboard"}/>}/>
            <Route path="/dashboard" element={<Login/>}/>
        </RoutesWithNotFound>
    )
}