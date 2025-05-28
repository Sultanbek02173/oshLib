import Books from '../../widgets/servicesSection/servicesBooks/Books';
import { ServicesBanner } from '../../widgets/servicesSection/servicesBanner/ServicesBanner';
import './servicesPage.scss';
import { useEffect, useState } from 'react';
import { fetchServicesBasicData } from "../../app/store/reducers/servicesSlice";
import { useDispatch, useSelector } from "react-redux";

export const ServicesPage = () => {
  const [isVisible, setVisible] = useState(null);
  const dispatch = useDispatch();

  const { basic = [] } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServicesBasicData());
  }, [dispatch]);

  const books = basic;

  return (
    <div className='container'>
      <ServicesBanner />
      <p className='servicestext main__title'>основные услуги</p>
      <div className='servicesblock'>
        {books.map((book, i) => (
          <Books
            i={i}
            key={book.i}
            id={book.id}
            title={book.title}
            description={book.description}
            isVisible={isVisible}
            setVisible={setVisible}
          />
        ))}
      </div>
    </div>
  );
};
