import './history.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAboutTitlesData, fetchHistoryData } from '../../../app/store/reducers/aboutSlice';

export const History = () => {
    const dispatch = useDispatch();
    const { history } = useSelector((state) => state.about)
    const { aboutTitles } = useSelector((state) => state.about);

    useEffect(() => {
        dispatch(fetchHistoryData())
        dispatch(fetchAboutTitlesData())
        
    }, [dispatch])
    
    return (
        <div className='history-container container'>
            <h1 className='history-container-title main__title'>{aboutTitles[0]?.title_4}</h1>
            <div className='history-container-text'>
                {
                    history && 
                    history.map((text) => (
                        <div key={text.id}>
                            <div key={text.id}>
                                <img className='history-container-img' src={text.image} alt="" />
                                <p className='history-container-text-description' dangerouslySetInnerHTML={{ __html: text.description }}></p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

