import logo from "../../shared/image/Group.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import Search from "./search/Search";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { VisuallyImpaired } from "../../entities/VisuallyImpaired/VisuallyImpaired";
import { activeMode, deactivateMode } from "../../app/store/reducers/visually";
import HeaderNav from "./headerNav/HeaderNav";
import Lang from "./lang/Lang";
import { FaInstagram, FaFacebook, FaUser } from "react-icons/fa";
import { MdOutlineLocationOn, MdOutlinePhone } from "react-icons/md";
import Burger from "./burger/Burger";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { logoutUser } from "../../app/store/reducers/auth";
import { doSearch } from "../../app/store/reducers/home/homeThunks";
import { clearSearch, useHome } from "../../app/store/reducers/home/homeSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { search } = useHome();
  const { active } = useSelector((state) => state.visually);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  const [inputValue, setInputValue] = useState({search: ''});

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isModalOpen || isSuccessModalOpen || isBurgerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, isSuccessModalOpen, isBurgerOpen]);

  const mainTextSpeech = (text) => {
    window.speechSynthesis.cancel();
    const talk = new SpeechSynthesisUtterance(text);
    talk.lang = "ru-RU";
    window.speechSynthesis.speak(talk);
  };

  const handleVisuallyImpairedToggle = () => {
    if (active) {
      dispatch(deactivateMode());
      setTimeout(() => mainTextSpeech("Режим для слабовидящих выключен"), 100);
      document.body.className = "";
    } else {
      dispatch(activeMode());
      setTimeout(() => mainTextSpeech("Режим для слабовидящих включен"), 100);
    }
  };

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

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    if (isSuccessModalOpen) {
      setIsSuccessModalOpen(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputValue.search.trim()) {
        dispatch(doSearch(inputValue));
      }else{
        dispatch(clearSearch());
      }
    }, 1000);    

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);   

  const clear = () => {
    dispatch(clearSearch());
    setInputValue({search: ''});
  }
  console.log(search.results.results);
  
  return (
    <div className="container">
      {active && <VisuallyImpaired mainTextSpeech={mainTextSpeech} />}
      <div className="header">
        <div className="header_row">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          {!isMobile ? (
            <>
              <div className="tools">
                <div className="search_desktop">
                  <input 
                    type="text" 
                    placeholder="Поиск" 
                    value={inputValue.search}
                    onChange={(e) => setInputValue(prev => ({...prev, search: e.target.value}))}
                  />
                  
                  <button>
                    <CiSearch />
                  </button>

                  {
                    search?.results?.results.length > 0 ? (
                    <div className="search__cont">
                    {
                    search.results.results.map((search, indx) => (
                      <NavLink onClick={clear} to={`/${search.Pages}`} key={indx}>
                        <div className="search__cont__item">
                          {
                            search.image && (
                              <img src={`https://librarygeekspro.webtm.ru/${search.image}`} alt="" />
                            )
                          }
                          <div>
                          {search.title && (<h2>{search.title}</h2>)}
                          {search.name && (<h2>{search.name}</h2>)}
                          {
                            search.description && (
                              <p dangerouslySetInnerHTML={{__html:
                              search.description.length > 15
                              ? search.description.substr(0, 80).trim() + "..."
                              : search.description,
                            }}
                              ></p>
                            )
                          }
                          </div>
                        </div>
                      </NavLink>
                    ))
                    
                  }
                  </div>) : ''
                }
                </div>
                <button
                  className="header_eye"
                  onClick={handleVisuallyImpairedToggle}
                >
                  <FaEyeSlash color="#105B60" className="eye" />
                </button>
              </div>
              <HeaderNav className="header_nav-top" start={0} end={5} />
            </>
          ) : (
            <div className="mobile-tools">
              <div className="lang">
                <Lang />
              </div>
              <button
                className="header_eye"
                onClick={handleVisuallyImpairedToggle}
              >
                <FaEyeSlash color="#105B60" className="eye" />
              </button>
              <Search />
              <Burger
                toggleModal={toggleModal}
                isOpen={isBurgerOpen}
                toggleMenu={toggleBurgerMenu}
              />
            </div>
          )}
        </div>
        {!isMobile && (
          <div className="header_nav-bottom">
            <HeaderNav start={5} end={10} />
            <div className="header_right">
              <Lang />
              <div className="header_icon">
                <div className="locate">
                  <MdOutlineLocationOn />
                </div>
                <div className="locate">
                  <MdOutlinePhone />
                </div>
                <div className="locate">
                  <FaInstagram />
                </div>
                <div className="locate">
                  <FaFacebook />
                </div>
                <div className="locate" onClick={toggleModal}>
                  <FaUser />
                </div>
              </div>
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
                            Вы уверены, что хотите выйти из своей учетной
                            записи? После выхода вам нужно будет снова войти. Вы
                            уверены?
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
                            Для продолжения работы с сайтом вам нужно войти в
                            свой аккаунт или зарегистрироваться.
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
                  <div
                    className="modal-overlay"
                    onClick={closeSuccessModal}
                  ></div>
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
          </div>
        )}
      </div>
    </div>
  );
};
