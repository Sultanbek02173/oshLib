import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAuth } from "../../app/store/reducers/auth/auth";
import { loginWithGoogle } from "../../app/store/reducers/auth/authThunks";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const {} = useAuth();

  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    dispatch(loginWithGoogle(token));
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleLoginButton;
