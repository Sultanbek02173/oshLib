import { NewsBanner, NewsBooksUpdate, NewsAdvertisment } from "../../widgets";
import { DailyNews } from "../../widgets/NewsPageComponents/DailyNews/DailyNews";
import { NewBooks } from "../../widgets/NewsPageComponents/NewBooks/NewBooks";

export const NewsPage = () => {
  return (
    <div>
      <NewsBanner /> {/*адаптив готов */}
      {/* <News/> */}
      <DailyNews />
      <NewBooks />
      <NewsBooksUpdate />
      <NewsAdvertisment />
    </div>
  );
};
