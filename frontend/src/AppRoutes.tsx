import {Route, Routes} from "react-router-dom"
import {
    HomePage
} from "./Pages";
import { JrOutlet } from "./Components/JrOutlet";
import { ROUTES } from "./routes";

export function AppRoutes() {
    return(
        <Routes>
            <Route element = {<JrOutlet />}>
                <Route path={ROUTES.frontend.home} element={<HomePage />}></Route>
            </Route>
        </Routes>
    )
}