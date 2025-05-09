import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import "./cardAfisha.scss";

export const CardAfisha = ({ id, image, title, time, description, tablet }) => {
  return (
    <div className="container-card__parent">
      <div className="container-card__parent-content">
        <div className="container-card__parent-content-left">
          <div className="container-card__parent-content-left-image">
            <img src={image} alt={title} />
          </div>
        </div>
        <div className="container-card__parent-content-right">
          <p className="container-card__parent-content-right-date">{time}</p>
          <h2 className="container-card__parent-content-right-title">{title}</h2>
          <p className="container-card__parent-content-right-description-default" dangerouslySetInnerHTML={{ __html: tablet
              ? description.substr(0, 120).trim() + '...'
              : description }} >
          </p>
        </div>
      </div>
      <p className="container-card__parent-content-right-description-detail" dangerouslySetInnerHTML={{ __html: description.substr(0, 110).trim() + '...' }} >
      </p>
        <Link   className="container-card__parent-btn" to={`/afisha-detail/${id}`}>Подробнее</Link>
    </div>
  );
};

CardAfisha.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tablet: PropTypes.bool
};

CardAfisha.defaultProps = {
  tablet: false
};

export default CardAfisha; 