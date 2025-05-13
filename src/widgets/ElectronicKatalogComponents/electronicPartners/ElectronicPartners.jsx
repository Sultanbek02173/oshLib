import './ElectronicPartners.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookPartnersFetch } from '../../../app/store/reducers/bookElectronic';

export const ElectronicPartners = () => {
    const dispatch = useDispatch();
    const { partners } = useSelector((state) => state.bookElectronic);

    useEffect(() => {
        dispatch(bookPartnersFetch());
    }, [dispatch]);

    return (
        <section>
            <div className="eletronic__sponsors container">
                {partners.length > 0 && (
                    <h1 className="sponsors_title main__title">{partners[0].title}</h1>
                )}
                <div className="sponsors_list">
                    {partners.map((partner) => (
                        <div key={partner.id} className="sponsor_card">
                            <a href={partner.url} target="_blank" rel="noopener noreferrer">
                                <img className="sponsor_logo" src={partner.images} alt="" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
