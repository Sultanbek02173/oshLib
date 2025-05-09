import React from "react";
import LoginForm from "../../widgets/Auth/LoginForm";
import { useDispatch } from "react-redux";
import { userLogin } from "../../app/store/reducers/auth";
import "./Login.scss";
const Login = () => {
  const dispatch = useDispatch();

  const onSubmit = async (credentials) => {
    try {
      const response = await dispatch(userLogin(credentials)).unwrap();
      return response;
    } catch (error) {
      return { error };
    }
  };

  return (
    <section className="login">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="login__first">
              <h2 className="login__first-title">Добро Пожаловать </h2>
              <p className="login__first-subtitle">
                Библиотека имени Токтогула Сатылганова
              </p>
              <p className="login__first-description">
                в крупнейшую библиотеку Кыргызстана – центр культуры, истории и
                образования. Получите доступ к тысячам книг, архивных материалов
                и современных цифровых ресурсов.
              </p>
            </div>
          </div>
          <div className="col-6">
            <div className="login__second">
              <h2 className="login__second-title">Войти</h2>
              <p className="login__second-subtitle">
                Пожалуйста, введите свой адрес электронной почты и пароль
              </p>
              <LoginForm onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
