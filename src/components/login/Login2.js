import { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { UserContext } from "../../contexts/UserContext";
const Login2 = () => {
  const { user, loginSuccess, loginFaliure } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <p>Login to your Event app:</p>
      <GoogleLogin
        clientId="953904536832-f9n1591em77rroae9uokdp439qluifmm.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={loginSuccess}
        onFailure={loginFaliure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </>
  );
};

export default Login2;
