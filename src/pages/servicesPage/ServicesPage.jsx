
import Books from '../../widgets/servicesSection/servicesBooks/Books';
import { ServicesBanner } from '../../widgets/servicesSection/servicesBanner/ServicesBanner';
import './servicesPage.scss'
import { useEffect, useState } from 'react';
import { fetchServicesData } from "../../app/store/reducers/servicesSlice";

import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
export const ServicesPage = () => {
    const [isVisible, setVisible] = useState(null);
    const dispatch = useDispatch();

    const { data, } = useSelector((state) => state.services); // Assuming `status` and `error` are part of state

      useEffect(() => {
        dispatch(fetchServicesData());
      }, [dispatch]);

      const books = data 
    return (
        <div className='container '   >
            <ServicesBanner/>

            <p className='servicestext main__title'>основные услуги</p>

            <div className='servicesblock'   >
                {
                    books && 
                    books.map((book) => (
                        <Books id={book.id} isVisible={isVisible} setVisible={setVisible} key={book.id} title={book.title} description={book.description}/>
                    ))
                    
                }

                

            </div>
            
        </div>
    );
}


