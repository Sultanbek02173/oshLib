import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getBannerLogo,
  useBanner,
} from "../../../app/store/reducers/BannerSlice";
import "./HomeBanner.scss";

export function HomeBanner() {
  const dispatch = useDispatch();
  const { list: data } = useBanner();
  useEffect(() => {
    dispatch(getBannerLogo());
  }, []);

  return (
    <div className="home-banner">
      <div className="container">
        {data?.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <div className="home-banner-images">
                <div className="home-banner-images-box">
                  <img
                    className="home-banner-images-box-img"
                    src={item?.image_1}
                    alt="image"
                  />
                </div>
                <div className="home-banner-images-box">
                  <img
                    className="home-banner-images-box-img"
                    src={item?.image_2}
                    alt="image"
                  />
                </div>
                <div className="home-banner-images-box">
                  <img
                    className="home-banner-images-box-img"
                    src={item?.image_3}
                    alt="image"
                  />
                </div>
                <div className="home-banner-images-box">
                  <img
                    className="home-banner-images-box-img"
                    src={item?.image_4}
                    alt="image"
                  />
                </div>
                <div className="home-banner-images-box">
                  <img
                    className="home-banner-images-box-img"
                    src={item?.image_5}
                    alt="image"
                  />
                </div>
              </div>
              <div className="home-banner-text">
                <div className="home-banner-text-block">
                  <h1>{item?.title}</h1>
                  <p
                    className="home-banner-text-block-box"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default HomeBanner;
