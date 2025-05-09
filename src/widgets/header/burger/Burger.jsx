import { useEffect } from 'react';
import HeaderNav from "../headerNav/HeaderNav";
import { FaInstagram, FaFacebook, FaUser } from "react-icons/fa";
import { MdOutlineLocationOn, MdOutlinePhone } from "react-icons/md";
import "./burger.scss";
import Lang from '../lang/Lang';

const Burger = ({ toggleModal, isOpen, toggleMenu }) => {

  return (
    <div className="burger-menu">
      <label
        className="menu__btn"
        onClick={toggleMenu}
      >
        <span className={isOpen ? 'active' : ''}></span>
      </label>

      <div className={`menu__box ${isOpen ? 'open' : ''}`}>
        <div className='langg'>
          <Lang />
        </div>
        <HeaderNav onLinkClick={() => toggleMenu()} />
        <div className="icons">
          <div className="locates">
            <MdOutlineLocationOn size={20} />
          </div>
          <div className="locates">
            <MdOutlinePhone size={20} />
          </div>
          <div className="locates">
            <FaInstagram size={20} />
          </div>
          <div className="locates">
            <FaFacebook size={20} />
          </div>
          <div className="locates" onClick={toggleModal}>
            <FaUser size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Burger;