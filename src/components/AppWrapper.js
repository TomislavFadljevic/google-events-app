import { useContext } from "react";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import { UserContext } from "../contexts/UserContext";
import EventContextProvider from "../contexts/EventContext";
const AppWrapper = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      {user.loggedIn && (
        <EventContextProvider>
          <Dashboard />
        </EventContextProvider>
      )}
      {!user.loggedIn && <Login />}
    </>
  );
};

export default AppWrapper;
