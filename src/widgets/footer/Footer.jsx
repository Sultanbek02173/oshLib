import "./footer.scss";
import Logo from "../../shared/image/Group 1.png";
import Akar from "../../shared/image/static.svg";
import Rectangle from "../../shared/image/Rectangle 986.svg";
import { NavLink, Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaGoogle, FaRegEye } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { IoExit } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { useEffect, useState } from "react";
import instance from "../../shared/api/Axios";
import { getHeader } from "../../app/store/reducers/headerSlice";
import { useDispatch, useSelector } from "react-redux";

export const Footer = () => {
  const [state, setState] = useState([]);
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.header);
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

  useEffect(() => {
    dispatch(getHeader());
  }, [dispatch]);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_top">
          <div className="footer_top_logo">
            <Link to="/">
              <img
                className="footer_top_logo_img"
                src={`https://librarygeekspro.webtm.ru/${data?.icons}`}
                alt="logo"
              />
            </Link>
            <a
              className="footer_top_logo_adres"
              href="https://2gis.kg/osh/firm/70000001030596097"
            >
               {data?.address}
            </a>
            <p> {data?.phone_number}</p>
            <div className="footer_top_logo_social">
              {data?.instagram_icon_url && (
                <div className="footer_top_logo_social_bloc">
                  <a
                    href={data.instagram_icon_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram color="#105B60" />
                  </a>
                </div>
              )}
              {data?.facebook_icon_url && (
                <div className="footer_top_logo_social_bloc">
                  <a
                    href={data.facebook_icon_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CiFacebook color="#105B60" />
                  </a>
                </div>
              )}
              {data?.youtube_icon_url && (
                <div className="footer_top_logo_social_bloc">
                  <a
                    href={data.youtube_icon_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube color="#105B60" />
                  </a>
                </div>
              )}
              {data?.google_icon_url && (
                <div className="footer_top_logo_social_bloc">
                  <a
                    href={data.google_icon_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGoogle color="#105B60" />
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="footer_sections">
            <div className="footer_section">
              <h3 onClick={toggleAbout} className="footer_section_title">
                {data?.title_about_library}
                <span className={`chevron ${openSection === "about" ? "open" : ""}`} />
              </h3>
              <div className={`footer_links ${openSection === "about" ? "open" : ""}`}>
                <NavLink className="link" to={"/about"}>
                  {data?.about_library}
                </NavLink>
                <NavLink className="link" to={"/support"}>
                  {data?.supports}
                </NavLink>
                <NavLink className="link" to={"/news"}>
                  {data?.news}
                </NavLink>
                <NavLink className="link" to={"/"}>
                  {data?.smi_about_us}
                </NavLink>
              </div>
            </div>

            <div className="footer_section">
              <h3 onClick={toggleEvents} className="footer_section_title">
                {data?.title_afisha}
                <span className={`chevron ${openSection === "events" ? "open" : ""}`} />
              </h3>
              <div className={`footer_links ${openSection === "events" ? "open" : ""}`}>
                <NavLink className="link" to={"/afisha"}>
                  {data?.afisha}
                </NavLink>
                <NavLink className="link" to={"/professional"}>
                  {data?.pro_activity}
                </NavLink>
                <NavLink className="link" to={"/electronic"}>
                  {data?.el_library}
                </NavLink>
              </div>
            </div>

            <div className="footer_section">
              <h3 onClick={toggleReaders} className="footer_section_title">
                {data?.title_for_readers}
                <span className={`chevron ${openSection === "readers" ? "open" : ""}`} />
              </h3>
              <div className={`footer_links ${openSection === "readers" ? "open" : ""}`}>
                <NavLink className="link" to={"/services"}>
                  {data?.services}
                </NavLink>
                <NavLink className="link" to={"/catalog"}>
                  {data?.catalog}
                </NavLink>
                <NavLink className="link" to={"/reader"}>
                  {data?.page_for_readers}
                </NavLink>
                <NavLink className="link" to={"/project"}>
                  {data?.projects}
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="footer_bottom laptop">
          <p>© 2025 {data?.library_name}. Все права защищены.</p>
          <a target="_blank" href="https://geeks.kg/geeks-pro">MADE BY GEEKSPRO</a>
          <div className="footer_views">
            <img src={Akar} alt="" className="footer_views_akar" />
            <img src={Rectangle} alt="" />
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
          <p className="footer_views_politic">Политика конфиденциальности</p>
        </div>

        <div className="footer_bottom mobile">
          <div className="footer_views">
            <img src={Akar} alt="" className="footer_views_akar" />
            <img src={Rectangle} alt="" />
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
          <div className="footer_views_info">
            <p className="footer_views_info_save">
              © 2025 {data?.library_name}. Все права защищены.
            </p>
            <p className="footer_views_info_politic">Политика конфиденциальности</p>
          </div>
          <div className="footer_views_geeks">
            <a className="footer_views_geeks_text" href="https://geeks.kg/geeks-pro">
              MADE BY GEEKSPRO
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
