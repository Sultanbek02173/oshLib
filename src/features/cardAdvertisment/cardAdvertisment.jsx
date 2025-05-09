import "./CardAdvertisment.scss";

export const CardAdvertisment = ({ image, title, date, description }) => {
  return (
    <div className="cardAdvertisment__card">
      <div className="cardAdvertisment__card__innerContent">
        <img src={image} alt={title} className="cardAdvertisment__image" />
        <div className="cardAdvertisment__content">
          <p className="cardAdvertisment__date">{date}</p>
          <h2 className="cardAdvertisment__card-title">{title}</h2>
          <p className="cardAdvertisment__description">{description}</p>
        </div>
      </div>
      <button className="cardAdvertisment__button">Подробнее</button>
    </div>
  );
};
