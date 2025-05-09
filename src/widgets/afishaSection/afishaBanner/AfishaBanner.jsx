import { useDispatch } from "react-redux";
import "./afishaBanner.scss";
import {
  getAfishaBanner,
  useAfisha,
} from "../../../app/store/reducers/afishaSlice";
import { useEffect } from "react";
export const AfishaBanner = () => {
  const dispatch = useDispatch();
  const { banner } = useAfisha();

  useEffect(() => {
    dispatch(getAfishaBanner());
  }, []);
  return (
    <div className="afisha_baner">
      {banner.map((item) => {
        return (
          <div
            key={item.id}
            className="baner container"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="baner_img">
              <h1 className="baner_text_title">{item.title}</h1>
            </div>
            <div className="baner_text">
              <h1 className="baner_title">{item.title}</h1>
              <p
                className="baner_text_dispatch"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
