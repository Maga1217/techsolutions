import React, { useState } from "react";
import ITask, { Task } from "../../models/Task";
import { useProjects } from "../../context/ProjectContext";
import TaskEditForm from "./TaskEditForm";
import "../../styles/taskItem.css";

type TaskItemProps = {
  task: ITask;
  projectId: number;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, projectId }) => {
  const { deleteTaskFromProject, completeTask } = useProjects();
  const [isEditing, setIsEditing] = useState(false);

  const taskObj = new Task(task);

  if (isEditing) {
    return (
      <TaskEditForm
        task={task}
        projectId={projectId}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className={`task-item ${task.status}`}>
      <h3 className="task-title">{task.title}</h3>

      <p className="task-description">{task.description}</p>

      <small className="task-due-date">Prazo: {task.dueDate}</small>

      <span className="task-status">
        {task.status === "pendente" && "Pendente"}
        {task.status === "em-progresso" && "Em progresso"}
        {task.status === "concluida" && "Concluída"}
      </span>

      <div className="task-actions">
        <button
          className="task-action complete"
          onClick={() => completeTask(projectId, task.id)}
        >
          Concluir
        </button>

        <button className="task-action edit" onClick={() => setIsEditing(true)}>
          Editar
        </button>

        <button
          className="task-action delete"
          onClick={() => deleteTaskFromProject(projectId, task.id)}
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
