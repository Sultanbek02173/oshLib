import "./servicesBanner.scss";

import { fetchServicesBannerData } from "../../../app/store/reducers/servicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const ServicesBanner = () => {
  const dispatch = useDispatch();
  const { banner } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServicesBannerData());
  }, [dispatch]);



  return (
    <div>
      <div className="servicesBanner">
        <div className="container">
          <h1 className="servicesBanner_title">{banner?.title}</h1>

          <div className="servicesBanner_group">
            
            <div className="">
            <img
                src={banner?.image1}
                alt="Girl"
                className="servicesBanner_group_girl"
              />
              <img
                src={banner?.image2}
                alt="Book"
                className="servicesBanner_group_book"
              />
              <img
                src={banner?.image3}
                alt="Glasses"
                className="servicesBanner_group_glasses"
              />
            </div>
          </div>

          <p className="servicesBanner_description">
            {banner?.description}
          </p>
        </div>
      </div>
    </div>
  );
};
