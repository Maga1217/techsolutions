import React from "react";
import ProjectCard from "../components/projects/ProjectCard";
import "../styles/dashboard.css";

const Dashboard: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "Website Empresa",
      description: "Desenvolvimento do site institucional",
      progress: 70,
    },
    {
      id: 2,
      title: "App Mobile",
      description: "Aplicação móvel para clientes",
      progress: 40,
    },
    {
      id: 3,
      title: "Sistema Interno",
      description: "Gestão interna de tarefas",
      progress: 90,
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            progress={project.progress}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
