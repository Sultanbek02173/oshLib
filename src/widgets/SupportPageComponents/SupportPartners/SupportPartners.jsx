import './SupportPartners.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { libraryPartnersFetch } from '../../../app/store/reducers/librarySupport';

export const SupportPartners = () => {
  const dispatch = useDispatch();
  const { partners } = useSelector(state => state.librarySupport);

  useEffect(() => {
    dispatch(libraryPartnersFetch());
  }, [dispatch]);

  return (
    <div className="sponsor">
      {partners.length > 0 && partners[0].title && (
        <h1 className="title_sponsor">{partners[0].title}</h1>
      )}

      <div className="partners-grid">
        {partners.map((partner, index) => (
          <a key={index} href={partner.links} target="_blank" rel="" >
            <img className="img_sponsor" src={partner.images} alt={`Партнёр ${index + 1}`} />
          </a>
        ))}
      </div>
    </div>
  );
};
