import { useState, useMemo, useEffect } from "react";
import { ProfessionalCategory } from "../../widgets/professionalComponents/professionalCategory/ProfessionalCategory";
import { ProfessionalBaner } from "../../widgets/professionalComponents/professionalBaner/ProfessionalBaner";
import { ProfessionalSearch } from "../../widgets/professionalComponents/professionalSearch/ProfessionalSearch";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { typeativityFetch } from "../../app/store/reducers/typeativitySlice";
import { proactivityFetch } from "../../app/store/reducers/proactivitySlice";
import "./professionalPage.scss";

export const ProfessionalPage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const typeActivity = useSelector((state) => state.type_activity) || {};
  const {
    data: typeActivityData = [],
    status: typeStatus = "idle",
    error: typeError = null,
  } = typeActivity;

  const proActivity = useSelector((state) => state.pro_activity) || {};
  const {
    data: proActivityData = [],
    status: proStatus = "idle",
    error: proError = null,
  } = proActivity;

  useEffect(() => {
    if (typeStatus === "idle") {
      dispatch(typeativityFetch());
    }
    if (proStatus === "idle") {
      dispatch(proactivityFetch());
    }
  }, [typeStatus, proStatus, dispatch]);

  const typeMapping = useMemo(() => {
    const mapping = {};
    proActivityData.forEach((item) => {
      mapping[item.id] = item.type;
    });
    return mapping;
  }, [proActivityData]);

  const filteredCategories = useMemo(() => {
    const searchLower = searchQuery.toLowerCase().trim();
    return typeActivityData.filter((category) => {
      const categoryType = typeMapping[category.type] || "";
      const matchesSearch =
        searchLower === "" ||
        (category.title?.toLowerCase().includes(searchLower) ?? false) ||
        (category.description?.toLowerCase().includes(searchLower) ?? false);
      const matchesTab = activeTab === "other" || categoryType === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [typeActivityData, activeTab, searchQuery, typeMapping]);

  const categoriesForCurrentTab = useMemo(() => {
    return typeActivityData.filter((category) => {
      const categoryType = typeMapping[category.type] || "";
      return activeTab === "other" || categoryType === activeTab;
    });
  }, [typeActivityData, activeTab, typeMapping]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const isLoading =
    typeStatus === "loading" || proStatus === "loading";

  const isNothingFound =
    !isLoading && searchQuery.trim() !== "" && filteredCategories.length === 0;

  const isNoDataInTab =
    !isLoading && searchQuery.trim() === "" && categoriesForCurrentTab.length === 0;

  if (typeStatus === "failed")
    return <div>Ошибка: {typeError || "Не удалось загрузить данные"}</div>;
  if (proStatus === "failed")
    return <div>Ошибка: {proError || "Не удалось загрузить типы"}</div>;

  return (
    <div className="professional-page">
      <ProfessionalBaner activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab && categoriesForCurrentTab.length > 0 && (
        <ProfessionalSearch onSearch={handleSearch} />
      )}


      <div className="category-list">
        {isLoading ? (
          <div className="loding">
            <div className="lds-spinner">
              <div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
        ) : isNothingFound ? (
          <div className="nothing-found">
            {t("no_data")}
            </div>
        ) : isNoDataInTab ? (
          null
        ) : (
          filteredCategories.map((category) => (
            <ProfessionalCategory
              key={category.id}
              title={category.title}
              description={category.description}
              links={category.links}
            />
          ))
        )}
      </div>
    </div>
  );
};
