import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../RoutesWithNotFound"
import { Check } from "../../pages/Check.tsx"
import { RoleGuard } from "../guards/RoleGuard.tsx"
import Profile from "../../pages/Profile.tsx"


export const PrivateRouter = () => {
    return (
        <RoutesWithNotFound>
            <Route path="/profile" element={<Profile />} />

            <Route element={<RoleGuard allowedRoles={['ADMIN']} />}>
                <Route path="/reception" element={<Check />} />
            </Route>

           {/*  <Route element={<RoleGuard allowedRoles={['USER']} />}>
            </Route> */}
        </RoutesWithNotFound>
    )
}