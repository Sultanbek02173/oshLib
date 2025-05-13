import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import HeaderNav from "../headerNav/HeaderNav";
import { FaInstagram, FaFacebook, FaUser } from "react-icons/fa";
import { MdOutlineLocationOn, MdOutlinePhone } from "react-icons/md";
import "./burger.scss";
import Lang from "../lang/Lang";

const Burger = ({ toggleModal, isOpen, toggleMenu }) => {
  const header = useSelector((state) => state.header);

  return (
    <div className="burger-menu">
      <label className="menu__btn" onClick={toggleMenu}>
        <span className={isOpen ? "active" : ""}></span>
      </label>

      <div className={`menu__box ${isOpen ? "open" : ""}`}>
        <div className="langg">
          <Lang />
        </div>
        <HeaderNav onLinkClick={() => toggleMenu()} />
        <div className="header_icon">
          <a href="https://2gis.kg/osh/firm/70000001030596097"> <div className="locate">
            <MdOutlineLocationOn /></div></a>
          <a href={header?.data?.phone_number ? `tel:${header.data.phone_number}` : '#'}>
            <div className="locate">
              <MdOutlinePhone />
            </div>
          </a>
          {header.data?.instagram_icon && header.data?.instagram_icon_url && (
            <div className="locate">
              <a
                href={header.data.instagram_icon_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={header.data.instagram_icon} />
              </a>
            </div>
          )}
          {header.data?.facebook_icon && header.data?.facebook_icon_url && (
            <div className="locate">
              <a
                href={header.data.facebook_icon_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={header.data.facebook_icon} />
              </a>
            </div>
          )}

          <div className="locate" onClick={toggleModal}>
            <FaUser />
          </div>
        </div>
      </div>
    </div>
  );
};

Burger.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Burger;