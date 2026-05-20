import React from "react";
import "../../styles/projectCard.css";

type ProjectCardProps = {
  title: string;
  description: string;
  progress: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  progress,
}) => {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>

      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <small>{progress}% concluído</small>
    </div>
  );
};

export default ProjectCard;
