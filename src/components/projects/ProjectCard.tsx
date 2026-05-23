import React from "react";
import CTask from "../../models/Task";
import "../../styles/projectCard.css";

type ProjectCardProps = {
  title: string;
  description: string;
  progress: number;
  tasks: CTask[];
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  progress,
  tasks,
}) => {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>

      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="project-meta">
        <small>{progress}% concluído</small>

        <small>{tasks.length} tarefas</small>
      </div>

      <div className="project-tasks">
        <h4>Tarefas</h4>

        {tasks.length === 0 ? (
          <p>Sem tarefas</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`task-preview ${task.status}`}>
              <span>{task.title}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
