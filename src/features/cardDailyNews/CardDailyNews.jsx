import React from "react";
import "./cardDailyNews.scss";

function CardDailyNews({ img, title, desc }) {
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
      <div className="cardDailyNews__btn">Подробнее</div>
    </div>
  );
}

export default CardDailyNews;
