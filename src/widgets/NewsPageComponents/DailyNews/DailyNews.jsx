import { useEffect, useState } from "react";
import CardDailyNews from "./../../../features/cardDailyNews/CardDailyNews";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./DailyNews.scss";
import { useDispatch } from "react-redux";
import { getDailyNews } from "../../../app/store/reducers/news/newsThunks";
import { useNews } from "../../../app/store/reducers/news/newsSlice";
import { useTranslation } from "react-i18next";

export function DailyNews() {
  const { list } = useNews();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);

  const handlePageChange = (swiper) => {
    setCurrentPage(swiper.activeIndex);
  };

  useEffect(() => {
    dispatch(getDailyNews());
  }, [dispatch]);

  return (
    <div className="container DailyNews">
      <div className="DailyNews__title">Дневные новости</div>
      <Swiper
        onSlideChange={handlePageChange}
        slidesPerView={1}
        spaceBetween={20}
        allowTouchMove={false}
      >
        {
        list && 
        list.map((_, index) => (
          <SwiperSlide key={index}>
            <div className="DailyNews__grid">
              {list.slice((currentPage * ITEMS_PER_PAGE) - ITEMS_PER_PAGE, (currentPage * ITEMS_PER_PAGE)).map(news => (
                <CardDailyNews 
                  key={news.id}
                  id={news.id}
                  img={news.image}
                  title={news.title}
                  desc={news.description}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="DailyNews__pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          В начало
        </button>

        <button
          onClick={() => setCurrentPage(1)}
          className={currentPage === 1 ? "active" : ""}
        >
          1
        </button>

        {currentPage > 3 && <span className="dots">...</span>}

        {Array.from({ length: totalPages - 1 }, (_, i) => i + 1)
          .filter((page) => page !== 1 && Math.abs(page - currentPage) <= 1)
          .map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))}

        {currentPage < totalPages - 2 && <span className="dots">...</span>}

        {totalPages > 1 && (
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={currentPage === totalPages ? "active" : ""}
          >
            {totalPages}
          </button>
        )}

        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
         {t("")} В конец
        </button>
      </div>
    </div>
  );
}
