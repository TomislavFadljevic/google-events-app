import { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { UserContext } from "../../contexts/UserContext";
const Login = () => {
  const { loginSuccess, loginFaliure } = useContext(UserContext);
  // console.log(user);
  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="text-center">
          EVENT<span className="text-muted">APP</span>
        </h1>
        <h6 className="text-center">
          Organize and structure events the way you want
        </h6>
        <div className="text-center">
          <GoogleLogin
            clientId="953904536832-f9n1591em77rroae9uokdp439qluifmm.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={loginSuccess}
            onFailure={loginFaliure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
