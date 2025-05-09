import './structure.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAboutTitlesData, fetchStructureData } from '../../../app/store/reducers/aboutSlice';

export const Structure = () => {
    const dispatch = useDispatch()
    const { structure } = useSelector((state) => state.about)
    const { aboutTitles } = useSelector((state) => state.about)

    useEffect(() => {
        dispatch(fetchStructureData())
        dispatch(fetchAboutTitlesData())
    }, [dispatch])

    return (
        <div className='structure-container container' >
            <h1 className='structure-container-title main__title'>{aboutTitles[0]?.title_2}</h1>
            <div>
                {
                    structure.map((item) => (
                        <img  className='structure-container-img' key={item.id} src={item.image} alt="" />
                    ))
                }
            </div>
        </div>
    );
}

