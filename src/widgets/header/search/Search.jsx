import { CiSearch } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import "./search.scss";
import { useHome } from "../../../app/store/reducers/home/homeSlice";
import { useDispatch } from "react-redux";
import { doSearch } from "../../../app/store/reducers/home/homeThunks";

const Search = () => {
  const { search } = useHome();
  const dispatch = useDispatch();
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const closeSearch = () => {
    setIsOpenMobile(false);
    setInputValue("");
  };

  useEffect(() => {
    if (inputValue.trim()) {
      const delay = setTimeout(() => {
        dispatch(doSearch({ search: inputValue }));
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [inputValue]);

  useEffect(() => {
    if (isOpenMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpenMobile]);

  return (
    <div className="search-wrapper">
      <div className="search-icon" onClick={() => setIsOpenMobile(true)}>
        <CiSearch size={26} />
      </div>

      {isOpenMobile && (
        <div className="search-mobile">
          <div className="search-header">
            <button className="close-btn" onClick={closeSearch}>
              <IoMdClose size={28} />
            </button>
            <div className="search-input">
              <CiSearch size={20} />
              <input
                type="text"
                placeholder="Поиск..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                ref={inputRef}
              />
            </div>
          </div>

          <div className="search-results">
            {search?.results?.results?.map((item) => (
              <NavLink
                to={`/electronic/${item.id}`}
                key={item.id}
                onClick={closeSearch}
              >
                <div className="search-item">
                  <img src={item.image} alt={item.title} />
                  <span>{item.title}</span>
                </div>
              </NavLink>
            ))}
          </div>

          <div className="quick-links">
            <p>Быстрые ссылки</p>
            <Link to="/news" onClick={closeSearch}>Новости</Link>
            <Link to="/services" onClick={closeSearch}>Услуги</Link>
            <Link to="/catalog" onClick={closeSearch}>Каталог</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
