import kg from '../../../shared/image/ky.svg';
import ru from '../../../shared/image/ru.svg';
import { useTranslation } from "react-i18next";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from 'react';
import "./lang.scss"
const Lang = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeLang = ({ target: { value } }) => {
    const newLang = i18n.language === "ru" ? "ky" : "ru";
    i18n.changeLanguage(newLang);
    setIsOpen(false);
    i18n.changeLanguage(value);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };


  return (
    <div
      className="language-switcher"
      style={{
        position: 'relative',
        borderTopRightRadius:"15px",
        borderTopLeftRadius:"15px",
        backgroundColor: isOpen ? ' #105B60' : 'transparent',
      }}
    >
      <div className="selected-lang"
        onClick={() => setIsOpen(!isOpen)}
        onChange={handleChangeLang}
        value={i18n.language}
        defaultValue={i18n.language}
      >
        <img
          src={i18n.language === "ru" ? ru : kg}
          alt={i18n.language === "ru" ? "Ru" : "Kg"}
        />
        <MdOutlineKeyboardArrowDown
          className='lang_icon'
          style={{
            color: "white",
            width: 20,
            height: 20,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s ease'
          }}
        />
      </div>
      {isOpen && (
        <div className="dropdown" >
          <div onClick={handleChangeLang}>
            <img
              src={i18n.language === "ru" ? kg : ru}
              alt={i18n.language === "ru" ? "ky" : "ru"}
              style={{ width: 30, height: 20 }}
            />
            {i18n.language === "ru" ? "ky" : "ru"}
          </div>
        </div>
      )}
    </div>
  )
}

export default Lang;