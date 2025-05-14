import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/store/reducers/auth/auth";
import { eventHandler } from "../../shared/utils/eventHandlers";

const LoginForm = ({ onSubmit }) => {
  const { 0: state, 1: setState } = useState({
    email: "",
    password: "",
  });
  const { category, error } = useAuth();

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = eventHandler(setState);
  const nav = useNavigate()

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await onSubmit(state);

      if (result?.error) {
        console.log("Ошибка от сервера:", result.error);
        return;
      }

      navigate("/");
    } catch (err) {
      console.log("Ошибка при отправке:", err);
    }
  };

  return (
    <form className="login__form" onSubmit={onFormSubmit}>
      {error?.detail && <p className="register__form-error">{error.detail}</p>}
      {!state.email.trim() && error?.email ? (
        <p className="register__form-error">{error.email[0]}</p>
      ) : (
        <p className="login__form-label">Почта</p>
      )}

      <input
        className="register__form-input"
        type="text"
        onChange={onChange}
        name="email"
      />

      {!state.password.trim() && error?.password ? (
        <p className="register__form-error">{error.password[0]}</p>
      ) : (
        <p className="login__form-label">Пароль</p>
      )}

      <input
        className="register__form-input"
        type="password"
        onChange={onChange}
        name="password"
      />
      <Link className="login__form-forgot" to={"/forgot"}>
        Забыл пароль
      </Link>
      <button className="register__form-submit">Войти</button>
      <div className="login__form-row">
        <p className="login__form-no">У вас нет учетной записи?</p>
        <Link to={"/register"} className="login__form-register">
          Зарегистрироваться
        </Link>
        <button onClick={() => nav(-1)} className="login__form-back">Назад</button>
      </div>

    </form>
  );
};

export default LoginForm;
