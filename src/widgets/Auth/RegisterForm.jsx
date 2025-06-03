import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/store/reducers/auth/auth";
import { eventHandler } from "../../shared/utils/eventHandlers";
import { getCategory } from "../../app/store/reducers/auth/authThunks";
import { useTranslation } from "react-i18next";
import GoogleLoginButton from "./GoogleLoginButton";

const RegisterForm = ({ onSubmit }) => {
  const { 0: state, 1: setState } = useState({
    full_name: "",
    gender: "1",
    birth_date: "",
    category: "1",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });
  const [agree, setAgree] = useState(false);
  const { t } = useTranslation();

  const { category, error } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChange = eventHandler(setState);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      alert("Пожалуйста, подтвердите согласие с условиями!");
      return;
    } else {
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
    }
  };

  // console.log(pathname);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <form className="register__form" onSubmit={onFormSubmit}>
      <div className="register__form-row">
        <div>
          {error?.full_name && !state.full_name ? (
            <p className="register__form-error">
              Это поле не может быть пустым.
            </p>
          ) : (
            <p className="register__form-label">{t("FullName")}</p>
          )}
          <input
            type="text"
            value={state.full_name}
            className="register__form-input"
            onChange={onChange}
            name="full_name"
          />
        </div>
        <div>
          <p className="register__form-label">{t("gender")}</p>
          <select
            name="gender"
            className="register__form-input"
            onChange={onChange}
          >
            <option value="1">{t("male")}</option>
            <option value="2">{t("female")}</option>
          </select>
          {/* <input
            type="text"
            className="register__form-input"
            onChange={onChange}
            name="gender"
          /> */}
        </div>
      </div>
      <div className="register__form-row">
        <div>
          <p className="register__form-label">{t("dateOfBirth")}</p>

          <input
            type="date"
            className="register__form-input"
            onChange={onChange}
            name="birth_date"
          />
        </div>
        <div>
          <p className="register__form-label">{t("category")}</p>
          <select
            name="category"
            className="register__form-input"
            onChange={onChange}
          >
            <option disabled>Категории:</option>
            {category.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="register__form-row">
        <div>
          {error?.email && !state.email ? (
            <p className="register__form-error">
              Это поле не может быть пустым.
            </p>
          ) : (
            <p className="register__form-label">{t("mail")}</p>
          )}
          <input
            type="text"
            className="register__form-input"
            onChange={onChange}
            value={state.email}
            name="email"
          />
        </div>
        <div>
          {error?.phone && !state.phone ? (
            <p className="register__form-error">
              Это поле не может быть пустым.
            </p>
          ) : (
            <p className="register__form-label">{t("tel")}</p>
          )}
          <input
            type="text"
            className="register__form-input"
            onChange={onChange}
            value={state.phone}
            name="phone"
            placeholder="+996XXXXXXXXX"
          />
        </div>
      </div>
      <div className="register__form-row">
        <div>
          {/* <input type="file" onChange={onFileChange} name="image" /> */}
          {error?.password && !state.password ? (
            <p className="register__form-error">
              Это поле не может быть пустым.
            </p>
          ) : (
            <p className="register__form-label">{t("pass")}</p>
          )}
          <input
            type="text"
            className="register__form-input"
            onChange={onChange}
            name="password"
          />
        </div>
        <div>
          {error?.password2 && !state.password2 ? (
            <p className="register__form-error">
              Это поле не может быть пустым.
            </p>
          ) : (
            <p className="register__form-label">{t("pass2")}</p>
          )}
          <input
            type="text"
            className="register__form-input"
            onChange={onChange}
            name="password2"
          />
        </div>
      </div>
      <div className="register__form-confirm">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <p>{t("TermsOfUse")}</p>
      </div>
      <button className="register__form-submit">{t("regBtn")}</button>
      <GoogleLoginButton />
      <div className="login__form-row">
        <p className="login__form-no">{t("doHaveAcc")}</p>
        <Link to={"/login"} className="login__form-register">
          {t("loginInAcc")}
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
