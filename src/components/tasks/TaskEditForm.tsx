import React, { useState } from "react";
import ITask, { TaskStatus } from "../../models/Task";
import { Task } from "../../models/Task";
import { useProjects } from "../../context/ProjectContext";
import useFormErrors from "../../hooks/useForm";
import "../../styles/taskForm.css";

type Props = {
  task: ITask;
  projectId: number;
  onCancel: () => void;
};

const TaskEditForm: React.FC<Props> = ({ task, projectId, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const { projects, updateProject } = useProjects();
  const { errors, setFormErrors, clearErrors } = useFormErrors();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = Task.validate({ title, dueDate });

    if (validationErrors.length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    clearErrors();

    // encontra o projeto e atualiza a tarefa dentro dele
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const updatedTask: ITask = {
      ...task,
      title,
      description,
      dueDate,
      status,
    };

    const updatedTasks = project.tasks.map((t) =>
      t.id === task.id ? updatedTask : t,
    );

    const completed = updatedTasks.filter(
      (t) => t.status === "concluida",
    ).length;

    updateProject({
      ...project,
      tasks: updatedTasks,
      progress:
        updatedTasks.length === 0
          ? 0
          : Math.round((completed / updatedTasks.length) * 100),
    });

    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h4>Editar Tarefa</h4>

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
          placeholder="Título"
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

      <div className="task-form-group">
        <label>Data de conclusão</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {/* permite alterar o status diretamente na edição */}
      <div className="task-form-group">
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          <option value="pendente">Pendente</option>
          <option value="em-progresso">Em Progresso</option>
          <option value="concluida">Concluída</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="button primary">
          Guardar
        </button>
        <button type="button" className="button secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default TaskEditForm;
