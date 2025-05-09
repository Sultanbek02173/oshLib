import "./graphik.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readerGraphicDirectorFetch, readerGraphicFetch } from "../../../app/store/reducers/readerSlice";
import { useTranslation } from "react-i18next";

const initialTime = [
  {
    day2: "Директор-Паланчаев Паланча ",
    time2: "Вторник 16:00-18:00-Директор",
  },
  {
    day2: "Директор-Паланчаев Паланча ",
    time2: "Вторник 11:00-13:00-Зам-Директор",
  },
];

export const Graphik = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const { graphicData } = useSelector((state) => state.reader);
  const { graphicDirector } = useSelector((state) => state.reader);

  useEffect(() => {
    dispatch(readerGraphicFetch());
    dispatch(readerGraphicDirectorFetch());
  }, [dispatch]);

  const { titleData } = useSelector((state) => state.reader);
  const [data] = useState(initialTime);

  return (
    <div className="grap container">
      {titleData.map((item) => (
        <h2 className="grap-title " key={`work-${item.id}`}>
          {item.work}
        </h2>
      ))}
      <table className="grap-table" width="100%">
        <thead className="">
          <tr>
            <th className="grap-table_head">{t('day_graphic')}</th>
            <th className="grap-table_head">{t('time_graphic')}</th>
          </tr>
        </thead>
        <tbody>
          {graphicData.map((item, index) => (
            <tr key={index}>
              <td className="grap-table_td">{item.title}</td>
              <td className="grap-table_td">
                <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {titleData.map((item) => (
        <h2 className="grap-title " key={`citizens-${item.id}`}>
          {item.citizens}
        </h2>
      ))}
      <table className="grap-table" width="100%">
        <thead>
          <tr>
            <th className="grap-table_head">{t('hosts')}</th>
            <th className="grap-table_head">{t('schedule')}</th>
          </tr>
        </thead>
        <tbody>
          {
            graphicDirector &&
            graphicDirector.map((item, index) => (
            <tr key={index}>
              <td className="grap-table_td">{item.hosts}</td>
              <td className="grap-table_td">{item.schedule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
