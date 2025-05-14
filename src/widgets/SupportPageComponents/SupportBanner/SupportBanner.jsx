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
