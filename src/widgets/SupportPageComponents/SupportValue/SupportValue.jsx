import './SupportValue.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { libraryValuesFetch, libraryTitleFetch } from '../../../app/store/reducers/librarySupport';

export function SupportValue() {
  const dispatch = useDispatch();
  const { values, titleData } = useSelector((state) => state.librarySupport);

  useEffect(() => {
    dispatch(libraryValuesFetch());
    dispatch(libraryTitleFetch());
  }, [dispatch]);

  return (
    <section>
      <div className="support_value">
        {titleData && (
          <h1 className="title_value">{titleData.title_1}</h1>
        )}
        <div className="value__container">
          {values &&
            values.map((item, indx) => (
              <div key={indx} className="value__block">
                <img className="value__block-image" src={item.icon} alt="" />
                <h3 className="value__block-title">{item.title}</h3>
                <p
                  className="value__block-description"
                  dangerouslySetInnerHTML={{ __html: item.short_description }}
                ></p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
