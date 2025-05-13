import logo from "../../shared/image/Group.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import Search from "./search/Search";
import { FaEyeSlash, FaFacebookF, FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { VisuallyImpaired } from "../../entities/VisuallyImpaired/VisuallyImpaired";
import { activeMode, deactivateMode } from "../../app/store/reducers/visually";
import HeaderNav from "./headerNav/HeaderNav";
import Lang from "./lang/Lang";
import { FaUser } from "react-icons/fa";
import { MdOutlineLocationOn, MdOutlinePhone } from "react-icons/md";
import Burger from "./burger/Burger";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { doSearch } from "../../app/store/reducers/home/homeThunks";
import { clearSearch, useHome } from "../../app/store/reducers/home/homeSlice";
import { logoutUser } from "../../app/store/reducers/auth/authThunks";
import { getHeader } from "../../app/store/reducers/headerSlice";
import ModemOkno from "../../entities/ModemOkno/ModemOkno";

export const Header = () => {
  const dispatch = useDispatch();
  const { search } = useHome();
  const { active } = useSelector((state) => state.visually);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [inputValue, setInputValue] = useState({search: ''});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    dispatch(getHeader());
  }, [dispatch]);

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
  
  const { data } = useSelector((state) => state.header);  

  return (
    <div className="container">
      {active && <VisuallyImpaired mainTextSpeech={mainTextSpeech} />}
      <div className="header">
        <div className="header_row">
          <div className="logo">
            <Link to="/">
              <img src={`https://librarygeekspro.webtm.ru/${data?.logo}`} alt="logo" />
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
                <a target="_blank" href="https://2gis.kg/osh/firm/70000001030596097"> <div className="locate">
                  <MdOutlineLocationOn /></div></a>
                  <a target="_blank" href={data.phone_number ? `tel:${data.phone_number}` : '#'}>
                <div className="locate">
                    <MdOutlinePhone />
                </div>
                  </a>
                {data.instagram_icon && data.instagram_icon_url && (
                  <div className="locate">
                    <a
                      href={data.instagram_icon_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram size={20} />
                    </a>
                  </div>
                )}
                {data.facebook_icon_url && (
                  <div className="locate">
                    <a
                      href={data.facebook_icon_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF />
                    </a>
                  </div>
                )}

                <div className="locate" onClick={toggleModal}>
                  <FaUser />
                </div>
              </div>
             
            </div>
          </div>
        )}
      </div>
        <ModemOkno
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isSuccessModalOpen={isSuccessModalOpen}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
        isBurgerOpen={isBurgerOpen}
        setIsBurgerOpen={setIsBurgerOpen}
      />
    </div>
  );
};
