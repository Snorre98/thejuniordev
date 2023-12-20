import { Route, Routes } from "react-router-dom";
import { HomePage, MessagesPage, ChatPage } from "./Pages";
import { JrOutlet } from "./Components/JrOutlet";
import { ROUTES } from "./routes";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<JrOutlet />}>
        <Route path={ROUTES.frontend.home} element={<HomePage />}></Route>
        <Route
          path={ROUTES.frontend.messages}
          element={<MessagesPage />}></Route>
        <Route path={ROUTES.frontend.chat} element={<ChatPage />}></Route>
      </Route>
    </Routes>
  );
}
