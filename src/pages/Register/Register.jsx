import RegisterForm from "../../widgets/Auth/RegisterForm";
import { userRegister } from "../../app/store/reducers/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { regLogFetch } from "../../app/store/reducers/regLogSlice";


import "./register.scss";
import { useTranslation } from "react-i18next";

const Register = () => {
    const { t } = useTranslation();
  const dispatch = useDispatch();
  const onSubmit = async (credentials) => {
    try {
      const response = await dispatch(userRegister(credentials)).unwrap();
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
    <section className="register">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="register__first">
              <h2 className="register__first-title">
                {t("register")}
              </h2>
              <p className="register__first-subtitle">{t("registerFirst")}</p>
              <RegisterForm onSubmit={onSubmit} />
            </div>
          </div>
          <div className="col-6 register__second">
            <div className="register__info">
              <h2 className="register__info-title">
                {data?.title_reg}

              </h2>

              <p className="register__info-subtitle">
                Библиотека имени Токтогула Сатылганова
              </p>
              <p className="register__info-description">
                {data?.description_reg}
              </p>
              <img
                className="register__info-image"
                src={data?.image_reg}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
