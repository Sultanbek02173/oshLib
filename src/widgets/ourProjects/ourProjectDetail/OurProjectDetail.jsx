// src/components/OurProjectDetail/OurProjectDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectDetail } from "../../../app/store/reducers/projectSlice"; // Corrected path
import "./ourprojectdetail.scss";

export const OurProjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projectDetail, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjectDetail(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : error.message || JSON.stringify(error) || "Failed to load project details";
    console.error("Error fetching project details:", error);
    return <div>Error: {errorMessage}</div>;
  }
  if (!projectDetail) return <div></div>;

  const { image, title, description, additionalInfo } = projectDetail;

  return (
    <div className="ourProject">
      <div className="container">
        <h1 className="ourProject_title">Выставка: {title}</h1>
        <div className="ourProject_group">
          <div className="ourProject_group_img">
            <img src={image} alt={title} />
          </div>
          <div className="ourProject_group_text">
            <h2>Описание</h2>
            <div className="ourProject_group_text_description">
            
                <p className="ourProject_group_text_description_part" dangerouslySetInnerHTML={{ __html:description }}></p>
              
            </div>
          </div>
          <div className="ourProject_group_text-two">
            {Array.isArray(additionalInfo) &&
              additionalInfo.map((paragraph, index) => (
                <p key={index} className="ourProject_group_text-two-description">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};