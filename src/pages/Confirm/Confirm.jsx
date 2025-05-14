import "./confirm.scss";
import ConfirmForm from "../../widgets/Auth/ConfirmForm";
import { confirmCode } from "../../app/store/reducers/auth/authThunks";
import { useDispatch } from "react-redux";

const Confirm = () => {
  const dispatch = useDispatch();
  const onSubmit = async (newData) => {
    try {
      const response = await dispatch(confirmCode(newData)).unwrap();
      return response;
    } catch (error) {
      return { error };
    }
  };
  return (
    <section className="confirm">
      <div className="container">
        <h2 className="forgot__title">Изменить пароль</h2>
        <ConfirmForm onSubmit={onSubmit} />
      </div>
    </section>
  );
};

export default Confirm;
