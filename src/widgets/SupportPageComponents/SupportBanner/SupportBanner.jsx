import { useDispatch, useSelector } from 'react-redux';
import './SupportBanner.scss';
import { useEffect } from 'react';
import { librarySupportFetch } from '../../../app/store/reducers/librarySupport';

export const SupportBanner = () => {
  const { data } = useSelector(s => s.librarySupport)
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(librarySupportFetch())
  }, [dispatch]);

  // const supportData = [
  //   {
  //     id: 1,
  //     title: 'ПОДДЕРЖИТЕ  РАЗВИТИЕ  ЗНАНИЙ И  КУЛЬТУРЫ',
  //     image: rectanglebanner,
  //     description: 'Библиотека имени Токтогула Сатылганова – это не только хранилище знаний, но и динамично развивающееся образовательное и культурное пространство. Поддержка библиотеки играет ключевую роль в ее развитии, позволяя нам предоставлять читателям доступ к ценным ресурсам, организовывать мероприятия и внедрять новые технологии.'
  //   }
  // ];

  return (
    <div className="support">
      {data.map((item, i) => (
        <div className="rectangle" key={i}>
          <div className="support_text">
            <h1 className="title_rectangle">{item.title}</h1>
          </div>
          <div className="rectangle_sup">
            <img className="rectangle_img" src={item.image} alt="" />
            <p className="rectangle_p" dangerouslySetInnerHTML={{ __html: item.description }}></p>
          </div>
        </div>
      ))}
    </div>
  );
};
