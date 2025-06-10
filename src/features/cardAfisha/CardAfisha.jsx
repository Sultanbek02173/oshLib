import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./cardAfisha.scss";
import { useTranslation } from "react-i18next";

export const CardAfisha = ({
  id,
  image,
  title,
  time,
  description,
  link,
}) => {
  const { t } = useTranslation();

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
          <h2 className="container-card__parent-content-right-title">
            {title}
          </h2>
          <p
            className="container-card__parent-content-right-description-default"
            dangerouslySetInnerHTML={{ __html: description.length < 300 ? description : description.slice(0, 300).trim() + '...' }}
          ></p>
        </div>
      </div>
      <p
        className="container-card__parent-content-right-description-detail"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
      {link ? (
        <a className="container-card__parent-btn" href={link} target="_blank" rel="noopener noreferrer">
          {t("More")}
        </a>
      ) : (
        <Link className="container-card__parent-btn" to={`/afisha-detail/${id}`}>
          {t("More")}
        </Link>
      )}
    </div>
  );
};

CardAfisha.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default CardAfisha;
