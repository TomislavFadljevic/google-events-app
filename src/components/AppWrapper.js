import { useContext } from "react";
import Login from "./login/Login";
import { UserContext } from "../contexts/UserContext";
import FileContextProvider from "../contexts/FileContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Drive from "./drive/Drive";
const AppWrapper = () => {
  // First check if user in local storage
  const { user } = useContext(UserContext);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            {!user.loggedIn ? <Login /> : <Redirect to="/drive" />}
          </Route>
          <Route path="/drive">
            {user.loggedIn ? (
              <FileContextProvider>
                <Drive />
              </FileContextProvider>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="">
            {user.loggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Redirect to="/drive" />
            )}
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default AppWrapper;
