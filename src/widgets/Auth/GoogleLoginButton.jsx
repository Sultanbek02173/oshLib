import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAuth } from "../../app/store/reducers/auth/auth";
import { loginWithGoogle } from "../../app/store/reducers/auth/authThunks";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {} = useAuth();

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      await dispatch(loginWithGoogle(token)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleLoginButton;
