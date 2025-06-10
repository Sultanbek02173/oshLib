import { useDispatch } from "react-redux";
import { CardAfisha } from "../../../features";
import { useNews } from "../../../app/store/reducers/news/newsSlice";
import { useEffect } from "react";
import { getNewsEvents } from "../../../app/store/reducers/news/newsThunks";
import {
  getAfishaBanner,
  useAfisha,
} from "../../../app/store/reducers/afishaSlice";

export const AfishaEvents = () => {
  const dispatch = useDispatch();
  const { newEvents: events } = useNews();
  const { banner } = useAfisha();

  useEffect(() => {
    dispatch(getNewsEvents());
    dispatch(getAfishaBanner());
  }, [dispatch]);

  return (
    <div className="card-afisha container">
      <h1 className="card-afisha__title main__title">{banner.title_2}</h1>
      <div className="card-afisha__list">
        {events.map((event, index) => (
          <CardAfisha
            key={index}
            time={event.time}
            id={event.id}
            title={event.title}
            image={event.image}
            description={event.description}
          />
        ))}
      </div>
    </div>
  );
};
