import React from 'react';
import { CiSearch } from "react-icons/ci";
import './professionalSearch.scss';

export const ProfessionalSearch = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="container">    <div className="searchh ">
      <input
        type="text"
        placeholder="Поиск"
        className="searchh_input"
        onChange={handleInputChange}
      />
      <CiSearch className="searchh_iconn"/>
    </div>
    </div>
  );
};