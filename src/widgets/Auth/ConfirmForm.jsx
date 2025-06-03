import React, { useState } from "react";
import { eventHandler } from "../../shared/utils/eventHandlers";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/store/reducers/auth/auth";

const ConfirmForm = ({ onSubmit }) => {
  const { 0: state, 1: setState } = useState({
    code: "",
    new_password: "",
  });
  const { error } = useAuth();
  console.log(error);

  const navigate = useNavigate();
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
      alert("Успешно поменяли пароль");
      navigate("/login");
    } catch (err) {
      console.log("Ошибка при отправке:", err);
    }
  };
  return (
    <form onSubmit={onFormSubmit} className="confirm__form">
      {error?.detail && <p className="register__form-error">{error.detail}</p>}
      <div>
        {error?.code && <p className="register__form-error">{error.code}</p>}
        <input
          type="text"
          name="code"
          onChange={onChange}
          className="forgot__form-input"
          placeholder="Код подтверждения"
          maxLength={6}
        />
      </div>
      <div>
        {error?.new_password && (
          <p className="register__form-error">{error.new_password[0]}</p>
        )}
        <input
          type="password"
          name="new_password"
          onChange={onChange}
          className="forgot__form-input"
          placeholder="Новый пароль"
        />
      </div>
      <button className="forgot__form-submit">Изменить пароль</button>
    </form>
  );
};

export default ConfirmForm;
