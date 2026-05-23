import React, { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import CTask from "../../models/Task";

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

    const newTask = new CTask(
      currentProject ? currentProject.tasks.length + 1 : 1,
      title,
      description,
      dueDate,
      "pendente",
    );

    addTaskToProject(projectId, newTask);

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nova Tarefa</h3>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        placeholder="Data"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">Adicionar</button>
    </form>
  );
};

export default TaskForm;
