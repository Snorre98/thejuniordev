import { Route, Routes } from "react-router-dom";
import { App } from "./App";
import { ROUTES } from "./routes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.frontend.home} element={<App />} />
      <Route path={ROUTES.frontend.messages} element={<App />} />
    </Routes>
  );
}