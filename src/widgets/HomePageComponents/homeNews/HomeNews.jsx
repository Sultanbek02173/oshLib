import { CardNews } from '../../../features';
import './homeNews.scss';

export const HomeNews = () => {
    const newsItems = [
        {
            title: "Концерт \"Музыкальные ритмы города\"",
            
            time: "19:00",
            description: "Окунитесь в атмосферу живой музыки с участием популярных исполнителей.",
            image: "https://falstaff.b-cdn.net/storage/sites/2/2023/09/Bildschirmfoto_2023-09-28_um_16.52.07.png",
        },
        {
            title: "Концерт \"Музыкальные ритмы города\"",
            
            time: "19:00",
            description: "Окунитесь в атмосферу живой музыки с участием популярных исполнителей.",
            image: "https://falstaff.b-cdn.net/storage/sites/2/2023/09/Bildschirmfoto_2023-09-28_um_16.52.07.png",
        },
        {
            title: "Концерт \"Музыкальные ритмы города\"",
           
            time: "19:00",
            description: "Окунитесь в атмосферу живой музыки с участием популярных исполнителей.",
            image: "https://falstaff.b-cdn.net/storage/sites/2/2023/09/Bildschirmfoto_2023-09-28_um_16.52.07.png",
        },
        {
            title: "Концерт \"Музыкальные ритмы города\"",
            
            time: "19:00",
            description: "Окунитесь в атмосферу живой музыки с участием популярных исполнителей.",
            image: "https://falstaff.b-cdn.net/storage/sites/2/2023/09/Bildschirmfoto_2023-09-28_um_16.52.07.png",
        },  {
            title: "Концерт \"Музыкальные ритмы города\"",
            
            time: "19:00",
            description: "Окунитесь в атмосферу живой музыки с участием популярных исполнителей.",
            image: "https://falstaff.b-cdn.net/storage/sites/2/2023/09/Bildschirmfoto_2023-09-28_um_16.52.07.png",
        },  {
            title: "Концерт \"Музыкальные ритмы города\"",
            
            time: "19:00",
            description: "Окунитесь в атмосферу живой музыки с участием популярных исполнителей.",
            image: "https://falstaff.b-cdn.net/storage/sites/2/2023/09/Bildschirmfoto_2023-09-28_um_16.52.07.png",
        },  {
            title: "Концерт \"Музыкальные ритмы города\"",
            
            time: "19:00",
            description: "Окунитесь в атмосферу живой музыки с участием популярных исполнителей.",
            image: "https://falstaff.b-cdn.net/storage/sites/2/2023/09/Bildschirmfoto_2023-09-28_um_16.52.07.png",
        },
    ];

    return (
        <div className="home-news">
            <h1 className="home-news__title main__title">НОВОСТИ</h1>
            <div className="home-news__list">
                {newsItems.map((news, index) => (
                    <div key={index} className="home-news__card">
                        <CardNews
                            title={news.title}
                            image={news.image}
                            description={news.description}
                            time={news.time}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
