import { useDispatch } from "react-redux";
import { CardAfisha } from "../../../features";
import { useNews } from "../../../app/store/reducers/news/newsSlice";
import { useEffect } from "react";
import { getNewsEvents } from "../../../app/store/reducers/news/newsThunks";
// export const events = [

//   {
//     id: 1,
//     title: "ВЫСТАВКА: КОД ЦИВИЛИЗАЦИЙ",
//     date: "Время проведения: с 10 декабря 2024 года по 25 января 2025 года",
//     description:
//       "Токтогула Сатылганова – место, где книги открывают двери в мир знаний и вдохновения. Наш фонд включает разнообразную литературу – от классики до современных бестселлеров, а также электронные ресурсы для учебы и досуга. Мы создаем уютное пространство для чтения, развития и творчества, регулярно проводим лекции, мастер-классы и встречи с авторами.",
//     image: "https://piteronline.tv/wp-content/uploads/2023/08/zimniy-palace-library-scaled.jpg",
//   },
//   {
//     id: 2,
//     title: "ВЫСТАВКА: КОД ЦИВИЛИЗАЦИЙ",
//     date: "Время проведения: с 10 декабря 2024 года по 25 января 2025 года",
//     description:
//       "Токтогула Сатылганова – место, где книги открывают двери в мир знаний и вдохновения. Наш фонд включает разнообразную литературу – от классики до современных бестселлеров, а также электронные ресурсы для учебы и досуга. Мы создаем уютное пространство для чтения, развития и творчества, регулярно проводим лекции, мастер-классы и встречи с авторами.",
//     image: "https://img.freepik.com/premium-photo/girl-reading-book-that-she-took-from-shelves-library_280538-2423.jpg",
//   },
//   {
//     id:3,
//     title: "ВЫСТАВКА: КОД ЦИВИЛИЗАЦИЙ",
//     date: "Время проведения: с 10 декабря 2024 года по 25 января 2025 года",
//     description:
//       "Токтогула Сатылганова – место, где книги открывают двери в мир знаний и вдохновения. Наш фонд включает разнообразную литературу – от классики до современных бестселлеров, а также электронные ресурсы для учебы и досуга. Мы создаем уютное пространство для чтения, развития и творчества, регулярно проводим лекции, мастер-классы и встречи с авторами.",
//     image: "https://piteronline.tv/wp-content/uploads/2023/08/zimniy-palace-library-scaled.jpg",
//   },

// ];
export const AfishaEvents = () => {
  const dispatch = useDispatch();
  const { newEvents: events } = useNews();

  useEffect(() => {
    dispatch(getNewsEvents());
  }, []);
  return (
    <div className="card-afisha container">
      <h1 className="card-afisha__title main__title">АФИША МЕРОПРИЯТИЙ</h1>
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
