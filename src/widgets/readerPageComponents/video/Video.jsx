import './video.scss'
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { readerVideoFetch } from '../../../app/store/reducers/readerSlice';

  
export  const Video = () => {

    const dispatch = useDispatch();

    const { graphicVideo } = useSelector((state) => state.reader);

    useEffect(() => {
        dispatch(readerVideoFetch());
    }, [dispatch])

    return (
        <div className='video container'>
        <h1 className='video-title '>{graphicVideo[0]?.title}</h1>
        <div className='video-player'>
        <ReactPlayer 
            url={graphicVideo[0]?.link}
            controls 
            width="100%" 
            height="100%"
        />
        </div>          

    </div>
    );
}

