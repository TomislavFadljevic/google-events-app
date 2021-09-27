import { useContext } from "react";
import Login2 from "./login/Login2";
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
      {!user.loggedIn && <Login2 />}
    </>
  );
};

export default AppWrapper;
