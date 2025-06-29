import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNews } from "../../../app/store/reducers/news/newsSlice";
import { getNewsAboutCmi } from "../../../app/store/reducers/news/newsThunks";
import { CardAfisha } from "../../../features/";
import "./newsAdvertisment.scss";
import { useTranslation } from "react-i18next";

export const NewsAdvertisment = () => {

  const dispatch = useDispatch();
  const { listAboutCmi } = useNews();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(getNewsAboutCmi());
  }, [dispatch]);

  return (
    <div className="cardAdvertisment container">
      <h1 className="cardAdvertisment__title">{t('SMI')}</h1>
      {
        listAboutCmi &&
      listAboutCmi.map((event, index) => (
        <CardAfisha
          id={event.id}
          key={index}
          date={event.date}
          title={event.title}
          image={event.image}
          link={event.link}
          description={event.description}
        />
      ))}
    </div>
  );
};
