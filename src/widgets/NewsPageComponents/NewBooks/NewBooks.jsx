import { useEffect } from "react";
import { CardAfisha } from "../../../features/";
import "../NewsAdvertisment/newsAdvertisment.scss";
import { useDispatch } from "react-redux";
import { useNews } from "../../../app/store/reducers/news/newsSlice";
import { getNewsEvents } from "../../../app/store/reducers/news/newsThunks";
import { useTranslation } from "react-i18next";

export const NewBooks = () => {

  const dispatch = useDispatch();
  const { newEvents: events } = useNews();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(getNewsEvents());
  }, [dispatch]);

  return (
    <div>
      <div className="cardAdvertisment container">
        <h1 className="cardAdvertisment__title">{t('media')}</h1>
        {
        events &&
        events.map((event, index) => (
          <CardAfisha
            id={event.id}
            key={index}
            time={event.time}
            title={event.title}
            image={event.image}
            description={event.description}
          />
        ))}
      </div>
    </div>
  );
};
