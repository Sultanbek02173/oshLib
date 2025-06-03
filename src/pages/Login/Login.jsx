import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../app/store/reducers/auth/authThunks";
import { regLogFetch } from "../../app/store/reducers/regLogSlice";
import LoginForm from "../../widgets/Auth/LoginForm";
import "./Login.scss";

const Login = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onSubmit = async (credentials) => {
    try {
      const response = await dispatch(userLogin(credentials)).unwrap();
      return response;
    } catch (error) {
      return { error };
    }
  };

  const { data } = useSelector((state) => state.regLog);

  useEffect(() => {
    dispatch(regLogFetch());
  }, [dispatch]);

  return (
    <section className="login">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="login__first">
              <h2 className="login__first-title">{data?.title_log}</h2>
              <p className="login__first-subtitle">
                Библиотека имени Токтогула Сатылганова
              </p>
              <p className="login__first-description">
                {data?.description_log}
              </p>
            </div>
          </div>
          <div className="col-6">
            <div className="login__second">
              <h2 className="login__second-title">{t("login")}</h2>
              <p className="login__second-subtitle">{t("enterAdres")}</p>
              <LoginForm onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
