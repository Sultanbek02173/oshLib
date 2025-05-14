import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchServicesData, useCatalog } from "../../../app/store/reducers/catalogSlice";
import { Cards } from "../cards/Cards";
import { IoMdClose } from "react-icons/io";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import "./catalogInput.scss";

const MOBILE_BREAKPOINT = 768;

const normalizeString = (str) => (typeof str === "string" ? str.toLowerCase().trim() : "");

const filterItems = (items, { author, title, word, showPopular }) => {
  return items.filter(
    (item) =>
      normalizeString(item.author).includes(normalizeString(author)) &&
      normalizeString(item.title).includes(normalizeString(title)) &&
      normalizeString(item.note).includes(normalizeString(word)) &&
      (!showPopular || item.popular)
  );
};

export const CatalogInput = () => {
  const dispatch = useDispatch();
  const { data } = useCatalog();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);
  const [filters, setFilters] = useState({ author: "", title: "", word: "" });
  const [showPopular, setShowPopular] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setFilteredItems(filterItems(data, { ...filters, showPopular }));
  }, [data, filters, showPopular]);

  useEffect(() => {
    dispatch(fetchServicesData());
  }, [dispatch]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }, [isMenuOpen]);

  const handleInputChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleModal = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const renderInput = (placeholder, field) => (
    <input
      type="text"
      placeholder={placeholder}
      value={filters[field]}
      onChange={handleInputChange(field)}
      className="input1_text2"
    />
  );

  const renderTableRow = (item, index) => (
    <tr key={`${item.id}-${index}`} className="parent__catalog-body-table-body-tr">
      <td className="parent__catalog-body-table-body-tr-td">{item.author}</td>
      <td className="parent__catalog-body-table-body-tr-td">{item.title}</td>
      <td className="parent__catalog-body-table-body-tr-td">{item.note}</td>
    </tr>
  );

  return (
    <main className="container">
      <h2 className="main__title">каталог</h2>
      <div className="catalog">
        <section className="parent__catalog-header">
          <div className="parent__catalog-header-wrap">
            <div className="electronicSearch_filters">
              <div className="electronicSearch_filters_btns">
                <div className="electronicSearch_filters_btn">
                  <button
                    className={!showPopular ? "electronicSearch_filters_btn_allactive" : "electronicSearch_filters_btn_all"}
                    onClick={() => setShowPopular(false)}
                  >
                    Все
                  </button>
                  <button
                    className={showPopular ? "electronicSearch_filters_btn_popularActive" : "electronicSearch_filters_btn_popular"}
                    onClick={() => setShowPopular(true)}
                  >
                    Популярные
                  </button>
                </div>
              </div>
              {!isMobile && (
                <div className="parent__catalog-header-wrapper">
                  {renderInput("Автор", "author")}
                  {renderInput("Название документа", "title")}
                  {renderInput("Ключевое слово", "word")}
                </div>
              )}
              {isMobile && (
                <div className="catalog_menu">
                  <button onClick={toggleModal}>
                    <HiAdjustmentsHorizontal />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {isMobile && isMenuOpen && (
          <div className="modall">
            <div className="modal_content">
              <button onClick={toggleModal}>
                <IoMdClose />
              </button>
              <h2 className="modal_content-title">Расширенный поиск</h2>
              {renderInput("Автор", "author")}
              {renderInput("Название документа", "title")}
              {renderInput("Ключевое слово", "word")}
            </div>
          </div>
        )}

        {isMobile ? (
          <Cards items={filteredItems} />
        ) : (
          <section className="parent__catalog-body">
            <table className="parent__catalog-body-table">
              <thead className="parent__catalog-body-table-head">
                <tr className="parent__catalog-body-table-head-tr">
                  <td className="parent__catalog-body-table-head-tr-td">Автор</td>
                  <td className="parent__catalog-body-table-head-tr-td">Название</td>
                  <td className="parent__catalog-body-table-head-tr-td">Кл. слово</td>
                </tr>
              </thead>
              <tbody className="parent__catalog-body-table-body">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, i) => renderTableRow(item, i))
                ) : (
                  <tr className="parent__catalog-body-table-empty">
                    <td colSpan={3} className="parent__catalog-body-table-empty-td">
                      Нет результатов
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </main>
  );
};
