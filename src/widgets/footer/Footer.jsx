import "./footer.scss";
import Logo from "../../shared/image/Group 1.png";
import Akar from "../../shared/image/static.svg";
import Rectangle from "../../shared/image/Rectangle 986.svg";
import { NavLink, Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import instance from "../../shared/api/Axios";
export const Footer = () => {
  const [state, setState] = useState([]);

  const [openSection, setOpenSection] = useState(null);

  const toggleAbout = () => {
    setOpenSection(openSection === "about" ? null : "about");
  };

  const toggleEvents = () => {
    setOpenSection(openSection === "events" ? null : "events");
  };

  const toggleReaders = () => {
    setOpenSection(openSection === "readers" ? null : "readers");
  };

  useEffect(() => {
    instance
      .get("stats/")
      .then(({ data }) => setState(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_top">
          <div className="footer_top_logo">
            <Link to="/">
              <img className="footer_top_logo_img" src={Logo} alt="" />
            </Link>
            <a
              className="footer_top_logo_adres"
              href="https://2gis.kg/osh/firm/70000001030596097"
            >
              Адресc: ПКурманжан датка,272/1
            </a>
            <p>Телефон: +996 557 01 63 44</p>
            <div className="footer_top_logo_social">
              <div className="footer_top_logo_social_bloc">
                <FaInstagram color="#105B60" />
              </div>
              <div className="footer_top_logo_social_bloc">
                <CiFacebook color="#105B60" />
              </div>
              <div className="footer_top_logo_social_bloc">
                <FaYoutube color="#105B60" />
              </div>
              <div className="footer_top_logo_social_bloc">
                <FaGoogle color="#105B60" />
              </div>
            </div>
          </div>
          <div className="footer_sections">
            <div className="footer_section">
              <h3 onClick={toggleAbout} className="footer_section_title">
                О БИБЛИОТЕКЕ
                <span
                  className={`chevron ${openSection === "about" ? "open" : ""}`}
                ></span>
              </h3>
              <div
                className={`footer_links ${
                  openSection === "about" ? "open" : ""
                }`}
              >
                <NavLink className="link" to={"/about"}>
                  О библиотеке
                </NavLink>
                <NavLink className="link" to={"/support"}>
                  Поддержать библиотеку
                </NavLink>
                <NavLink className="link" to={"/news"}>
                  Новости
                </NavLink>
                <NavLink className="link" to={"/"}>
                  СМИ о нас
                </NavLink>
              </div>
            </div>
            <div className="footer_section">
              <h3 onClick={toggleEvents} className="footer_section_title">
                МЕРОПРИЯТИЯ И ДЕЯТЕЛЬНОСТЬ
                <span
                  className={`chevron ${
                    openSection === "events" ? "open" : ""
                  }`}
                ></span>
              </h3>
              <div
                className={`footer_links ${
                  openSection === "events" ? "open" : ""
                }`}
              >
                <NavLink className="link" to={"/afisha"}>
                  Афиша мероприятий
                </NavLink>
                <NavLink className="link" to={"/professional"}>
                  Профессиональная деятельность
                </NavLink>
                <NavLink className="link" to={"/electronic"}>
                  Электронная библиотека
                </NavLink>
              </div>
            </div>
            <div className="footer_section">
              <h3 onClick={toggleReaders} className="footer_section_title">
                ЧИТАТЕЛЯМ
                <span
                  className={`chevron ${
                    openSection === "readers" ? "open" : ""
                  }`}
                ></span>
              </h3>
              <div
                className={`footer_links ${
                  openSection === "readers" ? "open" : ""
                }`}
              >
                <NavLink className="link" to={"/services"}>
                  Услуги
                </NavLink>
                <NavLink className="link" to={"/catalog"}>
                  Каталог
                </NavLink>
                <NavLink className="link" to={"/reader"}>
                  Читателям
                </NavLink>
                <NavLink className="link" to={"/project"}>
                  Проекты
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bottom laptop">
          <p>© 2025 Название библиотеки . Все права защищены.</p>
          <a href="https://geeks.kg/geeks-pro">MADE BY GEEKSPRO</a>
          <div className="footer_views">
            <img src={Akar} alt="" className="footer_views_akar" />
            <img src={Rectangle} alt="" />
            <div>
              <div className="img">
                <div>
                  <FaRegEye />
                  <p>{state?.count}</p>
                </div>
                <div>
                  <IoExit />
                  <p>{state?.count2}</p>
                </div>
                <div>
                  <IoMdPeople />
                  <p>{state?.count1}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="footer_views_politic">Политика конфидециональнности</p>
        </div>
        <div className="footer_bottom mobile">
          <div className="footer_views">
            <img src={Akar} alt="" className="footer_views_akar" />
            <img src={Rectangle} alt="" />
            <div>
              <div className="img">
                <div>
                  <FaRegEye />
                  <p>{state?.count}</p>
                </div>
                <div>
                  <IoExit />
                  <p>{state?.count2}</p>
                </div>
                <div>
                  <IoMdPeople />
                  <p>{state?.count1}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer_views_info">
            <p className="footer_views_info_save">
              © 2025 Название библиотеки . Все права защищены.
            </p>
            <p className="footer_views_info_politic">
              Политика конфидециональнности
            </p>
          </div>
          <div className="footer_views_geeks">
            <a
              className="footer_views_geeks_text"
              href="https://geeks.kg/geeks-pro"
            >
              MADE BY GEEKSPRO
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
