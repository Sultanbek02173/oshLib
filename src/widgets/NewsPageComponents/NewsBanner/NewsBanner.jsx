import "./newsBanner.scss";
import { useDispatch } from "react-redux";
import { useNews } from "../../../app/store/reducers/news/newsSlice";
import React, { useEffect } from "react";
import { getNewsLogo } from "../../../app/store/reducers/news/newsThunks";

export const NewsBanner = () => {
  const dispatch = useDispatch();
  const { logo } = useNews();

  useEffect(() => {
    dispatch(getNewsLogo());
  }, [dispatch]);
  return (
    <div>
      <div className="servicesBanner">
        <div className="container">
          {
            logo && 
          logo.map((item, indx) => {
            return (
              <React.Fragment key={indx}>
                <h1 className="servicesBanner_title main__title">
                  {item.title}
                </h1>
                <div className="servicesBanner_group ">
                  <div className="">
                    <img
                      src={item.left_image}
                      alt=""
                      className="servicesBanner_group_girl"
                    />
                    <img
                      src={item.middle_image}
                      alt=""
                      className="servicesBanner_group_book"
                    />
                    <img
                      src={item.dextral_image}
                      alt=""
                      className="servicesBanner_group_glasses"
                    />
                  </div>
                </div>
                <p
                  className="servicesBanner_description"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
