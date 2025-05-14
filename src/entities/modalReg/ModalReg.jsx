import { useDispatch } from "react-redux";
import { IoCheckmark } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { logoutUser } from "../../app/store/reducers/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./modalReg.scss";

export const ModalReg = ({
    isModalOpen,
    setIsModalOpen,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    isBurgerOpen,
    setIsBurgerOpen,
}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("access");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (isBurgerOpen) {
        setIsBurgerOpen(false);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
        dispatch(logoutUser());
        if (isBurgerOpen) {
        setIsBurgerOpen(false);
        }
        setTimeout(() => {
        setIsSuccessModalOpen(false);
        }, 2000);
    };

    const handleLoginRedirect = () => {
        setIsModalOpen(false);
        navigate("/login");
    };

    const handleRegisterRedirect = () => {
        setIsModalOpen(false);
        navigate("/register");
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
        if (isBurgerOpen) {
        setIsBurgerOpen(false);
        }
    };
    return (
        <div className="container">
              {isModalOpen && (
                <>
                  <div className="modal-overlay" onClick={toggleModal}></div>
                  {token ? (
                    <div className="faUser">
                      <div className="cors">
                        <div className="cross" onClick={toggleModal}>
                          <IoMdClose />
                        </div>
                      </div>
                      <div className="warning">
                        <div className="getOut">
                          <h1>выйти из аккаунта</h1>
                        </div>
                        <div className="areSure">
                          <p>
                            Вы уверены, что хотите выйти из своей учетной записи? После
                            выхода вам нужно будет снова войти. Вы уверены?
                          </p>
                        </div>
                      </div>
                      <div className="confirmation">
                        <div className="cancel">
                          <button onClick={toggleModal}>Отмена</button>
                        </div>
                        <div className="YesExit">
                          <button onClick={handleLogout}>Да, выйти!</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="faUser">
                      <div className="cors">
                        <div className="cross" onClick={toggleModal}>
                          <IoMdClose />
                        </div>
                      </div>
                      <div className="warning">
                        <div className="getOut">
                          <h1>Вы не зарегистрированы/вошли</h1>
                        </div>
                        <div className="areSure">
                          <p>
                            Для продолжения работы с сайтом вам нужно войти в свой
                            аккаунт или зарегистрироваться.
                          </p>
                        </div>
                      </div>
                      <div className="confirmation">
                        <div className="cancel">
                          <button onClick={handleLoginRedirect}>Войти</button>
                        </div>
                        <div className="YesExit">
                          <button onClick={handleRegisterRedirect}>
                            Зарегистрироваться
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              {isSuccessModalOpen && (
                <>
                  <div className="modal-overlay" onClick={closeSuccessModal}></div>
                  <div className="successModal">
                    <div className="cors">
                      <div className="cross" onClick={closeSuccessModal}>
                        <IoMdClose />
                      </div>
                    </div>
                    <div className="successContent">
                      <div className="checkIcon">
                        <IoCheckmark />
                      </div>
                      <p>Успешно вышли с аккаунта!</p>
                    </div>
                  </div>
                </>
              )}
            </div>
    );
}
