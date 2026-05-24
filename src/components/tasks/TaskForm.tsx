import React, { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import ITask, { Task } from "../../models/Task";
import useFormErrors from "../../hooks/useForm";
import "../../styles/taskForm.css";

type Props = {
  projectId: number;
};

const TaskForm: React.FC<Props> = ({ projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { projects, addTaskToProject } = useProjects();
  const { errors, setFormErrors, clearErrors } = useFormErrors();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // valida com o método estático da classe Task
    const validationErrors = Task.validate({ title, dueDate });

    if (validationErrors.length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    clearErrors();

    const project = projects.find((p) => p.id === projectId);

    const newTask: ITask = {
      id: project ? project.tasks.length + 1 : 1,
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

      {errors.length > 0 && (
        <div className="error-box">
          {errors.map((err, index) => (
            <p key={index} className="error-message">
              ⚠️ {err}
            </p>
          ))}
        </div>
      )}

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
