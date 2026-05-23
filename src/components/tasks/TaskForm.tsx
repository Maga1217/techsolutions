import React, { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import ITask, { TaskStatus } from "../../models/Task";

import "../../styles/taskForm.css";

type Props = {
  projectId: number;
};

const TaskForm: React.FC<Props> = ({ projectId }) => {
  const { projects, addTaskToProject } = useProjects();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const currentProject = projects.find((project) => project.id === projectId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (dueDate === "" || title === "") {
      if (dueDate === "" && title === "") {
        alert("Insira título e data de prazo para a tarefa");
      } else if (title === "") {
        alert("Insira título para a tarefa");
      } else {
        alert("Insira data de prazo para a tarefa");
      }
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(dueDate);
    if (selectedDate < today) {
      alert("A data não pode ser inferior ao dia atual");
      return;
    }

    const newTask: ITask = {
      id: currentProject ? currentProject.tasks.length + 1 : 1,
      title,
      description,
      dueDate,
      status: "pendente",
    };

    addTaskToProject(projectId, newTask);

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Nova Tarefa</h3>

      <div className="task-form-group">
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="task-form-group">
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="task-form-row">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit" className="button primary">
          Adicionar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
