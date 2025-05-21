import { Navigate, Route } from "react-router-dom"
import { RoutesWithNotFound } from "../RoutesWithNotFound"
import { Check } from "../../pages/Check.tsx"


export const  PrivateRouter = () => {
    return (
        <RoutesWithNotFound>
            <Route path="/" element={<Navigate to={"/dashboard"}/>}/>
            <Route path="/dashboard" element={<Check/>}/>
        </RoutesWithNotFound>
    )
}