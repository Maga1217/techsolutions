import React from "react";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectForm from "../components/projects/ProjectForm";
import { useProjects } from "../context/ProjectContext";
import "../styles/dashboard.css";

const Dashboard: React.FC = () => {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <div className="dashboard">
        <p className="loading-message">A carregar projetos...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>

      {/* Se houver erro de API, mostra mensagem visível */}
      {error && (
        <div className="error-banner">
          <p>?? {error}</p>
        </div>
      )}

      <div className="project-form-container">
        <ProjectForm />
      </div>

      <div className="project-grid">
        {projects.length === 0 ? (
          <p className="empty-message">
            Nenhum projeto criado ainda. Cria o primeiro acima!
          </p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              progress={project.progress}
              tasks={project.tasks}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
