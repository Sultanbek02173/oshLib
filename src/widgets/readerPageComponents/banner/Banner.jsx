import './banner.scss'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { readerFetch } from '../../../app/store/reducers/readerSlice';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";


export const Banner = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { bannerData } = useSelector((state) => state.reader);

    useEffect(() => {
        dispatch(readerFetch());
    }, [dispatch])

    return (
        <div className="banner container" style={{ background: window.innerWidth <= 768 ? `url(${bannerData.image}) no-repeat center/cover` : undefined }}>
            {bannerData.map((item, index) => (
                <div key={index} className="banner_row">
                    <div className="banner_text">

                        <h1 className='banner_text_title'>{item.title}</h1>
                        <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                        <button className='banner_text_btn'>
                            <Link to="/about">{t("More")}</Link>
                        </button>
                    </div>

                    <div className="banner_img">

                        <img src={item.image} alt="banner" style={{ borderRadius: "inherit" }} />
                    </div>


                </div>
            ))}
        </div>
    );
}


