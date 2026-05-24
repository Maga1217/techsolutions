import React, { useState } from "react";
import IProject from "../../models/Project";
import { Project } from "../../models/Project";
import { useProjects } from "../../context/ProjectContext";
import useFormErrors from "../../hooks/useForm";
import "../../styles/projectForm.css";

type Props = {
  project: IProject;
  onCancel: () => void;
};

const ProjectEditForm: React.FC<Props> = ({ project, onCancel }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const { updateProject } = useProjects();
  const { errors, setFormErrors, clearErrors } = useFormErrors();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = Project.validate({ title, description });

    if (validationErrors.length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    clearErrors();

    updateProject({ ...project, title, description });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h3>Editar Projeto</h3>

      {errors.length > 0 && (
        <div className="error-box">
          {errors.map((err, index) => (
            <p key={index} className="error-message">
              ⚠️ {err}
            </p>
          ))}
        </div>
      )}

      <div className="form-group">
        <label>Nome do Projeto</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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

export default ProjectEditForm;
