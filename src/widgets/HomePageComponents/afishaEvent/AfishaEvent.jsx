import { useEffect } from "react";
import { CardAfisha } from "../../../features";
import "./afishaEvent.scss";
import { useDispatch } from "react-redux";
import { getNewsEvents } from "../../../app/store/reducers/news/newsThunks";
import { useNews } from "../../../app/store/reducers/news/newsSlice";
import {
  getAfishaBanner,
  useAfisha,
} from "../../../app/store/reducers/afishaSlice";

export const AfishaEvent = ({ tablet, mobile }) => {
  const dispatch = useDispatch();
  const { newEvents: data } = useNews();
  const { banner } = useAfisha();

  useEffect(() => {
    dispatch(getNewsEvents());
    dispatch(getAfishaBanner());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="card-afisha__title main__title">{banner[0]?.title_2}</h1>
      <div className="card-afisha__list">
        {data &&
          data?.map((item, index) => (
            <CardAfisha
              id={item.id}
              tablet={tablet}
              mobile={mobile}
              key={index}
              time={item.time}
              title={item.title}
              image={item.image}
              description={item.description}
            />
          ))}
      </div>
    </div>
  );
};
