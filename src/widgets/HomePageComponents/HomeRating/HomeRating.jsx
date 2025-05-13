import { useEffect, useState } from "react";
import "./HomeRating.scss";
import { useDispatch } from "react-redux";
import { useHome } from "../../../app/store/reducers/home/homeSlice";
import {
  getBooksRating,
  getReadingRating,
} from "../../../app/store/reducers/home/homeThunks";

export function HomeRating() {
  const [activePeople, setActivePeople] = useState(2);
  const [activeBooks, setActiveBooks] = useState(2);

  const dispatch = useDispatch();
  const { readerRatings: readers, booksRatings: books } = useHome();

  const handleActivePeople = (id) => {
    setActivePeople(id);
  };

  const handleActiveBooks = (id) => {
    setActiveBooks(id);
  };

  useEffect(() => {
    dispatch(getReadingRating());
    dispatch(getBooksRating());
  }, [dispatch]);

  return (
    <main className="container">
      <section className="rating">
        <h2 className="rating__title main__title">Рейтинг читателей (ТОП-3)</h2>
        <div className="rating__grid">
          {
            readers && 
          readers.slice(0, 3).map((item) => (
            <article
              key={item.id}
              onClick={() => handleActivePeople(item.id)}
              className={`rating__card ${
                activePeople === item.id ? "rating__card--active" : ""
              }`}
            >
              <div className="rating__card-image">
                <img src={item.images} alt={item.title} />
              </div>
              <h3 className="rating__card-id">({item.id})</h3>
              <div className="rating__card-info">
                {item.title}{" "}
                <p dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
            </article>
          ))}
        </div>

        <h2 className="rating__title main__title ">Рейтинг книг (ТОП-3)</h2>
        <div className="rating__grid">
          {
            books &&
          books.slice(0, 3).map((item) => (
            <article
              key={item.id}
              onClick={() => handleActiveBooks(item.id)}
              className={`rating__card ${
                activeBooks === item.id ? "rating__card--active" : ""
              }`}
            >
              <div className="rating__card-image">
                <img src={item.image} alt={item.title} />
              </div>
              <h3 className="rating__card-id">({item.id})</h3>
              <div className="rating__card-content">
                <p className="rating__card-title">{item.title}</p>
                <p className="rating__card-author">{item.author}</p>
              </div>
              <p className="rating__card-votes">{item.votes}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
