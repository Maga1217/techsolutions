import React from "react";
import ITask from "../../models/Task";
import TaskList from "../tasks/TaskList";
import { useProjects } from "../../context/ProjectContext";
import "../../styles/projectCard.css";

type ProjectCardProps = {
  id: number;
  title: string;
  description: string;
  progress: number;
  tasks: ITask[];
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  progress,
  tasks,
}) => {
  const { deleteProject } = useProjects();

  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="header-card-left">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div className="header-card-right">
          <button
            className="delete-project button primary"
            onClick={() => deleteProject(id)}
          >
            Remover
          </button>
        </div>
      </div>

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
