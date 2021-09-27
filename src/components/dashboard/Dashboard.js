import { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { UserContext } from "../../contexts/UserContext";
import AddEventBtn from "./AddEventBtn";
import Events from "./Events";
const Dashboard = () => {
  const { user, logoutSuccess } = useContext(UserContext);
  return (
    <>
      <div>Welcome {user.userProfile.givenName} to your Event App</div>
      <Events />
      <GoogleLogout
        clientId="953904536832-f9n1591em77rroae9uokdp439qluifmm.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logoutSuccess}
      />
      <AddEventBtn />
    </>
  );
};

export default Dashboard;
