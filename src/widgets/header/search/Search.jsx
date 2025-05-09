import { CiSearch } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import "./search.scss";
import { useHome } from "../../../app/store/reducers/home/homeSlice";
import { useDispatch } from "react-redux";
import { doSearch } from "../../../app/store/reducers/home/homeThunks";

const Search = () => {
  const { search } = useHome();
  const dispatch = useDispatch();
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const closeSearch = () => {
    setIsOpenMobile(false);
    setInputValue("");
  };


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputValue.trim()) {
        dispatch(doSearch({search: inputValue}));
      }
    }, 1000);    

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);  

  return (
    <div className="search">
      <div className="search_icon" onClick={() => setIsOpenMobile(true)}>
        <CiSearch />
      </div>

      {isOpenMobile && (
        <div className="search_mob">
          <button className="close-btn" onClick={closeSearch}>
            <IoMdClose />
          </button>
          <div className="search_mob_input">
            <CiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Поиск"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </div>

          <div className="search_suggestions">
            {
              search?.results?.results && 
              search.results.results.map((search, indx) => (
                <NavLink onClick={closeSearch} to={`/electronic/${search.id}`} key={indx}>
                  <div>
                    <img src={search.image} alt="" />
                    <h2>{search.title}</h2>
                  </div>
                </NavLink>
              ))
              
            }
          </div>

          <div className="quick_links">
            <p>Быстрая ссылка</p>
            <div className="links">
              <Link to="/news" onClick={closeSearch}>
                Новости
              </Link>
              <Link to="/services" onClick={closeSearch}>
                Услуги
              </Link>
              <Link to="/catalog" onClick={closeSearch}>
                Каталог
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
