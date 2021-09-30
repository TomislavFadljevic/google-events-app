import { createContext, useState } from "react";

export const UserContext = createContext();
const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    loggedIn: false,
  });
  // Callback function on login success (fills user obj with info)
  const loginSuccess = (response) => {
    // console.log(response);
    const user = {
      tokenId: response.tokenId,
      accessToken: response.accessToken,
      userProfile: { ...response.profileObj },
      loggedIn: true,
    };
    setUser({ ...user });
    // Store in local storage (keeps user logged in on refresh)
    localStorage.setItem("user", JSON.stringify({ ...user }));
  };
  // Callback function on login faliure
  const loginFaliure = (response) => {
    alert("Something went wrong with authorization! Try again");

    setUser({
      loggedIn: false,
    });
    // Store in local storage (keeps user logged in on refresh)
    localStorage.setItem("user", JSON.stringify({ loggedIn: false }));
  };
  // Callback function on logout success
  const logoutSuccess = (res) => {
    // console.log(res);
    setUser({
      loggedIn: false,
    });
    // Store in local storage (keeps user logged in on refresh)
    localStorage.setItem("loggedIn", false);
  };
  const logoutFaliure = (res) => {
    console.log(res);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loginSuccess,
        loginFaliure,
        logoutSuccess,
        logoutFaliure,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
