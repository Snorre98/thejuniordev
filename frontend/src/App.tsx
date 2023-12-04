import "./App.scss";
import { Screen } from "./Components/Screen/Screen.tsx";
import { Notification } from "./Components/Notification/Notification.tsx";

function App() {
  return (
    <>
      <Screen>
        <Notification />
      </Screen>
    </>
  );
}
export default App;
