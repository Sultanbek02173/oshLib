import { useEffect } from 'react'
import './activities.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAboutTitlesData, fetchActivitiesData } from '../../../app/store/reducers/aboutSlice'

export const Activities = () => {
    const dispatch = useDispatch()
    const { aboutTitles } = useSelector((state) => state.about)
    const { activities } = useSelector((state) => state.about)

    useEffect(() => {
        dispatch(fetchAboutTitlesData())
        dispatch(fetchActivitiesData())
    }, [dispatch])

    return (
        <div className='activities-container container' >
            <h1 className='activities-container-title main__title' >{aboutTitles[0]?.title_3}</h1>
            <div className='activities-container-cards'>
            {
                activities.map((card) => (
                    <div key={card.id} className='activities-container-cards-card' >
                        <p className='activities-container-cards-card-description' dangerouslySetInnerHTML={{__html:card?.description.slice(0, 155).trim() + '...'}}></p>
                        <a href={card.link} target="_blank" rel="noopener noreferrer" className='activities-container-cards-card-button'>Подробнее</a>
                        </div>
                ))
            }
            </div>
        </div>
    );
}

