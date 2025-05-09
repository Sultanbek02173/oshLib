import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { proactivityFetch } from '../../../app/store/reducers/proactivitySlice';
import './professionalBaner.scss';

export const ProfessionalBaner = ({ activeTab, setActiveTab }) => {
  const dispatch = useDispatch();
  const proActivity = useSelector((state) => state.pro_activity) || {};
  const { data: proActivityData = [], status = 'idle', error = null } = proActivity;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(proactivityFetch());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (proActivityData.length > 0 && !activeTab) {
      const firstTabType = proActivityData[0].type;
      setActiveTab(firstTabType);
    }
  }, [proActivityData, activeTab, setActiveTab]);

  // console.log('proActivityData:', proActivityData);

  if (status === 'loading') return <div>Загрузка...</div>;
  if (status === 'failed') return <div>Ошибка: {error || 'Не удалось загрузить данные'}</div>;

  return (
    <div className="professional-baner container">
      {proActivityData.length > 0 ? (
        proActivityData.map((item) => (
          <button
            key={item.id}
            className={`professional-baner__button ${activeTab === item.type ? 'active' : ''}`}
            onClick={() => setActiveTab(item.type)}
          >
            {item.title || item.type}
          </button>
        ))
      ) : (
        <div>Нет данных для отображения</div>
      )}
    </div>
  );
};
