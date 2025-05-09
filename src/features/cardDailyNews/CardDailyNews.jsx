import React from "react";
import "./cardDailyNews.scss";

function CardDailyNews({ img, title, desc }) {
  return (
    <div className="cardDailyNews">
      <img className="cardDailyNews__img" src={img} alt={title} />
      <p className="cardDailyNews__title">{title}</p>
      <p
        className="cardDailyNews__description"
        dangerouslySetInnerHTML={{ __html: desc }}
      ></p>
      <div className="cardDailyNews__btn">Подробнее</div>
    </div>
  );
}

export default CardDailyNews;
