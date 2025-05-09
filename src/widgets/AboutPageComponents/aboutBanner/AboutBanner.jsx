import './aboutBanner.scss';
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutData } from "../../../app/store/reducers/aboutSlice";
import { useEffect } from 'react';

export const AboutBanner = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.about);

    useEffect(() => {
        dispatch(fetchAboutData());
    }, [dispatch]);

    return (
        <div className='banner-container container'>
            <div className='banner-container-headline'>
                <div className='banner-container-headline-parts'>
                    <h1 className='banner-container-headline-parts-first-title'>
                        {data?.title_1}
                        <span className='banner-container-headline-parts-second-title'>
                            {" "}{data?.title_2}
                        </span>
                    </h1>
                    <p
                        className='banner-container-headline-parts-description'
                        dangerouslySetInnerHTML={{ __html: data?.description }}
                    ></p>
                </div>
            </div>
            <div className='banner-container-images'>
                <img
                    className='banner-container-images-first-img'
                    src={data?.image_1}
                />
                <img
                    className='banner-container-images-second-img'
                    src={data?.image_2}
                />
                <img
                    className='banner-container-images-third-img'
                    src={data?.image_3}
                />
            </div>
        </div>
    );
};
