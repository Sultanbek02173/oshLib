import { useEffect, useState } from "react";
import "./HomeRating.scss";
import { useDispatch } from "react-redux";
import { useHome } from "../../../app/store/reducers/home/homeSlice";
import {
  getBooksRating,
  getHomeTitles,
  getReadingRating,
} from "../../../app/store/reducers/home/homeThunks";
import { CardRating } from "../../../features";

export function HomeRating() {
  const [activePersonIdx, setActivePersonIdx] = useState(null);
  const [activeBookIdx, setActiveBookIdx] = useState(null);

  const dispatch = useDispatch();
  const {
    readerRatings: readers,
    booksRatings: books,
    ratingTitles: titles,
  } = useHome();

  useEffect(() => {
    dispatch(getReadingRating());
    dispatch(getBooksRating());
    dispatch(getHomeTitles());
  }, [dispatch]);

  useEffect(() => {
    if (readers?.length) {
      const middle = Math.floor(readers.length / 2);
      setActivePersonIdx(middle);
    }
  }, [readers]);

  useEffect(() => {
    if (books?.length) {
      const middle = Math.floor(books.length / 2);
      setActiveBookIdx(middle);
    }
  }, [books]);

  return (
    <main className="container">
      <div className="rating__home">
        <div>
          <h2 className="main__title">{titles[0]?.readers}</h2>
          <section className="rating__home__content">
            {readers?.slice(0, 3).map((item, i) => (
              <CardRating
                key={item.id}
                idx={i}
                isActive={i === activePersonIdx}
                onClick={setActivePersonIdx}
                {...item}
              />
            ))}
          </section>
        </div>
        <div>
          <h2 className="main__title">{titles[0]?.books}</h2>
          <section className="rating__home__content">
            {books?.slice(0, 3).map((item, i) => (
              <CardRating
                key={item.id}
                idx={i}
                isActive={i === activeBookIdx}
                onClick={setActiveBookIdx}
                {...item}
              />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
