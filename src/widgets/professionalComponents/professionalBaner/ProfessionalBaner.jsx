// ProfessionalBaner.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { proactivityFetch } from '../../../app/store/reducers/proactivitySlice';
import { useTranslation } from 'react-i18next';
import './professionalBaner.scss';

export const ProfessionalBaner = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation(); 
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

  if (status === 'loading') return <div>{t('loading')}</div>;

  return (
    <div className="professional-baner container">
      {proActivityData.length > 0 ? (
        proActivityData.map((item) => (
          <button
            key={item.id}
            className={`professional-baner__button ${activeTab === item.type ? 'active' : ''}`}
            onClick={() => setActiveTab(item.type)}
          >
            {item.title || t(item.type)} 
            
          </button>
        ))
      ) : (
        <div>{t('no_data', { defaultValue: 'Нет данных для отображения' })}</div>
      )}
    </div>
  );
};