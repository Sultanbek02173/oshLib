import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCategory, useAuth } from "../../app/store/reducers/auth";

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

  const { category, error } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const onFileChange = (e) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  // const onFormSubmit = (e) => {
  //   e.preventDefault();

  //   const hasErrors = !!error && Object.keys(error).length > 0;

  //   if (hasErrors) {
  //     alert("Пожалуйста, исправьте ошибки в форме!");
  //     return;
  //   }

  //   if (!agree) {
  //     alert("Пожалуйста, подтвердите согласие с условиями!");
  //     return;
  //   }

  //   onSubmit(state);
  //   navigate("/");
  // };

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
            <p className="register__form-label">ФИО</p>
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
          <p className="register__form-label">Пол</p>
          <select
            name="gender"
            className="register__form-input"
            onChange={onChange}
          >
            <option value="1">Мужской</option>
            <option value="2">Жеснкий</option>
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
          <p className="register__form-label">Дата рождение</p>

          <input
            type="date"
            className="register__form-input"
            onChange={onChange}
            name="birth_date"
          />
        </div>
        <div>
          <p className="register__form-label">Категорий</p>
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
          {/* <input
            type="text"
            className="register__form-input"
            onChange={onChange}
            name="category"
          /> */}
        </div>
      </div>
      <div className="register__form-row">
        <div>
          {error?.email && !state.email ? (
            <p className="register__form-error">
              Это поле не может быть пустым.
            </p>
          ) : (
            <p className="register__form-label">Эл. почта</p>
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
            <p className="register__form-label">Телефон</p>
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
            <p className="register__form-label">Пароль</p>
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
            <p className="register__form-label">Повторите Пароль</p>
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
        <p>
          Создавая учетную запись, вы соглашаетесь с нашими <br /> Условиями
          использования.
        </p>
      </div>
      <button className="register__form-submit">Регистрация</button>
      <div className="login__form-row">
        <p className="login__form-no">У вас есть учетная запись?</p>
        <Link to={"/register"} className="login__form-register">
          Войти в аккаунт
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
