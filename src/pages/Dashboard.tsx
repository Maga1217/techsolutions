import React from "react";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectForm from "../components/projects/ProjectForm";
import { useProjects } from "../context/ProjectContext";
import "../styles/dashboard.css";

const Dashboard: React.FC = () => {
  const { projects } = useProjects();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>

      <div className="project-form-container">
        <ProjectForm />
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            progress={project.progress}
            tasks={project.tasks}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
