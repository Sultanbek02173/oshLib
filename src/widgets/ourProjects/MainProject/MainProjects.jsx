
// src/pages/MainProjects.jsx (or wherever MainProjects is defined)
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../app/store/reducers/projectCategorySlice"; // Adjust path based on folder structure
import { CardProjects } from "../../../features"; // Adjust path based on folder structure

export const MainProjects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : error.message || JSON.stringify(error) || "Failed to load projects";
    console.error("Error fetching projects:", error);
    return <div>Error: {errorMessage}</div>;
  }
  return (
    <div className="container">
      <h1 className="projects-main-title">ОСНОВНЫЕ ПРОЕКТЫ</h1>
      <div className="projects-grid">
        {projects.map((item, index) => (
          <CardProjects
            key={index}
            id={item.id}
            title={item.title}
            image={item.image}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};
