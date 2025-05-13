import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import "./HomeViews.scss";
import { useDispatch } from "react-redux";
import { useHome } from "../../../app/store/reducers/home/homeSlice";
import { getCollection } from "../../../app/store/reducers/home/homeThunks";

export function HomeViews({ mobile }) {
  const dispatch = useDispatch();
  const { collection } = useHome();

  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="home-views">
        <div className="content">
          {
          collection &&
          collection.map((item) => (
            <React.Fragment key={item.id}>
              <div className="video-wrapper">
                <ReactPlayer
                  url={item.video_file}
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
                <button className="details-button"><a target="_blank" href={item.link}>подробнее</a></button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeViews;
