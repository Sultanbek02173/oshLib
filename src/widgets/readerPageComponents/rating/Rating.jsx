import './rating.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksRating, getReadingRating } from '../../../app/store/reducers/home/homeThunks';
import { useHome } from '../../../app/store/reducers/home/homeSlice';
import { readerTitleFetch } from '../../../app/store/reducers/readerSlice';

    
export const Rating = () => {
       
    const dispatch = useDispatch();

    const { readerRatings, booksRatings } = useHome();
    const { titleData } = useSelector((state) => state.reader);

    useEffect(() => {
        dispatch(getReadingRating());
        dispatch(getBooksRating());
        dispatch(readerTitleFetch());
    }, [dispatch])


    return (
        <div className='rating container'>
            
        <h1 className='rating-text1'>{titleData[0]?.readers}</h1>

        <Swiper 
        spaceBetween={10} 
        slidesPerView={3.5} 
        grabCursor={true}
        breakpoints={{
                1400: { slidesPerView:4},
                1200: { slidesPerView:3.5},
                992: { slidesPerView: 3},
                890: { slidesPerView: 2.3, 
                        spaceBetween:50
                },
                670: { slidesPerView: 1.7},
                570: { slidesPerView: 1.8},
                565: { slidesPerView: 1.9},
                450: { slidesPerView: 1.3} ,
                350: { slidesPerView: 1.1},
                320: { slidesPerView: 1}

            }}
            >

{
    readerRatings &&
    readerRatings.map((item, index) => (
    <SwiperSlide key={index}>
        <div className="rating-row">
        <div className='rating-img'>
            <img src={item.images} />
        </div>
        <div className='rating-col'>
            <span className="rating-date">{item.place}</span>
            <h3 dangerouslySetInnerHTML={{ __html: item.description }}></h3>
        </div>
        </div>
    </SwiperSlide>
))}

            </Swiper>

            <h1 className='rating-text2'>{titleData[0]?.books}</h1>

            <Swiper 
            spaceBetween={10} 
            slidesPerView={3.5}  
            grabCursor={true}
            breakpoints={{
                1400: { slidesPerView:4},
                1200: { slidesPerView:3.5},
                992: { slidesPerView: 3},
                890: { slidesPerView: 2.3, 
                     spaceBetween:50
                },
                670: { slidesPerView: 1.7},
                570: { slidesPerView: 1.8},
                450: { slidesPerView: 1.3} ,
                350: { slidesPerView: 1.1},
                320: { slidesPerView: 1},

            }}
            >
                {
                    booksRatings &&
                    booksRatings.map((book, index) => (
                    <SwiperSlide key={index}>
                        <div className="rating-box">
                            <div className='rating-img2'>
                               <img  src={book.image} alt="" />
                            </div>
                            <div className="rating-col-1">
                                <span className="rating-data">{book.date}</span>
                                <h3 className='rating-title1'>{book.title}</h3>
                                <h3 dangerouslySetInnerHTML={{ __html: book.description }}></h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        
        </div>
    );
};