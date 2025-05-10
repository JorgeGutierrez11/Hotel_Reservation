import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "./router/RoutesWithNotFound"
import { PrivateGuard } from "./router/guards/PrivateGuard"
import { PublicRouters } from "./router/routes/PublicRoutes"
import { PrivateRouter } from "./router/routes/PrivateRouters"


export const AppRoutes = () => {
    return (
        <RoutesWithNotFound>
            <Route>
                <Route path="/*" element={<PublicRouters />} />
            </Route>
            <Route element={<PrivateGuard />}>
                <Route path="/private/*" element={<PrivateRouter />} />
            </Route>
        </RoutesWithNotFound>
    )
}