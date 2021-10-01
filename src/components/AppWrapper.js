import { useContext } from "react";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import { UserContext } from "../contexts/UserContext";
import EventContextProvider from "../contexts/EventContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
const AppWrapper = () => {
  // First check if user in local storage
  const { user } = useContext(UserContext);
  // if (localStorage.getItem("user") !== null)
  //   user = JSON.parse(localStorage.getItem("user"));

  // console.log(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            {!user.loggedIn ? <Login /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path="/dashboard">
            {user.loggedIn ? (
              <EventContextProvider>
                <Dashboard />
              </EventContextProvider>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="">
            {user.loggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Redirect to="/dashboard" />
            )}
          </Route>
        </Switch>
      </Router>
      {/* {user.loggedIn && (
        <EventContextProvider>
          <Dashboard />
        </EventContextProvider>
      )}
      {!user.loggedIn && <Login />} */}
    </>
  );
};

export default AppWrapper;
