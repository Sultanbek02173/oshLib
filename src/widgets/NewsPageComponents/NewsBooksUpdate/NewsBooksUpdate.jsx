import { useDispatch } from "react-redux";
import { CardBook } from "../../../features";
import "./NewsBookUpdate.scss";
import { useNews } from "../../../app/store/reducers/news/newsSlice";
import { useEffect } from "react";
import { getBooksArrivals } from "../../../app/store/reducers/news/newsThunks";

export const NewsBooksUpdate = () => {

  const dispatch = useDispatch();
  const { arrivals } = useNews();

  useEffect(() => {
    dispatch(getBooksArrivals());
  }, [dispatch]);  

  return (
    <div className="container">
      <div className="NewsBooksUpdate_list">
        <h2 className="NewsBooksUpdate_header main__title">
          Обявление о поступление книг
        </h2>
        {
          arrivals &&
        [...arrivals].reverse().slice(0, 3).map((card) => (
          <CardBook
            key={card.id}
            image={card.image}
            author={card.author}
            description={card.description}
            title={card.title}
          />
        ))}
      </div>
    </div>
  );
};
