import React from "react";
import "./cardDailyNews.scss";
import { Link } from "react-router-dom";
 
function CardDailyNews({id, img, title, desc }) {
  return (
    <div className="cardDailyNews">
      <img className="cardDailyNews__img" src={img} alt={title} />
      <p className="cardDailyNews__title">{title}</p>
      <p
        className="cardDailyNews__description"
        dangerouslySetInnerHTML={{ __html: 
          desc.length > 30
            ? desc.substr(0, 90).trim() + "..."
            : desc,
         }}
      ></p>
      <Link to={`/news-detail/${id}`}>
      <button className="cardDailyNews__btn">Подробнее</button>
      </Link>
    </div>
  );
}

export default CardDailyNews;
