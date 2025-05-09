import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNews } from "../../../app/store/reducers/news/newsSlice";
import { getNewsAboutCmi } from "../../../app/store/reducers/news/newsThunks";
import { CardAfisha } from "../../../features/";
import "./newsAdvertisment.scss";
export const NewsAdvertisment = () => {
  const events = [
    {
      id: 1,
      title: "ВЫСТАВКА: КОД ЦИВИЛИЗАЦИЙ",
      date: "Время проведения: с 10 декабря 2024 года по 25 января 2025 года",
      description:
        "Токтогула Сатылганова – место, где книги открывают двери в мир знаний и вдохновения. Наш фонд включает разнообразную литературу – от классики до современных бестселлеров, а также электронные ресурсы для учебы и досуга. Мы создаем уютное пространство для чтения, развития и творчества, регулярно проводим лекции, мастер-классы и встречи с авторами.",
      image:
        "https://piteronline.tv/wp-content/uploads/2023/08/zimniy-palace-library-scaled.jpg",
    },
    {
      id: 2,
      title: "ВЫСТАВКА: КОД ЦИВИЛИЗАЦИЙ",
      date: "Время проведения: с 10 декабря 2024 года по 25 января 2025 года",
      description:
        "Токтогула Сатылганова – место, где книги открывают двери в мир знаний и вдохновения. Наш фонд включает разнообразную литературу – от классики до современных бестселлеров, а также электронные ресурсы для учебы и досуга. Мы создаем уютное пространство для чтения, развития и творчества, регулярно проводим лекции, мастер-классы и встречи с авторами.",
      image:
        "https://img.freepik.com/premium-photo/girl-reading-book-that-she-took-from-shelves-library_280538-2423.jpg",
    },
    {
      id: 3,
      title: "ВЫСТАВКА: КОД ЦИВИЛИЗАЦИЙ",
      date: "Время проведения: с 10 декабря 2024 года по 25 января 2025 года",
      description:
        "Токтогула Сатылганова – место, где книги открывают двери в мир знаний и вдохновения. Наш фонд включает разнообразную литературу – от классики до современных бестселлеров, а также электронные ресурсы для учебы и досуга. Мы создаем уютное пространство для чтения, развития и творчества, регулярно проводим лекции, мастер-классы и встречи с авторами.",
      image:
        "https://piteronline.tv/wp-content/uploads/2023/08/zimniy-palace-library-scaled.jpg",
    },
    {
      id: 4,
      title: "ВЫСТАВКА: КОД ЦИВИЛИЗАЦИЙ",
      date: "Время проведения: с 10 декабря 2024 года по 25 января 2025 года",
      description:
        "Токтогула Сатылганова – место, где книги открывают двери в мир знаний и вдохновения. Наш фонд включает разнообразную литературу – от классики до современных бестселлеров, а также электронные ресурсы для учебы и досуга. Мы создаем уютное пространство для чтения, развития и творчества, регулярно проводим лекции, мастер-классы и встречи с авторами.",
      image:
        "https://img.freepik.com/premium-photo/girl-reading-book-that-she-took-from-shelves-library_280538-2423.jpg",
    },
    {
      id: 5,
      title: "ВЫСТАВКА: КОД ЦИВИЛИЗАЦИЙ",
      date: "Время проведения: с 10 декабря 2024 года по 25 января 2025 года",
      description:
        "Токтогула Сатылганова – место, где книги открывают двери в мир знаний и вдохновения. Наш фонд включает разнообразную литературу – от классики до современных бестселлеров, а также электронные ресурсы для учебы и досуга. Мы создаем уютное пространство для чтения, развития и творчества, регулярно проводим лекции, мастер-классы и встречи с авторами.",
      image:
        "https://img.freepik.com/premium-photo/girl-reading-book-that-she-took-from-shelves-library_280538-2423.jpg",
    },
  ];

  const dispatch = useDispatch();
  const { arrivals, listAboutCmi } = useNews();

  useEffect(() => {
    dispatch(getNewsAboutCmi());
  }, []);

  return (
    <div className="cardAdvertisment container">
      <h1 className="cardAdvertisment__title">сми о нас</h1>
      {listAboutCmi.map((event, index) => (
        <CardAfisha
          id={event.id}
          key={index}
          date={event.date}
          title={event.title}
          image={event.image}
          description={event.description}
        />
      ))}
      {/* </div> */}
    </div>
  );
};
