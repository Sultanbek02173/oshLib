import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import "./HomeViews.scss";
import { useDispatch } from "react-redux";
import { useHome } from "../../../app/store/reducers/home/homeSlice";
import { getCollection } from "../../../app/store/reducers/home/homeThunks";
import { useTranslation } from "react-i18next";

export function HomeViews({ mobile }) {
  const dispatch = useDispatch();
  const { collection } = useHome();

  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="home-views">
        <div className="content">
          {collection &&
            collection?.slice(0, 1).map((item) => (
              <React.Fragment key={item.id}>
                <div className="video-wrapper">
                  <ReactPlayer
                    url={item.video}
                    controls
                    width="100%"
                    height="auto"
                    className="react-player"
                  />
                </div>
                <div className="text-block">
                  <h3>{item.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: mobile
                        ? item.description.substr(0, 200).trim() + "..."
                        : item.description.length > 150
                        ? item.description.substr(0, 500).trim() + "..."
                        : item.description,
                    }}
                  />
                  <a target="_blank" href={item.link}>
                    <button className="details-button">{t("More")}</button>
                  </a>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomeViews;
