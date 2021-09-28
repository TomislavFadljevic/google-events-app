import "bootswatch/dist/lux/bootstrap.min.css";
import AppWrapper from "./components/AppWrapper";
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <AppWrapper />
      </UserContextProvider>
    </div>
  );
}
export default App;
