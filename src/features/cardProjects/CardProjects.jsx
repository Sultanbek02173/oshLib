import { Link } from "react-router-dom";
import "./cardProjects.scss";
import truncate from 'truncate-html';
import { useTranslation } from "react-i18next";


export const CardProjects = ({ image, title, description, id }) => {
      const { t } = useTranslation();

  const truncatedHTML = truncate(description, 350, { byWords: false });
  return (
    <div className="projects container">
      <div className="projects-grid">
        <div className="projects-grid-items">
          <div className="projects-grid-items-left">
            <img className="projects-grid-items-left-img" src={image} alt="" />
            <h3 className="projects-grid-items-text-title projects-grid-none">
              {title}
            </h3>
          </div>
          <div className="projects-grid-items-text">
            <div>
              <h3 className="projects-grid-items-text-title">{title}</h3>
              <p
                className="projects-grid-items-text-description"
                dangerouslySetInnerHTML={{ __html: truncatedHTML }}
              />

            </div>
            <Link to={`/project-detail/${id}`}>
              <button className="projects-grid-items-text-button">
{t("More")}              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};