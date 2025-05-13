import RegisterForm from "../../widgets/Auth/RegisterForm";
import { userRegister } from "../../app/store/reducers/auth/authThunks";
import { useDispatch } from "react-redux";
import image from "./image.png";
import "./register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const onSubmit = async (credentials) => {
    try {
      const response = await dispatch(userRegister(credentials)).unwrap();
      return response;
    } catch (error) {
      return { error };
    }
  };
  return (
    <section className="register">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="register__first">
              <h2 className="register__first-title">Регистрация</h2>
              <p className="register__first-subtitle">
                Давайте сначала зарегистрируемся, чтобы войти на сайт
              </p>
              <RegisterForm onSubmit={onSubmit} />
            </div>
          </div>
          <div className="col-6 register__second">
            <div className="register__info">
              <h2 className="register__info-title">Добро Пожаловать</h2>
              <p className="register__info-subtitle">
                Библиотека имени Токтогула Сатылганова
              </p>
              <p className="register__info-description">
                в крупнейшую библиотеку Кыргызстана – центр культуры, истории и
                образования. Получите доступ к тысячам книг, архивных материалов
                и современных цифровых ресурсов.
              </p>
              <img className="register__info-image" src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
