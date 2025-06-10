  import { useTranslation } from "react-i18next";
import "./newsDeteilSection.scss";

  export const NewsDeteilSection = ({ item }) => {
    const {t} = useTranslation();
    return (
      <div className="newDeteil">
        <div className="container">
          <h1 className="newDeteil_title">{item?.title}</h1>
          <div className="newDeteil_group">
            <div className="newDeteil_group_img">
              <img src={item?.dextral_image} alt="" />
            </div>
            <div className="newDeteil_group_text">
              <h2>{t('Description')}</h2>
              <div className="newDeteil_group_text_description">
                <p
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                  className="newDeteil_group_text_description_part"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
