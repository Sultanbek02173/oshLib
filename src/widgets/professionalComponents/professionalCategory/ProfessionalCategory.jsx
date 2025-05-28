import React from 'react';
import { useTranslation } from "react-i18next";
import './professionalCategory.scss';

export const ProfessionalCategory = ({ title, description, links }) => {
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="professional-category-card">
        <div className="professional-category-content">
          <h3 className="professional-category-title">{title}</h3>
          <p
            className="professional-category-text"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
        <div className="professional-category-button">
          {links && isValidUrl(links) && (
            <a href={links} target="_blank" rel="noopener noreferrer">
              <button
                className="professional-button"
                aria-label={`Читать больше о ${title}`}
              >
                            {t("read")}

              </button>
            </a>  
          )}
        </div>
      </div>
    </div>

  );
};