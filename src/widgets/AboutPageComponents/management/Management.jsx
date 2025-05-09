import './management.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAboutTitlesData, fetchManagementData  } from '../../../app/store/reducers/aboutSlice';

export const Management = () => {
    const dispatch = useDispatch();
    const { management } = useSelector((state) => state.about);
    const { aboutTitles } = useSelector((state) => state.about);

    useEffect(() => {
        dispatch(fetchManagementData());
        dispatch(fetchAboutTitlesData());
    }, [dispatch]);
    // console.log("management:", management);
    // console.log("aboutTitles:", aboutTitles);
    
    return (
        <div className='management-container container'>
            <h1 className='management-container-title main__title'>{aboutTitles[0]?.title_1}</h1>
            <div className='management-container-cards'>
                {management?.map((item) => (
                    <div key={item.id} className='management-container-cards-card'>
                        <img className='management-container-cards-card-img'
                            src={item.image}
                            alt={item.full_name} />
                        <h3 className='management-title'>{item.role}</h3>
                        <p className='management-description'>{item.full_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
