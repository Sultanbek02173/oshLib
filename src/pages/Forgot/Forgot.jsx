import ForgotForm from "../../widgets/Auth/ForgotForm";
import "./forgot.scss";
import { useDispatch } from "react-redux";
import { sendCode } from "../../app/store/reducers/auth/authThunks";

const Forgot = () => {
  const dispatch = useDispatch();
  const onSubmit = async (email) => {
    try {
      const response = await dispatch(sendCode(email)).unwrap();
      return response;
    } catch (error) {
      return { error };
    }
  };
  return (
    <section className="forgot">
      <div className="container">
        <h2 className="forgot__title">Забыл пароль</h2>
        <ForgotForm onSubmit={onSubmit} />
      </div>
    </section>
  );
};

export default Forgot;
