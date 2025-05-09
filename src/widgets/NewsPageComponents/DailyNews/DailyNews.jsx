import React, { useEffect, useState } from "react";
import CardDailyNews from "./../../../features/cardDailyNews/CardDailyNews";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./DailyNews.scss";
// import exampleImg from "../../../shared/images/exampleDailyNews.png";
import { useDispatch } from "react-redux";
import {
  getDailyNews,
  getNextDailyNews,
  getPreviousDailyNews,
} from "../../../app/store/reducers/news/newsThunks";
import { useNews } from "../../../app/store/reducers/news/newsSlice";

const NEWS_DATA = Array(20)
  .fill({
    // img: exampleImg,
    title:
      "В Бишкеке открыли первый в мире центр нового формата 'Россия с вами'",
    desc: "Разговорные клубы и курсы помогут улучшить английский, развить произношение и уверенность в общении. Носители языка и опытные преподаватели создают комфортную атмосферу для обучения.",
  })
  .map((item, index) => ({ ...item, id: index }));

const ITEMS_PER_PAGE = 8;

export function DailyNews() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(NEWS_DATA.length / ITEMS_PER_PAGE);
  const dispatch = useDispatch();
  const { list, pagination, currentPage: current } = useNews();

  const handlePageChange = (swiper) => {
    setCurrentPage(swiper.activeIndex);
  };

  useEffect(() => {
    dispatch(getDailyNews());
  }, [dispatch]);

  const handleNext = () => {
    if (pagination.next) {
      dispatch(getNextDailyNews(pagination.next));
    }
  };

  const handlePrevious = () => {
    if (pagination.previous) {
      dispatch(getPreviousDailyNews(pagination.previous));
    }
  };

  return (
    <div className="container DailyNews">
      <div className="DailyNews__title">Дневные новости</div>
      <Swiper
        onSlideChange={handlePageChange}
        slidesPerView={1}
        spaceBetween={20}
        allowTouchMove={false}
      >
        {[...Array(totalPages)].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="DailyNews__grid">
              {list.map((news) => (
                <CardDailyNews
                  key={news.id}
                  img={news.image}
                  title={news.title}
                  desc={news.description}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {pagination.count >= 10 && (
        <div className="DailyNews__pagination">
          <button onClick={handlePrevious} disabled={!pagination.previous}>
            назад
          </button>
          <button>{current}</button>
          {/* {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={currentPage === index ? "active" : ""}
          >
            {index + 1}
          </button>
        ))} */}
          <button onClick={handleNext} disabled={!pagination.next}>
            перед
          </button>
        </div>
      )}
    </div>
  );
}
