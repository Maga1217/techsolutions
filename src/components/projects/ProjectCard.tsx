import React from "react";
import CTask from "../../models/Task";
import TaskList from "../tasks/TaskList";
import "../../styles/projectCard.css";

type ProjectCardProps = {
  id: number;
  title: string;
  description: string;
  progress: number;
  tasks: CTask[];
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
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
        <TaskList projectId={id} tasks={tasks} />
      </div>
    </div>
  );
};

export default ProjectCard;
