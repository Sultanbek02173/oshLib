import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/store/reducers/auth/auth";
import { eventHandler } from "../../shared/utils/eventHandlers";
import { useTranslation } from "react-i18next";
import GoogleLoginButton from "./GoogleLoginButton";

const LoginForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { 0: state, 1: setState } = useState({
    email: "",
    password: "",
  });
  const { category, error } = useAuth();

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = eventHandler(setState);
  const nav = useNavigate();

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
        <p className="login__form-label">{t("mail")}</p>
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
        <p className="login__form-label">{t("pass")}</p>
      )}

      <input
        className="register__form-input"
        type="password"
        onChange={onChange}
        name="password"
      />
      <Link className="login__form-forgot" to={"/forgot"}>
        {t("ForgotPass")}
      </Link>
      <button className="register__form-submit">{t("login")}</button>
      <GoogleLoginButton />

      <div className="login__form-row">
        <p className="login__form-no">{t("regAcc")}</p>
        <Link to={"/register"} className="login__form-register">
          {t("reg")}
        </Link>
        <button onClick={() => nav(-1)} className="login__form-back">
          {t("escape")}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
