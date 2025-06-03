import { CiSearch } from "react-icons/ci";
import "./professionalSearch.scss";
import { useTranslation } from "react-i18next";

export const ProfessionalSearch = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="searchh ">
        <input
          type="text"
          placeholder={t("poisk")}
          className="searchh_input"
          onChange={handleInputChange}
        />
        <CiSearch className="searchh_iconn" />
      </div>
    </div>
  );
};
