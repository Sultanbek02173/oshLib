import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./breadcrumb.scss";

export const Breadcrumb = ({ routes }) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  if (pathname === "/") return null;

  const paths = pathname.split("/").filter(Boolean);
  const navigationPaths = paths[0]?.includes('detail')
    ? [paths[0].split('-')[0], paths[0]]
    : paths;

  const route = routes.find(r => r.path.startsWith(`/${paths[0]}`));
  const baseTitle = t(route?.title);

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link to="/" className="breadcrumb__link">{t("main")}</Link>
        {navigationPaths.map((path, index) => (
          <span key={path}>
            <span className="breadcrumb__separator">{">"}</span>
            <span className={index === navigationPaths.length - 1 ? "breadcrumb__active" : "breadcrumb__link"}>
              {path.includes('detail') ? (
                <span>  {t("detailed")} {baseTitle}</span>
              ) : (
                <Link to={`/${path}`}>{baseTitle}</Link>
              )}
            </span>
          </span>
        ))}
      </nav>
    </div>
  );
};
