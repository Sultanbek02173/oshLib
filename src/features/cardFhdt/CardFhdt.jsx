import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CardFhdt.scss";
import { useDispatch } from "react-redux";
import { getCatalogs } from "../../app/store/reducers/home/homeThunks";
import { useHome } from "../../app/store/reducers/home/homeSlice";
import { useTranslation } from "react-i18next";

export const CardFhdt = () => {
  const [mobile, setMobile] = useState(window.innerWidth < 460);
  const dispatch = useDispatch();
  const { catalogs } = useHome();
    const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCatalogs());
  }, [dispatch]);

  useEffect(() => {
    const resizeMobile = () => {
      setMobile(window.innerWidth <= 460);
    };
    window.addEventListener("resize", resizeMobile);
    return () => {
      window.removeEventListener("resize", resizeMobile);
    };
  }, []);

  const catalogsArray = Array.isArray(catalogs)
    ? catalogs
    : Object.values(catalogs);

  return (
    <div className="container">
      <div className="card-fhdt__container">
        <div className="card-fhdt__list">
          {catalogsArray.map((item, index) => {
            const linkPath =
              index === 0
                ? "/catalog"
                : index === 1
                ? "/electronic"
                : "#"; 

            return (
              <div className="card-fhdt__item" key={item.id}>
                <h2 className="card-fhdt__title">{item.title}</h2>
                <div className="card-fhdt__card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-fhdt__card-image"
                  />
                  <div className="card-fhdt__card-content">
                    <div className="card-fhdt__card-content-left">
                      <h3 className="card-fhdt__card-title">{item.title}</h3>
                      <p
                        className="card-fhdt__card-description"
                        dangerouslySetInnerHTML={{
                          __html: mobile
                            ? item.description.substr(0, 30).trim() + "..."
                            : item.description,
                        }}
                      ></p>
                    </div>
                    <div className="card-fhdt__card-content-right">
                      <Link to={linkPath} className="card-fhdt__card-button">
{t("More")}                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
