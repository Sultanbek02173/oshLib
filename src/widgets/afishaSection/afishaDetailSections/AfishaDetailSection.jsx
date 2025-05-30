import { MdOutlineCalendarMonth } from "react-icons/md";
import { useParams } from "react-router-dom";
import iconca from "../../../shared/eventsImg/iconca.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNews } from "../../../app/store/reducers/news/newsSlice";
import { getDetailEvent } from "../../../app/store/reducers/news/newsThunks";
import "./afishaDetailSection.scss";

export const AfishaDetailSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { eventDetail } = useNews();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailEvent(id));
  }, []);

  return (
    <div className="afishaDetail">
      <div className="container">
        <h1 className="afishaDetail_title"> {eventDetail?.title}</h1>
        <div className="afishaDetail_group">
          <div className="afishaDetail_group_img">
            <img src={eventDetail?.image} alt="" />
          </div>
          <div className="afishaDetail_group_text">
            <h3 className="afishaDetail_group_text_title">
              <img src={iconca} alt="" />
              <h2>{t("Exhibition")}</h2>

            </h3>
            <h3 className="afishaDetail_group_text_title">
              {" "}
              <MdOutlineCalendarMonth />
              {eventDetail?.time}
            </h3>
           
          </div>
        </div>
        <div className="afishaDetail_button_group">
          <h2>{t("Description")}</h2>
          <div className="afishaDetail_button_group_description">
            <p
              className="afishaDetail_button_group_description_part"
              dangerouslySetInnerHTML={{ __html: eventDetail?.description }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};
