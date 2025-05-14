import React, { useState } from "react";
import { eventHandler } from "../../shared/utils/eventHandlers";
import { useAuth } from "../../app/store/reducers/auth/auth";
import { useNavigate } from "react-router-dom";

const ForgotForm = ({ onSubmit }) => {
  const { error } = useAuth();
  const navigate = useNavigate();
  const { 0: state, 1: setState } = useState({
    email: "",
  });
  const onChange = eventHandler(setState);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await onSubmit(state);

      if (result?.error) {
        console.log("Ошибка от сервера:", result.error);
        return;
      }
      // console.log(result);

      navigate("/confirm");
    } catch (err) {
      console.log("Ошибка при отправке:", err);
    }
  };

  return (
    <form onSubmit={onFormSubmit} className="forgot__form">
      <div>
        {error?.detail && (
          <p className="register__form-error">{error.detail}</p>
        )}
        {!state.email.trim() && error?.email && (
          <p className="register__form-error">{error.email[0]}</p>
        )}
        <input
          type="email"
          className="forgot__form-input"
          name="email"
          placeholder="Электронная почта"
          onChange={onChange}
        />
      </div>
      <button className="forgot__form-submit">Отправить</button>
    </form>
  );
};

export default ForgotForm;
